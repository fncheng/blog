在前端一些依赖包中，我们经常能看见有es目录，dist目录和lib目录等，这些目录有什么区别呢？

### 1. es 目录

`es` 目录中的文件通常是使用 ES Modules（ESM）规范导出的模块，文件后缀通常是 `.js` 或 `.mjs`。它们的特点和用途如下：

- **模块系统**: 使用 ES Modules（`import` 和 `export` 语法）。
- **Tree Shaking 支持**: 由于 ES Modules 支持静态分析，构建工具（如 Webpack、Vite、Rollup）可以更有效地进行 Tree Shaking，从而移除未使用的代码，减小打包体积。
- **现代浏览器支持**: 现代浏览器原生支持 ES Modules，因此 `es` 目录适合直接在浏览器端加载。
- **性能**: 在构建工具中使用时，`es` 模块的导入通常更高效，构建速度较快。

### 2. lib目录

`lib` 目录中的文件通常是使用 CommonJS 规范导出的模块，文件后缀通常是 `.js`。它们的特点和用途如下：

- **模块系统**: 使用 CommonJS（`require` 和 `module.exports` 语法）。
- **兼容性更广**: CommonJS 是 Node.js 默认的模块规范，因此对 Node.js 和传统构建工具的兼容性较好。
- **不支持 Tree Shaking**: CommonJS 的模块方式不支持静态分析，构建工具无法对其进行 Tree Shaking，因此可能会引入不必要的代码。
- **适用于老旧环境**: 如果项目中使用的构建工具不支持 ES Modules，或需要兼容旧版环境，`lib` 目录会更适合。

### 3.dist目录

**最终打包文件**: `dist` 目录通常包含了经过打包、压缩和优化的最终产物，是为生产环境准备的。它是开发者发布包时给用户使用的版本。



## CommandJS

https://javascript.ruanyifeng.com/nodejs/module.html#toc1

#### 导入---require

#### 导出---exports变量

为了方便，Node为每个模块提供一个exports变量，指向module.exports。这等同在每个模块头部，有一行这样的命令。

```js
var exports = module.exports;
```

所以`module.exports` = `exports`

我们经常看到这样的写法：

```
exports = module.exports = somethings
```

上面的代码等价于:

```
module.exports = somethings
exports = module.exports
```

- module.exports

```js
// export.js
function over(a) {
  console.log(a)
}
exports = module.exports = over

// import.js
const instance = require('./export.js')
instance(1) // 1
// 如果这里写instance.over(1) 就会报错instance.over is not a function
```

- exports

```js
// export.js
function over(a) {
  console.log(a)
}
exports.over = over
// 或
module.exports = {
  over
}

// import.js
const instance = require('./export.js')
// or
const { over } = require('./export.js')
instance.over(1)
```

二者区别: 

1. module.exports 初始值为一个空对象 {}
2. exports 是指向的 module.exports 的引用
3. require() 返回的是 module.exports 而不是 exports

> CommonJS规范规定，每个模块内部，`module`变量代表当前模块。这个变量是一个对象，它的`exports`属性（即`module.exports`）是对外的接口。加载某个模块，其实是加载该模块的`module.exports`属性。
>
> 所以`require('module_Name')`的结果其实是module.exports属性，是一个对象。

## ESM（ES Modules）

https://juejin.im/post/6844903623273480200

ES6中export和import一般的用法有两种

1. 命名导出（Named exports）
2. 默认导出（Default exports）

ES6 想要 import 一个模块中的变量等内容必须对其做模块解构，否则只会执行代码而没有任何导入的内容。这个道理跟 Node.js 中的模块没有 export 内容就 require 就只会执行代码不会导入内容是一个道理

#### 默认导出

默认导出就不需要name了，但是一个js文件中只能有一个export default。

```js
//export.js
const a = 10
export default a
```

```js
//index.vue
import a from 'moudule.js'
```

#### 命名导出

```js
//export.js
export const a = 10
```

```js
//index.vue
import { a } from 'export.js'
console.log(a)
```

#### 别名导入

```js
// export.js
export const a = 10
```

```js
//index.vue
import { a as b } from '@/utils/a'
console.log(b)
```

#### 命名空间引入（Namespace imports）

