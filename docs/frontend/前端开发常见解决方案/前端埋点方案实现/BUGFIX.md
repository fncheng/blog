# Bug修复说明

## 问题描述

当上报接口持续失败时，会导致无限重新上报，形成死循环：

1. 上报失败
2. 事件被放回队列
3. 定时器触发，再次上报
4. 再次失败，再次放回队列
5. 循环往复，永不停止

## 解决方案

### 1. 新增状态管理

```typescript
/** 连续失败次数 */
private consecutiveFailures: number = 0

/** 最大连续失败次数 */
private readonly MAX_CONSECUTIVE_FAILURES = 5

/** 是否暂停上报 */
private isPaused: boolean = false

/** 恢复上报的定时器 */
private resumeTimer: number | null = null
```

### 2. 失败保护机制

#### 连续失败计数
- 每次上报失败后，递增 `consecutiveFailures`
- 上报成功后，重置计数为 0

#### 自动暂停
- 连续失败达到 5 次时，自动暂停上报
- 清空当前队列，避免死循环
- 30秒后自动恢复

#### 队列保护
- 暂停期间，跳过定时上报
- 防止失败事件无限累积

### 3. 代码实现

```ts
/**
 * 处理上报失败
 */
private handleReportFailure(error: Error, events: TrackEvent[]): void {
  // 增加连续失败计数
  this.consecutiveFailures++
  
  console.warn(`[Tracker] 上报失败，连续失败次数: ${this.consecutiveFailures}/${this.MAX_CONSECUTIVE_FAILURES}`)

  // 执行失败钩子
  this.config.onReportError?.(error, events)

  // 如果连续失败次数达到阈值，暂停上报
  if (this.consecutiveFailures >= this.MAX_CONSECUTIVE_FAILURES) {
    this.pauseReporting(events)
  } else {
    // 未达到阈值，将事件放回队列（但要控制队列大小）
    if (this.eventQueue.length + events.length <= this.config.maxCacheSize) {
      this.eventQueue.unshift(...events)
    } else {
      console.warn('[Tracker] 队列已满，丢弃部分失败事件')
      // 只保留最新的事件
      const remainingSpace = this.config.maxCacheSize - this.eventQueue.length
      if (remainingSpace > 0) {
        this.eventQueue.unshift(...events.slice(-remainingSpace))
      }
    }
  }
}

/**
 * 暂停上报
 */
private pauseReporting(failedEvents: TrackEvent[]): void {
  if (this.isPaused) {
    return
  }

  this.isPaused = true
  console.error('[Tracker] 连续失败次数过多，暂停上报。将在30秒后自动恢复')

  // 清空当前队列，避免死循环
  this.eventQueue = []

  // 30秒后自动恢复
  this.resumeTimer = window.setTimeout(() => {
    this.resumeReporting()
  }, 30000) // 30秒冷却期
}

/**
 * 恢复上报
 */
private resumeReporting(): void {
  if (!this.isPaused) {
    return
  }

  this.isPaused = false
  this.consecutiveFailures = 0
  
  if (this.resumeTimer) {
    clearTimeout(this.resumeTimer)
    this.resumeTimer = null
  }

  console.log('[Tracker] 恢复上报')
}
```

### 4. 新增API

#### getStatus()
获取当前上报状态

```typescript
const status = tracker.getStatus()
console.log(status)
// {
//   initialized: true,
//   isPaused: false,
//   consecutiveFailures: 0,
//   queueLength: 5
// }
```

#### resume()
手动恢复上报

```typescript
// 紧急情况下手动恢复
tracker.resume()
```

## 工作流程

### 正常情况
```
上报 -> 成功 -> 重置计数 -> 继续正常工作
```

### 偶发失败
```
上报 -> 失败 -> 重试3次 -> 失败 -> 计数+1 -> 放回队列 -> 等待下次
上报 -> 成功 -> 重置计数 -> 恢复正常
```

### 连续失败
```
上报 -> 失败(1/5) -> 放回队列
上报 -> 失败(2/5) -> 放回队列
上报 -> 失败(3/5) -> 放回队列
上报 -> 失败(4/5) -> 放回队列
上报 -> 失败(5/5) -> 暂停上报 -> 清空队列
... 30秒冷却期 ...
自动恢复 -> 重置计数 -> 继续工作
```

## 日志示例

