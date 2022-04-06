---
title: React组件通信
---



## props.children

避免props层层传递，props.children 是当前组件的所有子props

## Context

```jsx
const MyContext = React.createContext('defaultValue');
class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      name: 'le',
      site: 'code'
    };
  }
  render() {
    return (
      <div>
        <MyContext.Provider value={'123'}>
            <MyContext.Consumer>{(value) => value}</MyContext.Consumer>
          </Name>
        </MyContext.Provider>
      </div>
    );
  }
}
```

## 函数调用向上传递

```jsx
export default function Father() {
  let [num, setNum] = useState(0)
  return (
    <>
      <div num={num}>向上传递展示的值: {num}</div>
      <button onClick={() => setNum(++num)}>向下传递++</button>
      <Son
        son-num={num}
        onMy={(val) => {
          console.log('son', val)
          setNum(num - val)
        }}
      ></Son>
    </>
  )
}

function Son(props) {
  console.log('props: ', props)
  const { onMy } = props
  const [sonState] = useState(2)
  return (
    <>
      <div>向下传递展示的值: {props['son-num']}</div>
      <button onClick={() => onMy(sonState)}>向上传递--</button>
    </>
  )
}
```

在React中只有通过setState修改的数据，视图才会实时更新





报错

Uncaught Invariant Violation：太多的重新渲染

https://www.jianshu.com/p/bf197fba2fa5
