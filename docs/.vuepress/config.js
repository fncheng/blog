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
  // base: './',
  title: 'VuePress',
  head: [['link', { rel: 'icon', href: '/logo.png' }]],
  port: 3000,
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
          { text: 'HTML', link: '/frontend/html/' },
          { text: 'CSS', link: '/frontend/css/css学习' },
          { text: 'Webpack', link: '/frontend/Webpack/webpack' },
          { text: 'Npm', link: '/frontend/npm/npm与yarn' },
          {
            text: '前端工程化',
            link: '/frontend/前端工程化/前端工程化ESLint及Prettier'
          },
          {
            text: '前端开发常见解决方案',
            link: '/frontend/前端开发常见解决方案/图片懒加载'
          }
        ]
      },
      { text: 'JavaScript', link: '/frontend/JavaScript/JS操作数据' },
      { text: 'Vue', link: '/frontend/vue/render渲染函数与JSX' },
      { text: 'React', link: '/frontend/react/React学习' },
      { text: 'Git', link: '/frontend/Git/Git常用命令' },
      { text: 'Node', link: '/node/CMD和ES6模块导入导出' },
      { text: 'linux', link: '/linux/Linux命令使用指南' },
      {
        text: '软件设置',
        items: [
          { text: '软件设置', link: '/software/列表' },
          { text: 'VSCode', link: '/software/Vscode/VSCODE更新特性' },
          { text: 'MACOS使用技巧', link: '/software/macOS使用/MacOS使用' }
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
    sidebarDepth: 2,
    sidebar: {
      '/frontend/前端开发常见解决方案/': getSidebar(
        '../frontend/前端开发常见解决方案/'
      ),
      '/frontend/css/': getSidebar('../frontend/css/'),
      // JavaScript
      '/frontend/js/': getSidebar('../frontend/JavaScript/'),
      // Vue
      '/frontend/vue/': getSidebar('../frontend/vue/'),
      '/frontend/react/': getSidebar('../frontend/react/'),
      '/frontend/npm/': getSidebar('../frontend/npm/'),
      // 前端工程化
      '/frontend/前端工程化/': getSidebar('../frontend/前端工程化/'),
      // Webpack
      '/frontend/Webpack/': getSidebar('../frontend/Webpack/'),
      '/frontend/Git/': getSidebar('../frontend/Git/'),
      '/frontend/node/': getSidebar('../node/'),
      '/linux/': getSidebar('../linux/'),
      // Software
      '/software/': getSidebar('../software/')
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
    '@vuepress/back-to-top': true
  }
}
