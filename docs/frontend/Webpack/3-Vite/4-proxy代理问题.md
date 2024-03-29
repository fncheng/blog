## 关于前端配置代理的问题

首先明确一下前提：

假设后端服务部署在10.0.0.1:8080上，在不开启跨域的前提下，我们没法直接访问

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

这里rewrite的作用是当匹配到对应请求时，将/adms替换为""，至于为什么要替换成“”,这里是因为后端的api并不是以/adms开头的

10.0.0.1通过设置nginx，访问10.0.0.1:80/adms时反代到10.0.0.1:8080

所以我们所有的请求都会通过中间层转换成直接访问后端的服务

第二种：

我们也可以代理到nginx，然后nginx再代理到后端服务

如果要代理到nginx，我们就不能再访问端口了，中间件最终要访问的地址应是10.0.0.1:80/adms，这样才会命中nginx的规则

```js
"/adms": {
		target: "http://10.0.0.1",
		secure: false,
		rewrite: (path) => path.replace(/^\/adms/, "/adms"),
},
```



### Vite proxy覆盖问题

Vite server proxy 的路径匹配是按照配置顺序的。如果两个规则都匹配了同一个路径，将使用第一个匹配的规则。

比如第一个匹配路径 "/api"，而第二个匹配路径 "/api/data"，则使用/api
