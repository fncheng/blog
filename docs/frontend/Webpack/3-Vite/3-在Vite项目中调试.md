# 使用react-dev-inspector调试组件

第一步使用react-dev-inspector包裹main.tsx

```sh
pnpm add -D react-dev-inspector
pnpm add -D @react-dev-inspector/vite-plugin
```

https://react-dev-inspector.zthxxx.me/docs/inspector-component

## @react-dev-inspector/vite-plugin

在Vite项目中选择dom打开对应组件

https://react-dev-inspector.zthxxx.me/docs/integration/vite



## Vite构建产物分析

Rollup Plugin Visualizer

https://www.npmjs.com/package/rollup-plugin-visualizer

```sh
npm i rollup-plugin-visualizer -D
```

Usage with vite (vite.config.js)

```ts
module.exports = {
  plugins: [visualizer()],
};
```

vite-bundle-analyzer