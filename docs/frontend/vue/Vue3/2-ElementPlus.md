## ElementPlus

## ElementPlus Form Rules

老样子表单校验还是需要给Form设置model

model、rule、prop三者缺一不可

```vue
<script setup lang="ts">
  // ...
interface RuleForm {
  name: string
  age: number
}
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<RuleForm>({
  name: 'zs',
  age: 20
})
const rules = reactive<FormRules<RuleForm>>({
  name: [{ required: true, message: '必填' }],
  age: [{
    validator: (rule, value, callback) => {
        console.log('value', value)
        if (Number(value) > 100) {
          return callback(new Error('value can not > 100'))
        } else callback()
      },
      trigger: 'blur'
  }]
})
const submitForm = () => {
  ruleFormRef.value?.validate((valid) => {
    if (valid) {
      console.log('submit!')
    } else return false
  })
}
</script>

<template>
  <ElButton type="success">Success</ElButton>
  <ElForm ref="ruleFormRef" :model="ruleForm" :rules="rules">
    <ElFormItem label="姓名" prop="name">
      <ElInput v-model="ruleForm.name"></ElInput>
    </ElFormItem>
    <ElFormItem label="年龄" prop="age" :rules="[{ required: true, message: '年龄为必填!' }]">
      <ElInput v-model="ruleForm.age"></ElInput>
    </ElFormItem>
  </ElForm>
	<ElButton @click="submitForm">提交</ElButton>
</template>
```

Table ref

```ts
const tableRef = ref<InstanceType<typeof ElTable>>();
<ElTable
      border
      row-key="uuid"
      ref="tableRef"
/>
```



## Table

### 第一列为可勾选

手动添加一个 `el-table-column`，设 `type` 属性为 `selection` 即可

第一列为序号，手动添加一个 `el-table-column`，设 `type` 属性为 `index` 即可



## :vissible.sync修改为v-model

在ElementPlus中，很多组件的显示隐藏属性visible（比如el-drawer）用法都改成了v-model了

Vue2中

```vue
<template>
	<el-drawer :visible.sync="visible"></el-drawer>
</template>
<script>
  export default {
    data() {
      return {
        drawer: false,
        direction: 'rtl',
      };
    },
</script>
```

在Vue3中

```vue
<template>
    <ElDrawer
      v-model:model-value="visible"
      title="I'm the title"
      :with-header="false"
      :append-to-body="true"
    >
      <span>I'm the content</span>
    </ElDrawer>
</template>

<!-- 也可以直接使用v-model="visible" -->
<!-- 或者使用下面的写法 -->
<ElDrawer
      :model-value="visible"
      @update:model-value="visible = $event"
    >
      <span>I'm the content</span>
    </ElDrawer>
```
