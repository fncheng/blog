const sidebar = {
  '/frontend/js/': [
    {
      title: 'js',
      children: [
        { title: '动态规划', path: '动态规划' },
        { title: '深拷贝浅拷贝', path: '深拷贝浅拷贝' },
      ],
    },
    {
      title: 'es6',
      children: [
        { title: 'Promise', path: 'es6/Promise/' },
        { title: 'Class语法糖', path: 'es6/Class语法糖/' },
        { title: 'async-await语法糖', path: 'es6/async-await语法糖/' },
      ],
    },
  ],
  '/frontend/vue/': [
    {
      title: 'Vue',
      children: [
        { title: 'Vue-router', path: 'vue-router' },
        { title: 'Vue组件通信', path: 'vue组件通信' },
        'Vue组件注册',
      ],
    },
    'Vue常见解决方案',
  ],
  '/frontend/Git/': [{ title: 'Git常用命令', path: 'Git常用命令' }],
  '/linux/': [
    {
      title: 'Linux',
      children: [
        { title: 'curl命令', path: 'curl命令' },
        { title: 'ls命令', path: 'ls命令' },
      ],
    },
  ],
  '/software/': [
    {
      title: '软件设置',
      children: [{ title: 'zsh终端配置', path: 'zsh终端配置' }],
    },
  ],
}

module.exports = sidebar
