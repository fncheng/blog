---
title: el-input-number
---

## 限制只输入整数

step  计数器步长

step-strictly	是否只能输入 step 的倍数

```vue
<el-input-number v-model="form.monthBedNum" :controls="false" :step="1" :step-strictly="true" />
```



最简单的办法，change的时候处理一下即可。

```vue
<el-input @change="onChange" v-model="number" />

onChange(val) {
	this.number = Number(val).toFixed(0)
}
```

