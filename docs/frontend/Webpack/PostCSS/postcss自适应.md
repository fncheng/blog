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



## postcss-pxtorem

```sh
pnpm add postcss-pxtorem -D
```

vite

```ts
import postCssPxToRem from 'postcss-pxtorem';

export default defineConfig(({ mode }) => {
  const __DEV__ = mode === 'development';

  return {
    css: {
      postcss: {
        plugins: [
          postCssPxToRem({
            rootValue: 16,
            unitPrecision: 5,
            propList: ['*'],
            selectorBlackList: [],
            replace: true,
            mediaQuery: false,
            minPixelValue: 2,
            exclude: /node_modules\/element-plus/i,
          })
        ]
      }
    },
  }
});
```

| **参数名**              | **作用说明**                   | **你的设置与影响**                                           |
| ----------------------- | ------------------------------ | ------------------------------------------------------------ |
| **`rootValue`**         | **根元素字号**。转换的基准值。 | **16**。意味着 `16px` 会被转换为 `1rem`。通常与设计稿相关（若设计稿宽 1920px，想分为 10 份，则设为 192.0）。 |
| **`unitPrecision`**     | **计算精度**。                 | **5**。转换后的 `rem` 保留 5 位小数（如 `0.12345rem`），能有效减少因四舍五入导致的像素偏差。 |
| **`propList`**          | **属性白名单**。               | **`['\*']`**。代表**所有** CSS 属性（宽、高、字体、边距等）都会从 `px` 转为 `rem`。 |
| **`selectorBlackList`** | **选择器黑名单**。             | **`[]`**。目前为空。如果你写 `.ignore-me`，那么带有这个类名的元素样式将**不会**被转换。 |
| **`replace`**           | **是否直接替换**。             | **true**。转换后直接把 `px` 删掉换成 `rem`。若设为 `false`，则会保留 `px` 并作为回退方案。 |
| **`mediaQuery`**        | **媒体查询适配**。             | **false**。默认不转换 `@media` 中的 `px`。通常保持 `false` 以确保断点控制是稳定的。 |
| **`minPixelValue`**     | **转换阈值**。                 | **0**。所有 `px` 都会转。**警告：** 这会导致 `1px` 的边框在某些高分屏或缩放浏览器下因计算不足 `1px` 而“消失”。 |
| **`exclude`**           | **排除范围**。                 | **`/node_modules\/element-plus/i`**。正则匹配。它会跳过 Element Plus 组件库的所有样式，保证组件 UI 不会因为你的全局适配而变形。 |

【强烈建议】minPixelValue建议设置为2，保护 1px 边框不被转换

