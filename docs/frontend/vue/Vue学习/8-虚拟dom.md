---
title: 虚拟dom
---

### 什么是虚拟dom

对象结构

```js
h('#app',{
  
})
```



vue中ref访问的是虚拟dom

```vue
<template>
  <h1 :ref="(el) => child = el">123</h1>
</template>

<script>
export default {
  data() {
    return {
      child: null,
    }
  },
  mounted() {
    console.log(this.$refs); // {}
    console.log(this.child); // <h1>123</h1>
  }
}
</script>
```

