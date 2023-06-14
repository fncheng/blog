---
title: webpack使用env环境变量
---

## 环境变量

https://www.webpackjs.com/guides/environment-variables/



## dotenv

[npm](https://www.npmjs.com/package/dotenv)

dotenv 负责读取 `.env` 文件中的环境变量，并将其注入到 Node.js 的 `process.env` 中

```js
const dotenv = require('dotenv')
console.log('dotenv: ', dotenv.config().parsed);
/* DB_HOST=localhost
DB_USER=root
DB_PASS=s1mpl3 */
```

调用dotenv.config()后就可以在node环境中通过process.env去访问环境变量了

### Options

**path**

Default: `path.resolve(process.cwd(), '.env')`

process.cwd()为项目根目录

如此可通过多个env文件来切换环境

新建`.env`、`.env.development` `.env.production`等文件

```js
const path = require('path')
const dotenv = require('dotenv')
dotenv.config({
  path: path.resolve(process.cwd(), `.env.${process.env.NODE_ENV}`)
})
// process.env.NODE_ENV 通过cross-env注入
```



### webpack.DefinePlugin

> DefinePlugin 允许创建一个在编译时可以配置的全局常量。这可能会对开发模式和发布模式的构建允许不同的行为非常有用。如果在开发构建中，而不在发布构建中执行日志记录，则可以使用全局常量来决定是否记录日志。这就是 DefinePlugin 的用处，设置它，就可以忘记开发和发布构建的规则。

process.env只能在node环境中使用，而如果想要在浏览器环境使用，就需要DefinePlugin了。

> *注意，因为这个插件直接执行文本替换，给定的值必须包含字符串本身内的***实际引号***。通常，有两种方式来达到这个效果，使用* `'"production"'`*, 或者使用* `JSON.stringify('production')`*。*

即需要这样写

```js
new webpack.DefinePlugin({
	VERSION: '"some"',
  VERSION: JSON.stringify('some')
})
```

### dotenv-webpack

> `dotenv-webpack`包裹`dotenv`和`Webpack.DefinePlugin`。因此，它会在结果包中为 的任何实例进行文本替换`process.env`。

```sh
npm i dotenv-webpack -D
```



## 多环境的配置

### webpack-merge

[npm](https://www.npmjs.com/package/webpack-merge)

webpack-merge用于合并webpack配置

```js
const path = require('path')
const { merge } = require('webpack-merge')
const webpackConfig = require('./webpack.config')

module.exports = merge(webpackConfig, {})
```

如果merge的是一个函数

```js
const path = require('path')
const { merge } = require('webpack-merge')
const webpackConfig = require('./webpack.config')

module.exports = (env) => {
  return merge(webpackConfig(), {})
}
```

### 多环境的配置

1.通过dotenv读取env配置文件

```js
// webpack.dev.js
dotenv.config({
  path: path.resolve(process.cwd(), '.env.development')
})
```

2.npm script设置环境变量

不同的系统设置方法不同，具体看[这篇文章](https://juejin.cn/post/6844904079974465550)。

```json
// mac linux
"scripts" : {
    "start": "NODE_ENV=production && node app.js"
}
```

二者可以配合，根据不同的`NODE_ENV`读取不同的配置文件

```js
dotenv.config({
  path: path.resolve(process.cwd(), `.env.${process.env.NODE_ENV}`)
})
```



### npm script 设置环境变量

https://juejin.cn/post/6844904079974465550



## cross-env设置环境变量

[![version](https://camo.githubusercontent.com/de28f7c8f73db264ae64ba81f2d1ccc00889f073421f1ce9e2da09f358239037/68747470733a2f2f696d672e736869656c64732e696f2f6e706d2f762f6761747362792d72656d61726b2d656d6265646465722e7376673f7374796c653d666c61742d737175617265)](https://www.npmjs.com/package/gatsby-remark-embedder) 

cross env配合webpack使用，中间不要加&&

```json
  "scripts": {
    "dev": "cross-env NODE_ENV=development webpack server --config ./build/webpack.dev.js",
    "build": "cross-env NODE_ENV=production webpack --config ./build/webpack.prod.js -o dist",
    "build:dev": "cross-env NODE_ENV=development webpack --config ./build/webpack.prod.js -o dist",
    "build:test": "cross-env NODE_ENV=some webpack --config ./build/webpack.test.js"
  },
// cross-env NODE_ENV=some && node ./build/webpack.test.js
// 这样写是错误的
// 正确写法：cross-env NODE_ENV=some node ./build/webpack.test.js
// 多个变量直接在后面加
// cross-env NODE_ENV=some NODE_CONFIG=test node ./build/webpack.test.js
```

