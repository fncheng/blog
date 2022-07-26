## 强缓存和协商缓存

[参考链接](https://segmentfault.com/a/1190000038562294#item-1)

强缓存

不需要与服务器沟通

协商缓存：需要与服务器沟通过，沟通即发请求

## 协商缓存

### ETag和If-None-Match

`ETag`是URL的`Entity Tag`，就是一个URL资源的标识符，类似于文件的`md5`，计算方式也类似