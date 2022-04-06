## [postcss-px-to-viewport插件](https://github.com/evrone/postcss-px-to-viewport)

### use webpack

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

#### 使用webpack.config.js

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

#### 使用postcss.config.js

```js
module.exports = {
  plugins:[
    ['postcss-preset-env',{
      // 其他选项
    }],
    require('postcss-px-to-viewport')({
      viewportWidth: 1920
    })
  ]
}
```



## postcss-px2rem

[![NPM version](https://img.shields.io/npm/v/postcss-px2rem.svg?style=flat-square)](https://npmjs.org/package/postcss-px2rem)

