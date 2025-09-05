# 给sessionStorage操作加上防抖

```ts
import { useDebounceFn, useThrottleFn } from '@vueuse/core'
import { onBeforeUnmount } from 'vue'

export interface StorageOptimizerOptions {
  /** 防抖延迟时间（毫秒） */
  debounceDelay?: number
  /** 节流延迟时间（毫秒） */
  throttleDelay?: number
  /** 批量更新延迟时间（毫秒） */
  batchDelay?: number
  /** 存储方式：'sessionStorage' | 'localStorage' */
  storageType?: 'sessionStorage' | 'localStorage'
}

export type OptimizeStrategy = 'debounce' | 'throttle' | 'batch'

/**
 * 优化的存储管理器
 * 提供多种性能优化方案来避免频繁的存储操作
 */
export function useOptimizedStorage(options: StorageOptimizerOptions = {}) {
  const {
    debounceDelay = 500,
    throttleDelay = 200,
    batchDelay = 300,
    storageType = 'sessionStorage'
  } = options

  const storage = storageType === 'localStorage' ? localStorage : sessionStorage

  // 防抖存储函数
  const debouncedSetItem = useDebounceFn((key: string, value: string) => {
    storage.setItem(key, value)
  }, debounceDelay)

  // 节流存储函数
  const throttledSetItem = useThrottleFn((key: string, value: string) => {
    storage.setItem(key, value)
  }, throttleDelay)

  // 批量更新管理器
  const batchUpdateManager = {
    pendingUpdates: new Map<string, string>(),
    updateTimer: null as NodeJS.Timeout | null,
    
    scheduleUpdate(key: string, value: string) {
      this.pendingUpdates.set(key, value)
      
      if (this.updateTimer) {
        clearTimeout(this.updateTimer)
      }
      
      this.updateTimer = setTimeout(() => {
        this.flushUpdates()
      }, batchDelay)
    },
    
    flushUpdates() {
      this.pendingUpdates.forEach((value, key) => {
        storage.setItem(key, value)
      })
      this.pendingUpdates.clear()
      this.updateTimer = null
    }
  }

  // 策略映射
  const strategies = {
    debounce: debouncedSetItem,
    throttle: throttledSetItem,
    batch: (key: string, value: string) => batchUpdateManager.scheduleUpdate(key, value)
  }

  /**
   * 优化的存储设置函数
   * @param key 存储键
   * @param value 存储值
   * @param strategy 优化策略
   */
  const setItem = (key: string, value: string, strategy: OptimizeStrategy = 'debounce') => {
    const strategyFn = strategies[strategy]
    if (strategyFn) {
      strategyFn(key, value)
    } else {
      // 降级到直接存储
      storage.setItem(key, value)
    }
  }

  /**
   * 获取存储值
   * @param key 存储键
   * @param defaultValue 默认值
   */
  const getItem = (key: string, defaultValue: string = '') => {
    return storage.getItem(key) || defaultValue
  }

  /**
   * 移除存储项
   * @param key 存储键
   */
  const removeItem = (key: string) => {
    storage.removeItem(key)
  }

  /**
   * 清空所有存储
   */
  const clear = () => {
    storage.clear()
  }

  /**
   * 强制刷新批量更新
   */
  const flushBatchUpdates = () => {
    batchUpdateManager.flushUpdates()
  }

  // 组件卸载时清理资源
  onBeforeUnmount(() => {
    if (batchUpdateManager.updateTimer) {
      clearTimeout(batchUpdateManager.updateTimer)
      batchUpdateManager.flushUpdates()
    }
  })

  return {
    setItem,
    getItem,
    removeItem,
    clear,
    flushBatchUpdates,
    // 暴露原始策略函数，以便高级用法
    debouncedSetItem,
    throttledSetItem,
    batchUpdateManager
  }
}
```

# WebSocket 存储性能优化方案

## 问题分析

在 WebSocket 的 `onMessage` 回调中频繁调用 `sessionStorage.setItem` 会导致以下性能问题：

1. **频繁的同步操作**：每次消息到达都会触发同步存储操作，阻塞主线程
2. **大量数据写入**：随着数据增长，每次写入的数据量也会增加
3. **不必要的重复写入**：短时间内多次写入相同或相似的数据

