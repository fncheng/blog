常见报错：

1. **Cannot find module 'webpack/bin/config-yargs**

   https://stackoverflow.com/questions/40379139/cannot-find-module-webpack-bin-config-yargs
   
   如果您使用**webpack-cli** 4 或**webpack 5**，请更改`webpack-dev-server`为`webpack serve`.
   
   ```json
   "serve": "webpack serve --config config/webpack.dev.js --progress"
   ```

### 记一次从webpack3迁移到webpack4遇到的问题

[Webpack-dev-server@4.0.0 迁移指南](https://github.com/webpack/webpack-dev-server/blob/master/migration-v4.md)

**1. [webpack-cli] Error: webpack.optimize.CommonsChunkPlugin has been removed, please use config.optimization.splitChunks instead.**

解决办法：https://segmentfault.com/a/1190000020258045

> [webpack.optimize.CommonsChunkPlugin](https://www.webpackjs.com/plugins/commons-chunk-plugin/)迁移到[optimization.splitChunks](https://webpack.docschina.org/plugins/split-chunks-plugin/)





**2. Chunk.entrypoints: Use Chunks.groupsIterable and filter by instanceof Entrypoint instead**

> [*ExtractTextPlugin*](https://www.webpackjs.com/plugins/extract-text-webpack-plugin/)迁移到[*MiniCssExtractPlugin*](https://v4.webpack.docschina.org/plugins/mini-css-extract-plugin#getting-started)



**3. Posts-loader this.getOptions is not a function**

webpack4请使用postcss-loader v4.

https://www.npmjs.com/package/postcss-loader



**4. PostCSS plugin postcss-preset-env requires PostCSS 8.**

解决办法：

```sh
yarn add postcss-preset-env@6 -D
```







3. webpack-dev-server

   在执行webpack server后报错

   ##### **Module not found: Error: Can't resolve './src' in '/Users/cheng/Github/webpack-learn'**

   这是因为webpack默认的入口文件是src/index.js
   
   ```js
   entry: './src/index.js'
   ```
   
4. `Unknown option: .preset.`

   原因：babel.config.js中presets属性误写成了preset



5. **webpack alias module not found error can't resolve**

   ```js
   alias: {
     '@': path.resolve(__dirname, 'src'), // 不生效
     '@': path.resolve(__dirname, '/src'), // 生效
   },
   ```
   
   使用绝对路径



6. **打包生成LICENSE.txt文件**

   [TerserWebpackPlugin](https://link.segmentfault.com/?enc=sAJBlPiDZoO5DEMbZLwXmA%3D%3D.sE5NkW8jmyBSmU331YadCjZc%2FVkFBJpPJ1saJ%2F59I%2FEYKQJrqCL928MR3wMUhgf2A18XtOP8DJ4hKcKXyBDTBw%3D%3D)默认生成的



7. [webpack-cli] Invalid configuration object. Webpack has been initialized using a configuration object that does not match the API schema.

   configuration.output.filename: A relative path is expected. However, the provided value "/js/[name].[contenthash].bundle.js" is an absolute path!
   Please use output.path to specify absolute path and output.filename for the file name.

   configuration.output.filename：需要相对路径。然而，提供的值 "/js/[name].[contenthash].bundle.js" 是一个绝对路径！
      请使用 output.path 指定绝对路径和 output.filename 作为文件名。



8. Vue-Router History mode dev下刷新页面会报错无法找到页面

   设置devServer.historyApiFallback，然后就可以刷新了。

### Html-webpack-plugin

Cannot read property 'initialize' of undefined at HtmlWebpackPlugin.apply









### css-loader相关

**yarn build时css-loader报错minimize？**

css-loader unknown property 'minimize'

原因是*webpack* 3.0 之后以及css-loader 1.0 以上已经将*minimize* 这个属性去掉了导致*报错*.

https://dailc.github.io/2017/03/13/webpackfreshmanualAndBug.html

解决办法：

升级vue-loader

### url-loader

**Webpack4 asset size limit 244**

解决办法：配置中设置`mode: 'development'`

[参考](https://christinamcqueen.github.io/2018/03/08/Tool/Webpack-4-%E8%B8%A9%E5%9D%91%E6%8C%87%E5%8D%97/)

