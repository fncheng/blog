## Webpack React配置

```js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

// 判断是否是生产环境
const IS_PRODUCTION = process.env.NODE_ENV === 'production';

module.exports = {
  entry: './src/index.tsx', // 入口文件
  output: {
    path: path.resolve(__dirname, 'dist'), // 打包输出路径
    filename: '[name].[contenthash].js', // 打包后的文件名
    publicPath: '/', // 静态资源的公共路径
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'], // 支持的文件扩展名
  },
  target: 'web', // 构建目标为 web 平台
  module: {
    rules: [
      // Babel 转译 JSX 和现代 JavaScript
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react',
              '@babel/preset-typescript',
            ],
            plugins: [
              !IS_PRODUCTION && require.resolve('react-refresh/babel'), // React Fast Refresh 插件（开发模式下启用）
            ].filter(Boolean),
          },
        },
      },
      // TypeScript 转译
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
          options: {
            transpileOnly: true, // TypeScript 只进行语法转换，不进行类型检查（可以加速构建）
          },
        },
      },
      // CSS 文件处理
      {
        test: /\.css$/,
        use: [
          !IS_PRODUCTION ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader', // 使用 PostCSS 自动添加浏览器前缀
        ],
      },
      // SCSS/SASS 文件处理
      {
        test: /\.(scss|sass)$/,
        use: [
          !IS_PRODUCTION ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
      },
      // Less 文件处理
      {
        test: /\.less$/,
        use: [
          !IS_PRODUCTION ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'less-loader',
        ],
      },
      // CSS Module 支持
      {
        test: /\.module\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true, // 启用 CSS 模块化
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public', 'index.html'), // HTML 模板
      inject: 'body',
      title: 'React Webpack Template', // 页面标题
      hash: true, // 为所有静态资源生成哈希
    }),
    // 生产环境下提取 CSS
    IS_PRODUCTION &&
      new MiniCssExtractPlugin({
        filename: '[name].[contenthash].css',
        chunkFilename: '[id].[contenthash].css',
      }),
    // React Fast Refresh 插件（开发模式下启用）
    !IS_PRODUCTION && new ReactRefreshWebpackPlugin(),
  ].filter(Boolean), // 仅在开发模式中启用 React Fast Refresh 插件
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 3000,
    hot: true, // 启用热模块替换
    historyApiFallback: true, // 解决 React Router 路由问题
    open: true, // 启动时自动打开浏览器
  },
  optimization: {
    minimize: IS_PRODUCTION, // 生产环境下启用压缩
    minimizer: [
      new TerserPlugin({
        parallel: true, // 开启并行压缩
      }),
    ],
  },
  devtool: IS_PRODUCTION ? 'source-map' : 'cheap-module-source-map', // 配置 source map
};
```

## Fast Refresh" (also known as Hot Reloading) 是什么

**Fast Refresh**（也被称为 **Hot Reloading**）是一种开发工具的特性，旨在提升开发效率，提供更快速、更流畅的代码更新体验，尤其在 React 开发中，Fast Refresh 是一个非常重要的功能。

### Fast Refresh 和传统的热模块替换（HMR）的区别

- **热模块替换（HMR）**：HMR 是 Webpack 提供的一种功能，可以在不刷新整个页面的情况下，更新页面中的部分代码。它会尽可能保留页面状态，但如果涉及到复杂的代码或模块，可能会导致应用出现不一致的状态。
- **Fast Refresh**：Fast Refresh 是专为 React 应用设计的热更新机制，它在 HMR 的基础上，增强了对 React 组件的支持，特别是在处理组件状态和错误恢复方面。它能更加智能地处理 React 特有的功能，如 Hooks 和组件生命周期，因此对于 React 开发者来说，Fast Refresh 是一个更为友好的更新机制。