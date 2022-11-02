Mobx中包含了几个重要的属性和字段，分别有：

1. observable
2. action
3. compute
4. observer
5. autorun

虽然有5个属性，但总体来讲主要分为3类：

1. 被观察者：observable
2. 观察者：observer，autorun
3. 修改被观察者的方法：action，compute



## Mobx概念

### observerable & observer

[doc](https://github.com/mobxjs/mobx/tree/mobx4and5/docs#core-concepts)

observerable可以用来观察数据结构（如对象、数组和类实例）

```jsx
import { observable } from 'mobx'
import { observer } from 'mobx-react'
const store = observable({
  name: 'zs',
  age: 21,
})

@observer
class Main extends React.Component {
  doClick = () => {
    store.count = Math.random().toFixed(2)
  }
  render() {
    return (
      <>
        <div>{store.count}</div>
        <button onClick={() => this.doClick()}>count++</button>
      </>
    )
  }
}
```



### action

action返回一个函数





### Mobx5 vs Mobx6
https://juejin.cn/post/6972090480288858142

- 在Mobx6，将数据变成可观察的有 makeObservable, makeAutoObservable, observable 三个 Api

- observable 具有与 makeAutoObservable 相同的 参数配置，但是**它不会将源对象转变为 Observable，
  而是创建一个新的 Observable 对象, 同时创建的对象是通过 proxy 包裹的，可以追加新的属性**，
  **make(Auto)Observable 不能直接追加新的属性，追加后，新的属性不具有响应能力**
  理论上 make(Auto)Observable 修改后的对象是非 Proxy 对象，处理速度上会更快，
  因此 建议使用 make(Auto)Observable 并提前确定好属性

  

- 对于基本类型的值来说，[observable.box](https://www.mobxjs.com/api#observablebox) 用来将简单类型变成 Observable，这个 Api 专门用来处理简单类型数据 例如 string | number 。

```jsx
const count = observable.box(3);

<div>{count.get()}</div>

count.set(count + 1);
```



## 常见问题

1. [mobx-react-lite] 'useObserver(fn)' is deprecated. Use `<Observer>{fn}</Observer>` instead, or wrap the entire component in `observer`. 

   解决：使用`<Observer>{fn}</Observer>`代替`useObserver(fn)`

2. [mobx-react-lite] 'useLocalStore' is deprecated, use 'useLocalObservable' instead.

   解决：使用`useLocalObservable`代替`useLocalStore`

