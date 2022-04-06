## Babel常用插件大全

### @babel/core 与 babel-core?

@babel/core 和babel-core是一个东西，只不过webpack7.0后babel官方的插件都以@babel开头

```js
module.exports = {
  presets: [
    ["@babel/preset-env",
    	{ useBuiltIns: 'usage', corejs: 3.19, modules: false }
    ]
  ]
}
```



### @babel/polyfill

> 提供完整 ES2015+ 环境所需的 polyfills

这个包已被弃用，取而代之的是**[`core-js`](https://github.com/zloirock/core-js) and [`regenerator-runtime`](https://www.npmjs.com/package/regenerator-runtime).** 

### core-js

> JavaScript 的模块化标准库。包括[ECMAScript 到 2021 年的 polyfills](https://github.com/zloirock/core-js#ecmascript)：[promises](https://github.com/zloirock/core-js#ecmascript-promise)、[symbols](https://github.com/zloirock/core-js#ecmascript-symbol)、[collections](https://github.com/zloirock/core-js#ecmascript-collections)、iterators、[typed arrays](https://github.com/zloirock/core-js#ecmascript-typed-arrays)、许多其他特性、[ECMAScript 提案](https://github.com/zloirock/core-js#ecmascript-proposals)、[一些跨平台的 WHATWG/W3C 特性和提案，](https://www.npmjs.com/package/core-js#web-standards)如[`URL`](https://github.com/zloirock/core-js#url-and-urlsearchparams). 您可以仅加载所需的功能或在没有全局命名空间污染的情况下使用它。

### @babel/preset-env

[相关配置](https://www.babeljs.cn/docs/babel-preset-env#corejs)