# 记一次从webpack3迁移到webpack4遇到的问题

首先是[Webpack-dev-server@4.0.0 迁移指南](https://github.com/webpack/webpack-dev-server/blob/master/migration-v4.md)

第一个问题

**1. [webpack-cli] Error: webpack.optimize.CommonsChunkPlugin has been removed, please use config.optimization.splitChunks instead.**

解决办法：https://segmentfault.com/a/1190000020258045

> [webpack.optimize.CommonsChunkPlugin](https://www.webpackjs.com/plugins/commons-chunk-plugin/)迁移到[optimization.splitChunks](https://webpack.docschina.org/plugins/split-chunks-plugin/)

---

第二个问题

**2. Chunk.entrypoints: Use Chunks.groupsIterable and filter by instanceof Entrypoint instead**

> [*ExtractTextPlugin*](https://www.webpackjs.com/plugins/extract-text-webpack-plugin/)迁移到[*MiniCssExtractPlugin*](https://v4.webpack.docschina.org/plugins/mini-css-extract-plugin#getting-started)

---

第三个问题

**3. Posts-loader this.getOptions is not a function**

webpack4请使用postcss-loader v4.

[postcssloader](https://www.npmjs.com/package/postcss-loader)

---

第四个问题

执行webpack server后报错

**Module not found: Error: Can't resolve './src' in '/Users/cheng/Github/webpack-learn'**

这是因为webpack默认的入口文件是src/index.js

```js
entry: './src/index.js'
```

---

第五个问题

**打包生成LICENSE.txt文件**

这是[TerserWebpackPlugin](https://link.segmentfault.com/?enc=sAJBlPiDZoO5DEMbZLwXmA%3D%3D.sE5NkW8jmyBSmU331YadCjZc%2FVkFBJpPJ1saJ%2F59I%2FEYKQJrqCL928MR3wMUhgf2A18XtOP8DJ4hKcKXyBDTBw%3D%3D)默认生成的

[webpack-cli] Invalid configuration object. Webpack has been initialized using a configuration object that does not match the API schema.

configuration.output.filename: A relative path is expected. However, the provided value "/js/[name].[contenthash].bundle.js" is an absolute path!
Please use output.path to specify absolute path and output.filename for the file name.

configuration.output.filename：需要相对路径。然而，提供的值 "/js/[name].[contenthash].bundle.js" 是一个绝对路径！
   请使用 output.path 指定绝对路径和 output.filename 作为文件名。

---

第六个问题

Vue-Router History mode dev下刷新页面会报错无法找到页面

设置devServer.historyApiFallback，然后就可以刷新了。

---

第七个问题

**Cannot find module 'webpack/bin/config-yargs**

https://stackoverflow.com/questions/40379139/cannot-find-module-webpack-bin-config-yargs

如果您使用**webpack-cli** 4 或**webpack 5**，请更改`webpack-dev-server`为`webpack serve`.

```json
"serve": "webpack serve --config config/webpack.dev.js --progress"
```

---

第八个问题

**yarn build时css-loader报错minimize？**

css-loader unknown property 'minimize'

原因是*webpack* 3.0 之后以及css-loader 1.0 以上已经将*minimize* 这个属性去掉了导致*报错*.

https://dailc.github.io/2017/03/13/webpackfreshmanualAndBug.html

解决办法：

升级vue-loader