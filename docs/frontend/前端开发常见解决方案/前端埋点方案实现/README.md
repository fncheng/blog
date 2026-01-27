# com-tracker

一个轻量级、可扩展的前端埋点SDK，支持自动/手动追踪、批量上报、失败重试等功能。

## 特性

- 🚀 轻量级，零依赖（仅依赖axios）
- 📊 支持多种事件类型：页面访问、对话问答、自定义事件等
- 🔄 自动批量上报，可配置上报策略
- 💪 失败重试机制，数据不丢失
- 🛡️ 死循环保护，连续失败自动暂停上报
- 🎯 Vue3插件支持，开箱即用
- 🔧 灵活的配置和钩子函数
- 📦 支持TypeScript

## 安装

```bash
# 在workspace根目录的package.json中添加依赖
pnpm install
```

## 快速开始

### 1. Vue3项目中使用

在 `main.ts` 中安装插件：

```typescript
import { createApp } from 'vue'
import { TrackerPlugin } from 'com-tracker'
import App from './App.vue'

const app = createApp(App)

// 安装埋点插件
app.use(TrackerPlugin, {
  appId: 'your-app-id',
  reportUrl: 'https://your-api.com/track',
  enabled: true,
  batchSize: 10,
  reportInterval: 5000,
  autoPageView: true,
  getUserId: () => {
    // 从store或sessionStorage获取用户ID
    const store = JSON.parse(sessionStorage.getItem('storeVuex') || '{}')
    return store.user?.userInfo?.id
  }
})

app.mount('#app')
```

### 2. 组件中使用

```vue
<script setup lang="ts">
import { useTracker } from 'com-tracker'

const tracker = useTracker()

// 追踪对话问答
const handleSend = (question: string, config: any) => {
  tracker.trackChatQA(question, {
    model: config.model,
    onlineSearch: config.onlineSearch,
    fileCount: config.files?.length || 0
  })
  
  // 执行发送逻辑...
}

// 追踪自定义事件
const handleClick = () => {
  tracker.track('click', '按钮点击', {
    buttonName: '发送按钮',
    position: 'footer'
  })
}
</script>
```

### 3. 在页面路由中使用

```typescript
import { useTracker } from 'com-tracker'
import { onMounted, onUnmounted } from 'vue'

// 追踪首页访问
onMounted(() => {
  const tracker = useTracker()
  tracker.trackPageView('/desktop', '首页')
})
```

## API文档

### TrackerConfig 配置项

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| appId | string | 是 | - | 应用ID |
| reportUrl | string | 是 | - | 上报地址 |
| enabled | boolean | 否 | true | 是否启用 |
| batchSize | number | 否 | 10 | 批量上报数量阈值 |
| reportInterval | number | 否 | 5000 | 上报时间间隔(ms) |
| maxCacheSize | number | 否 | 100 | 最大缓存数量 |
| autoPageView | boolean | 否 | true | 是否自动上报页面访问 |
| autoPageDuration | boolean | 否 | true | 是否自动上报页面停留时长 |
| getUserId | function | 否 | - | 自定义用户ID获取函数 |
| getSessionId | function | 否 | - | 自定义会话ID获取函数 |
| headers | object | 否 | {} | 请求头配置 |
| retryTimes | number | 否 | 3 | 失败重试次数 |
| retryDelay | number | 否 | 1000 | 重试延迟(ms) |
| beforeReport | function | 否 | - | 上报前钩子 |
| onReportSuccess | function | 否 | - | 上报成功钩子 |
| onReportError | function | 否 | - | 上报失败钩子 |

### Tracker 实例方法

#### track(type, name, data?)
追踪自定义事件

```typescript
tracker.track('custom', '按钮点击', {
  buttonName: '提交按钮',
  page: '首页'
})
```

#### trackPageView(path?, title?)
追踪页面访问

```typescript
tracker.trackPageView('/desktop', '首页')
```

#### trackPageLeave()
追踪页面离开

