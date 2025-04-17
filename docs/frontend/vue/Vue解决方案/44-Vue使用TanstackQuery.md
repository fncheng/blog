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

