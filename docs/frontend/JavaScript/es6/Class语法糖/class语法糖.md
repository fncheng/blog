<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [class 语法糖](#class-%E8%AF%AD%E6%B3%95%E7%B3%96)
  - [constructor 方法](#constructor-%E6%96%B9%E6%B3%95)
  - [super 关键字](#super-%E5%85%B3%E9%94%AE%E5%AD%97)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## class 语法糖

- es5 function 写法

```js
function Father(name = 'mr', age = 18) {
  this.name = name
  this.age = age
}
Father.prototype.sayHi = function () {
  console.log('Hi')
}

const fa = new Father('zs', 20)
// console.log(fa) // Father { name: 'zs', age: 20 }
// fa.sayHi() // Hi

function Son(sex = 1) {
  this.sex = sex
}

Son.prototype = new Father() // Son.prototype == Father的实例, 构成继承关系
// 所以 Faher的实例的方法,例如sayHi() Son.prototype 也有
/* 继承是通过创建Super的实例,并将该实例赋给Sub.prototype实现的,本质是重写原型对象,用一个新类型
的实例替换,此时Son.prototype.constructor是指向Father的 */
// Son.prototype.sayHi() // Hi
Son.prototype.constructor = Son // 让Son.prototype.constructor重新指向Son

const p = new Son(0)
console.log(p.name)
// 到目前为止,通过new Son构造出来的实例还是只能拥有自己的属性
// 如果想要继承父类的属性,需要指定子类的constructor =
```

- es6 class

```js
class Father {
  constructor(name, age) {
    this.name = name
    this.age = age
  }
  sayHi() {
    console.log('Hi')
  }
}

const fa = new Father('zs', 20)
console.log(fa) // Father { name: 'zs', age: 20 }
fa.sayHi() // Hi
```

## constructor 方法

`constructor` 方法是类的构造函数，是一个默认方法，通过 `new` 命令创建对象实例时，自动调用该方法。一个类必须有 `constructor` 方法，如果没有显式定义，一个默认的 `consructor` 方法会被默认添加。所以即使你没有添加构造函数，也是会有一个默认的构造函数的。一般 `constructor` 方法返回实例对象 `this` ，但是也可以指定 `constructor` 方法返回一个全新的对象，让返回的实例对象不是该类的实例。

---

## super 关键字

引用[MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/super)的说法:

> **super**关键字用于访问和调用一个对象的父对象上的函数。
>
> 在构造函数中使用时，`super`关键字将单独出现，并且必须在使用`this`关键字之前使用。`super`关键字也可以用来调用父对象上的函数。