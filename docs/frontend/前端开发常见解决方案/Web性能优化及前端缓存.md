## 浏览器资源加载的优先级

### 默认加载顺序

浏览器首先会按照资源默认的优先级确定加载顺序：

1. html 、 css 、 font 这三种类型的资源优先级最高；
2. 然后是 preload 资源（通过 <link rel=“preload"> 标签预加载）、 script 、 xhr 请求；
3. 接着是图片、语音、视频；
4. 最低的是prefetch预读取的资源。



## Prefetch和Preload

https://zhuanlan.zhihu.com/p/33759023

- preload 是表示用户十分有可能需要在当前浏览中加载目标资源，所以浏览器**必须**预先获取和缓存对应资源。
- prefetch 是告诉用户未来的浏览**有可能**需要加载目标资源，所以浏览器有可能通过事先获取和缓存对应资源，优化用户体验



对组件使用预加载，需要配合webpack分包来实现。即打包的时候单独生成对应文件

```js
const HelloWorld = () =>
  import(/* webpackChunkName: "helloworld" */ '../components/HelloWorld.vue')
```

组件/路由动态导入后，HTTP请求资源时，就会自动预加载，这一点可以在Network中查看



### 首屏加载时间怎么看？

Load值



<img src="/Users/cheng/Library/Application Support/typora-user-images/image-20230517222609691.png" alt="image-20230517222609691" style="zoom:50%;" />



## 页面生命周期

https://zh.javascript.info/onload-ondomcontentloaded

DOMContentLoaded是什么

浏览器已完全加载 HTML，并构建了 DOM 树，但像 `<img>` 和样式表之类的外部资源可能尚未加载完成。





## 减少请求数

如何减少？

可以通过减少不必要的prefetch请求，prefetch请求会消耗时间

经测试，VueCLI删除prefetch插件后，首屏加载时间确实缩短了

```js
module.exports = {
  chainWebpack: (config) => {
    config.plugins.delete('prefetch')
  },
}
```

