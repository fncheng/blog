---
title: ElementUI按需引入
---

[babel-plugin-import](https://github.com/ant-design/babel-plugin-import)

https://element.eleme.cn/#/zh-CN/component/quickstart

```sh
yarn add babel-plugin-component -D
```

在babelrc 中添加

```js
"plugins": [
    [
      "component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk"
      }
    ]
 ]
```



**全量打包**

项目大小：1,160,194 字节（磁盘上的1.2 MB），共16个项目

elementui大小：845,531 字节（磁盘上的848 KB） `chunk-vendors.703ce261.js`



**按需引入后打包** (全量引入`import 'element-ui/lib/theme-chalk/index.css'`)

项目大小607,790 字节（磁盘上的635 KB），共16个项目

elementui大小：292,423 字节（磁盘上的295 KB）

<img src="/Users/cheng/Library/Application Support/typora-user-images/image-20211015110754036.png" alt="image-20211015110754036" style="zoom:67%;" />

去除`import 'element-ui/lib/theme-chalk/index.css'`后

项目大小： 440,539 字节（磁盘上的467 KB），共16个项目

elementui大小：294,160 字节（磁盘上的295 KB）

<img src="/Users/cheng/Library/Application Support/typora-user-images/image-20211015110656465.png" alt="image-20211015110656465" style="zoom:67%;" />

配置按需引入后可以去掉

```js
// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
```





按需引入ScrollBar的问题

Scrollbar是element-ui的隐藏组件，没有暴露这个组件，在element-ui.d.ts中也找不到。

```js
import { Scrollbar } form 'element-ui'
Vue.use(Scrollbar)
```

