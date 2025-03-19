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

声明类型

```ts
// vite-plugin-pages.d.ts
declare module 'virtual:generated-pages' {
  import { RouteObject } from 'react-router-dom'
  const routes: RouteObject[]
  export default routes
} 
```

