# 使用qiankun

### 参数介绍

- name - `string` - 必选，微应用的名称，微应用之间必须确保唯一。
- entry - `string | { scripts?: string[]; styles?: string[]; html?: string }` - 必选，微应用的入口。





### 主应用

```js
// main.js
import { registerMicroApps, start } from 'qiankun'
registerMicroApps([
  {
    name: 'sub-app-vue',
    entry: '//localhost:7100',
    container: '#subapp-container',
    activeRule: '/app-vue'
  },
  {
    name: 'sub-app-react',
    entry: '//localhost:7200',
    container: '#subapp-container',
    activeRule: '/app-react'
  }
])

start()
```



### 子应用

```js
// main.js
import './public-path'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueCompositionAPI from '@vue/composition-api'
import { createPinia, PiniaVuePlugin } from 'pinia'
// import './mock/index'
import '@/assets/tailwindcss.css'

Vue.use(VueCompositionAPI)
Vue.use(ElementUI)
Vue.use(PiniaVuePlugin)
const pinia = createPinia()

Vue.config.devtools = true
Vue.config.productionTip = false

let app = null
function render(props = {}) {
  const { container } = props
  app = new Vue({
    router,
    store,
    pinia,
    render: (h) => h(App),
  })
  app.$mount(container ? container.querySelector('#app') : '#app')
}

// 独立运行时
if (!window.__POWERED_BY_QIANKUN__) {
  render()
}

// 微前端环境下的生命周期钩子
export async function bootstrap() {
  console.log('[vue] vue app bootstraped')
}

export async function mount(props) {
  console.log('[vue] props from main framework', props)
  render(props)
}

export async function unmount() {
  console.log('[Vue] app unmounted')
  app.$destroy()
  app = null
}
```

```js
// public-path.js
if (window.__POWERED_BY_QIANKUN__) {
  // eslint-disable-next-line no-undef
  __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__;
}
```

```js
// router.js
const router = new VueRouter({
  mode: 'history',
  base: window.__POWERED_BY_QIANKUN__ ? '/app-vue' : '/',
  routes,
})
```

如果是Vue3

```ts
function render(props = {}) {
  const { container } = props
  instance = createApp(App)
  instance.use(router)
  instance.mount(container ? container.querySelector('#app') : '#app')
}
```

### 子应用的webpack需要如下设置

然后在webpack中配置

```js
configureWebpack: {
    output: {
      library: `sub-app-vue`, // 这里不是非要跟子应用名一样
      libraryTarget: 'umd', // 把微应用打包成 umd 库格式
      jsonpFunction: `webpackJsonp_sub-app-vue`, // webpack 5 需要把 jsonpFunction 替换成 chunkLoadingGlobal
    },
```

### 如何在主应用的某个路由页面加载微应用

https://qiankun.umijs.org/zh/faq#%E5%A6%82%E4%BD%95%E5%9C%A8%E4%B8%BB%E5%BA%94%E7%94%A8%E7%9A%84%E6%9F%90%E4%B8%AA%E8%B7%AF%E7%94%B1%E9%A1%B5%E9%9D%A2%E5%8A%A0%E8%BD%BD%E5%BE%AE%E5%BA%94%E7%94%A8

qiankun使用中的一些注意点：

1.子应用如果用VueCli生成的，那么vue.config.js中的publicPath对子应用的生成和部署有直接影响

开发模式下，子应用通常会在本地开发服务器上运行（如 `localhost:7100`），你可以将 `publicPath` 设置为相对路径或开发服务器的地址：

```js
// vue.config.js
module.exports = {
  publicPath: '/',
};
```



在生产环境中，子应用通常会被部署到某个路径下。你需要根据实际部署位置来设置 `publicPath`：

```js
// vue.config.js
module.exports = {
  publicPath: '/sub-app/', // 子应用部署在主应用的 /sub-app 路径下
};
```

2.当子应用的容器container不是写在index.html中时，而是写在组件中时，需要注意的是要确保子应用容器已经挂载



## qiankun主应用和子应用通信

主应用切换语言后，将事件通知到子应用

通过 Qiankun 提供的 `setGlobalState` 方法，将新的语言状态传递给子应用。



## qiankun主应用和子应用路由

如果主应用和子应用都采用 **hash** 模式，那么只需主应用中registerMicroApps 时的 activeRule，和主应用中跳转子应用的链接设置为相同值即可

主应用和子应用的router-base 均可设为 `/`，子应用需要设置base（webpack为publicPath）

需要设置：

- 子应用Vite base 或 Webpack publicPath

nginx配置如下：

```nginx
server {
    listen 29001;
    server_name localhost;

    # 主应用
    location / {
        alias /Users/cheng/Github/webpack-learn/dist/;
        index index.html;
        try_files $uri $uri/ /index.html;
    }
	#子应用
    location ^~ /skybox-desktop/ {
        alias /Users/cheng/Github/frontend-learn/dist/static/;
        index index.html;
        try_files $uri $uri/ /skybox-desktop/index.html;
    }
}
```

### qiankun报错Cannot redefine property: $router

