## Vue与React的组件透传

### Vue中的组件透传

1.Props向下传递

可以通过props或attrs接收（未声明props则默认attrs接收）

2.emit向上传递

```vue
<father prop-name="prop-name" @father-click="fatherClick"></father>

// father组件
<div>
  <son @son-click="(val) => $emit('father-click', val)"></son>
</div>
// attrs {prop-name: 'prop-name'}

// son组件
<button @click="$emit('son-click', 123)">Button</button>
```



### React中的组件透传

1.props向下传递

2.通过子组件定义事件，父组件调用事件向上传递

```jsx
import { useState } from 'react'

export function Father() {
  let [num, setNum] = useState(0)
  return (
    <>
      <div num={num}>{num}</div>
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
      <div>{props['son-num']}</div>
      <button onClick={() => onMy(sonState)}>向上传递--</button>
    </>
  )
}
```



### Pub Sub模式

即 Publish/Subscribe “发布/订阅”模式。

```js
/**
 * @description: 
 * @param {*} handles 存储 event 类型的 click、dblclick、change等
 * @return {*}
 */
export default class PubSub {
  constructor() {
    this.handlers = {}
  }
  addListener(type,listener){
    if (!(type in  this.handlers)) {
      // handlers内不存在，就存储
      this.handlers[type] = []
    }
    // 将对应的事件处理函数存入 handlers[type]中
    this.handlers[type].push(listener)
  }
  off(type,listener){
    
  }
  emit(type){
    const args = [...arguments].slice(1)
    const eventList = this.handlers[type]
    /**
     * 循环遍历出发handlers中对应type的所有事件处理函数
     * for (const item of this.handlers[type])
     * item()
     * args 为事件处理函数传入的参数的集合:Array
     */
    for (const item of eventList) {
      // item(args)
      item.apply(this, args)
    }
    // for (let i = 0; i < eventList.length; i++) {
      
    // }
  }
}

// 使用
import EventEmitter from './eventemitter.mjs'
const emitter = new EventEmitter()
const fn1 = function (val) {
  console.log('fn1', val)
}
const fn2 = function (val) {
  console.log('fn2', val)
}
emitter.addListener('message', fn1)
emitter.addListener('message', fn2)
emitter.emit('message', 'test1')
```

