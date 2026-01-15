## ElementPlus

## ElementPlus Form Rules

老样子表单校验还是需要给Form设置model

model、rule、prop三者缺一不可

model：必须是一个ref或reactive响应式对象

rules的类型：`Arrayable<FormItemRule>`

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

### 表单校验配合Promise使用

```ts
const isValid = await formRef.value?.validate()
if (isValid) {
  console.log('✅ 表单通过验证')
} else {
  console.log('❌ 表单未通过验证')
}
```



❌ 这种写法会让 `validate()` 不再返回 Promise：

```ts
formRef.value?.validate((valid) => {
  // ❌ 此时不能再用 await 或 Promise.all
})
```

要么就自己封装

```ts
const validate = () => {
  return new Promise<boolean>((resolve, reject) => {
    formRef.value?.validate((valid: boolean, invalidFields) => {
      console.log('invalidFields: ', invalidFields)
      if (valid) {
        resolve(true)
      } else {
        reject(invalidFields)
      }
    })
  })
}
```

如果使用第一种方法，有个缺点就是不能拿到callback中第二个参数invalidFields，即哪些字段没通过表单校验

### Form的resetFields()

1. 调用 resetFields() 时，会重置到表单打开时的值，而不是真正的初始值（空字符串）



Table ref

```ts
const tableRef = ref<InstanceType<typeof ElTable>>();
<ElTable
      border
      row-key="uuid"
      ref="tableRef"
/>
```



如果表单是通过provide传入的全局变量，model可以直接使用

```vue
const formContext = useFormContext()

<ElForm :model="formContext">
    <ElFormItem
                prop="name"
                :rules="[{ required: true, message: '请输入姓名', trigger: ['blur', 'change'] }]"
                >
        <ElInput v-model:model-value="formContext.name"></ElInput>
    </ElFormItem>
</ElForm>
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

### 设置不必选中最后一级

```ts
checkStrictly: true
```

### 设置勾选时不触发lazyLoad

checkStrictly: true

这样勾选时就不会触发加载了，只有点击节点时才会触发

```ts
multiple: true,
  checkStrictly: true,
```

当按上面配置设置后，勾选父节点和其下子节点，绑定数据为

```ts
[
  ["3905643effe74e17902a77e243f1a4e1"],
  ["3905643effe74e17902a77e243f1a4e1","bc3d45b07a354674a8086682d74bfdb6"]
]
```

可以看出第二项包含了父节点的信息，如何让它不含父节点信息呢





## ElSelect

限制展示的tag数量

需要同时设置 collapse-tags 和 max-collapse-tags 属性

### el-select的:popper-append-to-body="false"有什么用

### 优点（`true` 的好处）

将下拉层挂载到 `body` 下有几个明显优点：

1. **不会被父级容器的 `overflow: hidden`、`overflow: auto`、`z-index` 等样式影响**
   - 例如，当你的 `<el-select>` 放在一个有滚动条或裁剪的容器内时，下拉菜单不会被截断。
2. **层级更高，不容易被其他元素遮挡**
   - 因为挂载到 body 后，可以更容易控制 z-index，防止被父级卡片、模态框等遮盖。

------

### ⚠️ 缺点（有时会带来问题）

但是在某些场景下，`popper-append-to-body="true"` 会带来一些问题：

| 场景                                  | 问题                                                       |
| ------------------------------------- | ---------------------------------------------------------- |
| 嵌套在弹窗或特定布局组件中            | 弹窗关闭时下拉菜单可能还留在页面上（尤其是手动控制的场景） |
| 使用 `transform` 的容器中             | 可能导致 popper 定位计算错误                               |
| 嵌套在微前端、iframe 或 shadow DOM 中 | popper 跑到宿主应用的 body 下，导致样式或层级错乱          |
| 希望局部控制 z-index 层级             | popper 在全局 body 下不好控制层叠关系                      |

### 实战建议

- **普通业务页面**：不用管，保持默认即可。
- **微前端子应用**：✅ 推荐 `:popper-append-to-body="false"`，否则弹层可能跑出子应用。
- **Modal 或 Drawer 内的 select**：✅ 推荐 `false`，避免关闭弹窗后下拉残留。
- **在有 `overflow: hidden` 的容器中使用**：⚠️ 要权衡，必要时增加 z-index 或修改布局。

在Element Plus 2.2+版本后，更推荐使用teleported属性



## ElOption的value属性绑定对象

当ElOption 的 :value 绑定的是对象时，需要设置value-key（一般是id） 作为唯一标识字段

