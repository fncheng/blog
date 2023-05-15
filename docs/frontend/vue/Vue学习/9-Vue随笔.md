---
title: Vue随笔
---



一个小需求：el-input只能输入整数 引起的思考

首先是

```vue
<el-input type="number" v-model="number" @change="onChange"></el-input>
// 直接change事件对number取整即可
```

或者

```vue
<input type="number" :value="number" @change="handleInput" />

<script>
  handleInput(e) {
    // this.number = Number(e.target.value).toFixed(0)
    this.number = Math.floor(e.target.value)
    // Number.toFixed 是将数字转换为字符串
  }
</script>
```

咋一看，上面的即是vue的v-model，v-model是个语法糖



```vue
<el-input type="number" :value="number" @input="onInput"></el-input>

<script>
  onInput(value) {
      console.log("onInput", value)
      this.number = Math.floor(value) || ''
  },
</script>
```



## inheritAttrs的作用

inheritAttrs默认true，默认情况下，父组件传递的，但没有被子组件解析为 props 的 attributes，会被作为子组件根节点(一般是是一个div元素)的属性。

如果你不想其作为根节点属性，而是希望手动绑定给内部的元素。可以设置`inheritAttrs: false`

关联👉【[vue2 禁用 Attribute 继承](https://v2.cn.vuejs.org/v2/guide/components-props.html#%E7%A6%81%E7%94%A8-Attribute-%E7%BB%A7%E6%89%BF)】【[vue3 inheritAttrs](https://cn.vuejs.org/api/options-misc.html#inheritattrs)】

