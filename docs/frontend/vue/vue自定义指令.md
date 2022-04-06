## Directive
[文档](https://cn.vuejs.org/v2/guide/custom-directive.html)

全局：

**全局自定义指令需要在main.js中引入**

```js
// 注册一个全局自定义指令 `v-focus`
Vue.directive('focus', {
  // 当被绑定的元素插入到 DOM 中时……
  inserted: function (el) {
    // 聚焦元素
    el.focus()
  }
})
```

局部：
```js
directives: {
  focus: {
    // 指令的定义
    inserted: function (el) {
      el.focus()
    }
  }
}
```

### Hook
一个指令定义对象可以提供如下几个钩子函数 (均为可选)：

- bind：只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。

- inserted：被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)。

- update：所在组件的 VNode 更新时调用，但是可能发生在其子 VNode 更新之前。指令的值可能发生了改变，也可能没有。但是你可以通过比较更新前后的值来忽略不必要的模板更新 (详细的钩子函数参数见下)。

- componentUpdated：指令所在组件的 VNode 及其子 VNode 全部更新后调用。

- unbind：只调用一次，指令与元素解绑时调用。

### Hook function params

- el: 指令所绑定的元素，可以用来直接操作 DOM。
- 

1. 如果需要在自定义指令中调用传入的函数，通过binding.value 可以取到传入的函数，在hook中调用=> binding.value()。
   demo:

```js
directives: {
  lazyload: {
    bind(el, binding, vnode) {
      let cb = binding.value
      console.log(Object.prototype.toString.call(cb))

      let observer = new IntersectionObserver(cb)
      observer.oserve(el)
    },
  },
}
```

2. 在directives中拿this
   通过第三个参数vnode
   <img width="50%" src="https://minimax-1256590847.cos.ap-shanghai.myqcloud.com/img/20210513111329.png"/>

vnode.context 就是Vue实例this

