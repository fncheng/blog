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

## Cascader级联选择器

懒加载lazyLoad

```vue
<template>
    <ElCascader v-model:model-value="selectedValue" :options="options" :props="props"></ElCascader>
</template>

<script setup lang="ts">
import { getNodes } from '@/api/api'
import { ElCascader, type CascaderOption, type CascaderProps } from 'element-plus'
import { ref } from 'vue'

const selectedValue = ref(['zhejiang', 'hangzhou'])
const options = ref<CascaderOption[]>([])

const getNodeData = (node?: string | number) =>
    getNodes(node).then((res) => {
        const { nodes } = res
        if (nodes.length > 0) {
            return res
        }
        return { nodes: [] }
    })

getNodeData().then((res) => {
    console.log('res****1', res)
    options.value = res.nodes
})

const props: CascaderProps = {
    lazy: true,
    lazyLoad: async (node, resolve) => {
        console.log('node: ', node)
        const { value } = node
        if (value) {
            const res = await getNodeData(value)
            resolve(res.nodes)
        }
        resolve([])
    }
}
</script>
```

经验证，也支持异步多选及多选数据回显





## 按需引入

unplugin-vue-components和unplugin-auto-import分别是做什么的

unplugin-vue-components是按需自动导入组件

- **自动导入 Vue 组件**：无需手动在每个文件中写 `import` 语句。

- 根据组件的使用情况，**按需引入组件及其相关依赖**，优化打包结果，避免引入未使用的组件。

unplugin-auto-import是自动导入API

- **自动导入常用的 API**，如 Vue 的 `ref`、`reactive`、`computed`，或者你指定的第三方库（如 Vue Router 的 `useRouter`）。
- 避免反复手动写 `import { ref } from 'vue'`，提高开发效率。
- 提供全局类型支持，保证编辑器有良好的类型提示。



如果只是想要自动导入ElementPlus的样式

则使用另外的插件 **unplugin-element-plus**

```ts
// vite.config.ts
import { defineConfig } from 'vite'
import ElementPlus from 'unplugin-element-plus/vite'

export default defineConfig({
  // ...
  plugins: [ElementPlus({})],
})
```

