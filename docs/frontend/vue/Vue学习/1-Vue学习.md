---
title: vuejs的学习
sidebarDepth: 2
---

## 1. 语法和指令

### script引入

```html
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
```

**BootCdn**

```html
<script src="https://cdn.bootcss.com/vue/2.6.11/vue.js"></script>
```

### [vue.js有什么用，是用来做什么的（整理）](https://www.cnblogs.com/Renyi-Fan/p/9419742.html#_label6)

<!-- more -->

#### watch

默认监视的是对象的地址的变化





#### v-bind(缩写 :)

`v-bind:title="message"`

作用: 控制dom节点的(title)属性和Vue实例的(message)属性保持一致

#### v-if

`v-if="seen"`

我们不仅可以把数据绑定到 DOM 文本或 attribute，还可以绑定到 DOM **结构**。

#### v-for

`v-for="item in todos"`

#### v-on(缩写 @)

`v-on:click="reverseMessage"`

监听DOM事件

**reverseMessage**是一个method方法

```js
reverseMessage: function () {
	this.message = this.message.split('').reverse().join('')
}
```

#### v-model

`v-model="message"`

数据和视图的双向绑定。

##### 修饰符

https://cn.vuejs.org/v2/guide/forms.html#%E4%BF%AE%E9%A5%B0%E7%AC%A6

**.lazy**

**.number**

**.trim**

### 实例生命周期钩子