## 解决方案

### 方案1：防抖优化（推荐）

```typescript
import { useDebounceFn } from '@vueuse/core'

// 防抖存储函数
const debouncedSetSessionStorage = useDebounceFn((key: string, value: string) => {
  sessionStorage.setItem(key, value)
}, 500) // 500ms防抖

// 在 WebSocket onMessage 中使用
onMessage(ws, event) {
  const receiveData = JSON.parse(data.value)
  if (receiveData?.payload?.output?.payload?.text) {
    optimizePrompt.value += receiveData.payload.output.payload.text
    debouncedSetSessionStorage('optimizePrompt', optimizePrompt.value)
  }
}
```

**优点**：平衡性能和实时性，避免频繁写入
**缺点**：可能有轻微延迟

### 方案2：节流优化

```typescript
import { useThrottleFn } from '@vueuse/core'

// 节流存储函数
const throttledSetSessionStorage = useThrottleFn((key: string, value: string) => {
  sessionStorage.setItem(key, value)
}, 200) // 200ms节流

// 在 WebSocket onMessage 中使用
onMessage(ws, event) {
  const receiveData = JSON.parse(data.value)
  if (receiveData?.payload?.output?.payload?.text) {
    optimizePrompt.value += receiveData.payload.output.payload.text
    throttledSetSessionStorage('optimizePrompt', optimizePrompt.value)
  }
}
```

**优点**：实时性更好，保证定期更新
**缺点**：性能消耗稍高

### 方案3：批量更新优化

```typescript
// 批量更新管理器
const batchUpdateManager = {
  pendingUpdates: new Map<string, string>(),
  updateTimer: null as NodeJS.Timeout | null,
  
  scheduleUpdate(key: string, value: string) {
    this.pendingUpdates.set(key, value)
    
    if (this.updateTimer) {
      clearTimeout(this.updateTimer)
    }
    
    this.updateTimer = setTimeout(() => {
      this.flushUpdates()
    }, 300)
  },
  
  flushUpdates() {
    this.pendingUpdates.forEach((value, key) => {
      sessionStorage.setItem(key, value)
    })
    this.pendingUpdates.clear()
    this.updateTimer = null
  }
}

// 在 WebSocket onMessage 中使用
onMessage(ws, event) {
  const receiveData = JSON.parse(data.value)
  if (receiveData?.payload?.output?.payload?.text) {
    optimizePrompt.value += receiveData.payload.output.payload.text
    batchUpdateManager.scheduleUpdate('optimizePrompt', optimizePrompt.value)
  }
}
```

**优点**：性能最优，减少存储操作次数
**缺点**：实时性稍差

## 推荐的可复用 Hook

我们创建了一个可复用的 `useOptimizedStorage` hook，支持多种优化策略：

```typescript
import { useOptimizedStorage } from '@/hooks/useOptimizedStorage'

// 使用优化的存储管理器
const { setItem, getItem } = useOptimizedStorage({
  debounceDelay: 500,
  storageType: 'sessionStorage'
})

// 在 WebSocket onMessage 中使用
onMessage(ws, event) {
  const receiveData = JSON.parse(data.value)
  if (receiveData?.payload?.output?.payload?.text) {
    optimizePrompt.value += receiveData.payload.output.payload.text
    setItem('optimizePrompt', optimizePrompt.value, 'debounce')
  }
}
```

## 性能对比

| 方案 | 性能消耗 | 实时性 | 推荐场景 |
|------|----------|--------|----------|
| 直接存储 | 高 | 最高 | 数据量小，实时性要求极高 |
| 防抖 | 低 | 中等 | 一般场景（推荐） |
| 节流 | 中 | 高 | 实时性要求较高 |
| 批量更新 | 最低 | 低 | 数据量大，性能要求高 |

## 最佳实践

1. **默认使用防抖方案**：平衡性能和实时性
2. **根据数据量选择策略**：小数据量可用节流，大数据量用批量更新
3. **组件卸载时清理资源**：避免内存泄漏
4. **监控性能指标**：根据实际情况调整延迟时间