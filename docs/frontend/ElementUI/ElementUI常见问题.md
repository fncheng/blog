---
title: element-ui常见问题
---



## Element-UI

结构

```sh
element-ui
|---lib				#
|---node_modules
|---packages	#存放组件源码，也是之后源码分析的主要目标。
|---src				#存放入口文件以及各种辅助文件。
|---types 
```



## Tabs标签页

```vue
<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="用户管理" name="first">用户管理</el-tab-pane>
    <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
    <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
    <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
  </el-tabs>
</template>
<script>
  export default {
    data() {
      return {
        activeName: 'second'
      };
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      }
    }
  };
</script>
```



### El-tab内部嵌套表格高度会有问题

尽量不要再el-tab内部嵌套内容，el-tab单独用来显示标签栏，内容另外写，用v-if/v-show来控制显示隐藏。、

```vue
<template>
  <el-tabs v-model="tabIndex" @tab-click="tabClick">
    <el-tab-pane label="用户管理" name="first"></el-tab-pane>
    <el-tab-pane label="配置管理" name="second"></el-tab-pane>
    <el-tab-pane label="角色管理" name="third"></el-tab-pane>
    <el-tab-pane label="定时任务补偿" name="fourth"></el-tab-pane>
  </el-tabs>
	<div>
    <!-- 内容 -->
  </div>
</template>
```



## Table 表格

https://element.eleme.cn/#/zh-CN/component/table

### Table-column Scoped Slot

表格列自定义插槽

`el-table-column` 使用prop来绑定 `table` 组件里:data绑定的数组中的一个属性，假设我们要在 `el-table-column` 组件里访问这个属性，直接访问是不可以的，因为这是 `el-table-column` 内部子组件的内容，如果要访问，还得让子组件$emit 一层一层传上来，这样就很麻烦。幸好Vue的插槽提供了一个方法，让插槽内容能够访问子组件中才有的数据，即作用域插槽。**而element-ui 将内部值通过{ row, column, $index } 传递出来**

<img src="https://minimax-1256590847.cos.ap-shanghai.myqcloud.com/img/image-20211021143754177.png" alt="image-20211021143754177" style="zoom:67%;" />

```vue
<el-table-column prop="obj" label="作用域插槽">
  <!-- 
    element-ui table-column scoped slot
    自定义列的内容，参数为 { row, column, $index }
    https://element.eleme.cn/#/zh-CN/component/table#table-column-scoped-slot
   -->
  <template v-slot="slotProps">
    <div>
      {{ slotProps.row.name }}
      <!-- slotProps.row 即obj这一项内容 -->
    </div>
  </template>
</el-table-column>
```

### table表格出现滚动条时，表格宽度被撑开？

<img src="https://minimax-1256590847.cos.ap-shanghai.myqcloud.com/img/image-20210603214958769.png" alt="image-20210603214958769" style="zoom: 50%;" />



>  解决办法：给对应的列设置固定宽度即可 width="xx px"



### 自定义表格-表头的样式

> **header-row-class-name:** 表头行的 className 
>
> **header-cell-class-name:** 表头单元格的 className
>
> **header-cell-style:** 表头单元格的样式style，可以是Function/Object

```vue
<template>
  <div class="index">
    <div class="wrapper">
      <el-table
        :data="tableData"
        :header-row-class-name="'table-header-row'"
        :header-cell-class-name="'header-cell-class-name'"
        :header-cell-name="'header-cell-name'"
        :header-cell-style="{ 'backgroundColor': 'red' }"
      >
        <el-table-column prop="date" label="日期" width="180">
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="180">
        </el-table-column>
        <el-table-column width="220px" prop="address" label="地址">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<style scoped>
/* 需要使用深度作用选择器，如果是sass则使用::v-deep */
.wrapper {
  width: 400px;
  /* overflow: scroll; */
}
.table-header-row {
  /* background-color: tomato; */
}
.index .wrapper >>> .header-cell-class-name {
  background-color: sandybrown;
}
.index .wrapper >>> .header-cell-class-name {
  background-color: silver;
}
</style>
```

