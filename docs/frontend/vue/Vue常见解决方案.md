---
title: Vue常见解决方案
---

### 浏览器title动态修改

```js
/**
 * 获取title
 * @param {String} vm VueComponent实例
 * @returns $route.meata.title
 */
const getTitle = (vm) => {
  const { title } = vm.$options
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

### 在Vue使用Nprogress加载进度条

https://www.jianshu.com/p/346c05d4d9d8

[Github](https://github.com/rstacruz/nprogress)

1. 直接使用
2. 写在axios请求拦截器和响应拦截器中
3. 写在路由中的router.beforeEach和router.afterEach （只在切换路由时有效）