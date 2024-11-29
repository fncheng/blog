## 关于前端配置代理的问题

首先明确一下前提：

假设后端服务部署在10.0.0.1:8080上，在不开启跨域的前提下，我们没法直接访问

比如express服务不开启cors（不启用app.use(cors)）

一般通过代理的方式来访问后端服务

比如vite server proxy的设置

```ts
server: {
		proxy: {
		    "/adms": {
		        target: "http://10.0.0.1:8080",
		        secure: false,
		        rewrite: (path) => path.replace(/^\/adms/, ""),
		    },
		},
},
```

当接口匹配到/adms时，就会代理到http://10.0.0.1:8080

这里rewrite的作用是当匹配到对应请求时，将/adms替换为""，至于为什么要替换成“”,这里是因为后端的api并不是以/adms开头的

### 经过代理的请求在浏览器中显示的还是原来的Request URL

```ts
server: {
    port: 9001,
    proxy: {
      '/proxyApi/': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/proxyApi/, '')
      }
    }
  }
```



![image-20241022095329375](https://minimax-1256590847.cos.ap-shanghai.myqcloud.com/img/image-20241022095329375.png)

比如我上面将带有`/proxyApi/`的请求代理到http://localhost:3000，并且通过rewrite去除掉/proxyApi,最终请求的地址为http://localhost:3000/route，但是浏览器中显示的还是localhost:9001/proxyApi/route,这是前端服务器所在的地址。

10.0.0.1通过设置nginx，访问10.0.0.1:80/adms时反代到10.0.0.1:8080

所以我们所有的请求都会通过中间层转换成直接访问后端的服务

第二种：

我们也可以代理到nginx，然后nginx再代理到后端服务

如果要代理到nginx，我们就不能再访问端口了，中间件最终要访问的地址应是10.0.0.1:80/adms，这样才会命中nginx的规则

```js
server: {
    proxy: {
        "/adms": {
            target: "http://10.0.0.1",
            secure: false,
            rewrite: (path) => path.replace(/^\/adms/, "/adms"),
        },
    },
},
```



### changeOrigin配置

假设你的 Vue 应用在 `http://localhost:8080` 上运行，后端 API 服务在 `http://127.0.0.1:3000` 上运行。前端通过代理来发送请求：

```ts
module.exports = {
  server: {
    port: 10001,
    proxy: {
        '/test': {
            target: 'http://127.0.0.1:3000',
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/test/, '/test'),
        }
    }
  },
};
```

#### 请求的变化：

- **客户端原始请求**：
  - URL: `http://localhost:8080/api/users`
  - Origin: `http://localhost:8080`
- **代理后请求**（`changeOrigin: true` 时）：
  - URL: `http://api.example.com/users`
  - Origin: `http://api.example.com` （代理服务器将 `Origin` 修改为目标地址）

如果 `changeOrigin` 为 `false`，那么后端服务器会收到带有原始 `Origin` 的请求（即 `http://localhost:8080`）。有些后端服务会对 `Origin` 进行严格校验，因此可能会拒绝来自不同域名的请求，这时就需要将 `changeOrigin` 设置为 `true`。



### Vite proxy覆盖问题

Vite server proxy 的路径匹配是按照配置顺序的。如果两个规则都匹配了同一个路径，将使用第一个匹配的规则。

比如第一个匹配路径 "/api"，而第二个匹配路径 "/api/data"，则使用/api
