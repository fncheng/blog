[https://developer.mozilla.org/zh-CN/docs/learn/JavaScript/%E5%BC%82%E6%AD%A5/Async_await](https://developer.mozilla.org/zh-CN/docs/learn/JavaScript/异步/Async_await)

# async函数

async函数是[`AsyncFunction`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/AsyncFunction)构造函数的实例。

**返回值**

一个[`Promise`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise)，这个promise要么会通过一个由async函数返回的值被解决，要么会通过一个从async函数中抛出的（或其中没有被捕获到的）异常被拒绝。

⚠️：async函数永远返回的是一个 `Promise`

#### async await 是Promise的语法糖

## async await 防止阻塞

```js
// Define custom promise function

function timeoutPromise(interval) {
  return new Promise((resolve, reject) => {
    setTimeout(function () {
      resolve('done')
    }, interval)
  })
}

async function timeTest() {
  // 这段代码看起来像同步的,执行起来也像同步的。原因是前一个await会阻塞后一个await进程的执行
  // 通过将 Promise 对象存储在变量中来同时开始它们，然后等待它们全部执行完毕。可以缓解这个问题
  // await timeoutPromise(3000)
  // await timeoutPromise(3000)
  // await timeoutPromise(3000)

  // 上面的代码等价于  每一个timeoutPromise都会阻塞后面一个timeoutPromise的执行
  // const timeoutPromise1 = timeoutPromise(3000)
  // await timeoutPromise1
  // const timeoutPromise2 = timeoutPromise(3000)
  // await timeoutPromise2
  // const timeoutPromise3 = timeoutPromise(3000)
  // await timeoutPromise3

  // 将三个Promise存储在变量中,这样可以同时启动三个Promise关联的进程,最终需要的时间只需要3s
  const timeout1 = timeoutPromise(3000)
  const timeout2 = timeoutPromise(3000)
  const timeout3 = timeoutPromise(3000)

  await timeout1
  await timeout2
  await timeout3
}

let startTime = Date.now()
timeTest().then(() => {
  let finishTime = Date.now()
  let timeTaken = finishTime - startTime
  console.log('Time taken in milliseconds: ' + timeTaken)
})
```

