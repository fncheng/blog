## 请求参数类型

### Query String Parameters

##### 

### application/x-www-form-urlencoded:

这是表单提交的默认格式，不支持文件类型.它的请求格式是以`&`符号连接的**键值对**.（查询字符串）

```http
POST http://www.example.com HTTP/1.1
Content-Type: application/x-www-form-urlencoded;charset=utf-8

key1=val1&key2=val2
```

请求参数被添加到body，需要序列化

#### 使用qs.stringify

qs.stringify可选**option indices**	

```js
qs.stringify({ a: ['b', 'c', 'd'] }, { indices: false });
// 'a=b&a=c&a=d'
```



### multipart/form-data:

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

### application/json:

```http
POST http://www.example.com HTTP/1.1 
Content-Type: application/json;charset=utf-8

{"name":"xfly","age": 24, "hobby":["x","xx","xxx"]}

```

