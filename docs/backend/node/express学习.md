---
title: express学习
---

## express

[教程：Express入门](https://developer.mozilla.org/zh-CN/docs/Learn/Server-side/Express_Nodejs/Introduction)

### Express 热更新

nodemon 实现热更新 https://www.npmjs.com/package/nodemon

启动文件不再使用 `node ./app.js` 而是 `nodemon ./app.js`

[res.setHeader 和 res.header 之间的区别](https://stackoverflow.com/questions/40840852/difference-between-res-setheader-and-res-header-in-node-js)

`res.setHeader()`是 Node.js 的本机方法，并且`res.header()`是`res.set()`Express 框架中方法的别名。

这两种方法做的完全一样，设置标头的 HTTP 响应。唯一的区别是只`res.setHeader()`允许您**设置单个标头**，`res.header()`并允许您**设置多个标头**。因此，使用一种适合您的需求。



#### app.get()和router.get() 有什么区别

app是应用级中间件，router是路由级中间件。路由级中间件可以更加细化而不影响全局，一般做 demo 可以直接用 app.get ，一般项目里就用 router.get

#### app.get和app.use区别

`app.get(path,callback)` callback只能传入回调函数，不能传入路由对象。
`app.use(path,callback)` callback传入回调函数和路由对象皆可。



### express启用cors

Express 上的 CORS 通过使用 `cors` 这个中间件来实现。



## express返回文件

```js
router.get('/file', (req, res) => {
  const filePath = path.resolve(__dirname, '../public/index.html')
  res.status(200).sendFile(filePath, {
    headers: {
      'Content-Type': 'text/html',
      "Content-Disposition": 'attachment;filename=FileName.html'
    }
  })
})
```

加上Content-Disposition文件将会被下载



## express设置header的几种方法

### res.setHeader

```ts
res.setHeader('Content-Type', 'text/plain');
```



### res.header 或 res.set

```ts
res.set({
    'Content-Type': 'text/plain',
    'X-Custom-Header': 'CustomHeaderValue'
});
```



发送文件

```ts
// 方法一 res.sendFile
res.sendFile(audioPath)

// 方法二 fileStream.pipe(res)
// 适用于需要对文件流进行更高级操作的场景，提供了更高的灵活性，但需要手动处理更多细节。
const fileStream = fs.createReadStream(audioPath)
fileStream.pipe(res)
```

