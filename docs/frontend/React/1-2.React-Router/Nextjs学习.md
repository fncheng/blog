

Nextjs有App Router和Pages Router两种路由方式

1. Pages Router

   **结构**：使用 `pages` 目录来定义路由。每个文件都会自动映射到对应的 URL 路径。例如，`pages/about.js` 会对应 `/about` 路径。

   **动态路由**：通过文件名约定实现动态路由，例如 `[id].js` 文件可以匹配 `/123`、`/abc` 等路径。

   **数据获取**：通过 `getStaticProps` 和 `getServerSideProps` 等数据获取方法来处理数据。

2. App Router

   **结构**：使用 `app` 目录替代 `pages`，支持嵌套路由和更灵活的布局。文件结构更灵活，可以通过创建嵌套文件夹来实现复杂的路由。

   **数据获取**：使用新的 `fetch` API 进行数据获取，支持服务器端和客户端的数据获取方式。

两种路由可以同时使用，但路由解析时会优先考虑 `pages` 目录中的路由。如果某个 URL 路径在 `pages` 中已定义，Next.js 会首先使用 `pages` 目录的路由，而忽略 `app` 目录中的相同路径。



在App Router中无法使用useRouter

`useRouter` 钩子被 **弃用**。而是引入了新的方式来获取路由信息，主要通过 `usePathname`、`useSearchParams` 和 `useRouter`（位于 `next/navigation` 模块）等方法。

### dynamic

## Next.js AppRouter目录结构

```sh
my-next-app/
├── app/                # App Router 的核心目录（必须存在）
│   ├── layout.tsx      # 根布局文件（跨页面共享）
│   ├── page.tsx        # 根页面（访问 `/`）
│   ├── loading.tsx     # 加载状态组件
│   ├── error.tsx       # 错误边界组件
│   ├── not-found.tsx   # 404 页面
│   ├── global.css      # 全局样式
│   ├── dashboard/      # 访问 `/dashboard`，支持嵌套路由
│   │   ├── page.tsx    # `dashboard` 主页
│   │   ├── layout.tsx  # `dashboard` 作用域的布局
│   │   ├── settings/   # 访问 `/dashboard/settings`
│   │   │   ├── page.tsx
│   │   │   ├── loading.tsx
│   │   │   ├── error.tsx
│   │   │   ├── not-found.tsx
│   │   └── analytics/  # 访问 `/dashboard/analytics`
│   │       ├── page.tsx
│   │       ├── layout.tsx
│   │       ├── loading.tsx
│   │       ├── error.tsx
│   │       ├── not-found.tsx
│   ├── api/            # API 路由（Server Actions 或 API 处理）
│   │   ├── hello/      # 访问 `/api/hello`
│   │   │   ├── route.ts # API 处理文件（等价于 pages/api）
│   ├── (auth)/         # 可选的分组路由（作用于子目录）
│   │   ├── login/      # 访问 `/login`
│   │   │   ├── page.tsx
│   │   │   ├── layout.tsx
│   ├── (marketing)/    # 另一个路由分组
│   │   ├── home/       # 访问 `/home`
│   │   │   ├── page.tsx
├── components/         # 复用组件
│   ├── Button.tsx
│   ├── Header.tsx
├── public/             # 静态资源目录
│   ├── favicon.ico
│   ├── images/
├── styles/             # 样式文件目录
│   ├── globals.css
│   ├── theme.module.css
├── next.config.js      # Next.js 配置文件
├── package.json        # 依赖管理
├── tsconfig.json       # TypeScript 配置
└── .eslintrc.js        # ESLint 配置
```



## build忽略eslint报错

修改 `next.config.js`

```js
// next.config.js
module.exports = {
  eslint: {
    ignoreDuringBuilds: true,
  },
};
```

