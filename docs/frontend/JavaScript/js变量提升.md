js在运行时会执行变量提升：https://developer.mozilla.org/zh-CN/docs/Glossary/Hoisting

JavaScript 只会提升声明，不会提升其初始化。如果一个变量先被使用再被声明和赋值的话，使用时的值是 undefined。参见例子：

函数声明的提升优先级 > 变量声明提升优先级

```js
var getName = function () {
  console.log(4)
}
function getName() {
  console.log(5)
}
getName() // 4
```

