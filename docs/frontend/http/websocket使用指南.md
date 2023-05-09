<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [为什么需要 WebSocket？](#%E4%B8%BA%E4%BB%80%E4%B9%88%E9%9C%80%E8%A6%81-websocket)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

### 为什么需要 WebSocket？

HTTP 协议有一个缺陷：通信只能由客户端发起。

websocket协议特点:

- 建立在 TCP 协议之上，服务器端的实现比较容易。

- 与 HTTP 协议有着良好的兼容性。默认端口也是80和443，并且握手阶段采用 HTTP 协议，因此握手时不容易屏蔽，能通过各种 HTTP 代理服务器。
- 数据格式比较轻量，性能开销小，通信高效。
- 可以发送文本，也可以发送二进制数据。
- 没有同源限制，客户端可以与任意服务器通信。
- 协议标识符是`ws`（如果加密，则为`wss`），服务器网址就是 URL。

[**Websocket的用途**](https://blog.51cto.com/yuexiaosheng/2482706)



### 语法

```js
const ws = new WebSocket()
// WebSocket(url: string | URL, protocols?: string | string[]): WebSocket
```



## WebSocket

[WebSockets服务端工具](https://developer.mozilla.org/zh-CN/docs/Web/API/WebSockets_API)

[WebSocket教程](http://www.ruanyifeng.com/blog/2017/05/websocket.html)

### 服务端

nodejs WebSocket工具

- [Socket.IO](http://socket.io/): 一个基于长轮询/WebSocket的[Node.js](http://nodejs.org/)第三方传输协议。



## 一个简单的websocket demo

**服务端**

```js
const wss = new WebSocketServer({
  port: 3001
})
wss.on('connection', function connection(ws) {
  ws.on('error', console.error)
  ws.onopen = () => {
    console.log('websocket 服务 open')
  }
  ws.on('message', (data) => {
    console.log('received %s', data, data === 'hello')
    if (data == 'hello') {
      console.log('收到了消息:', data)
      // ws.send('收到了消息hello')
    }
  })

  ws.send('something')
})
```

**客户端**

```vue
<template>
  <div class="about">
    <input type="text" v-model="msg" />
    <button @click="sendMsg">submit</button>
  </div>
</template>

<script>
export default {
  name: 'About',
  data() {
    return {
      msg: '',
      ws: null,
    }
  },
  mounted() {
    if (window.WebSocket) {
      console.log('webscoket服务顺利运行!')
      const ws = new WebSocket('ws://localhost:3001')
      this.ws = ws
      this.ws.onopen = () => {
        console.log('onopen建立连接')
        ws.send('Hi')
      }
      this.ws.onmessage = (e) => {
        console.log('Message from', e)
      }
      this.ws.onerror = (e) => {
        console.log('连接失败', e)
      }
    }
  },
  methods: {
    sendMsg() {
      this.ws.send(this.msg)
    },
  },
}
</script>
```

