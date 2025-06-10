## proxy_pass

我们起的服务为1024端口，设置nginx代理到9001端口，9001端口起一个server，

访问http://127.0.0.1:9001/users/123.txt可以访问到文件

### proxy_pass 不加斜杠

如果 `proxy_pass` 后不带 `/`，Nginx 会将**匹配的 location URI 部分**直接替换为 `proxy_pass` 指定的 URL，而不会保留匹配的部分。

```nginx
location /images/ {
    proxy_pass http://127.0.0.1:30008;
}
```

我们访问 http://localhost:27001/images/data.png，实际访问代理地址：http://127.0.0.1:30008/images/data.png

```nginx
location /images/ {
    proxy_pass http://127.0.0.1:30008/images;
}
```

访问http://localhost:27001/images/data.png，实际访问地址：http://127.0.0.1:30008/app/data.png

如果你希望 `/images/` 直接映射到 `/app/images/`，你需要改成：

```nginx
location /images/ {
    proxy_pass http://127.0.0.1:9001/app/images/;
}
```

这样 `http://localhost:1024/users/123.txt` 会变成 `http://127.0.0.1:9001/app/users/123.txt`。

### proxy_pass 加斜杠

如果 `proxy_pass` 后带有 `/`，Nginx 会 **移除匹配部分**，然后将剩余的 URI 追加到 `proxy_pass` 指定的 URL。

```nginx
location /pictures/ {
    proxy_pass http://127.0.0.1:30008/;
}
```

我们访问 http://localhost:27001/pictures/dora.png，实际访问代理地址：http://127.0.0.1:30008/dora.png


```nginx
location /pictures/ {
    proxy_pass http://127.0.0.1:30008/pictures/;
}
```

访问http://localhost:27001/pictures/dora.png，实际访问地址：http://127.0.0.1:30008/pictures/dora.png

总结，proxy_pass没有斜杠，则只替换ip和端口部分，有斜杠则将匹配部分后的值拼接到proxy_pass上

📌 **记忆方法**：

- **`proxy_pass` 不加 `/`** → **原样转发路径**
- **`proxy_pass` 加 `/`** → **去掉 `location` 匹配的部分**

