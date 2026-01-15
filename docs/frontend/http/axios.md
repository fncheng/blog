## Axios请求配置

https://www.axios-http.cn/docs/req_config

## Axios拦截器

http://www.axios-js.com/zh-cn/docs/#%E6%8B%A6%E6%88%AA%E5%99%A8

在请求或响应被 `then` 或 `catch` 处理前拦截它们。

拦截器分为请求和响应两种，对应request和respones

添加规则：use

删除规则：eject

```js
import axios from 'axios';

// 创建一个 Axios 实例
const instance = axios.create({
  baseURL: 'https://api.example.com',
});

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    // 在请求发送之前做一些处理，例如添加请求头等
    console.log('Request Interceptor:', config);
    return config;
  },
  (error) => {
    // 处理请求错误
    console.error('Request Error Interceptor:', error);
    return Promise.reject(error);
  }
);

// 响应拦截器
instance.interceptors.response.use(
  (response) => {
    // 在响应数据被处理之前做一些处理
    console.log('Response Interceptor:', response);
    return response;
  },
  (error) => {
    // 处理响应错误
    console.error('Response Error Interceptor:', error);
    return Promise.reject(error);
  }
);

export default instance;
```



## 请求参数类型

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



## 类型声明

### Axios拦截器中的config

```ts
export interface InternalAxiosRequestConfig<D = any> extends AxiosRequestConfig<D> {
  headers: AxiosRequestHeaders;
}
```



## Axios取消请求

使用 Axios 发送的请求可以取消，这对于在组件卸载或其他情况下取消不再需要的请求非常有用，以避免浪费资源和处理不必要的响应。你可以使用 Axios 提供的 CancelToken 来实现请求取消。以下是如何取消 Axios 请求的一般步骤：

1. 首先，你需要导入 Axios 库并创建一个 CancelToken 实例：

```javascript
import axios from 'axios';

const source = axios.CancelToken.source();
```

2. 然后，在发送请求时，将 `cancelToken` 选项设置为 CancelToken 实例的 `token` 属性：

```javascript
axios.get('/api/data', {
  cancelToken: source.token,
})
  .then(response => {
    // 处理响应
  })
  .catch(error => {
    if (axios.isCancel(error)) {
      // 请求已取消
    } else {
      // 处理其他错误
    }
  });
```

3. 若要取消请求，调用 CancelToken 实例的 `cancel` 方法：

```javascript
source.cancel('请求取消的原因');
```

完整的代码示例：

```javascript
import axios from 'axios';

const source = axios.CancelToken.source();

axios.get('/api/data', {
  cancelToken: source.token,
})
  .then(response => {
    // 处理响应
  })
  .catch(error => {
    if (axios.isCancel(error)) {
      console.log('请求已取消', error.message);
    } else {
      console.log('处理其他错误', error);
    }
  });

// 在需要时取消请求
source.cancel('请求取消的原因');
```

这将取消发送给 `/api/data` 的请求。当调用 `source.cancel` 时，Axios 会捕获请求并将其标记为已取消。在请求的 `.catch` 部分，你可以检查是否请求被取消，然后采取适当的措施。

这是一种有效的方式来取消 Axios 请求，但请确保在适当的时机取消请求，以避免不必要的网络请求。通常，可以在组件卸载、路由切换或其他需要取消请求的情况下执行取消操作。

 **这里调用`source.cancel`是取消所有请求吗还是取消单一请求？**

请注意，`source.cancel` 调用将取消使用相同 `CancelToken` 实例的所有请求，而不是单一请求。这是因为 `CancelToken` 实例是可重复使用的，它可以用于多个请求

### 使用AbortController并封装之

```js
export const getRequest = (controller: AbortController) =>
  request({
    url: 'http://127.0.0.1:3000/route',
    method: 'get',
    signal: controller.signal
  }); // request是封装的axios实例
```

```vue
<script setup lang="ts">
/**
 * 用来判断是否发出了请求
 */
let HAS_REQUEST = false;

let controller = new AbortController();
const handleRequest = async () => {
  HAS_REQUEST = true;
  let res = await getRequest(controller);
  console.log('res: ', res);

  HAS_REQUEST = false;
};

const cancelRequest = () => {
  if (HAS_REQUEST) {
    controller.abort();
    controller = new AbortController();
    console.log('请求被取消了！');
  }
};
</script>

<template>
  <div>
    <button @click="handleRequest">发起请求</button>
    <button @click="cancelRequest">取消请求</button>
  </div>
</template>
```

关于错误捕获的封装

取消请求会发出一个未捕获的CanceledError错误并在控制台输出，可在响应拦截器中捕获并处理

```js
service.interceptors.response.use(
  (response) => {
    if (response.status === 200) {
      return response.data;
    }
  },
  (err) => {
    Promise.reject(err).catch((err) => {
      if (axios.isCancel(err)) {
        console.log('Request canceled', err.message);
      } else console.error('Request failed', err);
    });
  }
);
```









> 封装axios后，每个接口定义为一个函数，如下： ``` export const getAutoCode = (): Promise<{ body: any; code: number }> =>    axios.get("/captcha"); ``` 这样每个接口都需要定义返回类型，感觉比较麻烦，有什么较好的解决方法吗

使用 TypeScript 的泛型来减少类型重复定义

```ts
// 使用通用的请求函数
const getAutoCode = () => request<{ body: any; code: number }>('/captcha');

const getUserInfo = () => request<{ name: string; age: number }>('/user/info');
```





## qs模块的arrayFormat

在 qs 模块中，arrayFormat 选项用于控制数组的序列化方式。有三个可用的选项值：

- "indices"（默认值）：使用索引形式的数组序列化，例如 `foo[0]=bar&foo[1]=baz`。
- "brackets"：使用方括号形式的数组序列化，例如 `foo[]=bar&foo[]=baz`。
- "repeat"：使用重复键形式的数组序列化，例如 `foo=bar&foo=baz`。

```ts
const params = {
  foo: ['bar', 'baz']
};

const queryString = qs.stringify(params, { arrayFormat: 'brackets' });
```



```ts
export function getBoardList(params: any) {
  const url = `/api/system/notice/list` + qs.stringify(params)
  return axios.get(url, {
    params: qs.stringify(params)
  })
}
```

这么写为什么不对？

核心原因是：**`axios.get` 里的 `params` 期望的是一个对象，而不是已经 `stringify` 好的字符串**。

正确的做法：

```ts
export function getBoardList(params: any) {
  const url = `/api/system/notice/list`
  return axios.get(url, {
    params: params,
    paramsSerializer: (params) => {
      return qs.stringify(params)
    }
  })
}
```

