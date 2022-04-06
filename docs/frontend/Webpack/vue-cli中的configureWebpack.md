## vue-cli中的configureWebpack

vue-cli在打包时提供了两种修改vue.config.js中webpack配置的方法

https://cli.vuejs.org/zh/config/#configurewebpack

> ### configureWebpack
>
> - Type: `Object | Function`
>
>   如果这个值是一个对象，则会通过 [webpack-merge](https://github.com/survivejs/webpack-merge) 合并到最终的配置中。
>
>   如果这个值是一个函数，则会接收被解析的配置作为参数。该函数既可以修改配置并不返回任何东西，也可以返回一个被克隆或合并过的配置版本。
>
>   更多细节可查阅：[配合 webpack > 简单的配置方式](https://cli.vuejs.org/zh/guide/webpack.html#简单的配置方式)

通过对象方式：

```js
// vue.config.js
module.exports = {
  // 对象模式
  configureWebpack: {
    resolve: {
      //路径别名设置
      alias: {
        '@': resolve('src'),
      },
    },
  },
}
```

通过函数方式：

```js
// vue.config.js
module.exports = {
  // 对象模式
  // 函数模式
  configureWebpack: (config) => {
    if (process.env.NODE_ENV === 'production') {
      // 为生产环境修改配置...
			// 路径别名设置
      config.resolve.alias['@'] = resolve('src')
    }
  },
}
```

打印函数模式中的config如下：

```js
{
  mode: 'production',
  context: '/Users/cheng/Github/vue-learn',
  devtool: false,
  node: {
    setImmediate: false,
    process: 'mock',
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  },
  output: {
    path: '/Users/cheng/Github/vue-learn/dist',
    filename: 'js/[name].[contenthash:8].js',
    publicPath: '/',
    chunkFilename: 'js/[name].[contenthash:8].js'
    globalObject: "(typeof self !== 'undefined' ? self : this)"
  },
  resolve: {
    alias: {
      '@': '/Users/cheng/Github/vue-learn/src',
      'vue$': 'vue/dist/vue.runtime.esm.js'
    },
    extensions: [ '.mjs', '.js', '.jsx', '.vue', '.json', '.wasm' ],
    modules: [
      'node_modules',
      '/Users/cheng/Github/vue-learn/node_modules',
      '/Users/cheng/Github/vue-learn/node_modules/@vue/cli-service/node_modules'
    ],
    plugins: [ [Object] ]
  },
  resolveLoader: {
    modules: [
      '/Users/cheng/Github/vue-learn/node_modules/@vue/cli-plugin-babel/node_modules',
      'node_modules',
      '/Users/cheng/Github/vue-learn/node_modules',
      '/Users/cheng/Github/vue-learn/node_modules/@vue/cli-service/node_modules'
    ],
    plugins: [ [Object] ]
  },
  module: {
    noParse: /^(vue|vue-router|vuex|vuex-router-sync)$/,
    rules: [
      [Object], [Object],
      [Object], [Object],
      [Object], [Object],
      [Object], [Object],
      [Object], [Object],
      [Object], [Object],
      [Object], [Object]
    ]
  },
  optimization: {
    splitChunks: { cacheGroups: [Object] },
    minimizer: [ [TerserPlugin] ]
  },
  plugins: [
    // configureWebpack 内配置的plugin都在这里
    VueLoaderPlugin {},
    DefinePlugin { definitions: [Object] },
    CaseSensitivePathsPlugin {
      options: {},
      logger: [Object [console]],
      pathCache: {},
      fsOperations: 0,
      primed: false
    },
    FriendlyErrorsWebpackPlugin {
      compilationSuccessInfo: {},
      onErrors: undefined,
      shouldClearConsole: true,
      formatters: [Array],
      transformers: [Array],
      previousEndTimes: {}
    },
    MiniCssExtractPlugin { options: [Object] },
    OptimizeCssnanoPlugin { options: [Object] },
    HashedModuleIdsPlugin { options: [Object] },
    NamedChunksPlugin { nameResolver: [Function (anonymous)] },
    HtmlWebpackPlugin { options: [Object] },
    PreloadPlugin { options: [Object] },
    PreloadPlugin { options: [Object] },
    CopyPlugin { patterns: [Array], options: {} }
  ],
  entry: { app: [ './src/main.js' ] }
}
```

需要⚠️注意的是：使用函数模式时针对Array类型的修改需要使用push去操作，Object类型的修改需要使用对象.属性的方式去修改，不能直接赋值，从打印config能看出所有内容都存在默认值， 所以不能直接覆盖。

```js
// vue.config.js
module.exports = {
  // 函数模式
  configureWebpack: (config) => {
    if (process.env.NODE_ENV === 'production') {
      // 为生产环境修改配置...
      // 路径别名设置
      // ❌错误方式
      config.resolve = {
        alias: {
          '@': path.resolve(__dirname,'src')
        }
      }
      config.optimization.minimizer = [
        new UglifyJsPlugin({
          uglifyOptions: {
            // 其他压缩选项
            compress: {
              drop_console: false, //注释console
              pure_funcs: ['console.log'], //丢弃console.log
            },
            warnings: false, //显示警告
          },
        })
      ]
      // ✅正确方式
      config.resolve.alias['@'] = resolve('src')
      config.optimization.minimizer.push(
        new UglifyJsPlugin({
          uglifyOptions: {
            // 其他压缩选项
            compress: {
              drop_console: false, //注释console
              pure_funcs: ['console.log'], //丢弃console.log
            },
            warnings: false, //显示警告
          },
        })
      )
    }
  },
}
```

