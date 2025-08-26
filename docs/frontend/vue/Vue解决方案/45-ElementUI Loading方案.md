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



上述版本在多个请求并发时会出现闪烁现象

### 优化版本

```ts
import { ElLoading, type LoadingOptions } from 'element-plus'
import type { LoadingInstance } from 'element-plus/es/components/loading/src/loading.mjs'

interface LoadingController {
    close: () => void
    wrap: <T>(promise: Promise<T>) => Promise<T>
}

// 追踪当前活跃的加载请求数量
let loadingCount = 0
// 全局的加载实例，只在需要时创建和销毁
let loadingInstance: LoadingInstance | null = null

/**
 * 启动加载提示。如果已有加载提示，则增加计数；如果这是第一个加载，则创建新的加载实例。
 * @param options LoadingOptions 配置项
 * @returns LoadingController 包含关闭方法和包装 Promise 的方法
 */
export function startLoading(options: Partial<LoadingOptions> = {}): LoadingController {
    // 增加活跃加载请求的计数
    loadingCount++

    // 如果这是第一个加载请求，则创建加载实例
    if (loadingCount === 1) {
        try {
            loadingInstance = ElLoading.service({
                lock: true,
                text: '加载中...',
                background: 'rgba(0, 0, 0, 0.7)',
                ...options
            })
        } catch (error) {
            console.error('Failed to start loading:', error)
            // 如果启动加载失败，确保计数器回退，并返回一个空的控制器
            loadingCount--
            loadingInstance = null
            return {
                close: () => {},
                wrap: async <T>(promise: Promise<T>): Promise<T> => promise
            }
        }
    }

    // 定义关闭逻辑，无论是手动关闭还是通过 wrap 完成
    const closeLoading = () => {
        // 只有当加载实例存在且计数大于0时才执行关闭逻辑
        if (loadingInstance && loadingCount > 0) {
            loadingCount--
            // 如果所有活跃请求都已完成，则关闭加载实例
            if (loadingCount === 0) {
                loadingInstance.close()
                loadingInstance = null
            }
        }
    }

    return {
        close: closeLoading,
        wrap: async <T>(promise: Promise<T>): Promise<T> => {
            try {
                return await promise
            } finally {
                closeLoading()
            }
        }
    }
}
```

优化内容：

1. **避免闪烁和提前关闭:** 通过 loadingCount 计数器，确保 ElLoading 实例只在第一个请求开始时创建，并在所有请求都完成后才关闭。这样，无论有多少个并发的异步操作，用户都只会看到一个持续的加载动画，直到所有操作完成。
2. **并发请求管理:** 多个 startLoading 调用不会互相干扰，每个调用都会增加计数器，并共享同一个 ElLoading 实例。
3. **健壮性:** 在 ElLoading.service 启动失败时，loadingCount 会回退，避免后续逻辑出现错误。