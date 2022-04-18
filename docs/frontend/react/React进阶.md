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