# 埋点SDK实现文档

## 概述

已成功实现一个完整的、可扩展的前端埋点SDK，支持页面访问追踪、对话问答追踪等多种埋点场景。

## 实现功能

### 1. 核心功能 ✅

- ✅ **事件追踪**: 支持页面访问、对话问答、点击事件、自定义事件等多种事件类型
- ✅ **数据缓存**: 事件队列缓存，支持批量上报
- ✅ **自动上报**: 可配置的定时自动上报机制
- ✅ **失败重试**: 上报失败自动重试，确保数据不丢失
- ✅ **会话管理**: 自动生成和管理会话ID
- ✅ **用户追踪**: 支持自定义用户ID获取逻辑
- ✅ **页面时长**: 自动计算页面停留时长
- ✅ **可靠上报**: 页面关闭时使用sendBeacon确保数据上报

### 2. Vue3集成 ✅

- ✅ **Vue插件**: 提供开箱即用的Vue3插件
- ✅ **组合式API**: 提供`useTracker` Hook，支持Composition API
- ✅ **全局属性**: 支持通过`this.$tracker`访问（Options API）
- ✅ **依赖注入**: 使用Vue的provide/inject机制

### 3. 高级特性 ✅

- ✅ **钩子函数**: 支持上报前、成功、失败的钩子
- ✅ **数据过滤**: 可在上报前处理和过滤数据
- ✅ **灵活配置**: 丰富的配置选项
- ✅ **TypeScript**: 完整的TypeScript类型定义
- ✅ **性能优化**: 批量上报减少请求次数
- ✅ **内存管理**: 超过最大缓存自动清理

## 项目结构

```
common/com-tracker/
├── src/
│   ├── core/
│   │   └── Tracker.ts          # 核心追踪类
│   ├── plugins/
│   │   ├── vue.ts              # Vue插件
│   │   └── useTracker.ts       # Composition API Hook
│   ├── utils/
│   │   └── helper.ts           # 工具函数
│   └── types.ts                # TypeScript类型定义
├── index.ts                    # 主入口文件
├── index.d.ts                  # TypeScript声明文件
├── package.json                # 包配置
├── tsconfig.json               # TypeScript配置
├── README.md                   # 使用文档
├── INTEGRATION.md              # 集成指南
└── EXAMPLES.md                 # 使用示例
```

## 已集成应用

### agent-base 应用 ✅

已在agent-base应用中完成集成：

#### 1. 依赖配置
- ✅ 在`package.json`中添加了`com-tracker`依赖

#### 2. 插件安装
- ✅ 在`main.ts`中安装了`TrackerPlugin`
- ✅ 配置了应用ID、上报地址、用户ID获取等参数

#### 3. 首页访问埋点
文件：`app/agent-base/src/views/desktop/index.vue`
- ✅ 追踪页面访问：进入首页时记录
- ✅ 追踪页面离开：离开首页时记录并计算停留时长

#### 4. 对话问答埋点
文件：`app/agent-base/src/views/desktop/chat-view/new-chat.vue`
- ✅ 追踪对话问答：每次发送消息时记录
- ✅ 记录问题内容、模型选择、联网搜索、文件数量等详细信息

## API文档

### Tracker 类

```typescript
class Tracker {
  // 初始化
  init(): void
  
  // 追踪事件
  track(type: TrackEventType, name: string, data?: Record<string, any>): void
  
  // 追踪页面访问
  trackPageView(path?: string, title?: string): void
  
  // 追踪页面离开
  trackPageLeave(): void
  
  // 追踪对话问答
  trackChatQA(question: string, config?: Record<string, any>): void
  
  // 手动上报
  report(force?: boolean): Promise<void>
  
  // 获取会话ID
  getSessionId(): string
  
  // 获取队列长度
  getQueueLength(): number
  
  // 销毁实例
  destroy(): void
}
```

### 配置选项

```typescript
interface TrackerConfig {
  appId: string                 // 必填：应用ID
  reportUrl: string              // 必填：上报地址
  enabled?: boolean              // 是否启用（默认true）
  batchSize?: number             // 批量上报数量（默认10）
  reportInterval?: number        // 上报间隔ms（默认5000）
  maxCacheSize?: number          // 最大缓存（默认100）
  autoPageView?: boolean         // 自动追踪页面访问（默认true）
  autoPageDuration?: boolean     // 自动追踪停留时长（默认true）
  getUserId?: () => string       // 用户ID获取函数
  getSessionId?: () => string    // 会话ID获取函数
  headers?: Record<string, any>  // 请求头配置
  retryTimes?: number            // 重试次数（默认3）
  retryDelay?: number            // 重试延迟ms（默认1000）
  beforeReport?: Function        // 上报前钩子
  onReportSuccess?: Function     // 上报成功钩子
  onReportError?: Function       // 上报失败钩子
}
```

### 事件类型

```typescript
enum TrackEventType {
  PAGE_VIEW = 'page_view',      // 页面访问
  PAGE_LEAVE = 'page_leave',    // 页面离开
  CLICK = 'click',              // 点击事件
  CHAT_QA = 'chat_qa',          // 对话问答
  CUSTOM = 'custom'             // 自定义事件
}
```

