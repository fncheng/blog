## React memo

参考：https://segmentfault.com/a/1190000025138329

我们都知道当组件props和state发生改变时，当前组件以及其子孙组件会重新渲染，但是有一些组件（纯文本组件）是不需要重新渲染的，这种不需要的组件被重新渲染会影响整体的渲染性能。

React.memo()和PureComponent很相似，都是用来控制组件何时渲染的。

通过控制组件何时渲染可以帮助我们解决这个问题，在React中可以用来优化组件性能的方法大概有以下几种:

- 组件懒加载(React.lazy(...)和\<Suspense />)
- PureComponent
- shouldComponentUpdate(...){...}生命周期函数
- React.memo

```tsx
// Parent.tsx
import React, { useState } from 'react';
import Child from '../Child';

const Parent = () => {
 const [count, setCount] = useState(0);
 console.log('parent render update')
 return (
     <React.Fragment>
         <div>{count}</div>
         <button onClick={() => setCount(count + 1)}>++++</button>
         <Child msg='test'/>
     </React.Fragment>
 )
}

export default Parent;
```

```tsx
// Child.tsx
import React from 'react';

const Child = (props) => {
 console.log('child render update');
 return <div>{props.msg}</div>
}

export default Child;
```

当父组件改变state时，Child组件也重新渲染了

而在Vue3中，这种情况不会出现。vue3已经对该情况优化过了。



```jsx
const MyComponent = React.memo(function MyComponent(props) {
  /* render using props */
});
```

`React.memo`是一个[高阶组件](https://reactjs.org/docs/higher-order-components.html)。功能与class component 中的PureComponent 类似



```jsx
import React, { memo, useState } from "react";

export default function Main() {
  const [number, setNumber] = useState(0);

  return (
    <>
      <span>{number}</span>
      <button
        onClick={() => {
          setNumber(number + 1);
        }}
      >
        btn
      </button>
      <BaseButton name={"zs"} />
    </>
  );
}

const BaseButton = memo((props) => {
  console.log("----子组件重新渲染----", props);
  return (
    <>
      <button
        onClick={() => {
          console.log("click button");
        }}
      >
        BaseButton
      </button>
      <span>{props.mykey}</span>
    </>
  );
});
```

这里使用memo后BaseButton就只会渲染一次，但是把BaseButton放到Main父组件内后，每次父组件更新，子组件都会重新渲染

这种情况下就需要useMemo了





### useMemo

`useMemo()` 基本用法如下：

```text
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```

useMemo() 返回的是一个 memoized 值，只有当依赖项（比如上面的 a,b 发生变化的时候，才会重新计算这个 memoized 值）

memoized 值不变的情况下，不会重新触发渲染逻辑。

useMemo 是在 render 期间执行的，所以不能进行一些额外的副操作，比如网络请求等。

**useMemo第二个参数**

- 空数组

  仅计算一次，即组件加载的时候

- 不传

  > If no array is provided, a new value will be computed on every render.

  如果没有提供依赖数组（上面的 [a,b]）则每次都会重新计算 memoized 值，也就会 re-redner



```jsx
import React, { useMemo, useState } from "react";

export default function Main() {
  const [number, setNumber] = useState(0);

  const BaseButton = useMemo(() => {
    console.log("----子组件重新渲染----");
    return (
      <>
        <button
          onClick={() => {
            console.log("click button");
          }}
        >
          BaseButton
        </button>
        {/* <span>{props.mykey}</span> */}
      </>
    );
  }, []);

  return (
    <>
      <span>{number}</span>
      <button
        onClick={() => {
          setNumber(number + 1);
        }}
      >
        btn
      </button>
      {BaseButton}
    </>
  );
}
```



```jsx
import React, { useState } from "react";

export default function Main() {
  const [number, setNumber] = useState(0);
  const handleClick = () => setNumber(number + 1);

  const BaseButton = (props) => {
    console.log("----子组件重新渲染----", props);
    return (
      <>
        <button>BaseButton</button>
        <span>{props.mykey}</span>
      </>
    );
  };

  return (
    <>
      <span>{number}</span>
      <button onClick={handleClick}>btn</button>
      <BaseButton mykey={"1312321"} name={"zs"} />
    </>
  );
}
```

这种情况，点击btn可以看到整个Main组件都会重新渲染。

<img src="https://minimax-1256590847.cos.ap-shanghai.myqcloud.com/img/20221110095445.png"/>

而如果将BaseButton写在外面

```jsx
import React, { useState } from "react";

export default function Main() {
  const [number, setNumber] = useState(0);
  const handleClick = () => setNumber(number + 1);

  return (
    <>
      <span>{number}</span>
      <button onClick={handleClick}>btn</button>
      <BaseButton mykey={"1312321"} name={"zs"} />
    </>
  );
}

const BaseButton = (props) => {
  console.log("----子组件重新渲染----", props);
  return (
    <>
      <button>BaseButton</button>
      <span>{props.mykey}</span>
    </>
  );
};
```

虽然也会触发----子组件重新渲染----

但是可以看到只有span 自己渲染了

<img src="https://minimax-1256590847.cos.ap-shanghai.myqcloud.com/img/20221110095554.png"/>



## diff算法

react 16 之前的 diff：https://www.cnblogs.com/forcheng/p/13246874.html

Fiber: https://zhuanlan.zhihu.com/p/26027085

React 通过大胆的假设，并基于假设提出相关策略，成功的将 O(n^3) 复杂度的问题转化为 O(n) 复杂度的问题。



### diff优化

- tree diff
- Component diff
- Element diff



#### Tree diff

React 只对虚拟 DOM 树进行分层比较，不考虑节点的跨层级比较。