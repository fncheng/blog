## 在webpack中使用PostCSS

**安装postcss**

```sh
yarn add postcss postcss-loader -D
```



https://github.com/postcss/postcss#usage

Use [`postcss-loader`](https://github.com/postcss/postcss-loader) in `webpack.config.js`:

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            }
          },
          {
            loader: 'postcss-loader'
          }
        ]
      }
    ]
  }
}
```



## 在Vue-CLI中使用PostCSS

Vue-CLI 集成了PostCSS：https://cli.vuejs.org/zh/guide/css.html#postcss

> 通过查看vue-cli创建的项目下的node_modules目录我们可以看到postcss及postcss-loader

如需使用，只需要在`vue.config.js` 中的 `css.loaderOptions.postcss` 配置即可。

```js
// https://cli.vuejs.org/zh/config/#css-loaderoptions
module.exports = {
  css: {
    loaderOptions: {
      css: {
        // 这里的选项会传递给 css-loader
      },
      postcss: {
        // 这里的选项会传递给 postcss-loader
      }
    }
  }
}
```

[postcss-px-to-viewport](https://github.com/evrone/postcss-px-to-viewport)

### 在Vue-CLI中使用postcss-px-to-viewport插件

由于vue-cli集成了**postcss** 所以无需安装**post-css**、**post-css-loader**

```js
module.exports = {
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          new postcssPxToViewport({
            viewportWidth: 1920,
          }),
        ],
      },
    },
  },
};
```

2.通过postcss.config.js

> 需要注意点是：vue-cli 不会处理postcss.config.js，因为它使用 `package.json` 来配置PostCSS。详见[issues](https://github.com/vuejs/vue-cli/issues/852#issuecomment-387732065)

在 `package.json` 添加如下代码：

```json
{
  // ...
  "postcss": {
    "plugins": {
      "postcss-px-to-viewport": {
        "viewportWidth": 750
      }
    }
  }
}
```

或者在 `vue.config.js` 中添加如下代码:

```js
module.exports = {
  // ...
	css: {
   loaderOptions: {
     css: {
       // 这里的选项会传递给 css-loader
      },
     postcss: {
       // 这里的选项会传递给 postcss-loader
       plugins: [
         new postcssPxToViewport({
           viewportWidth: 1920,
         }),
       ],
     },
   },
 },
}
```







## postcss-loader

https://webpack.docschina.org/loaders/postcss-loader/#config





## 在webpack中利用postcss将px转换为vw

### [postcss-px-to-viewport插件](https://github.com/evrone/postcss-px-to-viewport)

> [@huge689](https://github.com/huge689) At first you need use `postcss` via https://github.com/postcss/postcss-loader
> `postcss-px-to-viewport` only plugin for `postcss`.
> Scheme:
> `postcss-px-to-viewport => postcss => postcss-loader => webpack`

安装

```sh
npm i postcss-px-to-viewport -D
# or
yarn add postcss-px-to-viewport -D
```

```js
module: {
    rules: [
      { test: /\.txt$/, use: 'raw-loader' },
      {
        test: /\.css$/i,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: ['postcss-px-to-viewport'],
              },
            },
          },
        ],
      },
    ],
  },
```

**postcss-px-to-viewport的默认选项--Default Options:**

```js
{
  unitToConvert: 'px',
  viewportWidth: 320,
  unitPrecision: 5,
  propList: ['*'],
  viewportUnit: 'vw',
  fontViewportUnit: 'vw',
  selectorBlackList: [],
  minPixelValue: 1,
  mediaQuery: false,
  replace: true,
  exclude: undefined,
  include: undefined,
  landscape: false,
  landscapeUnit: 'vw',
  landscapeWidth: 568
}
```

**编写自定义配置**

```js
const postcssPxToViewport = require('postcss-px-to-viewport')
module: {
    rules: [
      { test: /\.txt$/, use: 'raw-loader' },
      {
        test: /\.css$/i,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  new postcssPxToViewport({
                    viewportWidth: 750,
                  }),
                ],
              },
            },
          },
        ],
      },
    ],
  },
```



### postcss-pxtorem



Postcss-preset-env





## 常见问题

1. postcss-px-to-viewport: postcss.plugin was deprecated. Migration guide:
   https://evilmartians.com/chronicles/postcss-8-plugin-migration

   需要迁移
