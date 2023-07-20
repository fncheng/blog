## Axios使用

### 拦截器

http://www.axios-js.com/zh-cn/docs/#%E6%8B%A6%E6%88%AA%E5%99%A8

在请求或响应被 `then` 或 `catch` 处理前拦截它们。

拦截器分为请求和响应两种，对应request和respones

添加规则：use

删除规则：eject





post(**url: string**, data?: any, config?: AxiosRequestConfig)



request.body的几种常见格式

application/x-www-form-urlencoded：

这是表单提交的默认格式，不支持文件类型.它的请求格式是以`&`符号连接的**键值对**.（查询字符串）

```http
POST http://www.example.com HTTP/1.1
Content-Type: application/x-www-form-urlencoded;charset=utf-8

key1=val1&key2=val2
```

multipart/form-data:

```http
POST http://www.example.com HTTP/1.1
Content-Type:multipart/form-data; boundary=----WebKitFormBoundaryPAlLG7hJKNYc4ft3

------WebKitFormBoundaryrGKCBY7qhFd3TrwA
Content-Disposition: form-data; name="text"

demo
------WebKitFormBoundaryPAlLG7hJKNYc4ft3
Content-Disposition: form-data; name="file"; filename="demo.png"
Content-Type: image/png


------WebKitFormBoundaryPAlLG7hJKNYc4ft3--
```

application/json:

```http
POST http://www.example.com HTTP/1.1 
Content-Type: application/json;charset=utf-8

{"name":"xfly","age": 24, "hobby":["x","xx","xxx"]}

```



## Axios解读：

axios源码解读：https://juejin.cn/post/6844903898172358669

node环境下打印axios

```js
const axios = require('axios');
console.log(axios);
```

```js
<ref *1> [Function: wrap] {
  request: [Function: wrap],
  getUri: [Function: wrap],
  delete: [Function: wrap],
  get: [Function: wrap],
  head: [Function: wrap],
  options: [Function: wrap],
  post: [Function: wrap],
  put: [Function: wrap],
  patch: [Function: wrap],
  defaults: {
    adapter: [Function: httpAdapter],
    transformRequest: [ [Function: transformRequest] ],
    transformResponse: [ [Function: transformResponse] ],
    timeout: 0,
    xsrfCookieName: 'XSRF-TOKEN',
    xsrfHeaderName: 'X-XSRF-TOKEN',
    maxContentLength: -1,
    maxBodyLength: -1,
    validateStatus: [Function: validateStatus],
    headers: {
      common: [Object],
      delete: {},
      get: {},
      head: {},
      post: [Object],
      put: [Object],
      patch: [Object]
    }
  },
  interceptors: {
    request: InterceptorManager { handlers: [] },
    response: InterceptorManager { handlers: [] }
  },
  Axios: [Function: Axios],
  create: [Function: create],
  Cancel: [Function: Cancel],
  CancelToken: [Function: CancelToken] { source: [Function: source] },
  isCancel: [Function: isCancel],
  all: [Function: all],
  spread: [Function: spread],
  default: [Circular *1]
}
```



```js
const axios = require('axios');
const instance = axios.create(); // 默认参数 defaults
console.log(instance.defaults);

// 输出
{
  headers: {
    common: { Accept: 'application/json, text/plain, */*' },
    delete: {},
    get: {},
    head: {},
    post: { 'Content-Type': 'application/x-www-form-urlencoded' },
    put: { 'Content-Type': 'application/x-www-form-urlencoded' },
    patch: { 'Content-Type': 'application/x-www-form-urlencoded' }
  },
  transformRequest: [ [Function: transformRequest] ],
  transformResponse: [ [Function: transformResponse] ],
  timeout: 0,
  adapter: [Function: httpAdapter],
  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',
  maxContentLength: -1,
  maxBodyLength: -1,
  validateStatus: [Function: validateStatus]
}
```



[Axios/adapters/http.js] 中可以看出，NodeJS中axios的实现是基于http或者https模块来发起请求的

[Axios/adapters/xhr.js] 浏览器中axios的实现是对XMLhttpRequest进行封装



### response:

![image-20210528101124476](https://minimax-1256590847.cos.ap-shanghai.myqcloud.com/img/image-20210528101124476.png)



## 封装axios