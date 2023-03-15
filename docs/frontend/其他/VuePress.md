## VuePress

[官方文档](https://vuepress.vuejs.org/zh/theme/default-theme-config.html#%E6%98%BE%E7%A4%BA%E6%89%80%E6%9C%89%E9%A1%B5%E9%9D%A2%E7%9A%84%E6%A0%87%E9%A2%98%E9%93%BE%E6%8E%A5)

vuepress常见问题

### nav设置

nav是个对象数组

```js
nav: [
  {
    text: '前端',
    items: [
      { text: 'HTML', link: '/frontend/html/' },
      { text: 'CSS', link: '/frontend/css/css学习' },
      { text: 'JavaScript', link: '/frontend/js/' },
      { text: 'Vue', link: '/frontend/vue/' },
    ],
  },
  { text: 'Git', link: '/frontend/Git/Git常用命令' },
  { text: 'Node', link: '/frontend/node/' },
  { text: 'linux', link: '/linux/' },
]
```

其中link末尾如果带`/`（其实是省略了`README.md`），则表示这是一个路径，该路径下必须有一个`README.md`文件；而末尾不带`/`，则表示这是一个文件，如`css学习.md`。

### sibebar设置

```js
sidebar: {
			'/frontend/js/': [
				'',
				'ts',
				'深拷贝浅拷贝'
			],
			'/fontend/vue/': [
				''
			]
		},
```

> 注意：路径末尾一定加上 " / " , 否则无法识别路径。

参考：https://blog.csdn.net/wq_ocean_/article/details/109220650

所有文件夹下不能有README.md文件，否则sidebar不显示！



### 修改代码块的背景颜色

[相关issues](https://github.com/vuejs/vuepress/issues/2223)

VuePress预设：https://vuepress.vuejs.org/zh/config/#palette-styl

### 给代码块添加行号

```js
module.exports = {
    markdown: {
        lineNumbers: true//代码显示行号
    }
}
```



### 标题设置

VuePress默认提取 h2 和 h3 的标题，添加标题方式如下

```js
module.exports = {
  markdown: {
    extractHeaders: [ 'h2', 'h3', 'h4' ]
  }
}
```



Vuepress的配置分为babel式和对象式

### 插件使用及配置

Vuepress的插件配置通过option传入

```js
module.exports = (option) => {
    console.log('option: ', option);
    return {
    enhanceAppFiles: [
        resolve(__dirname, 'enhanceAppFile.js')
    ],

    globalUIComponents: 'SideAnchor'
}};
```

```js
const { path } = require('@vuepress/shared-utils')

module.exports = (options) => ({
  clientRootMixin: path.resolve(__dirname, 'clientRootMixin.js'),
  define: {
    AHL_SIDEBAR_LINK_SELECTOR: options.sidebarLinkSelector || '.sidebar-link',
    AHL_HEADER_ANCHOR_SELECTOR: options.headerAnchorSelector || '.header-anchor'
  }
})
```

其中 sidebarLinkSelector 和 headerAnchorSelector 即是配置

在使用插件时，

```js
  plugins: {
    '@vuepress/active-header-links': {
      sidebarLinkSelector: '.sidebar-link',
      headerAnchorSelector: '.header-anchor'
    },
    '@vuepress/back-to-top': true,
    'vuepress-plugin-side-anchor': {
      someTest: 'someTest-------------------------------------'
    }
  }
```



## Vuepress with GitHub Pages

## Step-by-Step Guide

### Create a personal access token

click your profile icon > Settings > Developer settings > Personal access tokens > Generate new token > At least check `repo`. Then you will get a token, copy it.

### Creating encrypted secrets

Under your repository name, click Settings > Secrets > Type `ACCESS_TOKEN` in the "Name" input box && the the personal access token as value.

### Create a workflow file

If you repo doesn't already have one, create a workflow file. You must store workflows in the `.github/workflows` directory in the root of your repository.

In `.github/workflows`, add a `.yml` or `.yaml` file for your workflow. For example, `.github/workflows/vuepress-deploy.yml`.

### 配置github action

在.github/workflows/下新建一个yml文件，文件名随意

```yaml
name: Github Pages

on:
  push:
    branches:
      - master
      
jobs:
  docs:
    runs-on: ubuntu-latest # 指定运行所需要的虚拟机环境（必填）

    steps:
      - name: Checkout
        uses: actions/checkout@master
      
      - name: vuepress-deploy
        uses: jenkey2011/vuepress-deploy@master
        env:
          ACCESS_TOKEN: ${{ secrets.ACCESS_TOKEN }}
          TARGET_REPO: fncheng/blog
          TARGET_BRANCH: gh-pages
          BUILD_SCRIPT: yarn && yarn docs:build
          BUILD_DIR: docs/.vuepress/dist
          # CNAME: https://www.xxx.com
```

然后新建一个personal access token 用于部署

这里将其部署到gh-pages分支，用于和md文件分隔开

1. 在 `docs/.vuepress/config.js` 中设置正确的 `base`。

   如果你打算发布到 `https://<USERNAME>.github.io/`，则可以省略这一步，因为 `base` 默认即是 `"/"`。

   如果你打算发布到 `https://<USERNAME>.github.io/<REPO>/`（也就是说你的仓库在 `https://github.com/<USERNAME>/<REPO>`），则将 `base` 设置为 `"/<REPO>/"`。