## 数据格式

### 上报数据结构

```json
{
  "appId": "agent-base",
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
      "pageTitle": "AI工作台-首页",
      "data": {
        "path": "/desktop",
        "title": "AI工作台-首页",
        "referrer": ""
      }
    },
    {
      "type": "chat_qa",
      "name": "对话问答",
      "timestamp": 1234567890456,
      "userId": "user123",
      "sessionId": "1234567890_abc123",
      "pagePath": "/desktop",
      "pageTitle": "AI工作台-首页",
      "data": {
        "question": "你好，请帮我分析一下这份文档",
        "questionLength": 15,
        "model": "GPT-4",
        "onlineSearch": false,
        "fileCount": 1,
        "hasAgent": true,
        "hasVariables": false
      }
    }
  ]
}
```

## 使用示例

### 基础使用

```typescript
import { useTracker } from 'com-tracker'

const tracker = useTracker()

// 追踪页面访问
tracker.trackPageView('/page', '页面标题')

// 追踪对话问答
tracker.trackChatQA('你好', {
  model: 'GPT-4',
  onlineSearch: true,
  fileCount: 2
})

// 追踪自定义事件
tracker.track('click', '按钮点击', {
  buttonName: '提交',
  page: '表单页'
})
```

### 高级配置

```typescript
app.use(TrackerPlugin, {
  appId: 'agent-base',
  reportUrl: '/api/track/report',
  enabled: true,
  batchSize: 10,
  reportInterval: 5000,
  
  // 自定义用户ID获取
  getUserId: () => {
    const store = JSON.parse(sessionStorage.getItem('storeVuex') || '{}')
    return store.user?.userInfo?.id
  },
  
  // 上报前处理数据
  beforeReport: (events) => {
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
  }
})
```

## 扩展能力

### 1. 支持其他应用集成

SDK已设计为通用模块，可轻松集成到其他应用：

- `agent-core`
- `agent-main`
- 其他微前端应用

只需在对应应用的`package.json`中添加依赖，并在`main.ts`中安装插件即可。

### 2. 支持自定义事件

```typescript
// 自定义业务事件
tracker.track('custom', '文档导出', {
  documentId: '123',
  format: 'pdf',
  pageCount: 10
})

// 自定义性能事件
tracker.track('custom', '页面加载性能', {
  loadTime: 1500,
  domReady: 800,
  resourceLoad: 700
})
```

### 3. 支持插件扩展

可以基于核心Tracker类扩展更多功能：

```typescript
class EnhancedTracker extends Tracker {
  // 扩展功能
  trackFormSubmit(formData: any) {
    this.track('custom', '表单提交', formData)
  }
  
  trackVideoPlay(videoId: string) {
    this.track('custom', '视频播放', { videoId })
  }
}
```

## 后续优化建议

### 1. 性能优化
- [ ] 支持Web Worker进行数据上报
- [ ] 支持IndexedDB本地持久化
- [ ] 支持压缩上报数据

### 2. 功能增强
- [ ] 支持用户行为漏斗分析
- [ ] 支持热力图数据收集
- [ ] 支持A/B测试数据追踪
- [ ] 支持错误边界自动捕获

### 3. 数据分析
- [ ] 开发配套的数据可视化面板
- [ ] 支持实时数据展示
- [ ] 支持数据导出和报表生成

### 4. 监控告警
- [ ] 支持异常事件实时告警
- [ ] 支持PV/UV统计
- [ ] 支持性能指标监控

## 注意事项

1. **隐私保护**
   - 不要收集用户敏感信息（密码、手机号等）
   - 遵守GDPR等隐私法规
   - 提供用户数据删除接口

2. **性能影响**
   - 合理配置`batchSize`和`reportInterval`
   - 避免在高频事件中直接调用埋点
   - 考虑使用节流/防抖优化

3. **数据准确性**
   - 确保在关键节点正确调用埋点
   - 测试各种边界情况
   - 验证上报数据格式正确性

4. **错误处理**
   - 配置`onReportError`处理失败情况
   - 避免埋点错误影响业务功能
   - 记录异常日志便于排查

## 测试验证

### 1. 功能测试
- ✅ 页面访问追踪正常
- ✅ 对话问答追踪正常
- ✅ 数据缓存和批量上报正常
- ✅ 失败重试机制正常
- ✅ 页面关闭时sendBeacon上报正常

### 2. 性能测试
- ✅ 不影响页面加载性能
- ✅ 批量上报减少请求次数
- ✅ 内存占用在合理范围

### 3. 兼容性测试
- ✅ Vue3项目正常使用
- ✅ TypeScript类型检查通过
- ✅ 主流浏览器兼容

## 相关文档

- [README.md](../common/com-tracker/README.md) - SDK使用文档
- [INTEGRATION.md](../common/com-tracker/INTEGRATION.md) - 集成指南
- [EXAMPLES.md](../common/com-tracker/EXAMPLES.md) - 使用示例

## 更新记录

### v1.0.0 (2025-11-20)
- ✅ 完成埋点SDK核心功能开发
- ✅ 完成Vue3插件封装
- ✅ 完成agent-base应用集成
- ✅ 完成文档编写

