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



### 数据更新

React useState是异步的，这就导致我们不能像vue那样修改数据后立刻调接口，因为这样使用的请求参数仍然是原来的值。

React 不会立即更新组件的状态，而是将状态更新放入队列，并在稍后的某个时刻批量处理这些更新。这可以提高性能，因为可以批量处理多个状态更新，避免了不必要的渲染。

如果想要在更新数据后调接口，可以使用useEffect来监听数据的变化



Vue数据更新是同步的

这使得在 Vue 中更容易追踪数据的变化，但也可能导致性能问题，尤其是在大型应用中频繁更新数据时。



useEffect和useAsyncEffect

```tsx
const getData = async () => {
        let res = await request(`/bavJob/detail`, {
            method: 'GET',
        });
        if (res.body) {
           // ...
        }
    };
useEffect(() => {
  getData
}, [])
```

```tsx
const getData = async () => {
        let res = await request(`/bavJob/detail`, {
            method: 'GET',
        });
        if (res.body) {
           // ...
        }
    };
useAsyncEffect(getData, [])
```

