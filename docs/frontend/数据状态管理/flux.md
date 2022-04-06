## 什么是Flux架构❓

### Flux将应用分成四个部分

- View： 视图层
- Action（动作）：视图层发出的消息（比如mouseClick）
- Dispatcher（派发器）：用来接收Actions、执行回调函数
- Store（数据层）：用来存放应用的状态，一旦发生变动，就提醒Views要更新页面

![](http://www.ruanyifeng.com/blogimg/asset/2016/bg2016011503.png)

### Flux 数据单向流动

1. 用户访问 View
2. View 发出用户的 Action
3. Dispatcher 收到 Action，要求 Store 进行相应的更新
4. Store 更新后，发出一个"change"事件
5. View 收到"change"事件后，更新页面

Flux架构具体内容可以看[这篇文章](http://www.ruanyifeng.com/blog/2016/01/flux.html)

实现一个Flux应用

[CodeSandBox](https://codesandbox.io/s/vue2-flux-09gjd?file=/src/dispatcher/AppDispatcher.js)

[Flux-npm](https://www.npmjs.com/package/flux)