### 正常情况
```
[Tracker] 埋点SDK初始化完成 {appId: "agent-base", sessionId: "..."}
[Tracker] 数据上报成功 10 条
[Tracker] 数据上报成功 8 条
```

### 失败重试
```
[Tracker] 数据上报失败 Error: Network Error
[Tracker] 上报失败，连续失败次数: 1/5
[Tracker] 数据上报成功 10 条
[Tracker] 恢复上报
```

### 触发保护
```
[Tracker] 数据上报失败 Error: Network Error
[Tracker] 上报失败，连续失败次数: 1/5
[Tracker] 数据上报失败 Error: Network Error
[Tracker] 上报失败，连续失败次数: 2/5
[Tracker] 数据上报失败 Error: Network Error
[Tracker] 上报失败，连续失败次数: 3/5
[Tracker] 数据上报失败 Error: Network Error
[Tracker] 上报失败，连续失败次数: 4/5
[Tracker] 数据上报失败 Error: Network Error
[Tracker] 上报失败，连续失败次数: 5/5
[Tracker] 连续失败次数过多，暂停上报。将在30秒后自动恢复
[Tracker] 上报已暂停，跳过本次上报
[Tracker] 上报已暂停，跳过本次上报
...
[Tracker] 恢复上报
```

## 参数配置

### 可调整的参数

```typescript
// 最大连续失败次数（当前为5）
private readonly MAX_CONSECUTIVE_FAILURES = 5

// 冷却期时长（当前为30秒）
this.resumeTimer = window.setTimeout(() => {
  this.resumeReporting()
}, 30000)
```

根据实际业务需求，可以调整这些参数：
- 如果接口不稳定，可以增加最大失败次数
- 如果接口恢复较快，可以缩短冷却期

## 副作用说明

### 数据丢失风险

在以下情况下可能丢失部分数据：

1. **连续失败达到阈值**
   - 暂停时会清空队列
   - 失败的最后一批数据会丢失

2. **队列满时的失败**
   - 只保留最新的事件
   - 旧事件会被丢弃

### 减少数据丢失的建议

1. **配置失败钩子**
```typescript
onReportError: (error, events) => {
  // 将失败的数据存储到localStorage
  const failedEvents = JSON.parse(localStorage.getItem('failed_events') || '[]')
  failedEvents.push(...events)
  localStorage.setItem('failed_events', JSON.stringify(failedEvents))
}
```

2. **定期重试失败数据**
```typescript
// 在应用启动时，尝试上报之前失败的数据
const failedEvents = JSON.parse(localStorage.getItem('failed_events') || '[]')
if (failedEvents.length > 0) {
  tracker.report() // 尝试上报
  // 成功后清空localStorage
}
```

3. **监控告警**
```typescript
onReportError: (error, events) => {
  // 发送告警通知
  console.error('埋点上报失败，请检查接口')
  // 可以集成监控系统，如Sentry
}
```

## 测试验证

### 测试场景1：接口正常
```typescript
// 预期：正常上报，无任何保护触发
tracker.trackPageView('/test')
// [Tracker] 数据上报成功 1 条
```

### 测试场景2：接口临时故障
```typescript
// 模拟接口返回500错误，然后恢复
// 预期：重试成功，或计数增加但未达到阈值
```

### 测试场景3：接口持续故障
```typescript
// 模拟接口持续返回错误
// 预期：5次失败后触发保护，暂停上报，30秒后恢复
```

### 测试场景4：手动恢复
```typescript
// 在暂停状态下手动恢复
tracker.resume()
// 预期：立即恢复上报，重置计数
```

## 版本更新

### v1.0.1 (2025-11-20)
- 修复：上报接口失败导致的死循环问题
- 新增：连续失败保护机制
- 新增：自动暂停和恢复功能
- 新增：`getStatus()` 和 `resume()` API
- 优化：队列溢出时的数据保护

## 总结

通过引入失败保护机制，成功解决了死循环问题：

✅ **问题已解决**：不会再出现无限重试的死循环
✅ **自动恢复**：30秒后自动恢复，无需人工干预
✅ **手动控制**：提供手动恢复API，应对紧急情况
✅ **状态透明**：可随时查看上报状态
✅ **日志完善**：清晰的日志输出，便于排查问题

⚠️ **注意事项**：
- 暂停期间可能丢失部分数据
- 建议配置失败钩子保存失败数据
- 确保上报接口稳定可用

