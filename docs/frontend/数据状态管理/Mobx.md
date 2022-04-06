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





## 常见问题

1. [mobx-react-lite] 'useObserver(fn)' is deprecated. Use `<Observer>{fn}</Observer>` instead, or wrap the entire component in `observer`. 

   解决：使用`<Observer>{fn}</Observer>`代替`useObserver(fn)`

2. [mobx-react-lite] 'useLocalStore' is deprecated, use 'useLocalObservable' instead.

   解决：使用`useLocalObservable`代替`useLocalStore`