```typescript
tracker.trackPageLeave()
```

#### trackChatQA(question, config?)
追踪对话问答

```typescript
tracker.trackChatQA('你好', {
  model: 'gpt-4',
  onlineSearch: true,
  fileCount: 2
})
```

#### report(force?)
手动触发上报

```typescript
tracker.report(true)
```

#### getSessionId()
获取当前会话ID

```typescript
const sessionId = tracker.getSessionId()
```

#### destroy()
销毁实例

```typescript
tracker.destroy()
```

#### getStatus()
获取上报状态

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
手动恢复上报（用于紧急情况）

```typescript
tracker.resume()
```

## 事件类型

- `page_view`: 页面访问
- `page_leave`: 页面离开
- `click`: 点击事件
- `chat_qa`: 对话问答
- `custom`: 自定义事件

## 高级用法

### 自定义钩子

```typescript
app.use(TrackerPlugin, {
  appId: 'your-app-id',
  reportUrl: 'https://your-api.com/track',
  
  // 上报前处理数据
  beforeReport: (events) => {
    // 添加公共参数
    return events.map(event => ({
      ...event,
      appVersion: '1.0.0',
      platform: 'web'
    }))
  },
  
  // 上报成功回调
  onReportSuccess: (events) => {
    console.log('上报成功', events.length, '条')
  },
  
  // 上报失败回调
  onReportError: (error, events) => {
    console.error('上报失败', error)
    // 可以在这里实现自定义的失败处理逻辑
  }
})
```

### 不使用Vue插件

```typescript
import { Tracker } from 'com-tracker'

const tracker = new Tracker({
  appId: 'your-app-id',
  reportUrl: 'https://your-api.com/track'
})

tracker.init()

// 使用tracker进行埋点
tracker.trackPageView()
tracker.trackChatQA('你好')
```

## 数据格式

上报的数据格式：

```json
{
  "appId": "your-app-id",
  "sessionId": "1234567890_abc123",
  "timestamp": 1234567890123,
  "events": [
    {
      "type": "page_view",
      "name": "页面访问",
      "timestamp": 1234567890123,
      "userId": "user123",
      "sessionId": "1234567890_abc123",
      "pagePath": "/desktop",
      "pageTitle": "首页",
      "data": {
        "path": "/desktop",
        "title": "首页",
        "referrer": "https://example.com"
      }
    }
  ]
}
```

## 死循环保护机制

为了避免上报接口持续失败导致的死循环，SDK内置了保护机制：

### 工作原理

1. **连续失败计数**：记录连续失败的次数
2. **自动暂停**：连续失败5次后，自动暂停上报30秒
3. **自动恢复**：30秒后自动恢复，或上报成功后立即恢复
4. **队列保护**：暂停期间不再将失败事件放回队列，避免死循环

### 日志输出

```
[Tracker] 上报失败，连续失败次数: 1/5
[Tracker] 上报失败，连续失败次数: 2/5
...
[Tracker] 连续失败次数过多，暂停上报。将在30秒后自动恢复
[Tracker] 上报已暂停，跳过本次上报
...
[Tracker] 恢复上报
```

### 手动恢复

如果需要立即恢复上报，可以手动调用：

```typescript
tracker.resume()
```

### 查看状态

```typescript
const status = tracker.getStatus()
if (status.isPaused) {
  console.log('上报已暂停，连续失败次数:', status.consecutiveFailures)
}
```

## 注意事项

1. 页面卸载时会使用 `navigator.sendBeacon` 发送最后的数据，确保数据不丢失
2. 会话ID存储在 sessionStorage 中，浏览器关闭后会重新生成
3. 当事件队列达到 `maxCacheSize` 时，会自动清理旧数据
4. 建议根据实际业务场景调整 `batchSize` 和 `reportInterval` 参数
5. 连续失败5次会触发保护机制，暂停上报30秒，确保不会形成死循环
6. 确保上报接口稳定可用，避免频繁触发保护机制导致数据丢失

## License

MIT