钩子,在实例生命周期的不同阶段被调用，如 [`mounted`](https://cn.vuejs.org/v2/api/#mounted)、[`updated`](https://cn.vuejs.org/v2/api/#updated) 和 [`destroyed`](https://cn.vuejs.org/v2/api/#destroyed)。生命周期钩子的 `this` 上下文指向调用它的 Vue 实例。

![image-20200420165643433](https://minimax-1256590847.cos.ap-shanghai.myqcloud.com/img/image-20200420165643433.png)

#### 修饰符

修饰符 (modifier) 是以半角句号 `.` 指明的特殊后缀，用于指出一个指令应该以特殊方式绑定。例如，`.prevent` 修饰符告诉 `v-on` 指令对于触发的事件调用 `event.preventDefault()`：

```html
<form v-on:submit.prevent="onSubmit">...</form>
```

- `.stop`	=>	`e.stopPropagation()`	阻止冒泡
- `.prevent`   =>   `e.preventDefault()`    阻止默认行为

## 特殊属性

#### is https://cn.vuejs.org/v2/api/#is

**预期**：`string | Object (组件的选项对象)`

用于[动态组件](https://cn.vuejs.org/v2/guide/components.html#动态组件)且基于 [DOM 内模板的限制](https://cn.vuejs.org/v2/guide/components.html#解析-DOM-模板时的注意事项)来工作。

示例：

```html
<!-- 当 `currentView` 改变时，组件也跟着改变 -->
<component v-bind:is="currentView"></component>

<!-- 这样做是有必要的，因为 `<my-row>` 放在一个 -->
<!-- `<table>` 内可能无效且被放置到外面 -->
<table>
  <tr is="my-row"></tr>
</table>
```

## computed---计算属性

计算属性是用来写复杂逻辑语句的,相当于写好method 的data;与method的不同的是,计算属性是有缓存的,所以性能上更优。

computed和data类似,都是用来提供属性的

- 计算属性返回一个值 ==> 计算属性默认只有getter,不过也可在需要时提供一个setter

#### 计算属性(computed) vs 侦听属性(watch)?

计算属性返回一个值 ==> 计算属性默认只有getter,不过也可在需要时提供一个setter

```js
computed: {
  fullName: {
    // getter
    get: function () {
      return this.firstName + ' ' + this.lastName
    },
    // setter
    set: function (newValue) {
      var names = newValue.split(' ')
      this.firstName = names[0]
      this.lastName = names[names.length - 1]
    }
  }
}
```

> 注意: 计算属性获取不到localStorage中的变化
>
> vue只能对其管理的数据进行响应式处理，可以理解为data中的数据。

## watch---侦听器

watch 可以监听一个数据的变化，如果有变化，则可以执行相应的函数或方法。



### 过渡&动画

![Transition Diagram](https://cn.vuejs.org/images/transition.png)

如果你使用一个没有名字的 `transition`，则 `v-` 是这些类名的默认前缀。如果你使用了 `<transition name="my-transition">`,那么 `v-enter` 会替换为 `my-transition-enter`。



父传子通信

```vue
<hm-input placeholder="默认"></hm-input>
```

placeholder属性传递到hm-input.vue子组件中的props中

## [过滤器](https://cn.vuejs.org/v2/guide/filters.html#ad)

```html
<!-- 在双花括号中 -->
{{ message | capitalize }}

<!-- 在 `v-bind` 中 -->
<div v-bind:id="rawId | formatId"></div>
```



---

## 2. Vue组件

一个组件的`data`必须是一个函数,因此每个实例可以维护一份被返回对象的独立的拷贝：

```js
data: function () {
  return {
    count: 0
  }
}
```

### 2.1 组件通信

#### props传值

```vue
// Father.vue
<template>
  <div class="father">
    <component-a :msg="msg"></component-a>
  </div>
</template>

<script>
import componentA from "@/components/componentA"
export default {
  components: {
    componentA: componentA,
  },
  data() {
    return {
      msg: "12345",
    }
  },
}
</script>
```

```vue
// componentA.vue
<template>
  <div class="component-a">
    <span>msg: {{ msg }}</span>
  </div>
</template>

<script>
export default {
  name: "component-a",
  props: {
    msg: String,
  },
}
</script>

<style></style>
```

Vue中的props类似于React中的props,就是用来接收父组件传递过来的值的(React中可以通过 props.[Name] 获取对应属性的值)

##### 命名约定

对于props声明的属性来说，在父级HTML模板中，属性名需要使用中划线写法

```vue
// 父组件
<template>
  <div class="father">
    <component-a :my-msg="msg"></component-a>
  </div>
</template>
```

子级props属性声明时，使用小驼峰或者中划线写法都可以(**如果对象表示法,则只能用驼峰式写法**)；而子级模板使用从父级传来的变量时，需要使用对应的小驼峰写法

```vue
// 子组件
<template>
  <div class="component-a">
    <span>msg: {{ myMsg }}</span>
  </div>
</template>

<script>
export default {
  name: "component-a",
  // props: ["my-msg"]
  props: {
    myMsg: String
  }
}
</script>
```

关于props的详细可以看[这篇文章](https://www.cnblogs.com/xiaohuochai/p/7388866.html)。

---

### 2.2 $refs

通过this.$refs.[componentName]来访问已注册的组件

```vue
// Props传值
<template>
  <div class="father">
    <component-a :my-msg="msg" ref="myComponent"></component-a>
    <button @click="bindClick">点击</button>
  </div>
</template>

<script>
import componentA from "@/components/componentA"
export default {
  components: {
    componentA: componentA
  },
  data() {
    return {
      msg: "12345"
    }
  },
  methods: {
    bindClick(props) {
      console.log(props)
      console.log(this.$refs.myComponent)
    }
  }
}
</script>
```

![image-20200802131621838](https://minimax-1256590847.cos.ap-shanghai.myqcloud.com/img/image-20200802131621838.png)

通过官方文档可以看到vm.$refs是一个对象,持有注册过 [`ref` attribute](https://cn.vuejs.org/v2/api/#ref) 的所有 DOM 元素和组件实例。

所以只要给组件注册过ref属性,就可以通过vm.$refs来访问到该组件。

### 2.3 组件缓存---keep-alive

https://juejin.im/post/6844903919273918477

**用法**：

`<keep-alive>` 包裹动态组件时，会缓存不活动的组件实例，而不是销毁它们。和 `<transition>` 相似，`<keep-alive>` 是一个抽象组件：它自身不会渲染一个 DOM 元素，也不会出现在组件的父组件链中。

当组件在 `<keep-alive>` 内被切换，它的 `activated` 和 `deactivated` 这两个生命周期钩子函数将会被对应执行。

#### keep-alive的生命周期

页面第一次进入，钩子的触发顺序
 `created-> mounted-> activated`，
 退出时触发 `deactivated` 当再次进入（前进或者后退）时，只触发 `activated`

事件挂载的方法等，只执行一次的放在 `mounted` 中；组件每次进去执行的方法放在 `activated` 中；

> `activated`和`deactivated`写在被keep-alive包裹的组件的内部

#### Api

- **Props**：

  - `include` - 字符串或正则表达式。只有名称匹配的组件会被缓存。
  - `exclude` - 字符串或正则表达式。任何名称匹配的组件都不会被缓存。
  - `max` - 数字。最多可以缓存多少组件实例。

  > exclude优先级高。比如：include和exclude同时匹配到了组件A，那组件A不会被缓存。


### 2.4 slot插槽

https://cn.vuejs.org/v2/guide/components-slots.html

**什么是插槽？**

插槽就是向一个组件分发内容的。

```vue
// Father.vue
<template>
	<div class="father">
    <Son>向插槽组件分发自定义内容。</Son>
  </div>
</template>

// Son.vue
<template>
	<div class="son">
    这是son组件
    <slot>插槽默认内容</slot>
  </div>
</template>
```



插槽和后备内容

```vue
// 插槽和后备内容
<template>
  <div class="my-slot-a">
    <p>这是插槽</p>
    <slot>这是后备内容</slot>
  </div>
</template>
```

### 作用域插槽

2.6.0开始新语法 v-slot ，同时支持解构赋值，具体查看[文档](https://cn.vuejs.org/v2/guide/components-slots.html#%E7%8B%AC%E5%8D%A0%E9%BB%98%E8%AE%A4%E6%8F%92%E6%A7%BD%E7%9A%84%E7%BC%A9%E5%86%99%E8%AF%AD%E6%B3%95)。

```vue
<el-table-column label="检查状态">
	<template v-slot="{ row: { mammaryState} }">
	  {{ mammaryStates[mammaryState] }}
	</template>
</el-table-column>
```



### 关于插槽和render props

我们已经知道插槽的作用是往组件中传递组件，而React中 render props（即props.children的渲染） 和插槽功能类似，详情见[render props与Vue插槽](http://81.71.14.90:3000/frontend/React/React%E5%AE%9E%E7%8E%B0%E5%A4%8D%E7%94%A8.html#render-props)

### 2.4.1具名插槽

```vue
// 具名插槽
<template>
  <div class="my-slot-b">
    <p>这是具名插槽</p>
    <slot name="header">头部内容</slot> <br />
    <slot name="footer">尾部内容</slot> <br />
    <slot v-bind:user="'nick'"></slot>
  </div>
</template>
```

父组件

```vue
// 父组件Slot.vue
<template>
  <div class="slot">
    <slot-a>123456插槽内容</slot-a>
    <slot-a></slot-a>
    <slot-b>
      // 具名插槽
      <template v-slot:header>
        头部123
      </template>
			// 具名插槽 缩写#
			<template #header>
        头部123
      </template>
      <!-- 作用域插槽 -->
      <template v-slot:default="user">
        {{ user }}
      </template>

      <template v-slot:footer>
        尾部456
      </template>
    </slot-b>
  </div>
</template>

<script>
import slotA from "../../components/slotA"
import slotB from "@/components/slotB"
export default {
  name: "Slot",
  components: {
    "slot-a": slotA,
    "slot-b": slotB
  }
}
</script>
```

![image-20200817103340544](https://minimax-1256590847.cos.ap-shanghai.myqcloud.com/img/image-20200817103340544.png)

从图片可以看出slotProps是一个对象

通过v-slot将子组件中slot上的属性收集起来,统一放到v-slot绑定的slotProps中

### 2.5 $el

vm.$el 可用于获取DOM，this.$el 可以获取到当前组件的DOM，this.$refs['组件名'] 可以获取到子组件的DOM。

获取DOM之后就可以操作DOM，包括 innerHTML 和 innerText 。

### 2.6 监听原生事件

https://cn.vuejs.org/v2/guide/components-custom-events.html#%E5%B0%86%E5%8E%9F%E7%94%9F%E4%BA%8B%E4%BB%B6%E7%BB%91%E5%AE%9A%E5%88%B0%E7%BB%84%E4%BB%B6

具体就是在一个组件的根元素上监听一个原生事件，使用v-on.native 修饰符

例如在ElementUI中`el-input`组件监听@keyup.enter时会失效

```vue
<template>
  <div id="app">
    
    <el-input @keyup.enter="handleKeyUp"></el-input> 
  </div>
</template>
```



---

## 3. 可复用性&组合

## Mixin 混入

### 什么是mixin

> A mixin object can contain any component options

mixin就是一个对象，当组件使用混入对象时，所有混入对象的选项将被“混合”进入该组件本身的选项。

```js
// main.js
/* 全局mixin */
Vue.mixin({
  created() {
    console.log('global mixin')
  }
})
```

```js
// mixin.vue
// 组件mixin
const myMixin = {
  created() {
    this.hello()
  },
  methods: {
    hello() {
      console.log(this.msg)
    }
  }
}
export default {
  mixins: [myMixin],
  name: "mixins",
  data() {
    return {
      msg: "mixin"
    }
  }
}
```

### mixin合并策略

> 1. vue 是按照 全局`mixin`——组件内`mixin`——组件`options`的顺序来合并组件实例的options。
> 2. 对于钩子函数，会添加到一个函数数组里，执行顺序从前到后，比如created，会先执行全局mixin中的created，再执行组件内的created
> 3. 对于组件的对象属性（`methods`等）,后面的会覆盖前面的

> 慎用全局mixin，因为每个vue实例，包括vue组件创建的时候都会受到影响。

## 4. Api

### vm.$nextTick

在DOM还没渲染出来时，更新数据，并不会使dom更新，因为此时dom还未渲染。nextTick的作用就是将回调延迟到下次 DOM 更新循环之后执行。在修改数据之后立即使用它，然后等待 DOM 更新。它跟全局方法 `Vue.nextTick` 一样，不同的是回调的 `this` 自动绑定到调用它的实例上。

```vue
<template>
  <div class="home">
    <div id="main">123</div>
  </div>
</template>

<script>
export default {
  name: 'home',
  data() {
    return {
      isShow: true
    }
  },
  created() {
    if (this.isShow === true) {
      this.$nextTick(() => {
        document.getElementById('main').innerText = 466
      })
    }
  }
}
</script>
```

