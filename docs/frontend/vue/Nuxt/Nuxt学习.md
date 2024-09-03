## Nuxt学习

### Nuxt目录结构

在 Nuxt 3 中，[`pages/`](https://nuxt.com.cn/docs/guide/directory-structure/pages) 目录是可选的。如果不存在该目录，Nuxt 将不会包含 [vue-router](https://router.vuejs.org/) 依赖项。这在开发一个落地页或者不需要路由的应用时非常有用。

### Nuxt和Vue SPA区别

### 1. **项目结构**

- **普通 Vue.js SPA 项目**：
  - 开发者通常自行组织项目结构。项目通常包含 `src` 目录，内部有 `components`、`views`、`router`、`store` 等子目录。
  - 路由通常在 `router` 目录下手动配置，组件和页面视图文件可以放在 `views` 目录下。
- **Nuxt.js 项目**：
  - Nuxt.js 有约定俗成的目录结构，项目的 `pages` 目录用来存放页面组件，且文件名和目录结构会自动映射为路由。
  - 没有 `router` 目录，Nuxt.js 会自动生成路由配置。
  - 组件通常放在 `components` 目录中，`store` 目录则用于管理 Vuex 状态。

### 2. **路由管理**

- **普通 Vue.js SPA 项目**：
  - 需要手动配置路由。开发者在 `router/index.js` 文件中导入页面组件，并为每个路由定义路径和组件关系。
  - 复杂的路由系统可能需要较多的手动配置，特别是在处理嵌套路由或动态路由时。
- **Nuxt.js 项目**：
  - 路由是由 `pages` 目录中的文件和文件夹自动生成的，不需要手动配置。
  - 例如，在 `pages` 目录下创建 `about.vue` 文件，Nuxt 会自动生成 `/about` 路由。
  - Nuxt 支持动态路由，通过在 `pages` 目录下使用 `_[param].vue` 的命名方式来定义动态路由。





NuxtPage组件用于显示位于pages/目录中的页面。

> NuxtPage就相当于VueRouter中的router-view，用来渲染路由内容的



nuxt start用来访问nuxt build生成的项目(.nuxt目录)

默认3000端口，如果端口被占用了，可以使用`PORT=4000 nuxt start`命令修改端口号





## Middleware中间件

定义一个middleware中间件

```ts
export default defineNuxtRouteMiddleware((to, from) => {
  const router = useRouter();
  console.log('from: ', from);
  console.log('to: ', to);

  if (to.path === '/') {
    router.push('/home');
  }
});
```

代码优化

```ts
// middleware/redirect-to-home.js
export default defineNuxtRouteMiddleware((to) => {
  // 如果目标路径是根路径，则跳转到 /home
  if (to.path === '/') {
    // 使用 navigateTo 进行导航，替代 router.push
    return navigateTo('/home');
  }
});
```

**避免冗余的跳转**：使用 `router.push` 可能导致不必要的跳转或重复调用