[demo](https://codesandbox.io/s/ele-table-column-style-7rqvm)

### el-table占满容器剩余高度

在容器内有其他元素的情况下，el-table需要占满剩余高度，给table加`height="100%"`是无效的，会溢出容器。

```html
.container {
  width: 100%;
  height: 100%;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
}
.title {
  height: 30px;
}
<div class="container">
  <div class="title">123</div>
  <el-table height="100%">
    <el-table-column label="姓名"></el-table-column>
    <el-table-column label="姓名"></el-table-column>
    <el-table-column label="姓名"></el-table-column>
  </el-table>
</div>
```

正确的做法是：给表格的父容器container添加height，使用calc计算高度。



### 表格过滤筛选

**filters** table-column属性 Array[{ text, value }]



### Table Event

**cell-dblclick=rowCellDblClick(row, column, cell, event)**

row 是表格行数据

column 是表格列属性名

cell 是该单元格dom元素



## el-input

### el-input 组件 autocomplete属性不生效的问题

```html
<el-form ref="form" :model="form">
  <el-form-item>
    <el-input v-model="form.username" autocomplete="on" placeholder="Name"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button @click="onSubmit">Submit</el-button>
  </el-form-item>
</el-form>
```

原因：

el-input组件需要添加name属性

### el-input限制数字

通过内联oninput="value=value.replace(/\[^\d]/g, '')"来实现

```vue
<el-input
  v-model="number"
  oninput="value=value.replace(/[^\d]/g, '')"
  style="width: 80px"
>
</el-input>
```





## form表单

### 1. el-form-item组件 label标签内文字垂直居中的问题

#### el-form-item组件 slot 插槽的使用

**el-form-item**组件通过传递一个`label` props ，生成表单域的label标签名

猜测：实际上传入的label 属性在**el-form-item**组件内部传给了 slot name = "label" 这个插槽内部了



而 **el-form-item**组件也提供了 slot 的用法：

```vue
<el-form-item label="" size="medium">
  <span slot="label">是否首次发现血压异常</span>
  <el-input v-model="form.name"></el-input>
</el-form-item>

<!-- 等效于 -->
<!-- 上面的用法比下面的label标签内部多出一个span标签，
这样可以更精细地控制label标签内文字的排版布局 -->

<el-form-item label="是否首次发现血压异常">
  <el-input v-model="form.name"></el-input>
</el-form-item>
```

**现在回到最初的问题，如何让label标签内的文字垂直居中，如果使用label props肯定是不行的。**

**所以需要使用slot，并设置css 使外部的label标签flex布局并垂直居中对齐，内部的span标签则是使用vertical-align属性居中**，需要注意的是 vertical-align 属性只对行内元素起作用。

```vue
<el-form-item label="" size="medium">
  <span slot="label">是否首次发现血压异常</span>
  <el-input v-model="form.name"></el-input>
</el-form-item>

<style scoped>
.index >>> .el-form-item__label {
  border: 1px dashed sandybrown;
  height: 36px;
  line-height: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.index >>> .el-form-item__label span {
  border: 1px dashed blueviolet;
  text-align: center;
  vertical-align: middle;
}
</style>
```

[demo](https://codesandbox.io/s/fervent-solomon-svgw4?file=/src/views/Index.vue)

#### el-form-item间距过大并且不是垂直居中的

原因在于el-form-item有一个20px的 margin-bottom，将其设置为0即可

```css
.el-form-item {
  margin-bottom: 0;
}
```



### 2. form表单内部el-col实现动态列

form表单内部可以设置一行显示几个el-form-item

可以通过自定义指令，传入需要显示的列数。通过动态的控制el-col 的className 来实现 （el-col的span属性即通过className来实现的）

注意⚠️：**这样做需要把所有的el-col都放在一个el-row中**

```js
import Vue from "vue"

export default {
  cspan: Vue.directive("cspan", {
    // 元素插入DOM
    inserted(el, binding) {
      console.log(el)

      console.log(binding)
      // binding.value 为几列
      if (binding.value) {
        let col = 24 / binding.value
        console.log(el.classList)
        console.log(el.className)
        console.log(el.classList[1]) // 注意: classList的属性不能直接对其修改，只能通过add、remove去操作
        el.className = "el-col el-col-" + col
        // el.classList.add("el-col-8")
      }
    }
  })
}
```

[demo](https://codesandbox.io/s/vue-cspan-svgw4)

## element-ui的form表单校验

rules是一个数组对象，每一个对象都是一个数组，数组内部又包含多个对象，每个对象是一个校验规则

```ts
type ElFormRules = {
  rule: Array<ElFormRule>
}

type ElFormRule = {
  required?: true | false
  validator?: (rule: ElFormRule, value: any, callback: Function) => {}
  message: string
  trigger: string
}
```



### 3. 表单验证规则不生效的原因以及:model

`:model` 的值是必须的

model、rule、prop三者缺一不可

```sh
[Element Warn][Form]model is required for validate to work! 
```



在表单校验中，\<el-form-item\>一定要设置prop属性，并且属性值要与与 model=“loginForm.username” 保持一致，否则校验规则无效。

### 4. form表单数字验证

`el-input`组件默认value类型为String，所以要使el-input v-model的值为 Number，数字类型的验证需要在 `v-model` 处加上 `.number` 的修饰符，这是 `Vue` 自身提供的用于将绑定值转化为 `number` 类型的修饰符。

```vue
<el-form label-width="120px" :rules="rules">
  <el-form-item label="请输入数字" prop="number">
    <el-input v-model.number="number"></el-input>
  </el-form-item>
</el-form>

<script>
export default {
  name: 'Home',
  data() {
    return {
      number: 0,
      rules: {
        number: [
          {
            type: 'number',
            message: '请选择时间',
            trigger: 'change',
          },
        ],
      },
    }
  },
}
</script>
```



### 5.表单验证自定义验证方法

element ui表单验证

[async-validator](https://github.com/yiminghe/async-validator)

```js
{ validator: (rule, value, callback) => {
          if (RegIdCardNo.test(value)) {
            callback()
          } else callback(new Error('身份证号填写错误'))
        } }
```

其中callback是一定要调用的

### el-form 嵌套el-table的表单验证

上网查阅得知 这个时候要用动态prop

具体案例看[demo](https://codesandbox.io/s/cool-fermi-cjpzmh?file=/src/views/index.vue)

```vue
<el-form :model="form" :rules="rules">
  <el-table :data="form.tableData" border :header-cell-class-name="'table-header-class'">
    <el-table-column label="姓名">
      <template slot-scope="scope">
        <el-form-item :prop="'tableData.' + scope.$index + '.name'" v-if="scope.row.isEdit" :rules="rules.name">
          <el-input v-model="scope.row.name"></el-input>
        </el-form-item>
        <span v-else>{{ scope.row.name }}</span>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <span @click="editItem(scope.row)">编辑</span>
      </template>
    </el-table-column>
  </el-table>
  <el-form-item prop="sex" label="性别">
    <el-input v-model="form.sex"></el-input>
  </el-form-item>
</el-form>
```

其中el-form-item上的prop要动态绑定，写作`:prop="'tableData.' + scope.$index + '.name'"`，或者用反引号

:prop="\`tableData.${scope.$index}.date\`"

## Dialog







## el-scrollbar自定义滚动条

```vue
<template>
  <div class="index">
    <div class="q-ma-md">
      <!-- 
        wrap-class 包裹容器类名 元素可视区域部分
        view-class 视图类名    元素实际高度（包括被隐藏的部分）
       -->
      <el-scrollbar
        style="height: 200px; max-width: 300px"
        :view-style="viewStyle"
        wrap-class="wrap-class"
        view-class="view-class"
      >
        <div v-for="n in 10" :key="n" class="q-pa-xs">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </div>
      </el-scrollbar>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.q-ma-md {
  margin: 16px 16px;
}
/* 设置滚动条样式 */
.index /deep/ .el-scrollbar__bar.is-vertical {
  background-color: rgb(2, 123, 227);
  .el-scrollbar__thumb {
    background-color: red;
  }
}
</style>
```



## DatePicker

### type="week"时处理时间报错

<img src="https://minimax-1256590847.cos.ap-shanghai.myqcloud.com/img/image-20210721140938989.png" alt="image-20210721140938989" style="zoom:67%;" />

原因可能是v-model绑定的时间值不是时间对象比如`date: 'yyyy-mm-dd'` 类型就会报错

而改成`yyyymmdd`就不会报错



el-date-picker的`v-model` 等价于 `:value="date" @input=(e)=>(date=e)`

```vue
<el-date-picker
  :value="value2 * 1000 || null"
  @input="handleInput"
  type="date"
  value-format="timestamp"
  placeholder="选择日期"
>
</el-date-picker>

<!-- 这里的null是为了clear清空时再次点击可以直接跳转到当前时间，不设置的话默认是1970年 -->
```


