---
title: vue2迁移到vue3
---

## vue3项目搭建

Vue3项目搭建

使用vite

```sh
yarn create vite
```





Vue-router类型声明





## eslint

```sh
yarn add eslint
	eslint-plugin-vue
	eslint-define-config
  @typescript-eslint/eslint-plugin
  @typescript-eslint/parser -D
```

https://juejin.cn/post/6975442828386107400#heading-2

https://juejin.cn/post/7021464780242321439#heading-1



最终配置

```js
const { defineConfig } = require('vite')

module.exports = defineConfig({
  root: true,
  // 指定脚本的运行环境。每种环境都有一组特定的预定义全局变量。
  env: {
    node: true
  },
  parserOptions: {
    // js的版本
    ecmaVersion: 13, // 解析器
    parser: '@typescript-eslint/parser', // 模块化方案
    sourceType: 'module'
  },
  extends: [
    'eslint:recommended',
    'prettier',
    'plugin:vue/vue3-essential',
    
  ],
  plugins: ['vue', '@typescript-eslint'],
  rules: {
    semi: ['error', 'never'],
    quotes: ['error', 'single'],
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'vue/multi-word-component-names': [
      'error',
      {
        ignores: ['Home']
      }
    ]
  }
})
```



### Typescript ESlint

https://typescript-eslint.io/docs/linting/

```sh
yarn add eslint
	typescript 
	@typescript-eslint/parser
  @typescript-eslint/eslint-plugin -D
```



## 路由动态导入

以下代码通过将每个页面打包成单独的js文件，以解决打包单个文件过大，首屏加载慢的问题。

vite中的 [import.meta.glob](https://cn.vitejs.dev/guide/features.html#glob-import)

首先引入所有路由文件

```ts
const modules = import.meta.glob('../views/**/*.vue')
```

<img src="https://minimax-1256590847.cos.ap-shanghai.myqcloud.com/img/image-20231027175202246.png" alt="image-20231027175202246" style="zoom:67%;" />

```ts
const handleAsyncRoutes = (routes: RouteConfig[]): RouteRecordRaw[] =>
  routes.map((route) => {
    return {
      path: route.path,
      component: modules[`../pages/${route.component}.vue`]
    }
  })
const asyncRoutes = handleAsyncRoutes(routesMap)
asyncRoutes.forEach((route) => router.addRoute(route))
```

这样页面就可以正常显示了



### 动态导入No match found for location with path 问题

addRoute(routeConfig)时发现 routeConfig中的一级component为undefined

![image-20220308195212816](https://minimax-1256590847.cos.ap-shanghai.myqcloud.com/img/image-20220308195212816.png)



addRoute的代码如下

```ts
import Layout from '@/view/layout/index.vue'
const modules = import.meta.glob('../views/**/*.vue')
// ...

function filterRoute(routeConfigMap: any) {
  const asyncRoutes = routeConfigMap.map((routeConfig: any) => {
    // routeConfig.component 为 null时
    if (!routeConfig.component) {
      console.log('我进来了')
      routeConfig.component = Layout // 这里不能这样写
      // routeConfig.component = Layout
      routeConfig.path = routeConfig.url
    }
    // 有子菜单
    if (routeConfig.children && routeConfig.children.length > 0) {
      routeConfig.children = filterRoute(routeConfig.children)
    }
    // routeConfig.component 不为 null
    return {
      name: routeConfig.name,
      path: routeConfig.url,
      component: modules['../views/' + routeConfig.component + '.vue'],
      children: routeConfig.children
    }
  })
  console.log('asyncRoutes: ', asyncRoutes)
  return asyncRoutes
}
```

原因是因为routeConfig.component = Layout后最后return的是modules['../views/' + routeConfig.component + '.vue'],

找不到所以是undefined。

改成 `routeConfig.component = 'layout/index.vue'`

routeConfig.name 是唯一的





### 思考🤔：为什么vue中import() 语法不能传一个变量？

es6的import是编译阶段执行，所以不能使用表达式和变量这种只有在运行时才确定值的语法。

具体可以看[文档](https://es6.ruanyifeng.com/#docs/module#import-%E5%91%BD%E4%BB%A4)

webpack是在编译时查找模块的，而用变量的方式保存路径是运行时执行的

```js
let a = 'export'

import some from `${a}.js` // 报错
const some = require(`./${a}.js`) // 不报错
```

require

```js
const a = 10,
  b = 20
var env
if (a > b) {
  env = require('./.env.dev')
} else env = require('./.env.prod')

console.log(env) // 不报错
```

es6 import

```js
if (false) {
  import env from './.env.dev.mjs'
} else import env from './.env.prod.mjs'

console.log(env) // 报错
```



### 关于vite动态导入

传送门👉【[vite动态导入](https://fncheng.github.io/blog/frontend/Webpack/3-Vite/1-Vite%E7%9A%84%E4%BD%BF%E7%94%A8.html#vite%E5%8A%A8%E6%80%81%E5%AF%BC%E5%85%A5)】
