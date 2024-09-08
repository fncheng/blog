## 使用qiankun

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

const app = new Vue({
  router,
  store,
  pinia,
  render: (h) => h(App),
})

let instance = null
function render(props = {}) {
  const { container } = props
  instance = app.$mount(container ? container.querySelector('#app') : '#app')
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
  instance.unmount()
  instance = null
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



然后在webpack中配置

```js
configureWebpack: {
    output: {
      library: `sub-app-vue`,
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