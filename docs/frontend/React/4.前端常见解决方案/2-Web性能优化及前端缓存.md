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



<img src="https://minimax-1256590847.cos.ap-shanghai.myqcloud.com/img/image-20230517222609691.png" alt="image-20230517222609691" style="zoom:50%;" />



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



## webpack外部扩展externals

该选项可以「从输出的 bundle 中排除指定的依赖」

比如将vue库从项目构建中排除，改为从CDN引入，不过这种需要引入umd格式的文件

[webpack externals字段](https://www.webpackjs.com/configuration/externals/)

```ts
externals?:
		| string
		| RegExp
		| ExternalItem[]
		| (ExternalItemObjectKnown & ExternalItemObjectUnknown)
		| ((
				data: ExternalItemFunctionData,
				callback: (
					err?: Error,
					result?: string | boolean | string[] | { [index: string]: any }
				) => void
		  ) => void)
		| ((data: ExternalItemFunctionData) => Promise<ExternalItemValue>);
```

于是在我们的webpack.config.js中添加

```js
module.export = {
  externals: {
      vue: 'Vue'
    }
}
```

其次要在在public/index.html 模板文件引入对应的 script

使用externals前

dev时 bundle大小为313kb，

打包的vue.js bundle 大小146kb

![image-20230526233634449](https://minimax-1256590847.cos.ap-shanghai.myqcloud.com/img/image-20230526233634449.png)

<img src="https://minimax-1256590847.cos.ap-shanghai.myqcloud.com/img/image-20230527001410156.png" alt="image-20230527001410156" style="zoom:50%;" />

不同构建版本通过script引入的结果

| 构建版本                   | dev运行结果              | prod运行结果             | 文件大小 |
| -------------------------- | ------------------------ | ------------------------ | -------- |
| vue.common.prod.js         | 没问题                   | 没问题                   | 92k      |
| vue.esm.js                 | 报错`Vue is not defined` | 报错`Vue is not defined` | 321k     |
| vue.min.js                 | 没问题                   | 没问题                   | 92k      |
| vue.runtime.common.prod.js | 没问题                   | 报错`Vue is not defined` | 64k      |
| vue.runtime.min.js         | 没问题                   | 没问题                   | 64k      |

配合Gzip 获取的vue.min.js只有35.7k 大小

### 配合HtmlWebpackPlugin注入script

可以在public文件夹下设置两份index.html，一份叫index.prod.html，在其中加入CDN引入的vue

```html
<script src="https://cdn.jsdelivr.net/npm/vue@2.6.14/dist/vue.min.js"></script>
```

将HtmlWebpackPlugin 的配置分别写到dev和prod的配置文件中，这样dev和prod引用的就是不同的index.html了



配合`<%= EJS %>` EJS语法

在index.html中加入如下语法

```html
<% if(process.env.NODE_ENV==='production') { %>
  <script src="https://cdn.jsdelivr.net/npm/vue@2.6.14/dist/vue.min.js"></script>
<% } %>
```

script只有在生产环境时才会插入body部分，这样我们只需要维护一份html文件就可以了