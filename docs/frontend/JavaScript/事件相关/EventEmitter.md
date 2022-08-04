---
title: EventEmitter
---

## EventEmitter

PubSub 模式，是 Publish/Subscribe 的缩写，意为“发布/订阅”模式。

[实现一个EventEmitter](https://www.cnblogs.com/gotodsp/p/7111706.html#:~:text=PubSub%20%E6%A8%A1%E5%BC%8F%EF%BC%8C%E6%98%AF%20Publish%2FSubscribe%20%E7%9A%84%E7%BC%A9%E5%86%99%EF%BC%8C%E6%84%8F%E4%B8%BA%E2%80%9C%E5%8F%91%E5%B8%83%2F%E8%AE%A2%E9%98%85%E2%80%9D%E6%A8%A1%E5%BC%8F%E3%80%82%20%E5%9C%A8%E5%AE%9E%E9%99%85%E4%BD%BF%E7%94%A8%E4%B8%AD%EF%BC%8C%E6%88%91%E4%BB%AC%E5%BA%94%E8%AF%A5%E4%B9%9F%E4%BC%9A%E6%8E%A5%E8%A7%A6%E5%88%B0%20PubSub,%E6%A8%A1%E5%BC%8F%EF%BC%8C%E4%BE%8B%E5%A6%82%20Nodejs%20%E4%B8%AD%E7%9A%84%20EventEmitter%E3%80%81Backbone%20%E4%B8%AD%E7%9A%84%E4%BA%8B%E4%BB%B6%E6%A8%A1%E5%9E%8B%E3%80%81%E4%BB%A5%E5%8F%8A%20jQuery%20%E4%B8%AD%E7%9A%84%E4%BA%8B%E4%BB%B6%E3%80%82)

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
    const length = this.handlers[type].length
    if (length === 1) {
      // delete
    }
  }
  emit(type) {
    // args 为回调函数传入的参数
    // 截取传入的事件处理函数
    const args = [...arguments].slice(1)
    const eventList = this.handlers[type]
    /**
     * 循环遍历触发handlers中对应type的所有事件处理函数
     * for (const item of this.handlers[type])
     * item()
     * args 为事件处理函数传入的参数的集合:Array
     */
    for (const item of eventList) {
      // item(args)
      item.apply(this, args)
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

