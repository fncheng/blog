## ElementPlus Loading方案

```ts
import { ElLoading, type LoadingOptions } from 'element-plus'
import type { LoadingInstance } from 'element-plus/es/components/loading/src/loading.mjs'

let currentLoading: LoadingInstance | null = null

export function startLoading(options: Partial<LoadingOptions> = {}) {
    if (currentLoading) {
        currentLoading.close()
        currentLoading = null
    }
    const loading = ElLoading.service({
        lock: true,
        text: '加载中...',
        background: 'rgba(0, 0, 0, 0.7)',
        ...options
    })
    currentLoading = loading

    return () => {
        loading.close()
        currentLoading = null
    }
}
```

使用全局变量 currentLoading 跟踪当前加载实例。

在创建新实例前关闭现有实例，避免单例冲突。

关闭时清理 currentLoading，保持状态一致。



```ts
import { ElLoading, type LoadingOptions } from 'element-plus'
import type { LoadingInstance } from 'element-plus/es/components/loading/src/loading.mjs'

interface LoadingController {
    close: () => void
    wrap: <T>(promise: Promise<T>) => Promise<T>
}

let currentLoading: LoadingInstance | null = null

export function startLoading(options: Partial<LoadingOptions> = {}): LoadingController {
    if (currentLoading) {
        currentLoading.close()
        currentLoading = null
    }
    let loading: LoadingInstance
    try {
        loading = ElLoading.service({
            lock: true,
            text: '加载中...',
            background: 'rgba(0, 0, 0, 0.7)',
            ...options
        })
        currentLoading = loading
    } catch (error) {
        console.error('Failed to start loading:', error)
        throw error
    }

    return {
        close: () => {
            loading.close()
            currentLoading = null
        },
        wrap: async <T>(promise: Promise<T>): Promise<T> => {
            try {
                return await promise
            } finally {
                loading.close()
                currentLoading = null
            }
        }
    }
}
```

- 定义 LoadingController 接口，明确返回值结构。

- 返回一个对象，包含 close 方法（手动关闭）和 wrap 方法（包装异步操作）。
- wrap 方法自动在 Promise 结束（无论成功或失败）时关闭加载。

- 使用泛型 \<T> 支持 wrap 方法的类型推断。