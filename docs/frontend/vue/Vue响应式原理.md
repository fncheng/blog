---
title: Vue响应式原理
---

## 数据劫持

Vue2使用的是Object.defineProperty来进行数据拦截依赖收集，无法做到深层次的监听

​	Vue3使用的是proxy的代理拦截，可以进行深层次的拦截

### [检测变化的注意事项](https://cn.vuejs.org/v2/guide/reactivity.html#检测变化的注意事项)

对数组进行以下操作不是响应式的：

- vm.items[indexOfItem] = newValue
- vm.items.length = newLength

解决办法：

### $set

```js
// 直接给数组赋值 arr[index] = newValue vue无法监听到
// vm.$set( target, key, value ). This is the alias of the global Vue.set. (Vue 2 Snippets)
this.$set(target, key, value)
```



```vue
<script>
export default {
  data() {
    this.obj = { name: 'zs', age: 18 }
    return {
      arr: {
        a1: 'a1',
        a2: 'a2',
      },
    }
  },
  // obj 不是响应式的，arr是响应式的
</script>
```









## v-model的原理

v-model实际上是 :value 和 @input 的语法糖

```vue
<BaseInput :value="message" @input="message = $event" />
<base-input v-model="message"></base-input>

<!-- 以上两段代码是等效的 -->

<!-- 子组件内部 -->
<template>
  <div class="hello">
    <input
      type="text"
      :value="value"
      @input="$emit('input', $event.target.value)"
    />
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    value: String,
  },
};
</script>
```

[demo](https://codesandbox.io/s/custom-v-model-g6p63?file=/src/App.vue)

### sync修饰符

```vue
<my-input :value="searchText" @update:value="(val) => (searchText = val)">
</my-input>
<!-- 等效于 -->
<my-input :value.sync="searchText"></my-input>

<!-- 子组件 -->
<template>
  <div class="hello">
    MyInput：<input type="text" :value="value" @input="handleInput" />
  </div>
</template>

<script>
export default {
  name: "MyInput",
  props: {
    value: String,
  },
  methods: {
    handleInput(e) {
      this.$emit("update:value", e.target.value);
    },
  },
};
</script>
```

> 注意带有 `.sync` 修饰符的 `v-bind` **不能**和表达式一起使用 (例如 `v-bind:title.sync=”doc.title + ‘!’”` 是无效的)。取而代之的是，你只能提供你想要绑定的 property 名，类似 `v-model`。



watch深度监听

https://github.com/fncheng/fe/issues/14
