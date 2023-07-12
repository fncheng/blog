## ESLint保存时使用Prettier的规则

要在ESLint保存时使用prettier的规则，需要安装eslint-plugin-prettier插件，并在 ESLint 的配置文件中，启用 eslint-plugin-prettier 插件

```js
// .eslintrc.js
module.exports = {
  extends: ["eslint:recommended", "plugin:prettier/recommended"],
  plugins: ["prettier"],
  rules: {
    // 添加/修改规则
  }
};
```

