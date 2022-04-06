### CommandJS

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

### ES Modules

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

