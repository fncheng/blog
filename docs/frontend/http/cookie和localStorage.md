<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [cookie](#cookie)
- [Web Storage API](#web-storage-api)
- [token](#token)
- [Cookie, LocalStorage 与 SessionStorage 的区别](#cookie-localstorage-%E4%B8%8E-sessionstorage-%E7%9A%84%E5%8C%BA%E5%88%AB)
    - [localStorage 和 sessionStorage](#localstorage-%E5%92%8C-sessionstorage)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## cookie

[cookie 和 session 的区别](https://juejin.im/post/5aa783b76fb9a028d663d70a#heading-1)

**1.什么是 cookie**

[mdn](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Cookies)关于 cookie 的解释

> HTTP Cookie（也叫 Web Cookie 或浏览器 Cookie）是服务器发送到用户浏览器并保存在本地的一小块数据,它会在浏览器下次向同一服务器再次发起请求时被携带并发送到服务器上。
>
> 通常，它用于告知服务端两个请求是否来自同一浏览器，如保持用户的登录状态。Cookie 使基于[无状态](https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview#HTTP_is_stateless_but_not_sessionless)的 HTTP 协议记录稳定的状态信息成为了可能。

Cookie 主要用于以下三个方面：

- 会话状态管理（如用户登录状态、购物车、游戏分数或其它需要记录的信息）
- 个性化设置（如用户自定义设置、主题等）
- 浏览器行为跟踪（如跟踪分析用户行为等）

Cookie 技术通过请求和响应报文中写入 Cookie 信息来控制客户端的状态。

### Cookie有哪些属性？

在Application/Cookies里面我们可以看到Cookie有以下属性

![](/Users/cheng/Library/Application Support/typora-user-images/image-20210413104124314.png)

- Name
- Value
- Domain
- Path
- Expires/Max-Age
- Size
- HTTP
- Secure
- SameSite

**[Cookie属性详解](https://bugszhou.abuen.com/cookie/chapter1/properties.html#属性详解)**

#### Expires/Max-Age

```http
// Set-Cookie: Name = value;	expires = 时间 ;  path = 路径 ;  HTTP
Set-Cookie: ki1e_2132_connect_is_bind=1; expires=Wed, 13-Apr-2022 02:35:07 GMT; path=/; httponly
```



#### Domain属性

> `Domain` 指定了哪些主机可以接受 Cookie。如果不指定，默认为 [origin](https://developer.mozilla.org/en-US/docs/Glossary/Origin)，**不包含子域名**。如果指定了`Domain`，则一般包含子域名。因此，指定 `Domain` 比省略它的限制要少。但是，当子域需要共享有关用户的信息时，这可能会有所帮助。 

例如，如果设置 `Domain=mozilla.org`，则 Cookie 也包含在子域名中（如`developer.mozilla.org`）。

#### Path属性

> `Path` 标识指定了主机下的哪些路径可以接受 Cookie（该 URL 路径必须存在于请求 URL 中）。以字符 `%x2F` ("/") 作为路径分隔符，子路径也会被匹配。

例如，设置 `Path=/docs`，则以下地址都会匹配：

- `/docs`
- `/docs/Web/`
- `/docs/Web/HTTP`

#### HTTP

```http
// HTTP代表的是Cookie的httponly属性。其值为boolean类型有两种：true/false。如果设置为true，则无法通过使用 document.cookie 来获取这条Cookies，只存在于HTTP头部，只能在服务器访问该Cookie；这样设计的目的是为了避免跨域脚本 (XSS) 攻击来窃取Cookie。
Set-Cookie: test=bugszhou; expires=Thu, 31-Dec-37 23:55:55 GMT; HttpOnly
```

#### Secure

```http
// Secure代表该Cookie只能通过HTTPS协议来互相传递，一般用于传递具有高价值的信息。
Set-Cookie: test=bugszhou; expires=Thu, 31-Dec-37 23:55:55 GMT; Secure; HttpOnly
```



### Cookie的生命周期

Cookie 的生命周期可以通过两种方式定义：

- 会话期 Cookie 是最简单的 Cookie：浏览器关闭之后它会被自动删除，也就是说它仅在会话期内有效。会话期Cookie不需要指定过期时间（`Expires`）或者有效期（`Max-Age`）。需要注意的是，有些浏览器提供了会话恢复功能，这种情况下即使关闭了浏览器，会话期Cookie 也会被保留下来，就好像浏览器从来没有关闭一样，这会导致 Cookie 的生命周期无限期延长。
- 持久性 Cookie 的生命周期取决于过期时间（`Expires`）或有效期（`Max-Age`）指定的一段时间。

<img src="/Users/cheng/Library/Application Support/typora-user-images/image-20210413103704011.png" alt="image-20210413103704011" style="zoom:50%;" />

## Session

与cookie对应的是session，session保存在服务器上。

因为HTTP协议是无状态的，所以session判断不了是否同一个用户，于是乎就有了sessionid，通过session的值来区分是哪一个用户。

Session Storage 中的Session ID 

session 的运行依赖 session id，而 session id 是存在 cookie 中的，也就是说，如果浏览器禁用了 cookie ，同时 session 也会失效（但是可以通过其它方式实现，比如在 url 中传递 session_id）

<img src="/Users/cheng/Library/Application Support/typora-user-images/image-20210413112340036.png" alt="image-20210413112340036" style="zoom:67%;" />

从上图可以看出sessionId是一段加密字符串， 类似于uuid

**2.cookie 和 session 的区别?**

---

## Web Storage API

[Web Storage](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Storage_API) 包含如下两种机制：

- `sessionStorage` 为每一个给定的源（given origin）维持一个独立的存储区域，该存储区域在页面会话期间可用（即只要浏览器处于打开状态，包括页面重新加载和恢复）。
- `localStorage` 同样的功能，但是在浏览器关闭，然后重新打开后数据仍然存在。

### localStorage

`localStorage` 类似 [`sessionStorage`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/sessionStorage)，但其区别在于：存储在 `localStorage` 的数据可以长期保留；而当页面会话结束——也就是说，当页面被关闭时，存储在 `sessionStorage` 的数据会被清除 。

另外，`localStorage` 中的键值对总是以字符串的形式存储。 (需要注意, 和js对象相比, 键值对总是以字符串的形式存储意味着数值类型会自动转化为字符串类型).

---

## token

什么是 token

## Cookie, LocalStorage 与 SessionStorage 的区别

https://jerryzou.com/posts/cookie-and-web-storage/

| 特性           | Cookie                                                                              | localStorage                                                    | sessionStorage                               |
| -------------- | ----------------------------------------------------------------------------------- | --------------------------------------------------------------- | -------------------------------------------- |
| 数据的生命期   | 一般由服务器生成，可设置失效时间。如果在浏览器端生成 Cookie，默认是关闭浏览器后失效 | 除非被清除，否则永久保存                                        | 仅在当前会话下有效，关闭页面或浏览器后被清除 |
| 存放数据大小   | 4K 左右                                                                             | 一般为 5MB                                                      |                                              |
| 与服务器端通信 | 每次都会携带在 HTTP 头中，如果使用 cookie 保存过多数据会带来性能问题                | 仅在客户端（即浏览器）中保存，不参与和服务器的通信              |                                              |
| 易用性         | 需要程序员自己封装，源生的 Cookie 接口不友好                                        | 源生接口可以接受，亦可再次封装来对 Object 和 Array 有更好的支持 |                                              |

#### localStorage 和 sessionStorage

[相关文章](http://caibaojian.com/localstorage-sessionstorage.html)

html5 中的 [web](http://caibaojian.com/w3c/) Storage 包括了两种存储方式：sessionStorage 和 localStorage。 sessionStorage 用于本地存储一个会话（session）中的数据，这些数据只有在同一个会话中的页面才能访问，会话结束后数据也随之销毁。localStorage 用于存储一个域名下的需要永久存在在本地的数据，这些数据可以被一直访问，直到这些数据被删除。因此 sessionStorage 和 localStorage 的主要区别在于他们存储数据的生命周期，sessionStorage 存储的数据的生命周期是一个会话，而 localStorage 存储的数据的生命周期是永久，直到被主动删除，否则数据永远不会过期的。
