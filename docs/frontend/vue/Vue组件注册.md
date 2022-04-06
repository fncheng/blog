## 组件名大小写的问题

请注意:定义组件时组件名只能用**驼峰式写法**或者**全小写(可以用-连接)**

#### 全局注册

`Vue.component`可以用来全局注册组件

```js
//main.js
Vue.component('my-component-name', {
  // ... 选项 ...
})

//或者
import User from './views/User'
import About from './views/About'
// 全局注册组件
Vue.component('user', User)
Vue.component('about', About)
```

#### 局部注册

```js
var componentA = {
  /* ... */
}
new Vue({ el: '#app', components: { 'component-a': ComponentA, 'component-b': ComponentB } })
```
