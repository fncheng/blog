---
title: SourceMap
---



[Webpack doc](https://webpack.docschina.org/configuration/devtool/#root)

表格中的**quality**指的是代码

- original 源代码
- transformed 转换后的代码





Vue-CLI的sourceMap默认为false



##### sourcemap

<img src="https://minimax-1256590847.cos.ap-shanghai.myqcloud.com/img/image-20210906142226123.png" alt="image-20210906142226123" style="zoom: 60%;" />

##### eval-source-map

<img src="https://minimax-1256590847.cos.ap-shanghai.myqcloud.com/img/image-20210906142420554.png" alt="image-20210906142420554" style="zoom: 60%;" />

查看的是源代码

##### eval-cheap-source-map

查看的是loader转译后的代码

<img src="https://minimax-1256590847.cos.ap-shanghai.myqcloud.com/img/image-20240305140949430.png" alt="image-20240305140949430" style="zoom: 60%;" />

<img src="https://minimax-1256590847.cos.ap-shanghai.myqcloud.com/img/image-20210906142633254.png" alt="image-20210906142633254" style="zoom:60%;" />

##### eval-cheap-module-source-map

同eval-source-map





#### 推荐使用

开发环境：eval-source-map

生产环境：不设置devtool，速度最快，体积最小

