---
title: EventEmitter
---

## EventEmitter

PubSub 模式，是 Publish/Subscribe 的缩写，意为“发布/订阅”模式。

**方法：**

1. addListener(event, listener) | on(event, listener)：添加一个事件监听器。
2. removeListener(event, listener) | off(event, listener)：从一个事件中移除一个监听器。
3. once(event, listener)：添加一个只会被触发一次的监听器。
4. emit(event, ...args)：手动触发一个事件，并传递可选参数。
5. listeners(event)：返回指定事件的监听器数组。
6. listenerCount(event): 返回指定事件的监听器数量。

**属性：**

1. EventEmitter.defaultMaxListeners： 默认设置的最大监听器数量，默认值为 10。
2. emitter.eventNames()：返回所有的事件列表。
3. emitter.getMaxListeners()：获取最大监听器数量。
4. emitter.listenerCount(type)：获取事件的监听器数量。
5. emitter.rawListeners(event)：返回所有监听该事件的函数。

[实现一个EventEmitter](https://www.cnblogs.com/gotodsp/p/7111706.html#:~:text=PubSub%20%E6%A8%A1%E5%BC%8F%EF%BC%8C%E6%98%AF%20Publish%2FSubscribe%20%E7%9A%84%E7%BC%A9%E5%86%99%EF%BC%8C%E6%84%8F%E4%B8%BA%E2%80%9C%E5%8F%91%E5%B8%83%2F%E8%AE%A2%E9%98%85%E2%80%9D%E6%A8%A1%E5%BC%8F%E3%80%82%20%E5%9C%A8%E5%AE%9E%E9%99%85%E4%BD%BF%E7%94%A8%E4%B8%AD%EF%BC%8C%E6%88%91%E4%BB%AC%E5%BA%94%E8%AF%A5%E4%B9%9F%E4%BC%9A%E6%8E%A5%E8%A7%A6%E5%88%B0%20PubSub,%E6%A8%A1%E5%BC%8F%EF%BC%8C%E4%BE%8B%E5%A6%82%20Nodejs%20%E4%B8%AD%E7%9A%84%20EventEmitter%E3%80%81Backbone%20%E4%B8%AD%E7%9A%84%E4%BA%8B%E4%BB%B6%E6%A8%A1%E5%9E%8B%E3%80%81%E4%BB%A5%E5%8F%8A%20jQuery%20%E4%B8%AD%E7%9A%84%E4%BA%8B%E4%BB%B6%E3%80%82)

https://codesandbox.io/s/event-emitter-yvhm69?file=/src/index.js

```js
/**
 * @description:
 * @param {*} handles 存储 event 类型的 click、dblclick、change等
 */
export default class PubSub {
  constructor() {
    this.handlers = {}
  }
  // 注册事件监听器
  /**
   * @description: 注册事件监听器
   * @param {*} type 监听的事件类型
   * @param {*} listener 回调函数
   */  
  addListener(type, listener) {
    if (!(type in this.handlers)) {
      // handlers内不存在，就存储
      this.handlers[type] = []
    }
    // 将对应的事件处理函数存入 handlers[type]中
    this.handlers[type].push(listener)
  }
  // 移除事件监听器
  removeListener(type) {
    if (type in this.handlers) {
      const length = this.handlers[type].length
      if (length === 1) {
        delete this.handlers[type]
      }
    }
  }
  emit(type) {
    // args 为回调函数传入的参数
    // 截取传入的事件处理函数
    const args = [...arguments].slice(1)
    // 获取事件处理函数数组
    const eventList = this.handlers[type]
    /**
     * 循环遍历触发handlers中对应type的所有事件处理函数
     * for (const item of this.handlers[type])
     * item()
     * args 为事件处理函数传入的参数的集合:Array
     */
    // 如果 handlers 中存在该事件类型
    if(eventList) {
      // 循环遍历触发 handlers 中对应 type 的所有事件处理函数
      for (const item of eventList) {
        // item(args)
        item.apply(this, args)
    	}
    }
  }
}
```

触发

```js
import EventEmitter from './eventemitter.mjs'
const emitter = new EventEmitter()
const fn1 = function (val) {
  console.log('fn1', val)
}
const fn2 = function (val) {
  console.log('fn2', val)
}
emitter.addListener('message', fn1)
emitter.addListener('message', fn2)
emitter.emit('message', 'test1') // fn1 test1 fn2 test2
```



在removeListener中，为什么我们不直接delete this.events[event] 来删除注册的事件呢？

因为这样做可能会导致一些潜在的问题，在 EventEmitter 中，通过 `on` 方法注册的事件回调函数保存在了 `this.events[event]` 数组中，如果我们直接使用 `delete` 关键字删除 `this.events[event]` 对象的属性，虽然该属性会被删除，但是保存在数组中的回调函数仍然存在。

这种情况下，有两种解决方案：

1. 使用数组的 `splice` 方法从数组中删除指定的回调函数；
2. 重新分配一个新的空数组作为 `this.events[event]` 对象的值，这样既可以删除已有的回调函数，也不会影响到其他属性。

在 EventEmitter 中，我们选择使用第一种方案，即使用 `splice` 方法从数组中删除指定的回调函数。这种方案不会创建新的数组对象，也不会影响到其他属性，所以比较安全。





## EventTarget.removeEventListener()

https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/removeEventListener

```js
removeEventListener(type, listener);
removeEventListener(type, listener, options);
removeEventListener(type, listener, useCapture);
```

removeEventListener不能用来移除事件，该方法是用来删除事件处理函数的，其中第二个参数listener是必须的



## dispatchEvent手动触发事件

**`dispatchEvent()`** 方法会向一个指定的事件目标派发一个 [`Event`](https://developer.mozilla.org/zh-CN/docs/Web/API/Event)，并以合适的顺序（同步地）调用所有受影响的 `EventListener`

```ts
// 获取要触发的 DOM 节点
const myButton = document.getElementById('my-button');
// 创建事件对象
const myEvent = new Event('click');
// 将事件触发到 DOM 节点中
myButton.addEventListener('click', function(event) {
  console.log('Button clicked!');
});
myButton.dispatchEvent(myEvent);
```



customEvent自定义事件

```tsx
interface MyEventData {
  message: string
}

const ref = useRef<HTMLDivElement>(null)
const myCustomEvent = new CustomEvent<MyEventData>('my-event', {
    detail: 'HelloWorld'
  })
useEffect(() => {
    ref.current?.addEventListener('my-event', (e: Event) => {
      const event = e as CustomEvent<MyEventData>
      console.log(event.detail)
    })
    ref.current?.dispatchEvent(myCustomEvent) // 手动触发
  }, [])
return <div ref={ref}>click me</div>
```

看到这里的detail，突然就想到了小程序，小程序也有个e.detail

相关信息可以看小程序[triggerEvent](../../../小程序/开发API/小程序组件通信.md#自定义事件triggerEvent)

