[Webpack doc](https://webpack.docschina.org/configuration/devtool/#root)

表格中的**quality**指的是代码

- original 源代码
- transformed 转换后的代码





Vue-CLI的sourceMap默认为false

<img src="/Users/cheng/Library/Application Support/typora-user-images/image-20210906142123004.png" alt="image-20210906142123004" style="zoom:60%;" />



##### sourcemap

<img src="/Users/cheng/Library/Application Support/typora-user-images/image-20210906142226123.png" alt="image-20210906142226123" style="zoom: 60%;" />

##### eval-source-map

<img src="/Users/cheng/Library/Application Support/typora-user-images/image-20210906142420554.png" alt="image-20210906142420554" style="zoom: 60%;" />

查看的是源代码

##### eval-cheap-source-map

查看的是loader转译后的代码

<img src="/Users/cheng/Library/Application Support/typora-user-images/image-20210906142633254.png" alt="image-20210906142633254" style="zoom:60%;" />

##### eval-cheap-module-source-map

同eval-source-map





#### 推荐使用

开发环境：eval-source-map

生产环境：不设置devtool，速度最快，体积最小