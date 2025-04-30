## 在Vue中使用TanStack Query

```sh
pnpm add @tanstack/vue-query
```

main.ts中注册

```ts
import { QueryClient, VueQueryPlugin } from '@tanstack/vue-query'
const queryClient = new QueryClient()
app.use(VueQueryPlugin, { queryClient })
```



## 在beforeEnter中使用queryClient.fetchQuery

```ts
{
    path: 'about',
        component: () => import('@/pages/About/About.vue'),
            beforeEnter: (to, from, next) => {
                // const { number, name, abortController } = useFetchData()
                const { number, name, abortController } = useFetchDataQueryClient()
                to.meta.number = number
                to.meta.name = name
                to.meta.abortController = abortController

                to.meta.pieData = useFetchPieData()
                next()
            }
}
```

```vue
<script setup lang="ts">
const route = useRoute()

const number = ref(route.meta.number)
const name = ref(route.meta.name)
const pieData = ref(route.meta.pieData)

const abortController = route.meta.abortController

onBeforeUnmount(() => {
    abortController.abort('请求取消')
})
</script>
```



## useQuery对比queryClient.fetchQuery

| 属性             | `useQuery`（组合式）                      | `queryClient.fetchQuery`（命令式）      |
| ---------------- | ----------------------------------------- | --------------------------------------- |
| 用途             | 在 **组件内** 获取并响应式使用数据        | 在 **组件外** 获取数据（如路由守卫等）  |
| 返回值           | 响应式对象（包含 data, isLoading, error） | 一个 **Promise**，可用 `await` 获取结果 |
| 是否自动管理状态 | ✅ 是                                      | ❌ 否，需自己处理 loading/error 等状态   |
| 是否写入缓存     | ✅ 是                                      | ✅ 是，结果会缓存，供 `useQuery` 复用    |
| 是否响应式       | ✅ 是（`ref`）                             | ❌ 否，普通 JS 值                        |
| 是否支持取消请求 | ✅ 是（自动传入 `signal`）                 | ✅ 是（需手动传入 `AbortSignal`）        |
| 是否自动重新请求 | ✅ 是（如窗口聚焦/网络恢复等）             | ❌ 否，一次请求                          |

**useQuery适用场景**

在组件中使用、需要响应式、状态驱动的情况

**queryClient.fetchQuery适用场景**

在组件外使用、需要用 Promise 的地方，例如：

- `router.beforeEnter`
- `setup()` 外部的初始化
- 需要预拉取数据（SSG/SSR）
- 想手动等待数据加载完成
