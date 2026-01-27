# 埋点SDK使用示例

## 场景1：追踪页面访问和停留时长

```vue
<template>
  <div class="page-container">
    <!-- 页面内容 -->
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { useTracker } from 'com-tracker'

const tracker = useTracker()

onMounted(() => {
  // 页面加载时追踪访问
  tracker.trackPageView('/user/profile', '用户资料页')
})

onUnmounted(() => {
  // 页面卸载时追踪离开（自动计算停留时长）
  tracker.trackPageLeave()
})
</script>
```

## 场景2：追踪对话问答（AI工作台）

```vue
<template>
  <div class="chat-container">
    <TTalkInput 
      @send="handleSend"
      :modelList="modelList"
      :isOpenOnline="true"
      :isOpenFileUpload="true"
    />
  </div>
</template>

<script setup lang="ts">
import { useTracker } from 'com-tracker'
import { TTalkInput } from 'com-components'

const tracker = useTracker()

const handleSend = (question: string, config: any) => {
  // 追踪对话问答
  tracker.trackChatQA(question, {
    model: config.model?.label || config.model?.value,
    modelType: config.model?.type,
    onlineSearch: config.onlineSearch,
    fileCount: config.files?.length || 0,
    hasAgent: !!config.agent,
    agentId: config.agent?.id,
    hasVariables: !!config.variables,
    questionLength: question.length,
    timestamp: Date.now()
  })
  
  // 执行实际的发送逻辑
  sendMessage(question, config)
}
</script>
```

## 场景3：追踪按钮点击

```vue
<template>
  <div>
    <el-button @click="handleExport">导出数据</el-button>
    <el-button @click="handleDelete">删除</el-button>
    <el-button @click="handleShare">分享</el-button>
  </div>
</template>

<script setup lang="ts">
import { useTracker } from 'com-tracker'

const tracker = useTracker()

const handleExport = () => {
  tracker.track('click', '导出按钮点击', {
    buttonName: '导出数据',
    page: '数据列表页',
    position: 'toolbar'
  })
  
  // 执行导出逻辑
  exportData()
}

const handleDelete = () => {
  tracker.track('click', '删除按钮点击', {
    buttonName: '删除',
    page: '数据列表页',
    itemCount: selectedItems.value.length
  })
  
  deleteItems()
}

const handleShare = () => {
  tracker.track('click', '分享按钮点击', {
    buttonName: '分享',
    shareType: 'link',
    page: '详情页'
  })
  
  shareContent()
}
</script>
```

## 场景4：追踪表单提交

```vue
<template>
  <el-form @submit="handleSubmit">
    <el-form-item label="姓名">
      <el-input v-model="form.name" />
    </el-form-item>
    <el-form-item label="邮箱">
      <el-input v-model="form.email" />
    </el-form-item>
    <el-button type="primary" native-type="submit">提交</el-button>
  </el-form>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { useTracker } from 'com-tracker'

const tracker = useTracker()

const form = reactive({
  name: '',
  email: ''
})

const handleSubmit = async () => {
  const startTime = Date.now()
  
  try {
    await submitForm(form)
    
    // 追踪成功提交
    tracker.track('custom', '表单提交成功', {
      formType: '用户信息表单',
      duration: Date.now() - startTime,
      fieldCount: Object.keys(form).length
    })
  } catch (error) {
    // 追踪提交失败
    tracker.track('custom', '表单提交失败', {
      formType: '用户信息表单',
      error: error.message,
      duration: Date.now() - startTime
    })
  }
}
</script>
```

## 场景5：追踪文件上传

```vue
<template>
  <el-upload
    :on-success="handleUploadSuccess"
    :on-error="handleUploadError"
    :before-upload="handleBeforeUpload"
  >
    <el-button>点击上传</el-button>
  </el-upload>
</template>

<script setup lang="ts">
import { useTracker } from 'com-tracker'

const tracker = useTracker()

const handleBeforeUpload = (file: File) => {
  tracker.track('custom', '开始上传文件', {
    fileName: file.name,
    fileSize: file.size,
    fileType: file.type,
    page: '文档管理页'
  })
}

const handleUploadSuccess = (response: any, file: File) => {
  tracker.track('custom', '文件上传成功', {
    fileName: file.name,
    fileSize: file.size,
    fileId: response.fileId,
    duration: response.duration
  })
}

const handleUploadError = (error: Error, file: File) => {
  tracker.track('custom', '文件上传失败', {
    fileName: file.name,
    fileSize: file.size,
    error: error.message
  })
}
</script>
```

