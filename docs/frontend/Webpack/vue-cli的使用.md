---
title: vue-cli的使用
tags:
- vue
---

[参考链接](https://juejin.im/post/5c73d879e51d454b4755603f)

### vue-cli基本命令

![img](https://user-gold-cdn.xitu.io/2019/2/25/169248590b2fbadc?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

### [vue.config.js的配置](https://juejin.im/post/5c77d0b9e51d455fb110c394#comment)

### [vue模块化开发流程](https://segmentfault.com/a/1190000017389046)

- 初始化项目,cli构建项目结构
- 配置webpack
- 创建项目结构,安装依赖包
- 编写业务逻辑,使用Vue单页组件
- webpack打包项目,查看打包后index.html



- 创建项目

  ```bash
  vue create hello-world
  ```

  

### 设置publicPath

https://cli.vuejs.org/zh/config/#publicpath

- Type: `string`
- Default: `'/'`

不设置`publicPath`时，部署后默认请求路径：

`http://127.0.0.1:8888/css/app.0b79487b.css`

设置为 `./` 时,请求路径为:

`http://127.0.0.1:8888/当前目录/css/app.0b79487b.css`

设置为 `'/dst/'` 或者 `/dst` 时，请求路径:

`http://127.0.0.1:8888/dst/css/app.0b79487b.css`

### [#](https://cli.vuejs.org/zh/config/#assetsdir)assetsDir

放置生成的静态资源 (js、css、img、fonts) 的 (相对于 `outputDir` 的) 目录。

### [#](https://cli.vuejs.org/zh/config/#devserver-proxy)devServer.proxy



### 静态资源

 存放在public文件夹下的资源不会被打包
