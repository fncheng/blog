<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Promise的状态](#promise%E7%9A%84%E7%8A%B6%E6%80%81)
- [then-catch](#then-catch)
  - [then vs then catch](#then-vs-then-catch)
  - [Promise的学习](#promise%E7%9A%84%E5%AD%A6%E4%B9%A0)
  - [链式操作+递归](#%E9%93%BE%E5%BC%8F%E6%93%8D%E4%BD%9C%E9%80%92%E5%BD%92)
- [Promise 防止阻塞](#promise-%E9%98%B2%E6%AD%A2%E9%98%BB%E5%A1%9E)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

Promise对象：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise

## Promise的状态

三种状态:

- `pending`（进行中）
- `fulfilled`（已成功）
- `rejected`（已失败）

只有异步操作的结果，可以决定当前是哪一种状态，任何其他操作都无法改变这个状态。

`Promise`对象的状态改变，只有两种可能：从`pending`变为`fulfilled`和从`pending`变为`rejected`。

```js
// Promise实例
const promise = new Promise(function(resolve, reject) {
  // ... some code

  if (/* 异步操作成功 */){
    resolve(value);
  } else {
    reject(error);
  }
});
```

`Promise`构造函数接受一个函数作为参数，该函数的两个参数分别是`resolve`和`reject`。

resolve和reject是两个回调函数



### then-catch

[then方法](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/then)

`then()` 方法返回一个 [`Promise`](https://developer.mozilla.org/zh-CN/docs/Web/API/Promise)。它最多需要有两个参数：Promise 的成功和失败情况的回调函数。

then也可以捕获错误

```js
p.then(onFulfilled[, onRejected]);
/* 
onFulfilled 可选
当 Promise 变成接受状态（fulfilled）时调用的函数。该函数有一个参数，即接受的最终结果（the fulfillment  value）。如果该参数不是函数，则会在内部被替换为 (x) => x，即原样返回 promise 最终结果的函数
onRejected 可选
当 Promise 变成拒绝状态（rejected）时调用的函数。该函数有一个参数，即拒绝的原因（rejection reason）。  如果该参数不是函数，则会在内部被替换为一个 "Thrower" 函数 (it throws an error it received as argument)。
*/
```

```js
const pm1 = new Promise((resolve, reject) => {
  resolve('success')
})

pm1.then(
  (val) => {
    console.log(val)
  },
  (err) => {
    console.log(err)
  }
)
```

[catch方法](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/catch)

```js
p.catch(onRejected);

p.catch(function(reason) {
   // 拒绝
});
```



catch实际上是then的语法糖,mdn关于catch的解释

> **catch()** 方法返回一个[Promise](https://developer.mozilla.org/zh-CN/docs/Web/API/Promise)，并且处理拒绝的情况。它的行为与调用[`Promise.prototype.then(undefined, onRejected)`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/then) 相同。 (事实上, calling `obj.catch(onRejected)` 内部calls `obj.then(undefined, onRejected)`).



#### then vs then catch

```js
myPromise.then(function() {
   // Some error may happen
   throw('An exception that would be caught');
}).catch(function() {
    console.log('error');
});
// Is the same as this, the errHandle tries to catch any unhandled error
// from previous result.
myPromise.then(func, null).then(null, errHandle);


myPromise.then(function() {
   // Some error may happen
   throw('An unhandled exception.');
}, function() {
    // This won't log the error if it happens in the 
    // some error may happen block.
    console.log('error');
});
// Is the same as this, the errHandle will handle errors from previous result,
// but it won't handle errs in func.
myPromise.then(func, errHandle)
```



---

**一般总是建议，Promise 对象后面要跟`catch()`方法，这样可以处理 Promise 内部发生的错误。**catch()方法返回的还是一个 Promise 对象，因此后面还可以接着调用then()方法。

<!--more-->

```js
const someAsyncThing = function() {
  return new Promise(function(resolve, reject) {
    // 下面一行会报错，因为x没有声明
    resolve(x + 2);
  });
};

someAsyncThing()
.catch(function(error) {
  console.log('oh no', error);
})
.then(function() {
  console.log('carry on');
});
// oh no [ReferenceError: x is not defined]
// carry on
```

上面代码运行完`catch()`方法指定的回调函数，会接着运行后面那个`then()`方法指定的回调函数。如果没有报错，则会跳过`catch()`方法。

#### 错误处理

[使用 promise 进行错误处理](https://zh.javascript.info/promise-error-handling)

```js
new Promise((resolve, reject) => {
  throw new Error("Whoops!");
}).catch(alert); // Error: Whoops!
```

……与下面这段代码工作上完全相同：

```js
new Promise((resolve, reject) => {
  reject(new Error("Whoops!"));
}).catch(alert); // Error: Whoops!
```



#### Promise的学习

```js
var p = new Promise(function (resolve, reject) {
  //做一些异步操作
  setTimeout(function () {
    console.log('执行完成')
    resolve('随便什么数据')
  }, 2000)
})

p.then((res) => console.log(res)).catch((err) => console.log(err))
// then方法接收一个参数,是函数,并且会拿到我们在p中调用resolve时传的参数。
// 运行这段代码，会在2秒后输出"执行完成"，紧接着输出"随便什么数据"。
```

#### 链式操作+递归

```js
function runAsync(param) {
  return new Promise(function (resolve, reject) {
    //做一些异步操作
    setTimeout(function () {
      console.log('执行完成')
      resolve(param)
    }, 500)
  })
}

runAsync(1)
  .then((res) => {
    console.log(1)
    return runAsync(2)
  })
  .then((res) => {
    console.log(res)
    return runAsync(3)
  })
  .then((res) => console.log(res))
/* 执行完成
	 1
	 执行完成
   2
   执行完成
   3  */
```

### Promise.all

```js
function makePromise(time) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(time);
    }, time);
  });
}
Promise.all([makePromise(2000), makePromise(3000), makePromise(4000)]).then(
  (res) => {
    console.log(res);
  }
);
//[ 2000, 3000, 4000 ]
//exited with code=0 in 5.054 seconds
// 在所有Promise的状态都凝固后再执行then
```

### Promise.allSettled

```js
Promise.allSettled([pm2, pm1, pm2, makePromise(5000)])
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });
/*
[
  { status: 'fulfilled', value: 'error' },
  { status: 'fulfilled', value: 2000 },
  { status: 'fulfilled', value: 'error' },
  { status: 'fulfilled', value: 5000 }
]
*/
// exited with code=0 in 5.054 seconds

```

当您有多个彼此不依赖的异步任务成功完成时，或者您总是想知道每个`promise`的结果时，通常使用它。

相比之下，`Promise.all()` 更适合彼此相互依赖或者在其中任何一个`reject`时立即结束。

### Promise 防止阻塞

**Promise** 对象用于表示一个异步操作的最终完成 (或失败), 及其结果值.

语法:

```js
new Promise( function(resolve, reject) {...} /* executor */  );
```

promise防止阻塞

```js
function timeoutPromise(interval) {
  return new Promise((resolve, reject) => {
    setTimeout(function () {
      console.log('done')
      resolve('done')
    }, interval)
  })
}

function timeTest() {
  // return timeoutPromise(2000)
  //   .then(() => timeoutPromise(3000))
  //   .then(() => timeoutPromise(4000))

  // 防止阻塞 赋值的本质 是因为Promise实例一旦建立就会立即执行,而后面的then是为了获取Promise实例的状态
  const timeout1 = timeoutPromise(2000)
  const timeout2 = timeoutPromise(3000)
  const timeout3 = timeoutPromise(4000)
  return timeout1.then(() => timeout2).then(() => timeout3)
}

let startTime = Date.now()
timeTest().then(() => {
  let finishTime = Date.now()
  let timeTaken = finishTime - startTime
  console.log('Time taken in milliseconds: ' + timeTaken)
})
```

对应的[async await版本](../async-await语法糖)

### Promise的执行顺序

Mdn：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Using_promises

### 时序

为了避免意外，即使是一个已经变成 resolve 状态的 Promise，传递给 `then()` 的函数也总是会被异步调用：

```js
Promise.resolve().then(() => console.log(2));
console.log(1); // 1, 2
```

传递到 `then()` 中的函数被置入到一个微任务队列中，而不是立即执行，这意味着它是在 JavaScript 事件队列的所有运行时结束了，且事件队列被清空之后，才开始执行：

```js
const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

wait().then(() => console.log(4));
Promise.resolve().then(() => console.log(2)).then(() => console.log(3));
console.log(1); // 1, 2, 3, 4
```



### Async await reject问题

async await语法不能接收reject，需要使用try catch处理



