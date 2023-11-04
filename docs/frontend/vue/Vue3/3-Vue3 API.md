---
title: Vue3 API
---

## useState

```js
import { ref } from '@vue/reactivity'

const useState = function (initialState) {
  const state = ref(initialState)
  const setState = (value) => {
    // console.log(value)
    state.value = value
  }
  return [state, setState]
}
export default useState
```



## defineOptions自定义组件名

```ts
defineOptions({
  name: 'MyIndex'
})
```



### defineEmits

使用 `defineEmits` 函数，你可以明确声明组件可以触发的事件

```vue
<script setup lang="ts">
import { defineEmits } from 'vue';

// 使用 defineEmits 来定义组件可以触发的自定义事件
const emit = defineEmits(['update:first', 'update:second']);

// 在组件的逻辑中触发自定义事件
const handleClick = () => {
  emit('update:first', '这是 update:first 事件的数据');
  emit('update:second', '这是 update:second 事件的数据');
};
</script>
```

## v-memo

https://cn.vuejs.org/api/built-in-directives.html#v-memo

类似于useMemo，缓存一个组件，当依赖不变时，组件内部将不会更新。

```vue
<div v-memo="[valueA, valueB]">
  ...
</div>
```

搭配 `v-for` 使用 `v-memo`，确保两者都绑定在同一个元素上。**`v-memo` 不能用在 `v-for` 内部。**

