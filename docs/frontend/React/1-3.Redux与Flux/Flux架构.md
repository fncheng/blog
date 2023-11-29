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

## Flux思想

`Flux` 是一种前端架构模式，旨在解决React中数据流管理的问题。该架构提出了严格的单向数据流的概念，将整个应用分为四层：`View`、`Action`、`Dispatcher`、`Store`。

其中 `Store` 层用于存储应用程序状态，并实现状态的变化逻辑。在 `Flux` 中，每次状态的变化由 `Action` 触发，然后 `Action` 会把更新的状态信息打包成一个 `Action Payload` 对象再向 `Dispatcher` 分发。`Dispatcher` 会通知所有的 `Store`，告诉它们有一个新的 `Action` 发生了，让它们可以对这个 `Action` 做出响应。当一个 `Store` 接收到一个 `Action` 后，就需要根据 `Action` 的类型来改变自身的状态，这就是 `Reducer` 的任务。最后，所有 `Store` 会把新的状态信息以 `change` 事件的形式向 `View` 层发布，这样 `View` 层就可以通过监听 `change` 事件来更新自己的视图。

可以看出，`Action` 和 `Reducer` 是 `Flux` 架构中的两个非常核心的概念，其中 `Action` 用于描述状态的变化，而 `Reducer` 则用于根据 `Action` 的类型来更新相应的 `Store` 的状态。因此，可以说 `Reducer` 的思想是 `Flux` 架构的核心之一。

需要注意的是，`Reducer` 的思想并不限于 `Flux` 架构中，它同样适用于其他前端框架如 Vue、Angular 等。`Reducer` 的核心思想是根据 `Action` 的类型来实现状态变化的逻辑，这个思想在前后端系统中都有非常广泛的应用。

Flux架构具体内容可以看[这篇文章](http://www.ruanyifeng.com/blog/2016/01/flux.html)

实现一个Flux应用

[CodeSandBox](https://codesandbox.io/s/vue2-flux-09gjd?file=/src/dispatcher/AppDispatcher.js)

[Flux-npm](https://www.npmjs.com/package/flux)