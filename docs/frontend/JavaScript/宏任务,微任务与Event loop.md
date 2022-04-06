<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [宏任务、微任务、同步任务、异步任务与Event Loop](#%E5%AE%8F%E4%BB%BB%E5%8A%A1%E5%BE%AE%E4%BB%BB%E5%8A%A1%E5%90%8C%E6%AD%A5%E4%BB%BB%E5%8A%A1%E5%BC%82%E6%AD%A5%E4%BB%BB%E5%8A%A1%E4%B8%8Eevent-loop)
  - [同步和异步](#%E5%90%8C%E6%AD%A5%E5%92%8C%E5%BC%82%E6%AD%A5)
  - [js事件循环](#js%E4%BA%8B%E4%BB%B6%E5%BE%AA%E7%8E%AF)
  - [宏任务(task)、微任务(Microtasks)？](#%E5%AE%8F%E4%BB%BB%E5%8A%A1task%E5%BE%AE%E4%BB%BB%E5%8A%A1microtasks)
    - [宏任务](#%E5%AE%8F%E4%BB%BB%E5%8A%A1)
    - [微任务](#%E5%BE%AE%E4%BB%BB%E5%8A%A1)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## 宏任务、微任务、同步任务、异步任务与Event Loop

### Event Loop(事件轮询)

```wiki
"Event Loop是一个程序结构，用于等待和发送消息和事件。（a programming construct that waits for and dispatches events or messages in a program.）"
```

简单说，就是在程序中设置两个线程：一个负责程序本身的运行，称为"主线程"；另一个负责主线程与其他进程（主要是各种I/O操作）的通信，被称为"Event Loop线程"（可以译为"消息线程"）。

### 同步和异步

- 同步: 程序执行过程中,上一个任务结束立即执行下一个任务,执行的顺序和代码的顺序一致。

console.log() 就是一个同步任务

- 异步: 程序执行过程中,上一个任务执行结束立即执行回调函数,下一个任务不用等到上一个任务执行完成再执行,执行的顺序和代码书写的顺序有些差异。

[**异步简介**](https://developer.mozilla.org/zh-CN/docs/learn/JavaScript/%E5%BC%82%E6%AD%A5/%E7%AE%80%E4%BB%8B)

常见的异步任务: Ajax,DOM事件操作,setTimeout,Promise的then方法,node读取文件

##### 异步的三种实现方式

```markdown
1）回调函数 
         回调函数不一定是异步 , 但异步一定有回调函数 
2）事件
3）Promise
```

需要注意的是⚠️：Promise构造函数是同步执行的（new Promise是同步的），而Promise是异步的（then，catch操作是异步的）

参考链接:

- [JS事件循环机制（event loop）](https://juejin.im/post/5b498d245188251b193d4059#heading-2)

- [javascript是单线程语言，那他的异步机制是怎么实现的？](https://github.com/zlx362211854/daily-study/issues/22#)

**异步任务又分为宏任务和微任务**

### 宏任务(task)、微任务(Microtasks)？

宏任务和微任务都是异步任务,它们都属于一个队列，主要区别在于他们的执行顺序，Event Loop的走向和取值。

<img src="https://user-gold-cdn.xitu.io/2018/7/14/164974fa4b42e4af?imageView2/0/w/1280/h/960/format/webp/ignore-error/1" alt="cmd-markdown-logo" style="zoom:80%;" />

##### 宏任务

| #                       | 浏览器 | Node |
| :---------------------- | :----: | :--: |
| `I/O`                   |   ✅    |  ✅   |
| `setTimeout`            |   ✅    |  ✅   |
| `setInterval`           |   ✅    |  ✅   |
| `setImmediate`          |   ❌    |  ✅   |
| `requestAnimationFrame` |   ✅    |  ❌   |

##### 微任务

| #                            | 浏览器 | Node |
| :--------------------------- | :----: | :--: |
| `process.nextTick`           |   ❌    |  ✅   |
| `MutationObserver`           |   ✅    |  ❌   |
| `Promise.then catch finally` |   ✅    |  ✅   |



### js事件循环

**Event Queue:**

**事件队列**是一个存储库，在此存储来自应用程序的事件，然后再由接收程序或系统对其进行处理。
事件队列通常在企业消息传递系统的上下文中使用。

<img src="https://user-gold-cdn.xitu.io/2018/7/14/164974fb89da87c5?imageView2/0/w/1280/h/960/format/webp/ignore-error/1" alt="cmd-markdown-logo" style="zoom:80%;" />

- 同步和异步任务分别进入不同的执行"场所"，同步的进入主线程，异步的进入Event Table并注册函数
- 当指定的事情完成时，Event Table会将这个函数移入Event Queue。
- 主线程内的任务执行完毕为空，会去Event Queue读取对应的函数，进入主线程执行。
- 上述过程会不断重复，也就是常说的Event Loop(事件循环)。





![](https://user-images.githubusercontent.com/18441915/68822044-d088ad00-06ca-11ea-8570-54a683dfef5d.jpg)



### js执行顺序

https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/

同步 > 异步 > 微任务 > 宏任务

Promise构造函数是同步执行的，即new Promise() 是同步的，【**也就是说new Promise()会立即执行**】then函数本身也是同步的，不过then(callback) 里面的callback被放入了微任务队列，产生了异步执行