## 场景6：追踪搜索行为

```vue
<template>
  <el-input
    v-model="searchKeyword"
    placeholder="搜索..."
    @keyup.enter="handleSearch"
  >
    <template #append>
      <el-button @click="handleSearch">搜索</el-button>
    </template>
  </el-input>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useTracker } from 'com-tracker'

const tracker = useTracker()
const searchKeyword = ref('')

const handleSearch = async () => {
  const startTime = Date.now()
  
  tracker.track('custom', '执行搜索', {
    keyword: searchKeyword.value,
    keywordLength: searchKeyword.value.length,
    page: '搜索页'
  })
  
  const results = await search(searchKeyword.value)
  
  tracker.track('custom', '搜索完成', {
    keyword: searchKeyword.value,
    resultCount: results.length,
    duration: Date.now() - startTime,
    hasResults: results.length > 0
  })
}
</script>
```

## 场景7：追踪智能体使用

```vue
<template>
  <div class="agent-selector">
    <AgentCard
      v-for="agent in agents"
      :key="agent.id"
      :agent="agent"
      @click="selectAgent(agent)"
    />
  </div>
</template>

<script setup lang="ts">
import { useTracker } from 'com-tracker'

const tracker = useTracker()

const selectAgent = (agent: any) => {
  tracker.track('custom', '选择智能体', {
    agentId: agent.id,
    agentName: agent.name,
    agentType: agent.type,
    hasVariables: (agent.variables?.length || 0) > 0,
    variableCount: agent.variables?.length || 0,
    page: 'AI工作台'
  })
  
  // 切换到选中的智能体
  currentAgent.value = agent
}

const sendWithAgent = (question: string) => {
  tracker.track('custom', '使用智能体对话', {
    agentId: currentAgent.value.id,
    agentName: currentAgent.value.name,
    question: question,
    questionLength: question.length
  })
  
  sendMessage(question)
}
</script>
```

## 场景8：追踪页面路由变化（Vue Router）

```typescript
// router/index.ts
import { createRouter } from 'vue-router'
import { Tracker } from 'com-tracker'

const router = createRouter({
  // ... 路由配置
})

// 创建tracker实例（在main.ts中导出）
import { tracker } from '@/main'

// 监听路由变化
router.beforeEach((to, from, next) => {
  // 如果是从其他页面离开，追踪页面离开
  if (from.name) {
    tracker.trackPageLeave()
  }
  next()
})

router.afterEach((to) => {
  // 追踪新页面访问
  tracker.trackPageView(to.path, to.meta.title as string || document.title)
})

export default router
```

## 场景9：追踪错误和异常

```typescript
// 全局错误处理
import { Tracker } from 'com-tracker'

const tracker = new Tracker({
  appId: 'your-app-id',
  reportUrl: '/api/track/report'
})

// Vue错误处理
app.config.errorHandler = (err, instance, info) => {
  tracker.track('custom', 'Vue错误', {
    error: err.message,
    stack: err.stack,
    info,
    component: instance?.$options?.name
  })
  
  console.error('Vue Error:', err)
}

// 全局未捕获错误
window.addEventListener('error', (event) => {
  tracker.track('custom', 'JavaScript错误', {
    message: event.message,
    filename: event.filename,
    lineno: event.lineno,
    colno: event.colno
  })
})

// Promise未捕获拒绝
window.addEventListener('unhandledrejection', (event) => {
  tracker.track('custom', 'Promise拒绝', {
    reason: event.reason,
    promise: String(event.promise)
  })
})
```

## 场景10：追踪性能指标

