## 使用AbortController中止请求

```tsx
const abortController = new AbortController();
const { signal } = abortController;

const getNumber = async () => {
    const number = await useNumber(signal);
    setNumber(number);
};
useEffect(() => {
    getNumber();
    return () => abortController.abort()
}, []);
```

```ts
export const useNumber = async (signal?: AbortSignal) => {
    const response = await fetch("http://127.0.0.1:3000/test/getNumber", {
        signal,
    });
    if (!response.ok) {
        throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data.number
};
```



### 封装AbortController

```ts
import { useEffect } from "react";

export const useAbortController = () => {
    const abortController = new AbortController();
    const { signal } = abortController;

    useEffect(() => () => abortController.abort(), []);
    return {
        signal,
    };
};
```

在组件中使用,只需将signal传递给对应接口即可

```tsx
const { signal } = useAbortController();
```



进一步优化

## useAbortRequest

```ts
export const useAbortRequest = <T>(asyncFunction: (signal: AbortSignal) => Promise<T>) => {
    const [data, setData] = useState<T | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState<boolean>(true)

    const run = () => {
        const controller = new AbortController()
        const { signal } = controller

        setLoading(true)

        asyncFunction(signal).then((res) => {
            setData(res)
            setError(null)
        }).catch((err) => {
            if (err.name !== 'AbortError') {
                setError(err.message)
            }
        }).finally(() => {
            setLoading(false)
        })
        return () => controller.abort() // 返回一个中止函数
    }
    return { data, error, loading, run }
}
```

在组件中使用

```tsx
const About1: React.FC = () => {
    const { data, error, loading, run } = useAbortRequest(useNumber);
    console.log("data: ", data, loading, error);

    useEffect(() => {
        const abort = run();
        return () => {
            abort();
        };
    }, []);
		// ...
};
```







使用useCallback优化

```ts
export const useAbortRequest = <T>(asyncFunction: (signal: AbortSignal) => Promise<T>) => {
    const [data, setData] = useState<T | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState<boolean>(true)


    const run = useCallback(() => {
        const controller = new AbortController()
        const { signal } = controller

        setLoading(true)

        asyncFunction(signal).then((res) => {
            setData(res)
            setError(null)
        }).catch((err) => {
            if (err.name !== 'AbortError') {
                setError(err.message)
            }
        }).finally(() => {
            setLoading(false)
        })
        return () => controller.abort() // 返回一个中止函数
    }, [asyncFunction])
    return { data, error, loading, run }
}
```



### 使用AbortController 避免内存泄漏

会导致内存泄漏的操作有哪些：

- 闭包
- 无效请求



### return () => controller.abort() 和 return () => { return controller.abort() }

这两个不能等同理解

**`return () => controller.abort()`**:

- 这是箭头函数的简写形式，等效于返回一个函数，在这个函数体内直接**调用**了 `controller.abort()`，并**立即执行** `controller.abort()` 的操作。
- 它不是返回 `controller.abort()` 的**引用**，而是调用 `abort()` 函数并执行其副作用。

**`return () => { return controller.abort(); }`**

- **写法**：这是箭头函数的完整形式，使用大括号 `{}` 来包裹函数体。
- **行为**：返回一个箭头函数，该函数在其函数体内执行 `controller.abort()`，并显式地使用 `return` 返回 `controller.abort()` 的结果（通常是 `undefined`）。



## AbortController取消请求的三种封装方式

### 第一种：自定义hooks

封装自定义hooks，hooks方式即上面第一种useAbortRequest

### 第二种：工厂函数

封装一个axios工厂函数

```ts
const service = axios.create({
    baseURL: '/proxyApi',
    timeout: 20000
})

export const axiosRequestWithAbort = <T>(
    options: AxiosRequestConfig = {}
): { request: Promise<T>; controller: AbortController } => {
    const controller = new AbortController()
    const signal = controller.signal

    const config: AxiosRequestConfig = { ...options, signal }
    const request = service(config)
    return { request, controller }
}

// 使用
export const getNumberAbort = () =>
axiosRequestWithAbort<{ number: number }>({
    url: '/test/getNumber',
    method: 'get'
})

useEffect(() => {
    const { request, controller } = getNumberAbort()
    const fetchData = async () => {
        const data = await request
        if (data?.number) {
            setNumber(data.number)
        }
    }
    fetchData()
    return () => {
        controller.abort()
    }
})
```



### 第三种：为所有请求都创建一个AbortController

```ts
service.interceptors.request.use(
    (config) => {
        // 请求拦截器，添加 AbortController,
        // 保存当前请求的 controller，key 可以用请求 URL 等唯一标识
        const controller = new AbortController()
        config.signal = controller.signal

        if (config.url) {
            controllers.set(config.url, controller)
        }
        
        return config
    },
    (error) => Promise.reject(error)
)

// 响应拦截器，移除已完成请求的 AbortController
service.interceptors.response.use(
    (response) => {
        if (response.config.url) {
            controllers.delete(response.config.url)
        }
        if (response.status === 200) {
            return response.data
        }
    },
    (err) => {
        Promise.reject(err).catch((err) => {
            // 如果请求被取消了
            if (axios.isCancel(err)) {
                console.log('Request canceled', err.message)
            } else console.error('Request failed', err)
        })
    }
)

export function abortRequest(url: string) {
    const controller = controllers.get(url)
    if (controller) {
        controller.abort()
        controllers.delete(url)
    }
}
```

需要取消请求时，只需调用abortRequest即可

优化：当同时发起相同的请求，而query参数不同时

Map的key需要设置成唯一

```ts
service.interceptors.request.use(
    (config) => {
        // 请求拦截器，添加 AbortController,
        // 保存当前请求的 controller，key 可以用请求 URL 等唯一标识
        const controller = new AbortController()
        config.signal = controller.signal
        let key = config.url
        if (config.params) {
            key = `${config.url}?${qs.stringify(config.params)}`
        }
        if (key && controllers.has(key)) {
            controllers.get(key)?.abort()
        }
        if (key) {
            controllers.set(key, controller)
        }

        const store = useUserStore.getState()
        console.log('store: ', store.username)

        return config
    },
    (error) => Promise.reject(error)
)
```

