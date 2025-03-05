---
title: Vue常见解决方案
---

## 浏览器title动态修改

```js
/**
 * 获取title
 * @param {String} vm VueComponent实例
 * @returns $route.meata.title
 */
const getTitle = (vm) => {
  const { title } = vm.$options
  /**
   * 如果组件有title属性：
   *    1. title是个函数，跳用title(),并将vm即该组件 作为this传入
   *    2. title不是函数，则返回title
   * 如果组件没有title属性：
   *    则取用route.meta.title 即路由表中的title
   */
  if (title) {
    return typeof title === 'function' ? title.call(vm) : title
  } else {
    return vm.$route?.meta?.title || ''
  }
}

const globalMixin = {
  mounted() {
    // 浏览器title动态修改
    const title = getTitle(this)
    if (title) {
      document.title = title
    }
  },
}
export default globalMixin
```

> 思路是 在路由表routes中meta属性定义一个title，然后在每个页面的mounted阶段获取$route.meta.title，之后修改document.title。而需要在每个页面的mounted阶段都运行，可以使用全局mixin。

## 在Vue使用Nprogress加载进度条

https://www.jianshu.com/p/346c05d4d9d8

[Github](https://github.com/rstacruz/nprogress)

1. 直接使用
2. 写在axios请求拦截器和响应拦截器中
3. 写在路由中的router.beforeEach和router.afterEach （只在切换路由时有效）

## Vue动态添加样式

通过变量控制

```vue
<div class="g-top">
<el-button
  id="tab-first"
  :class="`btn-title ${activeTab === 1 ? 'active' : ''}`"
  @click="activeTab = 1"
>
  居民健康状况
</el-button>
<el-button
  id="tab-second"
  :class="`btn-title ' + ${activeTab === 2 ? 'active' : ''}`"
  @click="activeTab = 2"
>
  居民列表
</el-button>
</div>
```



## 生产环境开启devtools

https://blog.csdn.net/xxcmyh/article/details/121498959

Vue2

```js
let Vue, walker, node; 
walker = document.createTreeWalker(document.body, 1); 
while ((node = walker.nextNode())) { 
	if (node.__vue__) { 
		Vue = node.__vue__.$options._base; 
		if (!Vue.config.devtools) { 
			Vue.config.devtools = true; 
			if (window.__VUE_DEVTOOLS_GLOBAL_HOOK__){
				window.__VUE_DEVTOOLS_GLOBAL_HOOK__.emit("init", Vue);
			} 
		} 
		break; 
	} 
}
```

Vue2

```js
const devtools = window.__VUE_DEVTOOLS_GLOBAL_HOOK__
const Vue = $('#app').__vue__.__proto__.constructor
Vue.config.devtools = true
devtools.emit('init', Vue)
```





Vue3

```js
let vue, node, walker; 
walker = document.createTreeWalker(document.body, 1); 
while ((node = walker.nextNode())) { 
	if (node.__vue_app__) { 
		vue = node.__vue_app__; 
		if (!vue.config.devtools) { 
			vue.config.devtools = true; 
			if (window.__VUE_DEVTOOLS_GLOBAL_HOOK__) {
				window.__VUE_DEVTOOLS_GLOBAL_HOOK__.emit("init", vue);
			} 
		} 
		break; 
	} 
}
```

