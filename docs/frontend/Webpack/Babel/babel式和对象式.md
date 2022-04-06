## Babel语法

配置文件的babel式和对象式

Babel式：

```js
module.exports = {
  plugins: [
    [
      'vuepress-plugin-xxx',
      { /* options */ }
    ]
  ]
}
```

对象式：

```js
module.exports = {
  plugins: {
    'xxx': { /* options */ }
  }
}
```

