---
title: React学习
---

## React

- 创建React元素

```js
// 1. 创建React元素
// 参数1：创建的元素名
// 参数2：元素的属性，如果没有，可以为null
// 参数3：元素的子节点或内容
// ...
// 返回值：React元素
const title = React.createElement('h1', null, 'Hello React')
```

- 渲染React元素

```js
// 参数1：要渲染的react元素
// 参数2：挂载点，需要将react元素渲染到哪儿
ReactDOM.render(title, document.getElementById('root'))
```

<!-- more -->

### setState

setState会重新渲染组件

### setState的两种方式

1.对象式

```js
const state = {
  number: 1
}
this.setState({
  num: this.state.num + 1
})
```

2.回调函数

```js
const state = {
  number: 1
}
this.setState((state) => ({
  number: state.number + 1
}));
```

回调式语法：

```jsx
this.setState((state, props) => {
  return {counter: state.counter + props.step};
});
```

### 注意:

this.setState()可能是异步的.

[官方原文:](https://zh-hans.reactjs.org/docs/state-and-lifecycle.html)

> ### State 的更新可能是异步的
>
> 出于性能考虑，React 可能会把多个 `setState()` 调用合并成一个调用。
>
> 因为 `this.props` 和 `this.state` 可能会异步更新，所以你不要依赖他们的值来更新下一个状态。



> #### 回调函数this丢失问题
>
> ```js
> const module = {
>   x: 42,
>   getX: function() {
>     return this.x;
>   }
> };
> console.log(module.getX());
> const unboundGetX = module.getX; //this会丢失
> console.log(unboundGetX()); // The function gets invoked at the global scope
> // expected output: undefined
> 
> const boundGetX = unboundGetX.bind(module);
> console.log(boundGetX());
> // expected output: 42
> ```
>
> 解决方法:使用bind()

### React组件中共享state

> 在 React 中，将多个组件中需要共享的 state 向上移动到它们的最近共同父组件中，便可实现共享 state。这就是所谓的“==状态提升==”。接下来，我们将 `TemperatureInput` 组件中的 state 移动至 `Calculator` 组件中去。



### React生命周期

https://segmentfault.com/a/1190000020348448

[官网](https://zh-hans.reactjs.org/docs/react-component.html)

[图](https://www.sollrei.me/post/frontend/2019-05-28)

<img src="https://www.sollrei.me/FrontEnd/_image/%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202019-05-28%20%E4%B8%8A%E5%8D%8810.22.49.png" style="zoom:80%;" />

#### 挂载阶段

当组件实例被创建并插入 DOM 中时，其生命周期调用顺序如下：

- [**`constructor()`**](https://zh-hans.reactjs.org/docs/react-component.html#constructor) 实例化
- [`static getDerivedStateFromProps()`](https://zh-hans.reactjs.org/docs/react-component.html#static-getderivedstatefromprops) 从props中获取state
- [**`render()`**](https://zh-hans.reactjs.org/docs/react-component.html#render) 渲染
- [**`componentDidMount()`**](https://zh-hans.reactjs.org/docs/react-component.html#componentdidmount) 完成挂载

#### 更新阶段

当组件的 props 或 state 发生变化时会触发更新。组件更新的生命周期调用顺序如下：

- [`static getDerivedStateFromProps()`](https://zh-hans.reactjs.org/docs/react-component.html#static-getderivedstatefromprops) 从props中获取state
- [`shouldComponentUpdate()`](https://zh-hans.reactjs.org/docs/react-component.html#shouldcomponentupdate) 判断是否需要重绘
- [**`render()`**](https://zh-hans.reactjs.org/docs/react-component.html#render) 渲染
- [`getSnapshotBeforeUpdate()`](https://zh-hans.reactjs.org/docs/react-component.html#getsnapshotbeforeupdate) 获取快照
- [**`componentDidUpdate()`**](https://zh-hans.reactjs.org/docs/react-component.html#componentdidupdate) 渲染完成后回调

#### 卸载阶段：

- `componentWillUnmount` 即将卸载。

#### 错误处理：

- `static getDerivedStateFromError` 从错误中获取 state。
- `componentDidCatch` 捕获错误并进行处理。（可以存储错误日志）

[CodeSandBox](https://codesandbox.io/s/react-lifecycle-6s80b?file=/src/Views/Main.jsx)

当组件的 props 或 state 发生变化时会触发更新。组件更新的生命周期调用顺序如下：

```jsx
import React from 'react'
import ReactDOM from 'react-dom'

// 组件的创建阶段(挂载阶段)
// 1. constructor()
//    (1) 提供初始化的数据, this.state={ ... }
//    (2) 创建 ref  this.demoRef = React.createRef()   将来 ref={this.demoRef}
//    (3) 处理this指向问题  this.handleClick = this.handleClick.bind(this)
// 2. render()
//    渲染UI, 但是在render中, 请不要调用 setState (死循环)
// 3. componentDidMount()  dom更新了
//    (1) 发送ajax请求
//    (2) dom操作

// 组件的更新阶段(组件重新渲染)
// 1. render() 渲染更新UI视图
// 2. componentDidUpdate() 更新完触发
// 在这两个钩子中, 不要调用 setState (死循环)
class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      msg: '嘎嘎',
    }
    console.log('constructor')
  }
  render() {
    console.log('render')
    return (
      <div>
        <h1>我是app组件</h1>
      </div>
    )
  }
  componentDidMount() {
    console.log('componentDidMount')
  }
  componentDidUpdate() {
    console.log('componentDidUpdate')
  }
}

ReactDOM.render(<App></App>, document.getElementById('root'))
```



## React Hooks

useState

useEffect 监听 state变化

```jsx
const [num, setNum] = useState(1)
useEffect(() => {
	console.log('num has changed!', num)
}, [num])

return (
	<button onClick={() => setNum(num + 1)}>num+1</button>
)
```

### useEffect

useEffect首次不执行







## Router路由

Router包裹

`<Link>`和`<NavLink>`是用来包裹显示的跳转链接的 精确匹配`exact`

`<Route>` 路由出口--->用来包裹点击跳转链接后要显示的内容



```jsx
<Route exact path="/home" component={Home} />

// 等效于 
<Route exact path="/home">
     <Detail>
</Route>
```





## React与Vue

#### React 实现watch





Error: Objects are not valid as a React child

React不能渲染对象







### 报错

Too many re-renders. React limits the number of renders to prevent an infinite loop

原因：花括号之间的所有值都会立即求值。
