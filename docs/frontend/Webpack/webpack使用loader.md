---
title: webpack使用loader
---

## Lastest version of Webpack4 loaders

- [css-loader@5.2.7](mailto:css-loader@5.2.7)
- [sass-loader@10.2.0](mailto:sass-loader@10.2.0)
- [postcss-loader@4.2.0](mailto:postcss-loader@4.2.0)
- [less-loader@7.3.0](mailto:less-loader@7.3.0)
- [mini-css-extract-plugin@1.6.2](mailto:mini-css-extract-plugin@1.6.2)
- [copy-webpack-plugin@6.4.1](mailto:copy-webpack-plugin@6.4.1)





## loader使用规则

loader 从右到左（或从下到上）地取值(evaluate)/执行(execute)

#### 使用loader

```js
{ test: /\.vue$/, loader: 'vue-loader' } // loader属性
// 使用use
{
        test: /\.css$/,
        use: [
          // [style-loader](/loaders/style-loader)
          { loader: 'style-loader' },
          // [css-loader](/loaders/css-loader)
          {
            loader: 'css-loader',
            options: {
              modules: true
            }
          },
          // [sass-loader](/loaders/sass-loader)
          { loader: 'sass-loader' }
        ]
      }
```

## webpack打包vue文件

需要使用[vue-loader](https://vue-loader.vuejs.org/zh/guide/#%E6%89%8B%E5%8A%A8%E8%AE%BE%E7%BD%AE)

```js
const { VueLoaderPlugin } = require('vue-loader')

module.exports = {
  module: {
    rules: [{ test: /\.vue$/, loader: 'vue-loader' }],
  },
  plugins: [
    new VueLoaderPlugin()
  ]
}
```

### 自动构建

最后在package.json的script中添加

```json
"scripts": {
    "dev": "webpack ./src/main.js --mode development --config ./build/webpack.config.js -o dist"
  },
```



## 处理css

### style-loader

[npm](https://www.npmjs.com/package/style-loader)

```js
{ test: /\.css$/, use: ['style-loader', 'css-loader', 'postcss-loader'] }
```

### css-loader

[Webpack](https://webpack.docschina.org/loaders/css-loader/)



css-loader和style-loader的区别 ===> https://blog.csdn.net/wu_xianqiang/article/details/104560613

### sass

使用 style-loader css-loader sass-loader 

```sh
yarn add style-loader css-loader sass-loader -D
```

```js
{
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          !IS_PRODUCTION
              ? {
                  loader: 'style-loader',
                  options: {
                    esModule: true
                  }
                }
              : MiniCssExtractPlugin.loader,
          // Translates CSS into CommonJS
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  ['postcss-preset-env',{
                    // 其他选项
                  },],
                ],
              },
            },
          },
          // Compiles Sass to CSS
          'sass-loader',
        ],
      },
```

### postcss-preset-env

> [PostCSS Preset Env](https://github.com/csstools/postcss-preset-env)允许您将现代 CSS 转换为大多数浏览器可以理解的内容，根据您的目标浏览器或运行时环境确定您需要的[polyfill](https://github.com/csstools/postcss-preset-env)。



## Babel处理js文件

### Babel-loader

[webpack doc](https://webpack.docschina.org/loaders/babel-loader/)

> This package allows transpiling JavaScript files using [Babel](https://github.com/babel/babel) and [webpack](https://github.com/webpack/webpack).

```sh
yarn add babel-loader @babel/core @babel/preset-env -D
```



babel.config.js

```js
module.exports = {
  presets: [
    ["@babel/preset-env",
    	{ useBuiltIns: 'usage', corejs: 3, modules: false }
    ]
  ]
}

```



## 处理图片

### webpack5

https://webpack.docschina.org/guides/asset-modules/#resource-assets

在 webpack 5 之前，通常使用：

- [`raw-loader`](https://v4.webpack.js.org/loaders/raw-loader/) 将文件导入为字符串
- [`url-loader`](https://v4.webpack.js.org/loaders/url-loader/) 将文件作为 data URI 内联到 bundle 中
- [`file-loader`](https://v4.webpack.js.org/loaders/file-loader/) 将文件发送到输出目录

webpack5 可以使用assets module

```js
{ test: /\.(jpeg|png)/i, type: 'asset/resource' }
```

> webpack 将按照默认条件，自动地在 `resource` 和 `inline` 之间进行选择：小于 8kb 的文件，将会视为 `inline` 模块类型，否则会被视为 `resource` 模块类型。

小于8kb的图片会被转成base64字符串---inline

**asset/inline**

会被转换为base64字符串

可以自定义URI生成器

### webpack4

```js
{
  test: /\.(png|svg|jpe?g)$/i,
  loader: 'url-loader',
  options: {
    esModule: false
  }
},
{
  test: /\.(woff|woff2|eot|ttf|otf)$/i,
  loader: 'file-loader',
  options: {
    esModule: false
  }
}
```



## 压缩svg

### mini-svg-data-uri

[npm](https://www.npmjs.com/package/mini-svg-data-uri)

