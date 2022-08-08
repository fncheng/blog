---
title: React组件复用
---

## Class Component方式

React实现复用有俩种方式：

1. 高阶组件 HOC
2. render props模式



### render props

[doc](https://zh-hans.reactjs.org/docs/render-props.html)

复用下面的逻辑

```js
import { debounce } from "lodash-es";
import React from "react";
class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = { x: 0, y: 0 };
    // this.handleMouseMove = this.handleMouseMove.bind(this)
  }
  handleMouseMove = (e) => {
    this.setState({
      x: e.clientX,
      y: e.clientY
    });
  };
  render() {
    return (
      <div
        style={{ height: "100vh" }}
        onMouseMove={debounce(this.handleMouseMove, 300)}
      >
        <h1>移动鼠标</h1>
        <p>
          当前鼠标的位置是({this.state.x},{this.state.y})
        </p>
      </div>
    );
  }
}
export default Main;
```

[codesandbox](https://codesandbox.io/s/react-render-props-3fxhh?file=/src/Views/Main.jsx)



### Render props 和 vue 插槽

render props实际上就是往组件传递一个props属性，该属性是个函数，返回一个组件，也就是往组件内部再传递一个组件。

这不就是vue中的插槽吗。

而render props函数如果有参数，则往内部组件传递了参数，这不就是vue作用域插槽吗。

Vue 中的scope就类似于React中的props，接收子组件的全部属性

```jsx
class Main extends React.Component {
  render() {
    return (
      <div>
        <h1>移动鼠标！</h1>
        <Mouse name={name} render={(mouse) => <Cat mouse={mouse} />} />
      </div>
    );
  }
}
// 这里不一定要用render这个属性传递，也可以使用其他自定义的名称，只不过为了统一，命名为render
```

这里的props就是name、render的集合

而在Vue中

```vue
<template>
  <div class="tag">
    <slot :name="header" :state="state" :id="'id'"></slot>
  </div>
</template>

// 父组件
<template>
  <div class="home">
    <tag>
      <template v-slot:default="scope">
        {{ scope.state }}
      </template>
    </tag>
  </div>
</template>
```

这里的scope就是id、state的集合 ( name属性比较特殊，不会暴露出去 )



CodeSandBox.io 关于vue 使用console.log后会报错

```js
Property or method "children" is not defined on the instance but referenced during render.
```

