---
title: vue-router
---

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [路由](#%E8%B7%AF%E7%94%B1)
  - [动态路由匹配](#%E5%8A%A8%E6%80%81%E8%B7%AF%E7%94%B1%E5%8C%B9%E9%85%8D)
    - [$router和$route 的区别](#router%E5%92%8Croute%E7%9A%84%E5%8C%BA%E5%88%AB)
  - [\$route](#route)
- [路由实现的核心原理](#%E8%B7%AF%E7%94%B1%E5%AE%9E%E7%8E%B0%E7%9A%84%E6%A0%B8%E5%BF%83%E5%8E%9F%E7%90%86)
  - [路由模式](#%E8%B7%AF%E7%94%B1%E6%A8%A1%E5%BC%8F)
- [导航守卫](#%E5%AF%BC%E8%88%AA%E5%AE%88%E5%8D%AB)
  - [导航守卫作用解析](#%E5%AF%BC%E8%88%AA%E5%AE%88%E5%8D%AB%E4%BD%9C%E7%94%A8%E8%A7%A3%E6%9E%90)
  - [完整的导航解析流程](#%E5%AE%8C%E6%95%B4%E7%9A%84%E5%AF%BC%E8%88%AA%E8%A7%A3%E6%9E%90%E6%B5%81%E7%A8%8B)
- [路由懒加载](#%E8%B7%AF%E7%94%B1%E6%87%92%E5%8A%A0%E8%BD%BD)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

- SPA(单页应用程序)中,为什么不能使用 a 标签?

  因为单页应用只有一个主的 index.html 页面,所以 a 标签是不起作用的,必须使用 vue-router 进行管理

[Vue-router 实现原理](https://juejin.im/post/5bc6eb875188255c9c755df2)

<!-- # Vue-Router -->

## 路由

### 动态路由匹配

在`vue-router`中使用“动态路由参数”来匹配，使用`：`标记。

#### $router和$route 的区别

\$router 是 VueRouter 的实例,是路由操作对象,只写对象,想要导航到不同的 url,则使用 router.push()方法

\$route 为当前 router 跳转对象,路由信息对象,只读对象,里面可以获取 name、path、query、params 等

**打印$route和$router**

- \$route
  ![image](https://user-images.githubusercontent.com/37958055/86729793-6f9a5480-c060-11ea-9438-8fb3b953647c.png)
- \$router
  ![](https://minimax-1256590847.cos.ap-shanghai.myqcloud.com/img/20200707145057.png)

详情见https://router.vuejs.org/zh/api/#%E8%B7%AF%E7%94%B1%E5%AF%B9%E8%B1%A1%E5%B1%9E%E6%80%A7

### \$route

- path: 当前路由路径
- params: 一个 key/value 对象，包含了动态片段和全匹配片段，如果没有路由参数，就是一个空对象。
  - query: 查询参数，即 url 中?后面部分。例如，对于路径 /foo?user=1，则有 \$route.query.user == 1，如果没有查询参数，则是个空对象。
- hash: 当前路由的 hash 值 (带 #) ，如果没有 hash 值，则为空字符串。
- fullPath: 完成解析后的 URL，包含查询参数和 hash 的完整路径。(关于 URL 的解释可以参见[浏览器访问 URL 的过程](<[https://github.com/fncheng/blog/blob/master/http/http%E5%8D%8F%E8%AE%AE.md#%E5%9C%A8%E6%B5%8F%E8%A7%88%E5%99%A8%E8%BE%93%E5%85%A5-url-%E8%AE%BF%E9%97%AE%E7%BD%91%E5%9D%80%E7%9A%84%E8%BF%87%E7%A8%8B%E4%B8%AD%E5%8F%91%E7%94%9F%E4%BA%86%E4%BB%80%E4%B9%88](https://github.com/fncheng/blog/blob/master/http/http协议.md#在浏览器输入-url-访问网址的过程中发生了什么)>))
- name: 当前路由的名称，如果有的话。(查看[命名路由](https://router.vuejs.org/zh/guide/essentials/named-routes.html))
- redirectedFrom: 如果存在重定向，即为重定向来源的路由的名字。(参阅[重定向和别名](https://router.vuejs.org/zh/guide/essentials/redirect-and-alias.html))

就以`http://localhost:8080/#/user/2`这段为例

path 就是`/user/2`

params 是`{"id":"2"}`

fullPath 是`"/user/2"`·

### \$router

#### 编程式导航

**https://router.vuejs.org/zh/guide/essentials/navigation.html**

##### router.push

```js
# 注意：如果提供了 path，params 会被忽略，上述例子中的 query 并不属于这种情况。取而代之的是下面例子的做法，你需要提供路由的 name 或手写完整的带有参数的 path：
```

##### router.replace

不会向 history 添加新记录

### 路由组件传参

[文档](https://router.vuejs.org/zh/guide/essentials/passing-props.html#%E8%B7%AF%E7%94%B1%E7%BB%84%E4%BB%B6%E4%BC%A0%E5%8F%82)

使用 `props` 将组件和路由解耦：

```vue
const User = { props: ['id'], template: '
<div>User {{ id }}</div>
' } const router = new VueRouter({ routes: [ { path: '/user/:id', component:
User, props: true }, // 对于包含命名视图的路由，你必须分别为每个命名视图添加
`props` 选项： { path: '/user/:id', components: { default: User, sidebar:
Sidebar }, props: { default: true, sidebar: false } } ] })
```

## 路由实现的核心原理

[单页路由解析与实现](https://github.com/chenqf/frontEndBlog/issues/11)

### 路由模式

hash 模式和 history 模式

vue-router 默认 hash 模式,url 会带有"#"标识符,如果想要去除#标识,启用 history 模式.

注意:当启用 history 模式 时,地址栏不可带有/#/,否则会访问出错

[**hash 模式和 history 模式的不同**](https://juejin.im/post/5cde4404f265da1b971a42c8)

- hash 的实现原理

  使用 window.location.hash 实现

```html
<a href="#/home">首页</a>
<a href="#/about">关于</a>
<div id="html"></div>

<script>
  window.addEventListener('load', () => {
    html.innerHTML = location.hash.slice(1)
  })
  window.addEventListener('hashchange', () => {
    html.innerHTML = location.hash.slice(1)
  })
</script>
```

[hashchange event](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/hashchange_event)

- history 的实现原理

  使用 History Api 实现

```html
<a onclick="go(/home)">首页</a>
<a onclick="go(/about)">关于</a>
<div id="html"></div>

<script>
  function go(pathname) {
    history.pushState({}, null, pathname)
    html.innerHTML = pathname
  }
  window.addEventListener('popstate', () => {
    go(location.pathname)
  })
</script>
```

需要注意的是: history 模式在使用本地文件即 file:///模式运行是不可用的,需要使用 ip 模式访问页面

区别:

- 使用 location.href = 'url' 来跳转,简单方便,但是刷新了页面

- 使用 history.pushState('url') 无须刷新页面,静态跳转

- 引进 router,然后使用 router.push('url') 来跳转,使用了 diff 算法,按需加载,减少了 dom 的消耗



### [Html5 History API](https://developer.mozilla.org/zh-CN/docs/Web/API/History_API)



## 导航守卫

导航表示:路由正在发生变化。

> `vue-router` 提供的导航守卫主要用来通过跳转或取消的方式守卫导航。有多种机会植入路由导航过程中：全局的, 单个路由独享的, 或者组件级的。
>
> 而**参数或查询的改变并不会触发进入/离开的导航守卫**。你可以通过[观察 `$route` 对象](https://router.vuejs.org/zh/guide/essentials/dynamic-matching.html#响应路由参数的变化)来应对这些变化，或使用 `beforeRouteUpdate` 的组件内守卫。

说白了,就是在路由跳转过程中的一些钩子函数,路由跳转是一个大过程(跳转前,跳转中,跳转后),每一个过程都有函数,可以执行不同的操作。

- 【全局的】: 是指路由实例上直接操作的钩子函数，他的特点是所有路由配置的组件都会触发，直白点就是触发路由就会触发这些钩子函数。钩子函数按执行顺序包括 beforeEach、beforeResolve（2.5+）、afterEach
- 【路由独享的】: 是指在单个路由配置的时候也可以设置的钩子函数，其位置就是下面示例中的位置，也就是像 Foo 这样的组件都存在这样的钩子函数。beforeEnter
- 【组件内的】: 是指在组件内执行的钩子函数，类似于组件内的生命周期，相当于为配置路由的组件添加的生命周期钩子函数。钩子函数按执行顺序包括 beforeRouteEnter、beforeRouteUpdate (2.2+)、beforeRouteLeave

### [导航守卫作用解析](https://zhuanlan.zhihu.com/p/54112006)

| 导航守卫                                    | 作用                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| beforeEach(to,from,next)<br>全局前置守卫    | 在路由跳转前触发，参数包括 to,from,next（参数会单独介绍）三个，这个钩子作用主要是用于登录验证，也就是路由还没跳转提前告知，以免跳转了再通知就为时已晚。                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| beforeResolve(to,from,next)<br>全局解析守卫 | 这个钩子和 beforeEach 类似，也是路由跳转前触发，即在 beforeEach 和 组件内 beforeRouteEnter 之后，afterEach 之前调用。                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| afterEach(to,from)<br>全局后置钩子          | 和 beforeEach 相反，他是在路由跳转完成后触发，参数包括 to,from 没有了 next（参数会单独介绍）,他发生在 beforeEach 和 beforeResolve 之后，beforeRouteEnter（组件内守卫，后讲）之前。                                                                                                                                                                                                                                                                                                                                                                                                         |
| beforeEnter(to,from,next)<br>路由独享守卫   | 和 beforeEach 完全相同，如果都设置则在 beforeEach 之后紧随执行，相当于局部的 beforeEach                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| beforeRouteEnter(to,from,next)              | 路由进入之前调用。该钩子在全局守卫 beforeEach 和独享守卫 beforeEnter 之后，全局 beforeResolve 和全局 afterEach 之前调用，要注意的是该守卫内访问不到组件的实例，也就是`this`为 undefined，因为守卫执行前,组件实例还没被创建。也就是它在 beforeCreate 生命周期前触发。在这个钩子函数中，可以通过传一个回调给 next 来访问组件实例。在导航被确认的时候执行回调，并且把组件实例作为回调方法的参数，可以在这个守卫中请求服务端获取数据，当成功获取并能进入路由时，调用 next 并在回调中通过 vm 访问组件实例进行赋值等操作，（next 中函数的调用在 mounted 之后：为了确保能对组件实例的完整访问）。 |
| beforeRouteUpdate(to,from,next)             | 在当前路由改变时，并且该组件被复用时调用，可以通过`this`访问实例                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| beforeRouteLeave(to,from,next)              | 导航离开该组件的对应路由时调用，可以访问组件实例`this`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |

### 完整的导航解析流程

1. 导航被触发。
2. 在失活的组件里调用 `beforeRouteLeave` 守卫。
3. 调用全局的 `beforeEach` 守卫。
4. 在重用的组件里调用 `beforeRouteUpdate` 守卫 (2.2+)。
5. 在路由配置里调用 `beforeEnter`。
6. 解析异步路由组件。
7. 在被激活的组件里调用 `beforeRouteEnter`。
8. 调用全局的 `beforeResolve` 守卫 (2.5+)。
9. 导航被确认。
10. 调用全局的 `afterEach` 钩子。
11. 触发 DOM 更新。
12. 用创建好的实例调用 `beforeRouteEnter` 守卫中传给 `next` 的回调函数。

## 路由懒加载

动态加载组件

```js
const Foo = () => import(/* webpackChunkName: "group-foo" */ './Foo.vue')
const router = new VueRouter({
  routes: [{ path: '/foo', component: Foo }],
})
```

其中`/* webpackChunkName: "group-foo" */`是 webpack 中的

相关内容可以看这篇[文章](https://github.com/mrdulin/blog/issues/43)

## 常见问题

### 关于 vue-router 的 beforeEach 无限循环的问题

**预期：**使用 beforeEach 时，判断用户是否登录；已登录，则 next()跳转至相应页面；未登录，则跳转至登录页

**代码：**

```js
// isLogined 用来判断用户是否已登录
router.beforeEach((to, from, next) => {
  if(isLogined){
    next()；
  }else{
    console.log('测试')
    next('login')
  }
})
```

**实际表现：**以上会导致路由无限循环

**原因：**

- next() 表示路由成功，直接进入 to 路由，不会再次调用 router.beforeEach()
- next('login') 表示路由拦截成功，重定向至 login，会再次调用 router.beforeEach()

也就是说 beforeEach()必须调用 next(),否则就会出现无限循环。

官网是这样说明的:

> **`next('/')` 或者 `next({ path: '/' })`**: 跳转到一个不同的地址。当前的导航被中断，然后进行一个新的导航。



### 嵌套路由

理论上有几层，就需要几个`<router-view />`

routeConfig 子菜单children.path 不能以 `/`开头

https://blog.csdn.net/weixin_43887184/article/details/103546681

路径前加/代表跟路径，绝对路径，不加斜杠是相对路径

### 动态添加路由

`router.addRoutes` 已被 `router.addRoute`代替。

addRoutes的参数类型是 routes: Array\<RouteConfig>，而addRoute的参数是route: RouteConfig



