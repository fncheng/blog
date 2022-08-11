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

