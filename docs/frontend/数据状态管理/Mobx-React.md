我们知道，在React中只有通过setState修改的数据View才会实时渲染，而直接修改View并不会刷新，而Mobx就可以解决这个问题。

[Mobx中文文档](https://cn.mobx.js.org/intro/overview.html)

[Mobx-React](https://www.npmjs.com/package/mobx-react)

```jsx
class App extends React.Component {
    render() {
        return (
            <div>
                {this.props.person.name}
                <Observer>{() => <div>{this.props.person.name}</div>}</Observer>
            </div>
        )
    }
}

const person = observable({ name: "John" })

ReactDOM.render(<App person={person} />, document.body)
person.name = "Mike" // will cause the Observer region to re-render
```

通过Obsever组件包裹后，View会实时刷新

Mobx-React integration



Since strict-mode is enabled, changing (observed) observable values without using an action is not allowed.

在严格模式下，mobx需要使用action去修改数据

对mobx包装过的对象不能使用解构，否则会破坏数据的响应式

### Mobx Observer component

```jsx
import { Observer, useLocalStore } from 'mobx-react' // 6.x or mobx-react-lite@1.4.0

export function ObservePerson() {
  const person = useLocalStore(() => ({ name: 'John' }))
  return (
    <div>
      {person.name} <i>I will never change my name</i>
      <div>
        <Observer>{() => <div>{person.name}</div>}</Observer>
        <button onClick={() => (person.name = 'Mike')}>
          I want to be Mike
        </button>
      </div>
    </div>
  )
}
```



### makeAutoObservable

```jsx
const store = makeAutoObservable({
  count: 0
});
// count 即为响应式state
@observer
class Main extends React.Component {
  doClick = () => {
    console.log("store-----", store.count);
    store.count = store.count + 1;
  };
  render() {
    return (
      <>
        <div>{store.count}</div>
        <button onClick={() => this.doClick()}>count++</button>
      </>
    );
  }
}
```

对于函数式编程，可以有如下写法：

```jsx
const store = makeAutoObservable({
  count: 0
});
// 用observable也可以
//const store = observable({
//  count: 0
//});
const Main = observer(() => {
  return (
    <>
      <div>{store.count}</div>
      <button
        onClick={() => {
          console.log("store-----", store.count);
          store.count = store.count + 1;
        }}
      >
        count++
      </button>
    </>
  );
});
```



