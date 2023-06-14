// const nav = require('./nav')
// const sidebar = require('./sidebar')
const fs = require('fs')
const path = require('path')
const getSidebar = require('./getSidebar.js')
console.log('getSidebar', getSidebar)
function resolve() {
  let filePath = Array.from(arguments)
  return path.resolve(__dirname, ...filePath)
}
/**
 * 自动设置侧边栏
 * @param {String} filePath 路径
 * @returns 一个md文件名的数组
 */
function setSidebar(filePath) {
  // console.log('filePath: ', filePath)
  let res = fs.readdirSync(resolve(filePath)).filter((val) => /md$/i.test(val))
  // console.log('filePath', res)
  return res
}

module.exports = {
  base: '/blog/',
  title: 'Guidebook',
  head: [['link', { rel: 'icon', href: '/favicon.ico' }]],
  port: 3000,
  markdown: {
    lineNumbers: true
  },
  themeConfig: {
    activeHeaderLinks: false, // 默认值：true
    /**
     * nav 格式 { text: '', items: [text:'',link:''], }
     * @param link link是一个绝对路径，以/结尾，最终路径下需要有一个README.md文件;否则link需要指定一个文件
     */
    nav: [
      {
        text: '前端',
        items: [
          { text: 'HTML', link: '/frontend/html/js事件' },
          { text: 'CSS', link: '/frontend/CSS/css学习' },
          { text: 'Webpack', link: '/frontend/Webpack/2-Webpack进阶/0-Webpack参数详解' },
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
      { text: 'JavaScript', link: '/frontend/JavaScript/JS操作数据' },
      // { text: 'JS', link: '/frontend/JS/运算符及操作符' },
      { text: 'ElementUI', link: '/frontend/ElementUI/ElementUI常见问题' },
      { text: 'Vue', link: '/frontend/vue/render渲染函数与JSX' },
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
    ],
    // sidebar: {
    //   '/frontend/js/': ['', '深拷贝浅拷贝', '动态规划'],
    //   '/frontend/vue/': ['', 'vue-router', 'vue生命周期', 'vue组件通信'],
    //   '/frontend/node/': ['', 'express', 'json-server'],
    //   '/linux/': ['', 'ls命令'],
    // },
    /**
     * 对象式
     */
    sidebarDepth: 1,
    sidebar: {
      '/frontend/前端开发常见解决方案/': getSidebar('../frontend/前端开发常见解决方案/'),
      '/frontend/前端开发常见问题/': getSidebar('../frontend/前端开发常见问题/'),
      '/frontend/CSS/': getSidebar('../frontend/CSS/'),
      // JavaScript
      '/frontend/JavaScript/': getSidebar('../frontend/JavaScript/'),
      // '/frontend/js/': getSidebar('../frontend/JS/'),
      '/frontend/TypeScript/': getSidebar('../frontend/TypeScript/'),
      '/frontend/ElementUI/': getSidebar('../frontend/ElementUI/'),
      // Vue
      '/frontend/vue/': getSidebar('../frontend/vue/'),
      '/frontend/React/': getSidebar('../frontend/React/'),
      '/frontend/http/': getSidebar('../frontend/http/'),
      '/frontend/npm/': getSidebar('../frontend/npm/'),
      // 前端工程化
      '/frontend/前端工程化/': getSidebar('../frontend/前端工程化/'),
      '/小程序/': getSidebar('../小程序/'),
      // Webpack
      '/frontend/Webpack/': getSidebar('../frontend/Webpack/'),
      '/frontend/Git/': [
        'Git常用命令',
        {
          title: 'GIT常见',
          collapsable: false,
          children: ['fetch和pull', 'gitignore的使用', 'SourceTree使用指南', 'git常见问题']
        },
        {
          title: 'GIT风格',
          collapsable: false,
          children: [
            'git管理及风格/1-将本地仓库推送到Github',
            'git管理及风格/2-git bash等软件走代理',
            'git管理及风格/3-Git Commit风格',
            'git管理及风格/4-迭代开发git分支管理'
          ]
        }
      ],
      '/frontend/node/': getSidebar('../node/'),
      '/linux/': getSidebar('../linux/'),
      // Software
      '/software/': getSidebar('../software/'),
      '/frontend/可视化开发/': getSidebar('../frontend/可视化开发/'),
      '/捡垃圾/': getSidebar('../捡垃圾/')
    },
    // plugins: {
    // 	"vuepress-plugin-auto-sidebar": {
    // 		nav: true,
    // 		titleMode: 'titlecase',
    // 		collapsable: true, // 设置为true,开启折叠
    // 	}
    // },
    smoothScroll: true
  },
  plugins: {
    '@vuepress/active-header-links': {
      sidebarLinkSelector: '.sidebar-link',
      headerAnchorSelector: '.header-anchor'
    },
    '@vuepress/back-to-top': true,
    '@fncheng/vuepress-plugin-side-anchor': {
      someTest: 'someTest-------------------------------------'
    }
  }
}