```typescript
import { useTracker } from 'com-tracker'
import { onMounted } from 'vue'

const tracker = useTracker()

onMounted(() => {
  // 等待页面完全加载
  window.addEventListener('load', () => {
    const perfData = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
    
    tracker.track('custom', '页面性能指标', {
      // DNS查询时间
      dnsTime: perfData.domainLookupEnd - perfData.domainLookupStart,
      // TCP连接时间
      tcpTime: perfData.connectEnd - perfData.connectStart,
      // 请求时间
      requestTime: perfData.responseStart - perfData.requestStart,
      // 响应时间
      responseTime: perfData.responseEnd - perfData.responseStart,
      // DOM解析时间
      domParseTime: perfData.domComplete - perfData.domInteractive,
      // 页面加载完成时间
      loadTime: perfData.loadEventEnd - perfData.fetchStart,
      // 首次内容绘制
      fcp: getFCP(),
      // 最大内容绘制
      lcp: getLCP()
    })
  })
})

function getFCP() {
  const entries = performance.getEntriesByType('paint')
  const fcpEntry = entries.find(entry => entry.name === 'first-contentful-paint')
  return fcpEntry ? fcpEntry.startTime : 0
}

function getLCP() {
  return new Promise(resolve => {
    new PerformanceObserver((list) => {
      const entries = list.getEntries()
      const lastEntry = entries[entries.length - 1]
      resolve(lastEntry.startTime)
    }).observe({ entryTypes: ['largest-contentful-paint'] })
  })
}
```

## 场景11：在非Vue组件中使用

```typescript
// utils/api.ts
import { tracker } from '@/main'

export async function fetchData(url: string) {
  const startTime = Date.now()
  
  try {
    const response = await fetch(url)
    const data = await response.json()
    
    // 追踪API调用成功
    tracker.track('custom', 'API调用成功', {
      url,
      method: 'GET',
      status: response.status,
      duration: Date.now() - startTime,
      dataSize: JSON.stringify(data).length
    })
    
    return data
  } catch (error) {
    // 追踪API调用失败
    tracker.track('custom', 'API调用失败', {
      url,
      method: 'GET',
      error: error.message,
      duration: Date.now() - startTime
    })
    
    throw error
  }
}
```

## 场景12：批量追踪用户行为流

```typescript
import { useTracker } from 'com-tracker'

const tracker = useTracker()

// 用户行为流追踪
const trackUserFlow = () => {
  // 1. 进入页面
  tracker.trackPageView('/product/list', '产品列表')
  
  // 2. 搜索商品
  tracker.track('custom', '搜索商品', {
    keyword: 'iPhone',
    resultCount: 10
  })
  
  // 3. 点击商品
  tracker.track('click', '点击商品', {
    productId: '12345',
    productName: 'iPhone 15',
    position: 1
  })
  
  // 4. 查看详情
  tracker.trackPageView('/product/12345', 'iPhone 15 - 产品详情')
  
  // 5. 加入购物车
  tracker.track('custom', '加入购物车', {
    productId: '12345',
    quantity: 1,
    price: 5999
  })
}
```

## 最佳实践

### 1. 统一事件命名规范

```typescript
// 建议的命名规范
const EventNames = {
  // 页面相关
  PAGE_VIEW: '页面访问',
  PAGE_LEAVE: '页面离开',
  
  // 用户操作
  BUTTON_CLICK: '按钮点击',
  LINK_CLICK: '链接点击',
  FORM_SUBMIT: '表单提交',
  
  // 业务相关
  CHAT_QA: '对话问答',
  FILE_UPLOAD: '文件上传',
  AGENT_SELECT: '选择智能体',
  
  // 错误相关
  ERROR_OCCURRED: '错误发生',
  API_ERROR: 'API错误'
}

// 使用
tracker.track('click', EventNames.BUTTON_CLICK, { /* ... */ })
```

### 2. 封装通用追踪函数

```typescript
// composables/useTracking.ts
import { useTracker } from 'com-tracker'

export function useTracking() {
  const tracker = useTracker()
  
  // 追踪按钮点击
  const trackButtonClick = (buttonName: string, extra?: Record<string, any>) => {
    tracker.track('click', '按钮点击', {
      buttonName,
      page: window.location.pathname,
      ...extra
    })
  }
  
  // 追踪API调用
  const trackApiCall = (url: string, method: string, duration: number, success: boolean) => {
    tracker.track('custom', success ? 'API调用成功' : 'API调用失败', {
      url,
      method,
      duration,
      success
    })
  }
  
  return {
    trackButtonClick,
    trackApiCall
  }
}

// 使用
const { trackButtonClick } = useTracking()
trackButtonClick('提交按钮', { formType: '用户表单' })
```

### 3. 使用TypeScript类型约束

```typescript
// types/tracking.ts
export interface ButtonClickData {
  buttonName: string
  page: string
  position?: string
}

export interface ChatQAData {
  question: string
  questionLength: number
  model?: string
  onlineSearch?: boolean
  fileCount?: number
}

// 使用
const trackButtonClick = (data: ButtonClickData) => {
  tracker.track('click', '按钮点击', data)
}
```

