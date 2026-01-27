# 埋点SDK集成指南

## 快速集成步骤

### 1. 添加依赖

在应用的 `package.json` 中添加依赖：

```json
{
  "dependencies": {
    "com-tracker": "workspace:^"
  }
}
```

然后运行：

```bash
pnpm install
```

### 2. 在 main.ts 中安装插件

```typescript
import { TrackerPlugin } from 'com-tracker'

// 在创建Vue实例后，添加以下代码
instance.use(TrackerPlugin, {
  appId: 'your-app-id', // 应用标识，如：agent-base、agent-core等
  reportUrl: '/api/track/report', // 上报接口地址
  enabled: true, // 是否启用埋点
  batchSize: 10, // 批量上报数量阈值
  reportInterval: 5000, // 定时上报间隔（毫秒）
  autoPageView: false, // 是否自动追踪页面访问（建议手动控制）
  getUserId: () => {
    // 从sessionStorage获取用户ID
    try {
      const store = JSON.parse(sessionStorage.getItem('storeVuex') || '{}')
      return store.user?.userInfo?.id
    } catch {
      return undefined
    }
  }
})
```

### 3. 在页面组件中使用

#### 追踪页面访问

在页面组件的 `setup` 中：

```vue
<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { useTracker } from 'com-tracker'

const tracker = useTracker()

onMounted(() => {
  // 追踪页面访问
  tracker.trackPageView('/your-path', '页面标题')
})

onUnmounted(() => {
  // 追踪页面离开（会自动计算停留时长）
  tracker.trackPageLeave()
})
</script>
```

#### 追踪对话问答

在发送消息的地方：

```typescript
import { useTracker } from 'com-tracker'

const tracker = useTracker()

const handleSend = (question: string, config: any) => {
  // 追踪对话问答
  tracker.trackChatQA(question, {
    model: config.model?.label,
    onlineSearch: config.onlineSearch,
    fileCount: config.files?.length || 0,
    hasAgent: !!config.agent,
    questionLength: question.length
  })
  
  // 执行实际的发送逻辑
  // ...
}
```

#### 追踪自定义事件

```typescript
// 追踪点击事件
tracker.track('click', '按钮点击', {
  buttonName: '发送按钮',
  position: 'footer',
  timestamp: Date.now()
})

// 追踪任意自定义事件
tracker.track('custom', '事件名称', {
  // 自定义数据
  key1: 'value1',
  key2: 'value2'
})
```

### 4. TypeScript类型支持

如果使用TypeScript，需要在应用的 `tsconfig.json` 或全局类型声明文件中添加：

```typescript
import { Tracker } from 'com-tracker'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $tracker: Tracker
  }
}
```

这样就可以在Options API中使用 `this.$tracker`。

## 完整示例

### agent-base 应用集成示例

#### 1. package.json

```json
{
  "dependencies": {
    "com-tracker": "workspace:^"
  }
}
```

#### 2. main.ts

```typescript
import { TrackerPlugin } from 'com-tracker'

// ... 其他代码

instance.use(TrackerPlugin, {
  appId: 'agent-base',
  reportUrl: '/api/track/report',
  enabled: true,
  batchSize: 10,
  reportInterval: 5000,
  autoPageView: false,
  getUserId: () => {
    try {
      const store = JSON.parse(sessionStorage.getItem('storeVuex') || '{}')
      return store.user?.userInfo?.id
    } catch {
      return undefined
    }
  }
})
```

#### 3. 首页组件 (desktop/index.vue)

```vue
<script lang="ts" setup>
import { onMounted, onUnmounted } from 'vue'
import { useTracker } from 'com-tracker'

const tracker = useTracker()

onMounted(() => {
  // 追踪首页访问
  tracker.trackPageView('/desktop', 'AI工作台-首页')
})

onUnmounted(() => {
  // 追踪页面离开
  tracker.trackPageLeave()
})
</script>
```

#### 4. 对话组件 (chat-view/new-chat.vue)

```vue
<script setup lang="ts">
import { useTracker } from 'com-tracker'

const tracker = useTracker()

const inputData = reactive({
  send: (val: string, config: any) => {
    // 追踪对话问答
    tracker.trackChatQA(val, {
      model: config.model?.label,
      onlineSearch: config.onlineSearch,
      fileCount: config.files?.length || 0,
      hasAgent: !!config.agent,
      questionLength: val.length
    })
    
    // 执行发送逻辑
    emit('send', val, config)
  }
})
</script>
```

