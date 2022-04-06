---
title: webpack搭建VUE开发环境
---

## 起步

### Webpack-dev-server

webpack开发环境具有热更新Hot reload的特点

需要插件

webpack-dev-server

### html-webpack-plugin

[GitHub](https://github.com/jantimon/html-webpack-plugin#configuration)

[html-webpack-plugin详解](https://www.cnblogs.com/wonyun/p/6030090.html)

```sh
yarn add html-webpack-plugin -D
```

该插件将为你生成一个 HTML5 文件， 在 body 中使用 `script` 标签引入你所有 webpack 生成的 bundle。 只需添加该插件到你的 webpack 配置中，如下所示：

```js
new HtmlWebpackPlugin({
   title: 'Webpack Vue Template',
   template: path.resolve(__dirname, '../public/index.html'),
   inject: 'body',
   hash: true
 })
```

具体配置看[**文档**](https://github.com/jantimon/html-webpack-plugin#configuration)

而package.json中的script加上了这样一行

```json
"dev": "webpack server --mode development --config ./build/webpack.config.js -o dist",
```

这样一来，Hot reload环境就搭建好了，浏览器可以实时地更新了。

关于模块热更新，具体还可以看[webpack官方文档](https://webpack.docschina.org/guides/hot-module-replacement/)



### clean-webpack-plugin

每次打包自动清空dist文件夹

webpack 5.2已内置功能

Output.clean = true即可开启

开发的时候浏览器会有日志

<img src="/Users/cheng/Library/Application Support/typora-user-images/image-20211123202510003.png" alt="image-20211123202510003" style="zoom:67%;" />

如果不想看见这些日志，可以通过设置[devServer.client](https://webpack.docschina.org/configuration/dev-server/#devserverclient)去除

将其设置为`warn`以下就看不见了

### 配置eslint

```sh
yarn add eslint eslint-webpack-plugin -D
```

webpack.dev.js

```js
const EslintWebpackPlugin = require('eslint-webpack-plugin')
plugins: [
  // @ts-ignore
  new EslintWebpackPlugin()
]
```



有了eslint还需要规则

我们这里使用prettier的规则

```sh
yarn add eslint-plugin-prettier eslint-config-prettier -D
```

最终配置eslintrc.js

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



### 最终的配置

```js
const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/main.js',
  output: {
    clean: true,
    path: path.resolve(__dirname, './dist'),
    filename: 'index_bundle.js',
  },
  target: 'web',
  devServer: {
    // static: {
    //   directory: path.join(__dirname, 'public'),
    // },
    client:{
      logging: 'warn'
    },
    compress: true, // 开启gzip压缩
    open: true, // 自动打开浏览器
    port: 9000
  },
  module: {
    rules: [
      { test: /\.vue$/, loader: 'vue-loader' },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  ['postcss-preset-env', {// 其他选项
                  }]
                ]
              }
            }
          },
          // Compiles Sass to CSS
          'sass-loader'
        ]
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      title: 'Webpack Vue Template',
      template: path.resolve(__dirname, '../public/index.html'),
      inject: 'body',
      hash: true
    })
  ]
}
```



### TypeScript支持

具体看[这篇文章](https://segmentfault.com/a/1190000011853167)

**vue-shim.d.ts**

```ts
declare module "*.vue" {
  import Vue from "vue";
  export default Vue;
}
```



### Vue2.x JSX支持

```sh
yarn add @vue/babel-preset-jsx @vue/babel-helper-vue-jsx-merge-props -D
```



使用babel-loader处理jsx文件

在webpack.base.js中添加rules

```js
{ test: /\.jsx?$/, exclude: /node_modules/, use: ['babel-loader'] },
```

**babel.config.js配置**

```js
module.exports = {
  presets: [
    ['@babel/preset-env', { useBuiltIns: 'usage', corejs: 3.19, modules: false }],
    ['@vue/babel-preset-jsx', { injectH: true }]
  ]
}
```







## 报错

报错ReferenceError: BASE_URL is not defined

[解决方法](https://blog.csdn.net/gxgalaxy/article/details/105302225)



**参考**

- [初探webpack之搭建Vue开发环境](https://www.cnblogs.com/WindrunnerMax/p/15419190.html)

