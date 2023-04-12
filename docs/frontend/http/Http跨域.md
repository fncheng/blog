# http跨域

## 什么是跨域

跨域就是跨过**浏览器同源策略限制**进行访问

跨域实际有三个部分

1. 跨源网络访问

   比如[`XMLHttpRequest`](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest) 或 `img`标签就会受到同源策略的约束

2. 跨源脚本API访问

3. 跨源数据存储访问

**那么什么是浏览器同源策略呢❓**

以下是[mdn](https://developer.mozilla.org/zh-CN/docs/Web/Security/Same-origin_policy)的解释:

> **同源策略**是一个重要的安全策略，它用于限制一个源的文档或者它加载的脚本如何能与另一个源的资源进行交互。它能帮助阻隔恶意文档，减少可能被攻击的媒介。

## 同源又是什么❓

mdn:

> 如果两个 URL 的 [protocol](https://developer.mozilla.org/zh-CN/docs/Glossary/Protocol)、[port](https://developer.mozilla.org/en-US/docs/Glossary/port) (如果有指定的话)和 [host](https://developer.mozilla.org/en-US/docs/Glossary/host) 都相同的话，则这两个 URL 是*同源*。这个方案也被称为“协议/主机/端口元组”，或者直接是 “元组”。（“元组” 是指一组项目构成的整体，双重/三重/四重/五重/等的通用形式）。

同源：协议+域名+端口都相同，baidu.com和www.baidu.com就不是同源

关于http协议这块可以去看[在浏览器输入 url 访问网址的过程中发生了什么?](https://github.com/fncheng/blog/blob/master/http/http%E5%8D%8F%E8%AE%AE.md#%E5%9C%A8%E6%B5%8F%E8%A7%88%E5%99%A8%E8%BE%93%E5%85%A5-url-%E8%AE%BF%E9%97%AE%E7%BD%91%E5%9D%80%E7%9A%84%E8%BF%87%E7%A8%8B%E4%B8%AD%E5%8F%91%E7%94%9F%E4%BA%86%E4%BB%80%E4%B9%88)

总之就是协议(protocol)、域名(host)、端口(port)必须相同。这样不同html文件之间才可以通信

同源策略的限制:

```javascript
1.) Cookie、LocalStorage 和 IndexDB 无法读取
2.) DOM 和 Js对象无法获得
3.) AJAX 请求不能发送
```



## 跨域具体案例

案例1：

有2个页面：1： http://newplayer.fun:8888/1.html

​					2： http://newplayer.fun:8080/1.html

这两个页面显然是跨域的，受同源策略影响

页面1上有张图http://newplayer.fun:8888/src/01.jpeg 在页面2上这样引用

```html
<img src="http://newplayer.fun:8888/src/01.jpeg" />
```

发现页面2的图片可以显示

这是因为img的`src`属性可以绕过同策略、跨域请求。

script也可以

**Q：img的src和script的src跨域的区别**❓

原理上都是利用标签的src可绕过同源限制，跨域请求的特点，

硬要说不同，那么区别在于：img只能单向发送get请求，**不可访问响应内容（只是展现）**，而**script可对其进行解析**

案例2:

从http://127.0.0.1:8888/#/home访问http://127.0.0.1:3000就会报错

```http
Access to XMLHttpRequest at 'http://127.0.0.1:3000/' from origin 'http://127.0.0.1:8888' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
```





## 跨域解决方案

https://juejin.cn/post/6844903882083024910#heading-5

1、 通过jsonp跨域
2、 document.domain + iframe跨域
3、 location.hash + iframe
4、 window.name + iframe跨域
5、 postMessage跨域
6、 跨域资源共享（CORS）
7、 nginx代理跨域
8、 nodejs中间件代理跨域
9、 WebSocket协议跨域

#### 1.JSONP跨域

jsonp跨域就是利用了script标签src属性的跨域特点发送带有callback参数的GET请求

```html
<script>
	const script = document.createElement('script');
	script.type = 'text/javascript';
	// 传参一个回调函数名给后端，方便后端返回时执行这个在前端定义的回调函数
	script.src = 'http://127.0.0.1:3000';
	document.head.appendChild(script);
</script>
```

#### 2.跨域资源共享（CORS）

满足俩个条件：

1. 请求是以下类
   - head
   - get
   - post
2. 请求的Header
   - Accept
   - Accept-Language
   - Content-Language
   - Content-Type: 只限于三个值：application/x-www-form-urlencoded、multipart/form-data、text/plain

不同时满足上面的两个条件，就属于非简单请求。浏览器对这两种的处理，是不一样的。

简单请求要我们在头信息中设置Origin字段

```js
axios({
        method: 'get',
        url: 'http://127.0.0.1:3000',
        headers: {
          'Content-Type': 'text/palin',
          Origin: 'http://127.0.0.1:3000',
        },
      }).then((res) => {
        console.log(res);
      });
```

发现报错并且还是显示CORS策略

```http
Refused to set unsafe header "Origin"
// 原因是在服务端还需要设置请求头 Access-Control-Allow-Origin 字段 并且浏览器会自动为符合CORS的请求添加 Origin 字段
```

具体可以看https://developer.mozilla.org/zh-CN/docs/Web/HTTP/CORS

**CORS请求设置的响应头字段，都以 Access-Control-开头:**

1. **Access-Control-Allow-Origin** 必选

   它的值要么是请求时Origin字段的值，要么是一个*，表示接受任意域名的请求。

2. **Access-Control-Allow-Credentials** 可选

   它的值是一个布尔值，表示是否允许发送Cookie。默认情况下，Cookie不包括在CORS请求之中。设为true，即表示服务器明确许可，Cookie可以包含在请求中，一起发给服务器。这个值也只能设为true，如果服务器不要浏览器发送Cookie，删除该字段即可。
   
   

👉[双重跨域问题](https://blog.csdn.net/zhuzhaoxu114/article/details/115490787)



#### 7. nginx反向代理

使用nginx反向代理实现跨域，只需要修改nginx的配置即可解决跨域问题。

A网站向B网站请求某个接口时，向B网站发送一个请求，nginx根据配置文件接收这个请求，代替A网站向B网站来请求。
nginx拿到这个资源后再返回给A网站，以此来解决了跨域问题。

例如nginx监听的端口号为 8090，响应请求的服务器端口号为 3000。（localhost:8090 请求 localhost:3000/say）

nginx配置如下:

```nginx
server {
    listen       8090;

    server_name  localhost;

    location / {
        root   /Users/liuyan35/Test/Study/CORS/1-jsonp;
        index  index.html index.htm;
    }
    location /say {
        rewrite  ^/say/(.*)$ /$1 break;
        proxy_pass   http://localhost:3000;
        add_header 'Access-Control-Allow-Origin' '*';
        add_header 'Access-Control-Allow-Credentials' 'true';
        add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS';
    }
    # others
}
```

```nginx
server {
        ...
        location / {
            # 允许 所有头部 所有域 所有方法
            add_header 'Access-Control-Allow-Origin' '*';
            add_header 'Access-Control-Allow-Headers' '*';
            add_header 'Access-Control-Allow-Methods' '*';
            # OPTIONS 直接返回204
            if ($request_method = 'OPTIONS') {
                return 204;
            }
        }
        ...
    }
```







----

相关链接:

[跨域及其常见解决方案](https://cloud.tencent.com/developer/article/1175899)

[CORS跨域和Nginx反向代理跨域优劣对比](https://segmentfault.com/a/1190000016229792)

https://juejin.im/post/6844903767226351623#heading-11

https://github.com/YvetteLau/Blog/issues/21