[解决方案](https://qiankun.umijs.org/zh/faq#vue-router-%E6%8A%A5%E9%94%99-uncaught-typeerror-cannot-redefine-property-router)

> 可以从以下方式中选择一种来解决问题：
>
> 1. 在主应用中不使用 CDN 等 external 的方式来加载 `Vue` 框架，使用前端打包软件来加载模块
> 2. 在主应用中，将 `window.Vue` 变量改个名称，例如 `window.Vue2 = window.Vue; delete window.Vue`

# Vite项目使用qiankun

Vite使用qiankun与Webpack有些不同，主要集中在子应用方面，`vite-plugin-qiankun` 主要负责适配和兼容问题。

### 配置子应用的导出生命周期：

```ts
// src/main.ts
import { createApp } from 'vue';
import App from './App.vue';
import './style.css';
import { renderWithQiankun, qiankunWindow } from 'vite-plugin-qiankun/dist/helper';

let app: any = null;

function render(props: any = {}) {
  const { container } = props;
  app = createApp(App);
  app.mount(container ? container.querySelector('#app') : '#app');
}

renderWithQiankun({
  mount(props) {
    render(props);
  },
  bootstrap() {},
  unmount() {
    app.unmount();
  },
});

// 独立运行时直接渲染
if (!qiankunWindow.__POWERED_BY_QIANKUN__) {
  render();
}
```

### 配置子应用入口：

```ts
// vite.config.ts
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import qiankun from 'vite-plugin-qiankun';

export default defineConfig({
  plugins: [
    vue(),
    qiankun('sub-app', {
      useDevMode: true,
    }),
  ],
  server: {
    port: 7101, // 设置子应用运行端口
    cors: true, // 允许跨域
  },
});
```

### 子应用路由不影响主应用

主应用中展示了子应用，修改子应用路由后，导致地址栏直接变成子应用路由了。

解决方案：

为了避免子应用的路由影响到主应用的路径，我们需要在子应用的 Vue Router 配置中设置 **基础路径（Base Path）**，并且确保子应用的路由是 **内嵌的**，而不是直接改变整个页面的 URL。

#### 1.设置子应用的base路径

```ts
// 子应用的 router/index.ts
import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';

const routes = [
  { path: '', component: Home },
  { path: '/page1', component: () => import('../views/Page1.vue') },
];

const router = createRouter({
  history: createWebHistory(qiankunWindow.__POWERED_BY_QIANKUN__ ? '/jsx/app-vue2': ''), 	// 设置子应用的基础路径为主应用中的挂载路径, 这里使用三元表达式判断可以在单独访问子应用时只带上子应用的路由
  routes,
});

export default router;
```

#### 2.调整主应用配置

```ts
// 主应用 router/index.ts
import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import SubApp from '../views/SubApp.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/child-a/:pathMatch(.*)*', component: SubApp }, // 捕获子应用的所有路由
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
```

#### 3.使用子应用的沙箱隔离模式

```ts
// 主应用中注册子应用
import { registerMicroApps, start } from 'qiankun';

registerMicroApps([
  {
    name: 'child-a',
    entry: '//localhost:5174',
    container: '#subapp-container',
    activeRule: '/child-a',
    props: { baseRoute: '/child-a' }, // 传递子应用的基础路径
  },
]);

start({
  sandbox: {
    strictStyleIsolation: true, // 严格样式隔离
  },
});
```

从子应用中返回到主应用时要在qiankun的unmount方法中正确卸载

Vue2

```ts
export async function unmount() {
  console.log('[Vue] app unmounted', app)
  app.$destroy()
  app = null
}
```

Vue3

```ts
renderWithQiankun({
  mount(props) {
    console.log('[vue] props from main framework', props);
    render(props);
  },
  bootstrap() {
    console.log('[vue] vue app bootstraped');
  },
  unmount() {
    app.unmount();
    app = null;
  }
});
```



## 样式污染的问题

qiankun中子应用的样式会覆盖主应用的样式



## Vite项目qiankun子应用中图片无法展示

主应用：localhost:8099，子应用：localhost:8080

发现请求的图片地址为`http://localhost:8099/src/assets/images/logo_footer.png`

所以拿不到图片，但是这只影响开发环境，在生产环境是没有问题的

需要配置server.origin

```ts
import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    origin: 'http://localhost:8080',  // 配置服务器的 origin
    // 其他的服务器配置
    port: 3000,
    open: true,
  },
  // 其他的 Vite 配置
});
```

## qiankun子应用图片及资源无法展示的问题

本地开发时vite是通过fs来加载图片等资源的，但是使用的是主应用的路径去加载，所以会出现问题

这个时候需要设置正确的加载路径，比如如下代码：

```ts
const configURL = qiankunWindow.__POWERED_BY_QIANKUN__
  ? qiankunWindow.__INJECTED_PUBLIC_PATH_BY_QIANKUN__
  : '/';

/**
 * 获取本地配置文件
 * @returns 
 */
export const getConfig = () => {
  return $localReq.commonRequest({
    url: `${configURL}config/config.json?t=${Date.now()}`,
    method: 'get'
  });
};
```

