eslintrc.js

```js
module.exports = {
  // 环境,指定脚本的运行环境。每种环境都有一组特定的预定义全局变量。
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  // 扩展 所有在 规则页面 被标记为 “✅” 的规则将会默认开启。
  // 相当于别人配好的预设
  extends: ['eslint:recommended', 'plugin:vue/essential'],
  // 脚本在执行期间访问的额外的全局变量。
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  // 插件
  plugins: ['vue'],
  // 规则
  rules: {
    semi: ['error', 'never'],
    quotes: ['error', 'double'],
  },
}
```





eslint报错：

1. vscode中提示`ESLint server running in node v14.16.0`，发现eslint 使用的是旧版本的node。相关问题：https://github.com/microsoft/vscode-eslint/issues/1233
2. eslint保存时自动格式化的问题，解决办法：https://github.com/microsoft/vscode-eslint/issues/833#issuecomment-566442561