启动后提示main.tsx:6 Uncaught ReferenceError: React is not defined 

这个错误是因为你使用了 JSX 语法，但 Webpack/Babel 配置中没有正确处理 `React` 的自动导入。在 React 17 之后，JSX 的编译不再需要手动导入 `React`，但你需要配置 Babel 来处理这种情况。

配置Babel

```ts
{
  "presets": [
    ["@babel/preset-env", {
      "targets": {
        "browsers": ["last 2 versions"]
      }
    }],
    ["@babel/preset-react", {
      "runtime": "automatic"  // 启用 React 17+ 的 JSX 转换
    }],
    "@babel/preset-typescript"
  ]
}
```

