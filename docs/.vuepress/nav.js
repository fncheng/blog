const { defineConfig } = require('@vuepress/types')

const navConfig = defineConfig({
  themeConfig: {
    nav: [
      {
        text: '前端',
        items: [
          { text: 'HTML', link: '/frontend/html/js事件' },
          { text: 'CSS', link: '/frontend/CSS/css学习' },
          { text: 'Npm', link: '/frontend/npm/npm与yarn' },
          { text: 'TypeScript', link: '/frontend/TypeScript/ts常见问题' },
          {
            text: '前端工程化',
            link: '/frontend/前端工程化/Jenkins构建'
          },
          {
            text: '前端开发常见解决方案',
            link: '/frontend/前端开发常见解决方案/图片懒加载'
          },
          {
            text: '前端开发常见问题',
            link: '/frontend/前端开发常见问题/前端文件上传'
          },
          {
            text: '小程序',
            link: '/小程序/小程序开发常见问题'
          },
          {
            text: '可视化',
            link: '/frontend/可视化开发/Echarts使用'
          }
        ]
      },
      { text: 'Webpack', link: '/frontend/Webpack/2-Webpack进阶/0-Webpack参数详解' },
      { text: 'JavaScript', link: '/frontend/JavaScript/JS操作数据' },
      // { text: 'JS', link: '/frontend/JS/运算符及操作符' },
      // { text: 'ElementUI', link: '/frontend/ElementUI/ElementUI常见问题' },
      { text: 'Vue', link: '/frontend/vue/Vue3/从vue2迁移到vue3' },
      { text: 'React', link: '/frontend/React/1.React学习/1-React学习' },
      { text: 'HTTP', link: '/frontend/http/细说Headers' },
      { text: 'Git', link: '/frontend/Git/Git常用命令' },
      { text: 'Node', link: '/node/CMD和ES6模块导入导出' },
      { text: 'linux', link: '/linux/Linux命令使用指南' },
      {
        text: '软件设置',
        items: [
          { text: '软件设置', link: '/software/列表' },
          { text: 'VSCode', link: '/software/Vscode/VSCODE更新特性' },
          { text: 'MACOS使用技巧', link: '/software/macOS使用/MacOS使用' },
          {
            text: '购物',
            link: '/捡垃圾/闲鱼翻车记录'
          }
        ]
      }
    ]
  }
})

module.exports = navConfig.themeConfig.nav
