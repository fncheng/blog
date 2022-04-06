## Prerender SPA Plugin

Vue SPA 预渲染插件

> 在构建时 (build time) 简单地生成针对特定路由的静态 HTML 文件。

https://github.com/chrisvfritz/prerender-spa-plugin



#### Basic Usage (vue.config.js)

```js
const path = require('path')
const PrerenderSPAPlugin = require('prerender-spa-plugin')

module.exports = {
  // 对象式
  configureWebpack: {
    plugins: [
      new PrerenderSPAPlugin({
        // Required - The path to the webpack-outputted app to prerender.
        staticDir: path.resolve(__dirname, 'dist'),
        // Required - Routes to render.
        routes: [ '/', '/about', '/some/deep/nested/route' ],
      })
    ]
  }
  
  //函数式
  configureWebpack: (config) => {
    config.resolve.alias['@'] = resolve('src')
    config.plugins.push(
      new PrerenderSPAPlugin({
        staticDir: resolve('dist'),
        routes: ['/about'],
      })
    )
  },
}

```



