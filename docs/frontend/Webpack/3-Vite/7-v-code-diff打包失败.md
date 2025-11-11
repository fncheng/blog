## v-code-diff打包构建失败

> Failed to resolve entry for package "v-code-diff". The package may have incorrect main/module/exports specified in its package.json.

pnpm 是导致 v-code-diff 打包失败的根本原因。这是 pnpm 7+ 的安全机制（node-linker=hoisted + shamefully-hoist=false 默认行为）与 v-code-diff 包 postinstall 构建脚本依赖 不兼容的典型案例。

v-code-diff 在 package.json 中定义了 postinstall 脚本：

```json
"scripts": {
  "postinstall": "node build.js"   // 或类似构建入口
}
```

这个脚本会在 npm install 时自动执行，**生成 dist/ 目录和入口文件**（index.js, index.esm.js 等）。

但 **pnpm** 默认：

- **阻止外部脚本自动运行**（安全策略）
- 使用 **严格的依赖隔离**（非 hoisted 模式）
- postinstall 脚本被 **阻塞** → dist/ 目录 **未生成**
- Vite 打包时找不到入口 → Failed to resolve entry

### 手动运行 postinstall 脚本

```sh
# 1. 安装依赖（pnpm）
pnpm install

# 2. 手动执行 v-code-diff 的构建脚本
pnpm --filter v-code-diff exec npm run postinstall
# 或直接进入 node_modules 运行
node node_modules/v-code-diff/build.js
```

