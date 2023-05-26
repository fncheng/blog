---
title: React与Vue
---



## React 与 Vue

直接在render方法中为元素事件定义事件处理函数，最大的问题是，每次render调用时，都会重新创建一次新的事件处理函数，带来额外的性能开销，组件所处层级越低，这种开销就越大，因为任何一个上层组件的变化都可能会触发这个组件的render方法。当然，在大多数情况下，这种性能损失是可以不必在意的。



## React 与 Vue 不同点

React和Vue的一个突出区别就是Immutable 数据不可变性

Vue讲究的是双向绑定，修改状态时直接对数据进行赋值

而React则是每次更新组件都不要直接修改 state 里的数据，而是生成一个新的 state 来替换

```js
this.setState({
  list: [...this.state.list, 'new data']
})
```

