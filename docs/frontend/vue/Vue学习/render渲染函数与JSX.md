# Vue JSX

## [render渲染函数](https://cn.vuejs.org/v2/guide/render-function.html#JSX)

### createElement

[createElement参数](https://cn.vuejs.org/v2/guide/render-function.html#createElement-%E5%8F%82%E6%95%B0)

第二个参数： https://juejin.cn/post/7030362678199582734#heading-2

```js
render(h) {
    h('div',{
      class: {}, // 类名
      domProps: {}, // DOM 属性
      props: {},
      attrs: {},
      style: {}, // 样式
      on: {}, // 绑定事件
    })
  }
```



在vue文件中写render时不要写template，否则不会渲染。

```vue
<script>
export default {
  name: 'Home',
  render(h) {
    return h('h1', 'some') // h即createElement
  },
}
</script>
```

当使用render函数渲染一个函数式组件时，渲染函数还会接收一个额外的 `context` 参数。

```vue
<script>
export default {
  name: 'Func',
  functional: true,
  render(h, { props }) {
    console.log(props)
    return (
      <div>
        <p>这是一个函数组件</p>
      </div>
    )
  },
}
</script>
```

### h auto-injection

> Starting with version 3.4.0 we automatically inject `const h = this.$createElement` in any method and getter (not functions or arrow functions) declared in ES2015 syntax that has JSX so you can drop the `(h)` parameter.

从3.4.0开始h会被自动注入



## 在Vue2.x中使用jsx

```sh
yarn add @vue/babel-preset-jsx @vue/babel-helper-vue-jsx-merge-props -D
```



按照[教程](https://github.com/vuejs/jsx)中安装了`@vue/babel-preset-jsx`和 `@vue/babel-helper-vue-jsx-merge-props`后报错

`Duplicate declaration "h"`。

官网有这样一段话

> 我们会在以 ES2015 语法声明的含有 JSX 的任何方法和 getter 中 (不是函数或箭头函数中) 自动注入 `const h = this.$createElement`，这样你就可以去掉 `(h)` 参数了。

而babel-preset-jsx应该是也注入了h所以导致报错。

设置babel.config.js

```js
module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset',
    ['@vue/babel-preset-jsx', { injectH: false }]
  ]
}
```

如果是Webpack构建的项目，则设置injectH: true

#### ESLint报错

https://eslint.vuejs.org/user-guide/#faq

如果您使用 JSX，则需要在 ESLint 配置中启用 JSX。

```diff
  "parserOptions": {
      "ecmaVersion": 2020,
      "ecmaFeatures": {
+         "jsx": true
      }
  }
```





#### Vue jsx接收父组件传递过来的参数

在SFC中我们在子组件中通过定义props来接收，而在jsx中我们一样可以通过定义props来接收，而如果不想用props接收，则属性默认挂载在$attrs上

[关于props和$attrs，Vue官网的说明](https://cn.vuejs.org/v2/guide/components-props.html#%E9%9D%9E-Prop-%E7%9A%84-Attribute)



Vue jsx 中事件名第一个单词可以大写，后面必须小写，比如：

`onMousemove` 、 `onDblclick`

或者统一小写 `onmousemove`、 `ondblclick`



#### jsx中如何向上传递数据

emit传递，通过setup第二个参数ctx 中的emit向上传递

```jsx
// 子组件
const handleInput = (e) => {
  ctx.emit('do-input', e)
}
<el-input
  vModel={this.name}
  class="input"
  onInput={this.handleInput}
></el-input>

// 父组件
const name = ref('name')
const doInput = (e) => {
  name.value = e
}
<Mouse
  render={(mouse) => <Cat mouse={mouse} />}
  ondo-input={this.doInput}
></Mouse>
```

emit event name 事件名最好用小写



#### jsx语法使用elementui的el-table-column插槽功能

```vue
<template>
<el-table-column label="性别">
  <template>
    <el-input v-model="name"></el-input>
  </template>
</el-table-column>
</template>

// 使用jsx

<el-table-column>
  {<el-input vModel={this.name}></el-input>}
</el-table-column>
```

#### JSX 具名插槽

[JSX中使用插槽与createElement](https://blog.csdn.net/weixin_44423832/article/details/106187043)

```vue
// 子组件
<template>
  <div>
    <div class="header">
      <slot name="header">header</slot>
    </div>
    <div class="body">
      <slot></slot>
    </div>
    <div class="footer">
      <slot name="footer">footer</slot>
    </div>
  </div>
</template>

// 父组件 使用插槽
<ChildVue>
  {<div slot="header">this is body</div>}
  {<div>this is body</div>}
  {<div slot="footer">this is footer</div>}
</ChildVue>
```

子组件使用jsx render

```jsx
render() {
  return (
    <div>
      <div class="header">{this.$slots.header}</div>
      <div class="body">{this.$slots.default}</div>
      <div class="footer">{this.$slots.footer}</div>
    </div>
  )
},
```



作用域插槽

```jsx
<user :obj="'123'">
  <template v-slot:default="slotProps">
    {{ slotProps }}
    {{ slotProps.obj }}
  </template>
</user>

// 子组件
<slot name="default" :user="user" :obj="obj">header</slot>
props: {
  obj: String
}
```

JSX作用域插槽

```jsx
// 父组件 使用插槽
<UserVue
  obj="this is obj1"
  scopedSlots={{
    default: (props) => {
      console.log(props)
      return <div style="backgroundColor:orange">{props.obj}今年</div>
    },
    footer: (props) => `text${props.obj}`,
  }}
>
  <div slot="header">header</div>
</UserVue>

// 子组件 定义插槽
// 这里使用?.() 去调用，是为了避免作用域插槽未使用时会报错
render() {
  return (
    <div>
      <div class="header">{this.$slots.header}</div>
      <div class="body" obj={this.obj}>
        {this.$scopedSlots.default?.(this.$props)}
      </div>
      <div class="footer" obj={this.obj}>
        {this.$scopedSlots.footer?.(this.$props)}
      </div>
    </div>
  )
}
```





jsx中的v-if 

```jsx
{this.isShow ? <div>123</div> : <div>456</div>}
```

v-show（v-show正常生效）

```jsx
<div vShow={true}>v-show指令</div>
```

v-for

```jsx
{[1, 2, 3].map((item, index) => { return <p key={index}>{item}</p> })}
```



#### JSX函数组件

```jsx
import { ref } from '@vue/composition-api'
import { Button } from 'element-ui'
const b = ref('b')

/* eslint-disable */
const ComponentA = (props) => {
  const a = ref('123')
  console.log('a: ', a.value)
  return (
    <div>
      <h3>{a.value}</h3>
      <h4>{b.value}</h4>
      <button
        onClick={() => {
          console.log(123)
        }}
      >
        click me
      </button>
      <el-button
        onClick={() => {
          console.log('ele click')
        }}
      >
        ele click
      </el-button>
      <Button
        onClick={() => {
          console.log('ele click')
        }}
      >
        ele click
      </Button>
    </div>
  )
}

export default ComponentA
```



### 使用TSX

报错：JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.ts(7026)

因为不存在全局类型 "JSX.Element"。

解决办法有俩种：

1. 不使用严格的类型检查，即tsconfig.json 中设置 "strict": false
2. "noImplicitAny": false, // 是否在表达式和声明上有隐含的any类型时报错



2.报错Cannot find name 'React'

tsconfig中"jsx"需要设置为"preserve"







## 在Vue3.0中使用JSX

[Babel Plugin JSX for Vue 3.0](https://github.com/vuejs/jsx-next#installation)

```sh
yarn add @vue/babel-plugin-jsx -D
```

Vite使用JSX => https://cn.vitejs.dev/guide/features.html#jsx

vite.config.ts

```ts
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
})
```

此外编辑器不认识tsx标签，报类型错误，需要在tsconfig.json中配置

```json
{
    "compilerOptions": {
        "jsx": "preserve",
        "jsxImportSource": "vue",
    }
}
```

tsx组件

```tsx
import { defineComponent, ref } from "vue"

export default defineComponent({
  setup() {
    const count = ref(100)
    const handleClick = () => {
      count.value++
    }

    return () => (
      <div>
        <span>{count.value}</span>
        <button onClick={handleClick}>click</button>
      </div>
    )
  }
})
```

需要注意的事项：

1. return需要返回一个Function，这与React不同
2. 通过ref声明的变量在JSX中需要通过`.value`去访问



### 接收props有两种方式

1. defineComponent方式

   ```tsx
   import { defineComponent, ref } from "vue"
   
   export default defineComponent({
     props: {
       name: String
     },
     setup(props) {
       const count = ref(100)
       const handleClick = () => {
         count.value++
       }
   
       return () => (
         <div>
           <span>{props.name}</span>
           <span>{count.value}</span>
           <button onClick={handleClick}>click</button>
           <input type="text" v-model={count.value} />
         </div>
       )
     }
   })
   ```
