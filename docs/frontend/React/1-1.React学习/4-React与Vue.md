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

### 数据流动（组件状态的更新）

今天重温Vue，发现Vue和React一样，都可以将修改父组件值的方法通过props传递给子组件，然后子组件调用这个方法就可以修改对应值了。这个体现了单向数据流的特点，即组件状态只能从父流向子

而Vue还多了一个emit，$emit 触发一个自定义事件，父组件监听该事件并响应。允许数据从子组件流向父组件。这是一种典型的父子组件通信模式，通常用于将子组件中的数据传递给父组件，以便在父组件中进行处理或显示。

### vue的emit允许子组件将数据传递到父组件，这难道不是双向数据流吗

尽管 Vue.js 中可以使用 `emit` 来实现子组件向父组件的数据传递，但这并不等同于传统意义上的双向数据流，因为数据的更改仍然是通过父组件来控制的。子组件通过 `emit` 向上传递数据，但父组件仍然需要监听事件并决定如何处理这些数据，然后才能将数据传递回子组件。

总之，Vue.js 的数据流动是单向的



### 在setState后立刻调接口，请求参数不是最新的

这是因为useState是异步的，其实可以这么写

```tsx
const pageChange = (page: number, pageSize: number) => {
    const params = { ...searchParams, pageNum: page, pageSize };
    setSearchParams(params);
    getTableDataFn(params);
};
```

这样写getTableDataFn还符合纯函数的风格，输出只与输入有关，无副作用



## 重新渲染

我们知道在Vue中，当一个组件的state发生变化，而这个state没有在视图中使用到时，组件是不会重新渲染的

而在React中，只要state变化了就会触发re-render



## 生命周期

在 Vue.js 中，子组件的更新并不会直接触发父组件的 `updated` 钩子。