```js
import * as cow from './cow.js'
import * as goat from './goat.js'

cow.speak() // moo
goat.speak() // baa
```



## es6动态import

即import()方法





## CommonJS AMD UMD区别

CommonJS主要是服务端模块规范，Node.js采用，

加载模块是同步的

之前有讲过CommonJS和ESM的导入导出

这会来说下UMD

## UMD（Universal Module Definition）

UMD全名叫通用模块定义规范（Universal Module Definition）

它可以通过运行时或者编译时让同一个代码模块在使用 CommonJs、CMD 甚至是 AMD 的项目中运行。

**特点**:

- **通用性**: UMD 设计为在多种环境下都能正常运行，包括 AMD（如 RequireJS）、CommonJS（如 Node.js）、以及浏览器的全局变量模式。它能适应大部分 JavaScript 运行环境。
- **自执行函数**: 通过一个自执行函数包装模块，UMD 会检测当前的模块环境，如果是 CommonJS，则使用 `module.exports`，如果是 AMD，则使用 `define`，否则直接将模块暴露为全局变量。
- **动态加载**: UMD 可以在浏览器中通过 `<script>` 标签直接引入，也可以在 Node.js 环境中使用 `require()`。
- **兼容性**: UMD 是一个兼容性最佳的方案，但为了实现这种兼容性，UMD 文件通常较大，且不支持 Tree Shaking。
- **主要用途**: 适用于发布第三方库，确保最大限度的兼容性，特别是在需要支持老旧环境或多个模块系统的项目中。

```js
((root, factory) => {
    if (typeof define === 'function' && define.amd) {
        //AMD
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        //CommonJS
        var $ = requie('jquery');
        module.exports = factory($);
    } else {
        root.testModule = factory(root.jQuery);
    }
})(this, ($) => {
    //todo
});
```

简单来说，就是它是一个自调用函数，检测到node就走CommonJs规范，检测到浏览器就走AMD规范



<img src="https://minimax-1256590847.cos.ap-shanghai.myqcloud.com/img/image-20240907221303543.png" alt="image-20240907221303543" style="zoom: 67%;" />

### 总结

- **AMD** 是一种用于浏览器端的异步模块定义规范，旨在提高模块加载效率和依赖管理。它使用 `define` 函数来定义模块和其依赖，并支持异步加载，适合大型前端应用。
- **CommonJS** 主要用于 Node.js 环境，模块同步加载，适合服务器端开发，但在浏览器中使用时需要通过工具转换。
- **ESM (ES Modules)** 是现代 JavaScript 的标准模块系统，支持静态分析、Tree Shaking 和异步加载，适用于前端和后端开发。

AMD 的设计初衷是为了在浏览器中实现模块化和异步加载，它在模块化的早期阶段解决了许多问题，但随着 ES Modules 的普及，它逐渐被 ESM 所取代。

## vue不同构建版本的解释

在 Vue.js 的 `dist` 目录下，你会找到多个不同版本的 Vue 构建文件。这些文件的命名和内容针对不同的使用场景和需求

```js
// 这是 Vue 的 CommonJS 构建版本，主要用于 Node.js 环境或构建工具（如 Webpack）的 CommonJS 模块。
vue.common.js

// 服务端渲染。 通过 `require()` 在 Node.js 服务器端渲染使用。
vue.cjs.js
vue.cjs.prod.js

// 使用构建工具，如 `webpack`，`rollup` 和 `parcel` 等打包出来的工程项目
vue.esm-bundler.js
vue.runtime.esm-bundler.js

// 通过浏览器中的 `<script src="...">` 直接使用，暴露全局Vue
vue.global.js
vue.global.prod.js
vue.runtime.global.js
vue.runtime.global.prod.js

// 在浏览器中通过 `<script type="module">` 来使用（浏览器原生 ES 模块导入使用）
vue.esm-browser.js
vue.esm-browser.prod.js
vue.runtime.esm-browser.js
vue.runtime.esm-browser.prod.js
```

<img src="https://minimax-1256590847.cos.ap-shanghai.myqcloud.com/img/image-20240908103655473.png" alt="image-20240908103655473" style="zoom:67%;" />

### 参考

[理解CommonJS、AMD、CMD三种规范](https://zhuanlan.zhihu.com/p/26625636)
