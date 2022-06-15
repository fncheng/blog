## Headers

在Chrome dev tools 里Headers有三部分

1. General

   ```http
   // 同时适用于请求和响应消息，但与最终消息主体中传输的数据无关的消息头。
   Request URL: https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/setRequestHeader
   Request Method: GET
   Status Code: 304 
   Remote Address: 127.0.0.1:7890
   Referrer Policy: strict-origin-when-cross-origin
   ```

2. Response Headers

   ```http
   // 包含有关响应的补充信息，如其位置或服务器本身（名称和版本等）的消息头。
   age: 14965
   cache-control: max-age=86400, public
   content-encoding: br
   content-type: text/html; charset=utf-8
   date: Tue, 30 Mar 2021 07:56:36 GMT
   etag: W/"b223b66312d26266f631b43ca0ff526e"
   last-modified: Tue, 30 Mar 2021 01:45:02 GMT
   server: AmazonS3
   strict-transport-security: max-age=63072000
   vary: Accept-Encoding
   via: 1.1 7019d108ed76e032af7a0273104a07a2.cloudfront.net (CloudFront)
   x-amz-cf-id: 2cVZzJUTjPgiqLqCeH8Ybfl_ai993J_oTeCksnqP_zV_jmpx6AppwQ==
   x-amz-cf-pop: HKG62-C1
   x-cache: Hit from cloudfront
   x-content-type-options: nosniff
   x-frame-options: DENY
   x-xss-protection: 1; mode=block
   ```

3. Request Headers

   ```http
   :authority: developer.mozilla.org
   :method: GET
   :path: /zh-CN/docs/Web/API/XMLHttpRequest/setRequestHeader
   :scheme: https
   accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9
   accept-encoding: gzip, deflate, br
   accept-language: zh-CN,zh;q=0.9,en;q=0.8
   cache-control: max-age=0
   cookie: _ga=GA1.2.1083532160.1606958316; preferredlocale=zh-CN
   if-modified-since: Tue, 30 Mar 2021 01:45:02 GMT
   if-none-match: W/"b223b66312d26266f631b43ca0ff526e"
   referer: https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest
   sec-ch-ua: "Google Chrome";v="89", "Chromium";v="89", ";Not A Brand";v="99"
   sec-ch-ua-mobile: ?0
   sec-fetch-dest: document
   sec-fetch-mode: navigate
   sec-fetch-site: same-origin
   sec-fetch-user: ?1
   upgrade-insecure-requests: 1
   user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.90 Safari/537.36
   ```

MDN关于HTTP Headers的解释如下：

> 根据不同上下文，可将消息头分为：
>
> - [General headers](https://developer.mozilla.org/en-US/docs/Glossary/General_header): 同时适用于请求和响应消息，但与最终消息主体中传输的数据无关的消息头。
> - [Request headers](https://developer.mozilla.org/en-US/docs/Glossary/Request_header): 包含更多有关要获取的资源或客户端本身信息的消息头。
> - [Response headers](https://developer.mozilla.org/en-US/docs/Glossary/Response_header): 包含有关响应的补充信息，如其位置或服务器本身（名称和版本等）的消息头。
> - [Entity headers](https://developer.mozilla.org/en-US/docs/Glossary/Entity_header): 包含有关实体主体的更多信息，比如主体长(Content-Length)度或其MIME类型。



### [Content-Type](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Content-Type)

Content-Type区分大小写

Ajax 发送json

```js
var data = "{\n  \"appToken\":\"DKykgNwA4jAY6Cm5p\",\n  \"content\":\"Wxpusher祝你中秋节快乐!\",\n  \"summary\":\"消息摘要\",//消息摘要，显示在微信聊天页面或者模版消息卡片上，限制长度100，可以不传，不传默认截取content前面的内容。\n  \"contentType\":1,//内容类型 1表示文字  2表示html(只发送body标签内部的数据即可，不包括body标签) 3表示markdown \n  \"topicIds\":[ //发送目标的topicId，是一个数组！！！，也就是群发，使用uids单发的时候， 可以不传。\n      123\n  ],\n  \"uids\":[//发送目标的UID，是一个数组。注意uids和topicIds可以同时填写，也可以只填写一个。\n      \"UID_2UELgrdHdG2th1pyAd\"\n  ],\n  \"url\":\"http://wxpusher.zjiecode.com\" //原文链接，可选参数\n}";

var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function() {
  if(this.readyState === 4) {
    console.log(this.responseText);
  }
});

xhr.open("POST", "http://wxpusher.zjiecode.com/api/send/message");
xhr.setRequestHeader("Content-Type", "application/json");

xhr.send(data);
```

### [Cache-Control](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Cache-Control)

Header type [General header](https://developer.mozilla.org/en-US/docs/Glossary/General_header)

**` Cache-Control`**  通用消息头字段，被用于在http请求和响应中，通过指定指令来实现缓存机制。缓存指令是单向的，这意味着在请求中设置的指令，不一定被包含在响应中。

```http
cache-control: max-age=0, private, must-revalidate
```

### [Last-Modified](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Last-Modified)

包含源头服务器认定的资源做出修改的日期及时间。通常被用来判断接收到的或者存储的资源是否彼此一致。

精确度比ETag低

```http
// 							星期				天			月				年			时			分        秒    国际标准时间
Last-Modified: <day-name>, <day> <month> <year> <hour>:<minute>:<second> GMT
Last-Modified: Wed, 21 Oct 2015 07:28:00 GMT
```

### [ETag](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/ETag)

```http
// "<etag_value>" 实体标签唯一地表示所请求的资源。 可以理解为是一段唯一的字符串
ETag: "<etag_value>"
ETag: W/"863-JEFnfKB5RdUN8z5hgvyL1Nu4HFE"
```



### Referer

[MDN](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Referer)

> `Referer` 请求头包含了当前请求页面的来源页面的地址，即表示当前页面是通过此来源页面里的链接进入的。服务端一般使用 `Referer` 请求头识别访问来源，可能会以此进行统计分析、日志记录以及缓存优化等。

