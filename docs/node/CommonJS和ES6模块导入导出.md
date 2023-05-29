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

## ES6 Module

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

## UMD

UMD全名叫通用模块定义规范（Universal Module Definition）

它可以通过运行时或者编译时让同一个代码模块在使用 CommonJs、CMD 甚至是 AMD 的项目中运行。

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

就是检测到node就走CommonJs规范，检测到浏览器就走AMD规范

## vue不同构建版本的解释

```js
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



### 参考

[理解CommonJS、AMD、CMD三种规范](https://zhuanlan.zhihu.com/p/26625636)
