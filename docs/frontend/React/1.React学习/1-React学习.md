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

setState的两种方式

1.对象式

```js
<button onClick={() => {
  this.setState({
  	number: this.state.number + 1
  });
  console.log(this.state);
}} />
```

如果想要在更新完状态后立刻拿到该状态，可以在回调中调用。

```js
this.setState({number: this.state.number + 1}, () => {
  console.log(this.state.number);
})
```



2.函数式

```js
<button onClick={() => {
  this.setState((state) => {
    return {
      number: state.number + 1
    };
  });
  console.log(this.state);
}} />
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

### useState

### useEffect

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



useEffect首次不执行

useEffect的第二个参数，可用来监听依赖的变化。



### useEffect和useLayoutEffect

useEffect可以起到watch的作用

useEffect[callback, dep]

第二个参数为空数组时，callback只会运行一次，在mount的时候



## Reducer函数

Reducer函数则是一种函数式编程的概念，用于将一个状态转化为另一个状态，从而实现对应用程序状态的更新操作。Reducer函数接收一个状态和动作(action)对象作为参数，然后根据动作对象的类型来更新状态，并返回更新后的新状态。

Reducer函数的实现应当符合以下原则：

1. 状态不可变性：Reducer函数更新状态的方式是根据当前状态克隆出一个新的状态对象，并在新的状态对象上进行修改，而不是在当前状态上直接进行修改。
2. 纯函数：Reducer函数应该是纯函数，即其返回值只取决于传入参数的值，不依赖于任何外部因素，也不会对外部环境造成任何影响。
3. 单向数据流：Reducer函数的作用是对当前状态进行转换，从而输出一个新的状态对象作为下一次输入的状态，实现一种单向数据流。在更新状态时，应根据旧状态和动作对象计算出新状态，而不是直接修改旧状态。

下面是一个简单的Reducer函数：

```js
function counterReducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    default:
      return state;
  }
}
```

Reducer函数通常与React的`useReducer` Hook搭配使用，将其作为`useReducer` Hook的第一个参数传递进去。最终可以通过`dispatch`函数派发一个动作对象，来触发Reducer函数的执行，从而实现对应用程序状态的更新。

### 手动触发reducer

```tsx
function counterReducer(state: State, action: Action) {
    switch (action.type) {
      case 'increment':
        return { count: state.count + 1 }
      case 'decrement':
        return { count: state.count - 1 }
      default:
        return state
    }
  }
const initialState: State = { count: 0 }
const [state, setState] = useState(currentState)
const dispatch = (action: Action) => setState(counterReducer(state, action))

return <button onClick={() => dispatch({ type: 'increment' })}>{state.count}</button>
```



### useReducer触发

useReducer的源码很简单，useReducer实际上就是把上面一个过程封装起来

```ts
function useReducer(reducer, initialState) {
  const [state, setState] = useState(initialState)
  const dispatch = (action) => {
    const nextState = reducer(state, action)
    setState(nextState)
  }
  return [state, dispatch]
}
```



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

