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



⚠️注意：this.setState()可能是异步的.

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

`useLayoutEffect` 和 `useEffect` 都是 React Hook 中的函数，用于在组件渲染完成后执行一些副作用操作。

不同之处在于它们执行的时间点不同。

- `useEffect` 在组件渲染完成后执行，它是在浏览器绘制完成后异步执行的。这意味着它不会阻塞浏览器的渲染过程，因此适用于不需要同步更新 UI 的副作用操作。
- `useLayoutEffect` 在组件渲染完成后同步执行，它会在浏览器绘制之前执行。这意味着它会阻塞浏览器的渲染过程，因此在性能敏感的场景下应谨慎使用。使用 `useLayoutEffect` 可能会导致用户感知的延迟或者页面不流畅。



## useEffect清除定时器

在使用 useEffect 的过程中，如果你需要清除定时器，可以使用 useEffect 的返回函数来实现。

示例代码如下：

```javascript
import { useEffect, useState } from "react";

function Timer() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCount((prevCount) => prevCount + 1);
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return <div>{count}</div>;
}
```

在这个例子中，我们使用 useEffect 来创建定时器，并且在返回函数中清除定时器。具体来说，我们在 useEffect 中创建了一个 intervalId 变量来存储定时器的 ID，然后在返回函数中使用 clearInterval(intervalId) 来清除定时器。

需要注意的是，清除定时器的操作不会立即执行，而是在组件销毁时才执行。同时，由于我们在依赖项列表中传入了一个空数组，所以这个 useEffect 只会在组件第一次渲染时执行。如果你需要在某个状态值发生变化时重新创建定时器，那么可以将这个状态值作为依赖项传入 useEffect 中。



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



## React forwardRef

React 的 forwardRef 是一种用于传递 ref 给子组件的技术。它允许父组件能够访问或操作子组件中的 DOM 元素或组件实例。

使用 forwardRef，您可以在父组件中创建 ref，并将其传递给子组件，从而使父组件能够直接引用子组件的 DOM 元素或实例。

```tsx
import React, { useRef, useImperativeHandle, forwardRef } from 'react';

// 子组件
const ChildComponent = forwardRef((props, ref) => {
  const inputRef = useRef();

  useImperativeHandle(ref, () => ({
    // 暴露给父组件的方法
    focus: () => {
      inputRef.current.focus();
    },
    // 暴露给父组件的其他属性或方法
    // ...
  }));

  return <input type="text" ref={inputRef} />;
});

// 父组件
const ParentComponent = () => {
  const childRef = useRef();

  const handleClick = () => {
    childRef.current.focus(); // 通过 ref 调用子组件方法
  };

  return (
    <div>
      <ChildComponent ref={childRef} /> {/* 将 ref 传递给子组件 */}
      <button onClick={handleClick}>Focus</button> {/* 调用子组件的方法 */}
    </div>
  );
};

export default ParentComponent;
```

在使用 `ref` 获取子组件引用时，有两个注意事项：

1. 子组件必须是一个类组件或通过 `React.forwardRef` 创建的函数组件。
2. 如果子组件是函数组件，并且未通过 `React.forwardRef` 创建，你无法直接访问它的内部实例或方法。你可以通过在子组件中使用 `useImperativeHandle` 钩子将需要暴露给父组件的实例或方法绑定到 `ref` 上。

### useImperativeHandle

useImperativeHandle 是 React 中的一个自定义 Hook，它允许您定义在通过 forwardRef 包裹的组件中暴露给父组件的方法或属性。

useImperativeHandle 接受两个参数：ref 和一个回调函数。在回调函数中，您可以返回一个对象，该对象将成为通过 ref 引用的组件的实例。

```tsx
import React, { useRef, useImperativeHandle, forwardRef } from 'react';

const ChildComponent = forwardRef((props, ref) => {
  const inputRef = useRef();

  useImperativeHandle(ref, () => ({
    // 暴露给父组件的方法或属性
    focus: () => {
      inputRef.current.focus();
    },
    // 其他暴露给父组件的方法或属性
    // ...
  }));

  return <input type="text" ref={inputRef} />;
});

const ParentComponent = () => {
  const childRef = useRef();

  const handleClick = () => {
    childRef.current.focus(); // 通过 ref 调用子组件方法
  };

  return (
    <div>
      <ChildComponent ref={childRef} /> {/* 将 ref 传递给子组件 */}
      <button onClick={handleClick}>Focus</button> {/* 调用子组件的方法 */}
    </div>
  );
};

export default ParentComponent;
```



## createPortal

`createPortal` 是 React 中的一个函数，用于将子组件渲染到 DOM 树中的指定位置，而不是直接在父组件内部渲染。

createPortal(children, domNode, key?)



## 受控组件和非受控组件

受控组件：

- 可以实时获取和操作表单数据：通过将表单元素的值与状态变量绑定，可以实时获取和操作用户输入的数据。
- 提供更精细的验证和处理逻辑：由于表单数据完全由状态变量控制，您可以在状态变量上执行各种验证和处理逻辑。
- 适用于复杂的表单：对于包含多个字段、依赖关系或动态增减字段的复杂表单，受控组件可以提供更好的可控性和灵活性。

非受控组件：

- 简化代码：非受控组件不需要为每个表单元素都维护一个状态变量，可以简化代码。
- 适用于简单的表单：对于只包含少量简单字段的表单，非受控组件可能更加方便和快速。
- 快速获取表单数据：通过 ref 来访问表单元素，可以在需要的时候快速获取表单数据。
