---
title: Vue组件通信
---



<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [vue组件通信](#vue%E7%BB%84%E4%BB%B6%E9%80%9A%E4%BF%A1)
    - [props传值(父传子)](#props%E4%BC%A0%E5%80%BC%E7%88%B6%E4%BC%A0%E5%AD%90)
    - [$emit(子传父)](#emit%E5%AD%90%E4%BC%A0%E7%88%B6)
    - [事件总线EventBus(非父子)](#%E4%BA%8B%E4%BB%B6%E6%80%BB%E7%BA%BFeventbus%E9%9D%9E%E7%88%B6%E5%AD%90)
  - [Vuex](#vuex)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## 1.props传值

https://cloud.tencent.com/developer/article/1090649

### 通过props向子组件传值

```vue
// App.vue
<template>
  <div id="test">
    <component-a
      :onOpen="handleOpen"
    ></component-a>
  </div>
</template>

  methods: {
    handleOpen(text) {
      console.log('onOpen')
      console.log(text)
    }
  },
```

```vue
// componentA.vue
<template>
  <div class="component-a" @click="myOpen(123)">
  </div>
</template>

  props: {
    myMsg: String,
    onSave: Function,
    onOpen: Function
  },

  methods: {
    myOpen(msg) {
      this.onOpen(msg)
    }
  }
```

### props验证

需要注意的是

Vue props验证中的自定义validator函数只是验证，返回值是布尔值，用这个布尔值来判断是否通过。函数内对值进行操作是无效的。



## 2.$emit

通过事件传值

vm.$emit( event, arg ) //触发当前实例上的事件

vm.$on( event, fn );//监听event事件后运行 fn； 

语法：

子组件：`$emit('event_name', payload)`

父组件：`@event_name=somevalue = payload` 或者 `$on('event_name',()=>{})`

```vue
//从About.vue向App.vue传值

//App.vue
//html
<about @countChange="updateCount"></about>
<p>{{ mainCount }}</p>

//js
import About from "./views/About"
export default {
  name: "App",
  data() {
    return {
      // mainCount用来接收子组件传过来的参数count
      mainCount: 0
    }
  },
  methods: {
    updateCount(count) {
      this.mainCount = count
      console.log(count)
    }
  },
}
```

```vue
//About.vue
//html
<div class="about">
  <button @click="changeCount">Click {{ count }}</button>
</div>
//js
export default {
  data() {
    return {
      count: 0
    }
  },
  methods: {
    changeCount() {
      this.count++
      this.$emit("countChange", this.count)
    }
  }
}
```



## $emit的TypeScript 实现

```ts
function emit(this: Vue, event: string, ...args: unknown[]): void {
  const vm = this
  // 从实例的 _events 属性中获取指定事件的回调函数数组
  let cbs = vm._events[event]
  // 如果回调函数数组存在
  if (cbs) {
    // 遍历回调函数数组，依次调用每个回调函数，并将传入的参数传递给它
    cbs = cbs.length > 1 ? toArray(cbs) : cbs
    const info = `event handler for "${event}"`
    for (let i = 0, l = cbs.length; i < l; i++) {
      invokeWithErrorHandling(cbs[i], vm, args, vm, info)
    }
  }
  // 如果 $emit 调用时带有参数，则在实例的 _hasHookEvent 属性中记录事件名称
  const hook = vm._hookEvent
  if (hook) {
    vm.$emit(`hook:${hook}${event}`, ...args)
  }
  // 如果实例的 _parent 属性存在，则在父级 Vue 实例上触发相同的事件，并传递相同的参数
  const parent = vm.$parent
  if (parent && !isInBeforeCreateCycle(parent)) {
    parent.$emit(...(parent.$options.emits || []), event, ...args)
  }
}
```

this.$emit是经过封装了的emit

```tsx
Vue.prototype.$emit = (event: string, ...args: unknown[]) => 
	emit(this: Vue, event: string, ...args: unknown[])
```





## 3.通过provide/inject 注入

provide/inject 允许祖先组件向后代组件中注入一个依赖

https://codesandbox.io/s/vue2-provideinject-thmuz

**Compostion api写法**

```vue
<script>
import { inject, reactive, ref, useAttrs } from '@vue/composition-api'
export default {
  name: 'Child',
  setup(props, ctx) {
    const foo = inject('foo')
    console.log('foo: ', foo)
    return { foo }
  },
}
</script>
```

inject(key: string, defaultValue: any, treatDefaultAsFactory: boolean)




## 4.事件总线EventBus(非父子)

EventBus其实就是一个新的Vue实例

```js
//event-bus.js
import Vue from 'vue'

const EventBus = new Vue()

EventBus.$on('message', (data) => {
  console.log('get message', data)
})

export default EventBus
```

通过bus.$emit触发bus的事件

```vue
//About.vue向UserProfile.vue传递
<template>
	<button @click="handleEventBus">EventBus</button>
</template>

<script>
import EventBus, { handleEvent } from '@/store/eventbus'
export default {
  created() {
    EventBus.$on('message', handleEvent)
  },
  beforeDestroy() {
    // debugger
    EventBus.$off('message', handleEvent)
    console.log('销毁EventBus')
  },
  methods: {
    handleEventBus() {
      EventBus.$emit('message', { someData: 123 })
    }
  }
}
</script>
```

```vue
//UserProfile.vue
//html
<div class="user-profile">
  <h3>用户中心UserProfile</h3>
  我是兄弟组件: <span>{{ myMsg }}</span>
</div>

//js
import EventBus from "../event-bus"
export default {
  data() {
    return {
      myMsg: "Hi"
    }
  },
  mounted() {
    EventBus.$on("msgSend", this.sendMsg)
  },
  methods: {
    sendMsg(msg) {
      this.myMsg = msg
      console.log(msg)
    }
  },
  // 销毁eventbus
  beforeDestroy() {
    EventBus.$off("msgSend", () => console.log("eventbus已被销毁"))
  }
}
```

需要注意的是：**`EventBus`** 不会自动销毁，通常需要你手动调用 `off` 或类似的方法来移除事件监听器。

**EventBus实例重用问题**

 `EventBus` 是在整个应用生命周期中只创建一次，当你调用 `EventBus.$off` 时，它会从全局事件总线上移除事件监听器，如果离开页面后再进入页面，就会导致你无法触发事件

[eventbus存在问题](https://juejin.im/post/5d358280e51d4556bc06704d#heading-5),所以需要在使用完后手动销毁它,在beforDestory和destoryed中使用$off

`vm.__patch__(vm._vnode, null)`用来触发所有的destory钩子函数。



## EvevntBus、EventEmitter和Mitt

`EventBus` 是一种设计模式，通常用于前端应用中实现组件之间的通信。它可以基于 `EventEmitter`、`Mitt` 或其他事件管理工具实现。

## $refs

this.$refs.[refValue] 用来直接访问一个已注册的组件

```vue
// Props传值
<template>
  <div id="app">
    <HelloWorld ref="hello" msg="Hello Vue in CodeSandbox!" />
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld";

export default {
  name: "App",
  components: {
    HelloWorld,
  },
  mounted() {
    console.log(123);
    console.log(this.$refs.hello); // VueComponent组件实例
    console.log(this.$refs.hello.msg); // Hello Vue in CodeSandbox! 
    // 通过ref操作dom
    console.log(this.$refs.hello.$refs.app.innerText); // 123
  },
};
</script>

// HelloWorld.vue
<template>
  <div class="hello">
    <div id="app" ref="app">123</div>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
};
</script>
```

![image-20200802131621838](https://minimax-1256590847.cos.ap-shanghai.myqcloud.com/img/image-20200802131621838.png)

通过官方文档可以看到vm.$refs是一个对象,持有注册过 [`ref` attribute](https://cn.vuejs.org/v2/api/#ref) 的所有 DOM 元素和组件实例。

所以只要给组件注册过ref属性,就可以通过vm.$refs来访问到该组件。

> `$refs` 只会在组件渲染完成之后生效，并且它们不是响应式的。这仅作为一个用于直接操作子组件的“逃生舱”——你应该避免在模板或计算属性中访问 `$refs`。

#### 谨慎使用 this.$refs

Why❓

- 组件必须是保持独立的，如果一个组件的 API 不能够提供所需的功能，那么这个组件在设计、实现上是有问题的。
- 组件的属性和事件必须足够的给大多数的组件使用。

https://www.kancloud.cn/donaf/vue/633895

Vue官方推荐通过ref来操作dom，而不是用原生js或jQuery

https://codesandbox.io/s/vue2-ref-57epd?file=/src/App.vue

## Vuex

**store的几个属性**

state：存放公共数据的地方
getter：获取根据业务场景处理返回的数据
mutations：唯一修改state的方法，修改过程是同步的
action：异步处理，通过分发操作触发mutation
module：将store模块分割，减少代码臃肿



## $attrs

https://cn.vuejs.org/v2/guide/components-props.html#%E9%9D%9E-Prop-%E7%9A%84-Attribute

组件的根元素(即组件最外层元素)会继承attribute

```html
<input type="date" class="form-control">
```

```html
<bootstrap-date-input
  data-date-picker="activated"
  class="date-picker-theme-dark"
></bootstrap-date-input>
```

最后得到的class就是 `form-control date-picker-theme-dark` 。

默认开启属性继承

```vue
// App.vue
<template>
  <div class="learnvue">
    <base-input
      label="姓名"
      class="name-input"
      placeholder="请输入姓名"
      test-attrs="$attrs"
    ></base-input>
  </div>
</template>

<script>
import BaseInput from './components/BaseInput'
export default {
  name: 'learn-vue',
  components: {
    BaseInput
  }
}
</script>
```

```vue
// BaseInput.vue
<template>
  <label>
    {{ label }}- {{ $attrs.placeholder }}-
    <input v-bind="$attrs" />
  </label>
</template>

<script>
export default {
  props: {
    label: String
  },
  // inheritAttrs 属性继承
  // inheritAttrs: false,
  mounted() {
    console.log(this.$attrs)
  }
}
</script>
```

生成的dom结构：

<img src="https://minimax-1256590847.cos.ap-shanghai.myqcloud.com/img/image-20210326235932656.png" alt="image-20210326235932656" style="zoom:80%;" />

BaseInput输出：

![image-20210327000030088](https://minimax-1256590847.cos.ap-shanghai.myqcloud.com/img/image-20210327000030088.png)

当设置 `inheritAttrs: false` 后

生成的dom结构即BaseInput输出：

<img src="https://minimax-1256590847.cos.ap-shanghai.myqcloud.com/img/image-20210327000304273.png" alt="image-20210327000304273" style="zoom:80%;" />

![image-20210327000354471](https://minimax-1256590847.cos.ap-shanghai.myqcloud.com/img/image-20210327000354471.png)

- 2.4.0新增
- 类型 `{ [key: string]: string }`
- 只读
- 详细
  包含了父作用域中不作为 `prop` 被识别 (且获取) 的特性绑定 (`class` 和 `style` 除外)。当一个组件没有声明任何`prop` 时，这里会包含所有父作用域的绑定 (`class` 和 `style` 除外)，并且可以通过 `v-bind="$attrs"` 传入内部组件——在创建高级别的组件时非常有用。
  简单点讲就是包含了所以父组件在子组件上设置的属性（除了`prop`传递的属性、`class` 和 `style` ）。

