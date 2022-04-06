## Vue项目"Uncaught SyntaxError: Unexpected token <"报错

<img src="/Users/cheng/Library/Application Support/typora-user-images/image-20210621100754434.png" alt="image-20210621100754434" style="zoom:67%;" />



经排查，发现这是因为router mode改成history后出现的，改回hash mode后没有出现该问题

 

https://github.com/vuejs/vue-cli/issues/4852

使用history mode后 `vue.config.js` 中

```js
module.exports = {
  publicPath: './',
  outputDir: 'dist/a',
}
```

其中publicPath 改成 `'/'`后就正常了。

publicPath默认是/，它会假设应用被部署到一个域名的根目录上，当被部署到一个子路径时，需要修改为:/子路径/。

> 默认情况下，Vue CLI 会假设你的应用是被部署在一个域名的根路径上，例如 `https://www.my-app.com/`。如果应用被部署在一个子路径上，你就需要用这个选项指定这个子路径。例如，如果你的应用被部署在 `https://www.my-app.com/my-app/`，则设置 `publicPath` 为 `/my-app/`。



## Vue Router报错

### “冗余导航”

通过点击按钮触发router.push时，如果值是同一个，则会报错`Uncaught (in promise) NavigationDuplicated: Avoided redundant navigation to current location: "/home/first".`

解决方案：

1. 使用catch https://renatello.com/vuejs-avoided-redundant-navigation/
2. https://stackoverflow.com/questions/65878999/vue-router-push-error-avoided-redundant-navigation-to-current-location

