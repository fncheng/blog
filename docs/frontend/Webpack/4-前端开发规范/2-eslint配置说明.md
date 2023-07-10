# ESlint配置

## webpack with eslint

```js
module.exports = {
  root: true,
  env: {
    node: true
  },
  // extends: ["plugin:vue/essential", "eslint:recommended"],
  extends: [
    'eslint:recommended',
    'plugin:prettier/recommended',
    'plugin:vue/recommended',
    'eslint-config-prettier'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    // 重写prettier验证规则
    'prettier/prettier': [
      'warn',
      // 针对会被 ESLint 格式化的文件类型，Prettier 会作为 ESLint 的一个规则运行并格式化文件，因此需要添加如下配置
      { semi: false, singleQuote: true, trailingComma: 'none' }
    ]
  }
}
```

## Vue CLI with eslint

```js
module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['eslint:recommended', 'plugin:vue/essential', '@vue/prettier'],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'prettier/prettier': ['error', { semi: false, singleQuote: true }],
  },
}
```

## ESLint规则

### 驼峰式和下划线命名camelcase

[https://cn.eslint.org/docs/rules/camelcase](https://cn.eslint.org/docs/rules/camelcase)

```js
"camelcase": '['warn',{properties:'never',allow: ['default_AddressArray']}]'
```

### ESLint允许any类型

`Unexpected any. Specify a different type.eslint@typescript-eslint/no-explicit-any`

如果你想避免这个警告，可以在 TypeScript ESLint 配置文件中将 `no-explicit-any` 规则禁用，例如：

```js
// .eslintrc.js
module.exports = {
  // ...
  rules: {
    '@typescript-eslint/no-explicit-any': 'off',
  },
  // ...
};
```

## ESLint配置解析

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

