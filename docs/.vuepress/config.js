// const nav = require('./nav')
// const sidebar = require('./sidebar')
const { defineConfig } = require('@vuepress/types');
const { getSidebar, setSidebar } = require('./utils.js');
console.log('setSidebar: ', setSidebar);

module.exports = defineConfig({
  base: '/blog/',
  title: 'Guidebook',
  // head: [['link', { rel: 'icon', href: '/favicon.ico' }]],
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
          { text: 'CSS', link: '/frontend/CSS/1-CSS布局/1-浮动与定位' },
          { text: 'Npm', link: '/frontend/npm/npm与yarn' },
          { text: 'TypeScript', link: '/frontend/TypeScript/ts常见问题' },
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
            link: '/frontend/可视化开发/echarts/1-Echarts使用'
          }
        ]
      },
      { text: 'JavaScript', link: '/frontend/JavaScript/JS操作数据' },
      // { text: 'JS', link: '/frontend/JS/运算符及操作符' },
      // { text: 'ElementUI', link: '/frontend/ElementUI/ElementUI常见问题' },
      { text: 'Vue', link: '/frontend/vue/Vue3/1-从vue2迁移到vue3' },
      { text: 'React', link: '/frontend/React/1-1.React学习/1-React学习' },
      { text: 'Webpack', link: '/frontend/Webpack/1-webpack开发环境搭建/1-webpack-dev-server' },
      { text: 'HTTP', link: '/frontend/http/4-细说Headers' },
      { text: 'Git', link: '/frontend/Git/Git常用命令' },
      { text: 'Node', link: '/backend/node/CMD和ES6模块导入导出' },
      { text: 'linux', link: '/linux/linux目录结构及文件夹介绍' },
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
      '/frontend/CSS/': [
        {
          title: 'CSS布局',
          collapsable: false,
          children: setSidebar('../frontend/CSS/1-CSS布局/')
        },
        {
          title: '文本及图片',
          collapsable: false,
          children: setSidebar('../frontend/CSS/2-文本及图片/')
        },
        {
          title: 'CSS3新特性',
          collapsable: false,
          children: setSidebar('../frontend/CSS/3-CSS3新特性/')
        },
        {
          title: 'CSS效果实现',
          collapsable: false,
          children: setSidebar('../frontend/CSS/4-CSS效果实现/')
        }
      ],
      // JavaScript
      '/frontend/JavaScript/': [
        {
          title: '1',
          children: setSidebar('../frontend/JavaScript/1/')
        },
        {
          title: '2',
          children: [
            ...setSidebar('../frontend/JavaScript/2/'),
            {
              title: '实现一个简单的sleep函数',
              path: 'https://www.cnblogs.com/chengxs/p/10949075.html'
            }
          ]
        },
        {
          title: 'ES6',
          collapsable: false,
          children: [
            ...setSidebar('../frontend/JavaScript/ES6/'),
            {
              title: 'Promise原理',
              path: 'https://github.com/fncheng/fe/issues/21'
            }
          ]
        },
        {
          title: '二进制文件与流',
          collapsable: false,
          children: setSidebar('../frontend/JavaScript/二进制文件与流/')
        },
        {
          title: 'RegExp',
          children: setSidebar('../frontend/JavaScript/RegExp/')
        }
      ],
      '/frontend/TypeScript/': getSidebar('../frontend/TypeScript/'),
      // Vue
      '/frontend/vue/': [
        {
          title: 'Vue3',
          collapsable: false,
          children: [...setSidebar('../frontend/vue/Vue3/')]
        },
        {
          title: 'Vue2',
          collapsable: true,
          children: [
            ...setSidebar('../frontend/vue/Vue学习/'),
            {
              title: 'keep-alive 组件持久化',
              path: 'https://github.com/fncheng/fe/issues/10'
            }
          ]
        },
        {
          title: 'VueRouter',
          collapsable: false,
          children: setSidebar('../frontend/vue/VueRouter/')
        },
        {
          title: 'Vuex',
          collapsable: false,
          children: setSidebar('../frontend/vue/Vuex/')
        },
        {
          title: 'Vue解决方案',
          children: [
            ...setSidebar('../frontend/vue/Vue解决方案/'),
            {
              title: 'Mockjs使用',
              path: 'https://github.com/fncheng/js-learn/issues/11'
            }
          ]
        },
        {
          title: 'ElementUI',
          children: setSidebar('../frontend/vue/ElementUI/')
        }
      ],
      '/frontend/React/': [
        {
          title: 'React',
          collapsable: false,
          children: setSidebar('../frontend/React/1-1.React学习/')
        },
        {
          title: 'ReactRouter',
          children: setSidebar('../frontend/React/1-2.React-Router/')
        },
        {
          title: 'Redux与Flux',
          collapsable: true,
          children: setSidebar('../frontend/React/1-3.Redux与Flux/')
        },
        {
          title: 'React与TypeScript',
          children: [
            {
              title: 'TSConfig配置说明',
              path: 'https://github.com/fncheng/webpack-learn/issues/4'
            },
            ...setSidebar('../frontend/React/1-4.React与TypeScript/')
          ]
        },
        {
          title: 'Antd',
          collapsable: false,
          children: [
            ...setSidebar('../frontend/React/2.Antd/'),
            {
              title: 'ProTable ProColumns类型',
              path: 'https://github.com/fncheng/react-learn/issues/5'
            }
          ]
        },
        {
          title: 'Next.js',
          children: setSidebar('../frontend/React/1-5.Nextjs/')
        },
        {
          title: 'UMI',
          children: setSidebar('../frontend/React/3.Umi/')
        },
        {
          title: '前端常见解决方案',
          collapsable: false,
          children: [...setSidebar('../frontend/React/4.前端常见解决方案/')]
        }
      ],
      '/frontend/npm/': getSidebar('../frontend/npm/'),
      '/小程序/': getSidebar('../小程序/'),
      // Webpack
      // '/frontend/Webpack/': [
      //   {
      //     title: 'Webpack',
      //     collapsable: true,
      //     children: [
      //       {
      //         title: '搭建Webpack开发环境',
      //         // collapsable: false,
      //         children: setSidebar(
      //           '../frontend/Webpack/1-webpack开发环境搭建/',
      //           '1-webpack开发环境搭建'
      //         )
      //       },
      //       {
      //         title: 'Webpack优化',
      //         // collapsable: false,
      //         children: setSidebar('../frontend/Webpack/2-Webpack优化/')
      //       }
      //     ]
      //   }
      // ],
      // 前端工程化
      '/frontend/Webpack/': [
        {
          title: '搭建Webpack开发环境',
          collapsable: false,
          children: setSidebar(
            '../frontend/Webpack/1-webpack开发环境搭建/',
            '1-webpack开发环境搭建'
          )
        },
        {
          title: 'Webpack优化',
          collapsable: true,
          children: setSidebar('../frontend/Webpack/2-Webpack优化/')
        },
        {
          title: 'Vite',
          collapsable: true,
          children: setSidebar('../frontend/Webpack/3-Vite/')
        },
        {
          title: '前端开发规范',
          children: setSidebar('../frontend/Webpack/4-前端开发规范/')
        },
        {
          title: '持续集成与构建',
          children: setSidebar('../frontend/Webpack/5-Jenkins/')
        },
        {
          title: '微前端',
          children: setSidebar('../frontend/Webpack/6-微前端/')
        }
      ],
      '/frontend/http/': [
        ...getSidebar('../frontend/http/')
      ],
      '/frontend/Git/': [
        { title: 'Git常用命令', collapsable: false, path: 'Git常用命令' },
        { title: 'Git进阶命令', collapsable: false, path: 'git进阶命令' },
        {
          title: 'GIT常见',
          collapsable: false,
          children: [
            'git fork的使用',
            'gitignore的使用',
            'gitconfig配置文件',
            'SourceTree使用指南',
            'git常见问题',
            'git hooks'
          ]
        },
        {
          title: 'GIT风格',
          collapsable: false,
          children: [
            'git管理及风格/1-将本地仓库推送到Github',
            'git管理及风格/2-git bash等软件走代理',
            // 'git管理及风格/3-Git Commit风格',
            'git管理及风格/4-迭代开发git分支管理'
          ]
        }
      ],
      '/backend/node/': getSidebar('../backend/node/'),
      '/linux/': [
        {
          title: '常用命令',
          collapsable: false,
          children: setSidebar('../linux/1-常用命令/')
        },
        {
          title: '进程｜端口｜防火墙',
          collapsable: false,
          children: setSidebar('../linux/2-进程-端口-防火墙/')
        },
        {
          title: '系统',
          collapsable: false,
          children: setSidebar('../linux/3-系统/')
        },
        {
          title: 'Nginx',
          collapsable: false,
          children: setSidebar('../linux/Nginx/')
        }
      ],
      // Software
      '/software/': getSidebar('../software/'),
      '/frontend/可视化开发/': [
        {
          title: 'Echarts',
          collapsable: false,
          children: setSidebar('../frontend/可视化开发/echarts/')
        },
        {
          title: 'Antv',
          collapsable: false,
          children: setSidebar('../frontend/可视化开发/antv/')
        }
      ],
      '/捡垃圾/': getSidebar('../捡垃圾/')
    },
    // plugins: {
    // 	"vuepress-plugin-auto-sidebar": {
    // 		nav: true,
    // 		titleMode: 'titlecase',
    // 		collapsable: true, // 设置为true,开启折叠
    // 	}
    // },
    algolia: {
      apiKey: '9c049a6b4c460355ad995d814e3f55b1',
      indexName: 'fnchengio',
      appId: 'MJF77CWOOC'
    },
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
});
