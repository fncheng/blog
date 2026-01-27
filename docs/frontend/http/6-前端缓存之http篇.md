---
title: http缓存
---



## 强缓存和协商缓存

[参考链接](https://segmentfault.com/a/1190000038562294#item-1)

[图文](https://www.cnblogs.com/developer-ios/p/14044834.html)

强缓存：不需要与服务器沟通

协商缓存：需要与服务器沟通过，沟通即发请求

## 协商缓存

### ETag和If-None-Match

`ETag`是URL的`Entity Tag`，就是一个URL资源的标识符，类似于文件的`md5`，计算方式也类似



### 如何设置Expires

```nginx
location ~ .*\.(css|js|swf|php|htm|html)$ {
		# add_header Cache-Control max-age=20000;
		add_header	expires	1d;
	}
```

nginx配置完之后重新加载配置文件 `sudo nginx -t && sudo nginx -s reload`

刷新页面，显示如下

![image-20220811132917455](https://minimax-1256590847.cos.ap-shanghai.myqcloud.com/img/image-20220811132917455.png)



## Cache-Control

Cache-Control是强缓存，通常由nginx设置，可设置属性也比较多，`max-age`只是其中一个属性

```nginx
Cache-Control: public, max-age=31536000, immutable
```

- `public`：允许 CDN 缓存

- `immutable`：告诉浏览器“这玩意一年内绝不会变”，连条件请求都省了

#### Expires和Cache-Control的优先级

如果在`Cache-Control`响应头设置了 `max-age` 或者 `s-maxage` 指令，那么 `Expires` 头会被忽略。



### Expires和Cache-Control

- max-age **优先级高于** Expires

- 现代浏览器基本只看 `Cache-Control`

  

| **资源类型**       | **推荐配置方式**                                             | **理由**                                                     |
| ------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| **index.html**     | `expires -1;`                                                | 相当于 `Cache-Control: no-cache`。保证用户总能拿到最新的 JS 入口，防止发版后页面不更新。 |
| **图片/常用 JS**   | `expires 30d;`                                               | 利用 Nginx 自动生成的头，简单、稳健。                        |
| **字体/Hash 资源** | `add_header Cache-Control "public, max-age=31536000, immutable";` | **不使用 `expires` 指令**。为了使用 `immutable` 减少 304 请求，实现真正的 `from disk cache`。 |
