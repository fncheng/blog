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

