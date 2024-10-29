Nextjs有App Router和Pages Router两种路由方式

1. Pages Router

   **结构**：使用 `pages` 目录来定义路由。每个文件都会自动映射到对应的 URL 路径。例如，`pages/about.js` 会对应 `/about` 路径。

   **动态路由**：通过文件名约定实现动态路由，例如 `[id].js` 文件可以匹配 `/123`、`/abc` 等路径。

   **数据获取**：通过 `getStaticProps` 和 `getServerSideProps` 等数据获取方法来处理数据。

2. App Router

   **结构**：使用 `app` 目录替代 `pages`，支持嵌套路由和更灵活的布局。文件结构更灵活，可以通过创建嵌套文件夹来实现复杂的路由。

   **数据获取**：使用新的 `fetch` API 进行数据获取，支持服务器端和客户端的数据获取方式。

两种路由可以同时使用，但路由解析时会优先考虑 `pages` 目录中的路由。如果某个 URL 路径在 `pages` 中已定义，Next.js 会首先使用 `pages` 目录的路由，而忽略 `app` 目录中的相同路径。