## 高级配置

### 配置钩子函数

```typescript
instance.use(TrackerPlugin, {
  appId: 'your-app-id',
  reportUrl: '/api/track/report',
  
  // 上报前钩子 - 可以修改或过滤事件
  beforeReport: (events) => {
    // 添加公共参数
    return events.map(event => ({
      ...event,
      appVersion: '1.0.0',
      environment: process.env.NODE_ENV
    }))
  },
  
  // 上报成功钩子
  onReportSuccess: (events) => {
    console.log(`成功上报 ${events.length} 条数据`)
  },
  
  // 上报失败钩子
  onReportError: (error, events) => {
    console.error('上报失败:', error)
    // 可以在这里实现自定义的失败处理逻辑
    // 比如存储到本地，等待下次重试
  }
})
```

### 配置请求头

```typescript
instance.use(TrackerPlugin, {
  appId: 'your-app-id',
  reportUrl: '/api/track/report',
  
  // 添加自定义请求头
  headers: {
    'Authorization': 'Bearer your-token',
    'X-Custom-Header': 'custom-value'
  }
})
```

### 环境配置

建议根据不同环境配置不同的参数：

```typescript
const trackerConfig = {
  appId: 'your-app-id',
  reportUrl: process.env.NODE_ENV === 'production' 
    ? 'https://api.example.com/track' 
    : '/api/track/report',
  enabled: process.env.NODE_ENV === 'production', // 只在生产环境启用
  batchSize: process.env.NODE_ENV === 'production' ? 10 : 1, // 开发环境立即上报
  reportInterval: 5000
}

instance.use(TrackerPlugin, trackerConfig)
```

## 数据格式

SDK上报的数据格式如下：

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
        "question": "你好",
        "questionLength": 2,
        "model": "GPT-4",
        "onlineSearch": false,
        "fileCount": 0
      }
    }
  ]
}
```

## 后端接口规范

后端需要提供一个接收埋点数据的接口：

```
POST /api/track/report
Content-Type: application/json

请求体：参考上面的数据格式
响应：
{
  "code": 0,
  "message": "success"
}
```

## 常见问题

### 1. 如何在非Vue组件中使用？

如果需要在非Vue组件（如工具函数、Service等）中使用，可以直接导入并使用Tracker实例：

```typescript
import { Tracker } from 'com-tracker'

// 创建全局实例（建议在main.ts中创建并导出）
export const tracker = new Tracker({
  appId: 'your-app-id',
  reportUrl: '/api/track/report'
})

tracker.init()

// 在任何地方使用
tracker.trackPageView('/path', 'title')
```

### 2. 如何禁用埋点？

可以通过配置 `enabled: false` 来禁用：

```typescript
instance.use(TrackerPlugin, {
  appId: 'your-app-id',
  reportUrl: '/api/track/report',
  enabled: false // 禁用埋点
})
```

### 3. 数据什么时候上报？

数据会在以下情况下上报：
- 事件队列达到 `batchSize` 数量时
- 定时器到达 `reportInterval` 时间时
- 页面隐藏或关闭时（使用 sendBeacon）
- 手动调用 `tracker.report()` 时

### 4. 如何查看埋点数据？

在开发环境中，SDK会在控制台输出日志：

```
[Tracker] 埋点SDK初始化完成 {appId: "agent-base", sessionId: "..."}
[Tracker] 数据上报成功 2 条
```

可以通过浏览器的Network面板查看上报的请求。

## 注意事项

1. **用户隐私**：确保遵守相关隐私法规，不要收集敏感信息
2. **性能影响**：合理配置 `batchSize` 和 `reportInterval`，避免频繁请求
3. **数据准确性**：确保在关键节点正确调用埋点方法
4. **错误处理**：建议配置 `onReportError` 钩子处理上报失败的情况
5. **测试验证**：在上线前充分测试埋点功能是否正常工作

## 更新日志

### v1.0.0 (2025-11-20)
- 首次发布
- 支持页面访问、对话问答等埋点
- 支持批量上报和失败重试
- 提供Vue3插件

