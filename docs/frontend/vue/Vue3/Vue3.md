---
title: Vue3食用
---



## Composition API

### 被 ref() 包装 的变量

```js
const readersNumber = ref(2);
console.log(readersNumber); // 
```

打印结果：

<img src="https://minimax-1256590847.cos.ap-shanghai.myqcloud.com/img/image-20210420112732017.png" alt="image-20210420112732017" style="zoom:70%;" />

### 被reactive() 包装的变量

```js
const obj = reactive({
  name: 'zs',
  age: 18
})
```

打印结果：

<img src="https://minimax-1256590847.cos.ap-shanghai.myqcloud.com/img/image-20210422110445665.png" alt="image-20210422110445665" style="zoom:67%;" />

```js
setup(prop,context){
	console.log(prop)
  console.log(context)
}
```

打印结果：

<img src="https://minimax-1256590847.cos.ap-shanghai.myqcloud.com/img/image-20210420114211526.png" alt="image-20210420114211526" style="zoom:70%;" />



context：

<img src="https://minimax-1256590847.cos.ap-shanghai.myqcloud.com/img/image-20210420114335981.png" alt="image-20210420114335981" style="zoom:67%;" />



### toRaw()返回原始数据

```js
const obj = toRaw({
  name: 'zs',
  age: 18,
});
console.log(obj); // {name: "zs", age: 18}
```

### toReadonly()包装的变量

toReadonly也会将变量包装成一个Proxy对象



### [watchEffect](https://vue3js.cn/docs/zh/api/computed-watch-api.html#watcheffect)

#### watchEffect与watch❓

- `watchEffect` 不需要指定监听的属性，他会自动的收集依赖， 只要我们回调中引用到了 响应式的属性， 那么当这些属性变更的时候，这个回调都会执行，而 `watch` 只能监听指定的属性而做出变更(v3开始可以同时指定多个)。

- 第二点就是 watch 可以获取到新值与旧值（更新前的值），而 `watchEffect` 是拿不到的。

  ```js
  watch:{
    someValue(newValue,oldValue){
      // ...
    }
  }
  ```

- 第三点是 watchEffect 如果存在的话，在组件初始化的时候就会执行一次用以收集依赖（与`computed`同理），而后收集到的依赖发生变化，这个回调才会再次执行，而 watch 不需要，因为他一开始就指定了依赖。







## 组件通信：

#### 1. provide/inject注入

https://vue3js.cn/docs/zh/guide/composition-api-provide-inject.html





## 常见问题

### setup内操作dom

https://juejin.cn/post/6913730913142734861



### async setup

[解决](https://stackoverflow.com/questions/64117116/how-can-i-use-async-await-in-the-vue-3-0-setup-function-using-typescript)

```js
setup() {
  const users = ref([]);
  onMounted(async () => {
    const res = await axios.get("https://jsonplaceholder.typicode.com/users");
    users.value = res.data;
    console.log(res);
  });
  return {
    users,
  };
},
```







## @vue/composition-api

reactive包裹空对象新增属性没有响应性 [issues](https://github.com/vuejs/composition-api/issues/580)

["reactive" doesn't work well with Array #219](https://github.com/vuejs/composition-api/issues/219)

[Vue.observable on an array does not really work #9499](https://github.com/vuejs/vue/issues/9499)

```js
// 点击按钮后lis不会增加，而tabs会正常增加
setup() {
  let lis = reactive([]);
  let tabs = ref([]);
  function handleClick() {
    lis = [1, 2, 3];
    tabs.value = [1, 22, 3];
    // lis.push(1, 2, 3);
  }
  return { lis, tabs, handleClick };
},
```



为了解决数组响应式的问题，

修改数组全部使用

```js
let arr = reactive([])
arr.push()
arr.splice(0) // 清空数组
```







## [Ts支持](https://v3.cn.vuejs.org/guide/typescript-support.html#typescript-%E6%94%AF%E6%8C%81)



### 了解script setup

[Understanding the new script setup with defineProps & defineEmits in Vue 3.2](https://www.netlify.com/blog/understanding-defineprops-and-defineemits-in-vue-3.2)



## 在Vue3中使用CSS module

可以通过两种方式：

1.一种是在setup或render中定义

```js
const $style = useCssModule()
```

2.另一种是在style中使用module声明

```vue
<template>
  <div :class="mystyle.red">{{ count }}111</div>
</template>

<style module="mystyle">
.red {
  color: red;
}
</style>
```

添加module属性，自动注入



### 在jsx中使用css module

使用vite

```tsx
import styles from './MyButton1.module.css'

render() {
  <span class={styles.blue}>{this.count}</span>
}
```

添加类名自动提示

typescript-plugin-css-modules
