---
title: el-input-number
---

## 限制只输入整数

step  计数器步长

step-strictly	是否只能输入 step 的倍数

```vue
<el-input-number v-model="form.monthBedNum" :controls="false" :step="1" :step-strictly="true" />
```

