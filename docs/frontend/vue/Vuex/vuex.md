---
title: Vuex
tags:
- vue
description: Vuex 是一个专为 Vue.js 应用程序开发的**状态管理模式**。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。
---

什么是Vuex?

> Vuex 是一个专为 Vue.js 应用程序开发的**状态管理模式**。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。

## State

- 新建仓库

  ```js
  import Vue from 'vue'
  import Vuex from 'vuex'
  
  Vue.use(Vuex)
  
  export default new Vuex.Store({
    state: {
      name: 'vuex123'
    },
    mutations: {},
    actions: {},
    modules: {}
  })
  ```

  如果希望通过`this.$store`访问,需要在Vue实例上挂载store

  ```js
  //main.js
  new Vue({
    el: '#app',
    store: store,
  })
  ```

- 修改state

### mapState

用于将状态映射为组件计算属性，可以和组件的计算属性混合。

```js
computed: {
  localComputed () { /* ... */ },
  // 使用对象展开运算符将此对象混入到外部对象中
  ...mapState({
    // ...
  })
}
```

```js
computed: {
  // 映射 name(){ return this.$store.state.name }
  ...mapState(['name']),
  // 映射sex(){ return this.$store.state.sex }
  //myAge(){ return this.$store.state.age }
  ...mapState({
    sex: state => 'female' ?? state.sex,
    myAge:'age'
  }),
  ...mapGetters(['nameGetter'])
},
```



## getter

store 中定义“getter”（可以认为是 store 的计算属性）

```js
getters: {
  // ...
  getTodoById: (state) => (id) => {
    return state.todos.find(todo => todo.id === id)
  },
  getUserName: (state) =>
}

```

## Mutation

  mutations ------ 专门用于存放修改state的方法

  ```vue
  //User.vue
  输入值:<input @input="increment" type="text" />
      数字:
      <span>{{ $store.state.msg }}</span>
  
  methods: {
    increment(e) {
      this.$store.commit("increment", e.target.value)
      console.log(e)
    }
  }
  ```

  ```js
  //Store/index.js
  export default new Vuex.Store({
    state: {
      name: 'vuex123',
      msg: ''
    },
    mutations: {
      increment(state, value) {
        // 变更状态
        state.msg = value
      }
    },
    strict: true
  })
  ```

  [**提交载荷**](https://vuex.vuejs.org/zh/guide/mutations.html#%E6%8F%90%E4%BA%A4%E8%BD%BD%E8%8D%B7%EF%BC%88payload%EF%BC%89)

  注意: mutations中第一个参数永远是state,此外,额外参数最多只能传一个;如果需要传多个参数,请传入一个对象。

另外mutation必须同步执行,如果需要异步执行,使用action

## Action

> action接收两个参数*(context: object,payload)*

Mutation 通过 `store.commit`触发：

```js
store.commit('increment', 10)
```

Action 通过 `store.dispatch` 方法触发：

```js
store.dispatch('increment') 
```

Action 类似于 mutation，不同在于：

- Action 提交的是 mutation，而不是直接变更状态。
- Action 可以包含任意异步操作。

```js
mutations:{
  [SET_STATUS](state, data) {
      state.status = data
    },
}
actions:{
  setStatusAsync({ commit }, value) {
      setTimeout(() => {
        commit(SET_STATUS, value)
      }, 2000)
    },
}
// dispatch actions
$store.dispatch('setStatusAsync', 123)
```

### 以载荷形式分发action

```js
// 载荷形式
store.dispatch('addNewItem', text);

// store.js
  actions: {
    // 载荷形式
    addNewItem(a, text) {
      console.log('a', a);
      console.log('text', text);

      // commit(ADD_NEW_ITEM, text);
    }
  }
```

打印结果：

<img src="https://minimax-1256590847.cos.ap-shanghai.myqcloud.com/img/image-20210423174626432.png" alt="image-20210423174626432" style="zoom:67%;" />

### 以对象形式分发action

```js
// 对象形式
    store.dispatch({
      type: 'addNewItem',
      text: text
    });

// store.js
actions: {
    // 对象形式
    addNewItem(o,b) {
      console.log(o,b);
      // commit(ADD_NEW_ITEM, text);
    }
  }
```

打印结果：

<img src="https://minimax-1256590847.cos.ap-shanghai.myqcloud.com/img/image-20210423175408170.png" alt="image-20210423175408170" style="zoom:67%;" />

打印o：

<img src="https://minimax-1256590847.cos.ap-shanghai.myqcloud.com/img/image-20210423173937509.png" alt="image-20210423173937509" style="zoom:67%;" />

再看看完整的Store实例：

<img src="https://minimax-1256590847.cos.ap-shanghai.myqcloud.com/img/image-20210423174149491.png" alt="image-20210423174149491" style="zoom:67%;" />



**数据变更流程**

![](https://minimax-1256590847.cos.ap-shanghai.myqcloud.com/img/vuex图解.png)

