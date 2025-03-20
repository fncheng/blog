## 使用vite-plugin-pages生成约定式路由

https://github.com/hannoeru/vite-plugin-pages

```ts
// vite.config.ts
import Pages from 'vite-plugin-pages'
export default defineConfig(({ mode }) => {
    return {
        plugins: [
            Pages({
                dirs: 'src/app/pages'
            }),
        ]
    }
})
```

router.ts

```ts
import addonRoutes from '~pages'
addonRoutes.forEach((route: RouteRecordRaw) => router.addRoute(route))
```

如果是React

```ts
import addonRoutes from '~react-pages'

const routes = [
    ...addonRoutes
]
const router = createBrowserRouter(routes, { basename: '/app' })
const Router = () => <RouterProvider router={router} />
```



声明类型

```ts
// vite-plugin-pages.d.ts
declare module '~react-pages' {
  import { RouteObject } from 'react-router-dom'
  const routes: RouteObject[]
  export default routes
} 
```



## 生成嵌套路由

目录结构如下图所示，其中left.tsx中需要有Outlet

具体可以看：https://github.com/hannoeru/vite-plugin-pages?tab=readme-ov-file#nested-routes

<img src="https://minimax-1256590847.cos.ap-shanghai.myqcloud.com/img/image-20250320104517624.png" alt="image-20250320104517624" style="zoom:67%;" />
