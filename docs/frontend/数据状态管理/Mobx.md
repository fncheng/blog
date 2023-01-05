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



## Mobx使React组件响应式

mobx有三种方法去做observe：observer，Observer，useObserver。

### 1.observer

首先使用observer HOC包裹组件，生成一个watcher

> mobx-react 提供了一个名为 observer 的高阶组件

其次使用useLocalObservable包装属性

```jsx
const TimerView = observer(() => {
  const timer = useLocalObservable(() => ({
    count: 0,
    increment() {
      this.count = this.count + 1;
    }
  }));
  const handleClick = (e) => {
    timer.count = timer.count + 1;
  };

  return (
    <div>
      <span>{timer.count}</span>
      <button
        onClick={() => {
          console.log(timer);
          timer.increment();
        }}
      >
        btn
      </button>
      <button onClick={handleClick}>button2</button>
    </div>
  );
});
```

**装饰器和class写法**

```jsx
@observer
class TimerView extends React.Component {
  timer = observable({
    count: 0
  });
  handleClick = (e) => {
    console.log(this.timer);
    this.timer.count = this.timer.count + 1;
  };
  render() {
    return (
      <div>
        <span>{this.timer.count}</span>
        <button onClick={this.handleClick}>button2</button>
      </div>
    );
  }
}
```

以上两种写法是等效的

### 2.Observer

```jsx
import { observable } from "mobx";
import { Observer } from "mobx-react";

function Main() {
  const store = observable({
    count: 100
  });
  const handleClick = (e) => {
    store.count = store.count + 1;
  };
  return (
    <>
      <Observer>{() => <span>{store.count}</span>}</Observer>
      <button onClick={handleClick}>count++</button>
    </>
  );
}
```

### 3.useObserver

useLocalObservable和useObserver都是属于hooks，必须在函数组件内使用

[mobx-react-lite] 'useObserver' is deprecated, use 'Observer' instead.

已经不再推荐使用useObserver

```jsx
export default function App() {
  const store = useLocalObservable(() => {
    console.log("useLocalObservable init");
    return {
      number: 0
    };
  });
  const handleClick = () => {
    store.number = store.number + 1;
  };
  const MySpan = useObserver(() => <span>{state.count}</span>);
  return (
    <div className="App">
      {MySpan}
      <button onClick={handleClick}>button</button>
    </div>
  );
}
```



## Mobx使数据响应式

### 1.observable

### 2.useLocalObservable

> 返回一个被mobx包装过的对象
>
> Proxy {Symbol(mobx administration): ObservableObjectAdministration}

useLocalObservable是一个语法糖：

```js
const [state] = useState(() =>
  observable(initializer(), annotations, { autoBind: true })
)
```

```jsx
const TimerView = observer(() => {
  const timer = useLocalObservable(() => ({
    count: 0,
    increment() {
      this.count = this.count + 1;
    }
  }));

  return (
    <div>
      <span>{timer.count}</span>
      <button
        onClick={() => {
          console.log(timer);
          timer.increment();
        }}
      >
        btn
      </button>
    </div>
  );
});
```



### Mobx6 computed

Decorator for class properties: @computed get value() { return expr; }. For legacy purposes also invokable as ES5 observable created: `computed(() => expr)`;

```ts
export interface IComputedValue<T> {
    get(): T;
    set(value: T): void;
    observe_(listener: (change: IComputedDidChange<T>) => void, fireImmediately?: boolean): Lambda;
}
export interface IComputedValueOptions<T> {
    get?: () => T;
    set?: (value: T) => void;
    name?: string;
    equals?: IEqualsComparer<T>;
    context?: any;
    requiresReaction?: boolean;
    keepAlive?: boolean;
}
```

