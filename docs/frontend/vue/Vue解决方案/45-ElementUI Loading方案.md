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



### 进阶优化

```ts
import { ElLoading, type LoadingOptions } from 'element-plus'
import type { LoadingInstance } from 'element-plus/es/components/loading/src/loading.mjs'

interface LoadingController {
    close: () => void
    wrap: <T>(promise: Promise<T>) => Promise<T>
    readonly isClosed: boolean
}

// 追踪当前活跃的加载请求数量
let loadingCount = 0
// 全局的加载实例，只在需要时创建和销毁
let loadingInstance: LoadingInstance | null = null
// 超时定时器
let timeoutTimer: ReturnType<typeof setTimeout> | null = null

// 默认配置
const DEFAULT_OPTIONS: Partial<LoadingOptions> = {
    lock: true,
    text: '加载中...',
    background: 'rgba(0, 0, 0, 0.7)'
}

// 默认超时时间（30秒），设置为 0 表示不启用超时
const DEFAULT_TIMEOUT = 30000

/**
 * 启动加载提示。如果已有加载提示，则增加计数；如果这是第一个加载，则创建新的加载实例。
 * @param options LoadingOptions 配置项
 * @param timeout 超时时间（毫秒），超时后自动关闭加载，设置为 0 表示不启用超时，默认 30 秒
 * @returns LoadingController 包含关闭方法和包装 Promise 的方法
 */
export function startLoading(
    options: Partial<LoadingOptions> = {},
    timeout: number = DEFAULT_TIMEOUT
): LoadingController {
    // 增加活跃加载请求的计数
    loadingCount++

    // 标记当前控制器是否已关闭
    let isClosed = false

    // 如果这是第一个加载请求，则创建加载实例
    if (loadingCount === 1) {
        try {
            loadingInstance = ElLoading.service({
                ...DEFAULT_OPTIONS,
                ...options
            })

            // 设置超时保护
            if (timeout > 0) {
                timeoutTimer = setTimeout(() => {
                    if (import.meta.env.DEV) {
                        console.warn(
                            `Loading timeout after ${timeout}ms. Force closing. Active count: ${loadingCount}`
                        )
                    }
                    forceCloseLoading()
                }, timeout)
            }

            // 开发模式下，检测潜在的内存泄漏
            if (import.meta.env.DEV) {
                setTimeout(() => {
                    if (loadingCount > 10) {
                        console.warn(
                            `High loading count detected: ${loadingCount}. Possible memory leak or unclosed loading instances.`
                        )
                    }
                }, 1000)
            }
        } catch (error) {
            console.error('Failed to start loading:', error)
            // 如果启动加载失败，确保计数器回退，并返回一个空的控制器
            loadingCount--
            loadingInstance = null
            return {
                close: () => {},
                wrap: async <T>(promise: Promise<T>): Promise<T> => promise,
                isClosed: true
            }
        }
    }

    // 定义关闭逻辑，无论是手动关闭还是通过 wrap 完成
    const closeLoading = () => {
        // 防止重复关闭（幂等性保护）
        if (isClosed) {
            if (import.meta.env.DEV) {
                console.warn('Loading controller already closed. Ignoring duplicate close call.')
            }
            return
        }

        isClosed = true

        // 只有当加载实例存在且计数大于0时才执行关闭逻辑
        if (loadingInstance && loadingCount > 0) {
            loadingCount--
            // 如果所有活跃请求都已完成，则关闭加载实例
            if (loadingCount === 0) {
                clearTimeoutTimer()
                loadingInstance.close()
                loadingInstance = null
            }
        }
    }

    return {
        close: closeLoading,
        wrap: async <T>(promise: Promise<T>): Promise<T> => {
            try {
                const result = await promise
                return result
            } catch (error) {
                // 保留原始错误，只在开发环境记录
                if (import.meta.env.DEV) {
                    console.error('Error in loading wrapped promise:', error)
                }
                throw error
            } finally {
                closeLoading()
            }
        },
        get isClosed() {
            return isClosed
        }
    }
}

/**
 * 强制关闭所有加载实例（用于超时或错误恢复）
 */
function forceCloseLoading() {
    clearTimeoutTimer()
    if (loadingInstance) {
        loadingInstance.close()
        loadingInstance = null
    }
    loadingCount = 0
}

/**
 * 清除超时定时器
 */
function clearTimeoutTimer() {
    if (timeoutTimer) {
        clearTimeout(timeoutTimer)
        timeoutTimer = null
    }
}

/**
 * 获取当前活跃的加载请求数量（用于调试）
 */
export function getLoadingCount(): number {
    return loadingCount
}

/**
 * 强制重置加载状态（仅在紧急情况下使用，如路由跳转时清理）
 */
export function resetLoading(): void {
    if (import.meta.env.DEV) {
        console.warn('Force resetting loading state')
    }
    forceCloseLoading()
}
```

优化内容：

1. 幂等性保护

- 添加 isClosed 标志，防止同一个控制器被多次关闭

- 在开发环境下会发出警告

2. 超时保护机制

- 默认 30 秒超时，防止加载动画永久显示

- 可通过参数自定义或禁用（设置为 0）

3. 内存泄漏检测

- 开发模式下，如果 loadingCount > 10 会发出警告

- 帮助开发者及时发现未关闭的加载实例

4. 更好的 API

- 添加 isClosed 只读属性，可查询控制器状态

- 新增 getLoadingCount() 用于调试

- 新增 resetLoading() 用于紧急情况（如路由跳转时强制清理）

## 使用

```ts
const { close, wrap } = startLoading()
```

