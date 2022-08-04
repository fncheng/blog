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

