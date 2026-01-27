# Content-Type请求参数类型

### Query String Parameters

##### 

### application/x-www-form-urlencoded

这是表单提交的默认格式，不支持文件类型.它的请求格式是以`&`符号连接的**键值对**.（查询字符串）

```http
POST http://www.example.com HTTP/1.1
Content-Type: application/x-www-form-urlencoded;charset=utf-8

key1=val1&key2=val2
```

请求参数被添加到body，需要序列化

#### 参数序列化

使用qs.stringify，qs.stringify可选**option indices**	

```js
qs.stringify({ a: ['b', 'c', 'd'] }, { indices: false });
// 'a=b&a=c&a=d'
```



### multipart/form-data

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

### application/json

```http
POST http://www.example.com HTTP/1.1 
Content-Type: application/json;charset=utf-8

{"name":"xfly","age": 24, "hobby":["x","xx","xxx"]}

```



## application/octet-stream

`application/octet-stream` 是通用的二进制流类型，当浏览器收到这个 `Content-Type` 时，它通常会认为这是一个“下载文件”而不是一个“可以展示并缓存的媒体资源”。这不仅会导致缓存策略失效，有时还会导致浏览器无法直接预览图片。

既然你使用了 **Nginx** 作为前端服务器（或反向代理），我们可以通过以下两种层面的方案来解决：

------

### 方案一：在 Nginx 层强制修正（最快解决）

如果 MinIO 端的元数据暂时改不了，你可以在 Nginx 反向代理配置中拦截并覆盖掉这个错误的 `Content-Type`。

**核心思路**：隐藏来自 MinIO 的 `Content-Type`，让 Nginx 根据文件后缀名重新识别，并强制加入缓存头。

```nginx
location /browser/ { # 假设这是你访问 MinIO 的路径
    proxy_pass http://minio_server:9000;
    
    # 1. 隐藏掉 MinIO 返回的错误 Content-Type
    proxy_hide_header Content-Type;
    
    # 2. 告诉 Nginx 重新包含 mime.types，并根据后缀名识别
    include mime.types;
    default_type image/png; # 兜底类型

    # 3. 强制设置缓存，解决无法缓存的问题
    # 即使后端没给缓存头，这里也会加上
    expires 7d;
    add_header Cache-Control "public, max-age=604800";
    
    # 4. 允许浏览器识别 ETag（MinIO 通常会返回 ETag）
    proxy_pass_header ETag;
}
```

**为什么这样做有效？**

- `proxy_hide_header`：由于 HTTP 响应头中不能有两个 `Content-Type`，我们必须先删掉后端给的那个。
- `include mime.types`：Nginx 会查表发现 `.jpg` 对应 `image/jpeg`，从而正确告知浏览器这是一个图片。



### 方案二：修正 MinIO 端的元数据（根源解决）

MinIO 返回 `application/octet-stream` 通常是因为在**上传图片时**没有指定 `ContentType`。

1. **如果你是通过代码（TypeScript/Node.js）上传的**： 在使用 MinIO SDK 的 `putObject` 或 `fPutObject` 时，务必手动指定 `Content-Type`。
