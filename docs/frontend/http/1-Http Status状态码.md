## Http StatusCode

[参考链接](https://blog.csdn.net/unclebober/article/details/86626117?ops_request_misc=%257B%2522request%255Fid%2522%253A%2522159168396419195264507374%2522%252C%2522scm%2522%253A%252220140713.130102334.pc%255Fblog.%2522%257D&request_id=159168396419195264507374&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~blog~first_rank_v2~rank_blog_default-1-86626117.pc_v2_rank_blog_default&utm_term=%E7%8A%B6%E6%80%81%E7%A0%81)

**201-206都表示服务器成功处理了请求的状态代码，说明网页可以正常访问。**

```http
//
Status Code: 200 OK  成功
Status Code: 201 Created  已创建
Status Code: 202 Accepted	已接受
Status Code: 203 Non-Authoritative Information  非授权信息
Status Code: 204 No Content	无内容
Status Code: 205 Reset Content  重置内容
Status Code: 206 Partial Content  部分内容
Status Code: 207 Multi-Status
Status Code: 208 Already Reported
```



**300-307表示的意思是：要完成请求，您需要进一步进行操作。通常，这些状态代码是永远重定向的。**

```http
//
Status Code: 301 Moved Permanently	永久重定向
Status Code: 302 Found
Status Code: 304 Not Modified

```

### 关于重定向

**301永久重定向**

说明请求的资源已经被移动到了由 [`Location`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Location) 头部指定的url上，是固定的不会再改变。

> Temporary Redirects: 302, 303, and 307
>
> 尽管状态码 303 和 307 在 1999 年被标准化，但仍有一些客户没有正确实现它们。就像状态码 308 一样，建议**坚持使用 302 重定向，除非您需要重复 POST 请求（在这种情况下使用 307）或知道预期的客户端支持代码 303 和 307**。

- 当页面或文件现在在新 URL 下永久可用并且您希望搜索引擎识别该事实时，请使用 301 重定向。
- 当页面仅在不同的 URL 下临时可用并且您不希望搜索引擎替换其索引中的原始 URL 时，请使用 302 重定向。
- 仅当您确实需要它们并且知道自己在做什么时才使用 303、307 和 308 重定向。
- 此外，将重定向保持在最低限度，因为每个重定向都需要额外的 HTTP 请求。



### 302 Found

HTTP状态码302 Found表示请求的资源临时被移动到另一个URI。通常，服务器会在响应头中包含一个`Location`字段，指明客户端应当进行重新请求的URI。

```http
HTTP/1.1 302 Found
Location: http://www.example.com/newpage
```





**4XXHTTP状态码表示请求可能出错，会妨碍服务器的处理。**

```http
//
Status Code: 400 Bad Request
Status Code: 403 Forbidden 服务器拒绝请求。
Status Code: 404 Not Found
Status Code: 405 Method Not Allowed
Status Code: 408 Request Timeout 请求超时
Status Code: 410 Gone

```

**500至505表示的意思是：服务器在尝试处理请求时发生内部错误。这些错误可能是服务器本身的错误，而不是请求出错。**

```http
//
Status Code: 500 Internal Server Error 服务器内部错误

```

