# nginx常见问题

## nginx location 加斜杠和不加斜杠

区别在于是否匹配子路径

### location /users

 会匹配所有以 `/users` 开头的路径，但不会匹配/users本身，比如

```sh
#不会匹配
/users 
# 会匹配
/usersxxx
/users/
/users/xxx
```

### location /users/ 

会匹配所有以 `/users/` 开头的路径，包括 `/users/` 本身。例如，它会匹配`/users/` 、`/users/foo/`、`/users/bar/` ，不会匹配/usersxxx

```sh
#不会匹配
/users
/usersxxx
# 会匹配
/users/
/users/xxx
```



## proxy_pass

我们起的服务为1024端口，设置nginx代理到9001端口，9001端口起一个server，

访问http://127.0.0.1:9001/users/123.txt可以访问到文件

### proxy_pass 不加斜杠

如果 `proxy_pass` 后不带 `/`，Nginx 会将 **客户端请求路径的匹配部分** 拼接到 `proxy_pass` 后。

```nginx
location /users/ {
    proxy_pass http://127.0.0.1:9001;
}
```

我们访问http://localhost:1024/users/123.txt，实际访问代理地址：http://127.0.0.1:9001/users/123.txt

### proxy_pass 加斜杠

如果 `proxy_pass` 后带有 `/`，Nginx 会 **移除匹配部分**，将剩余的路径拼接到目标地址上。

```nginx
location /users/ {
    proxy_pass http://127.0.0.1:9001/;
}
```

我们访问http://localhost:1024/users/123.txt，实际访问代理地址：http://127.0.0.1:9001/123.txt

```nginx
location /users/ {
    proxy_pass http://127.0.0.1:9001/app;
}
```

访问http://localhost:1024/users/123.txt，实际访问地址：http://127.0.0.1:9001/app123.txt

```nginx
location /users/ {
    proxy_pass http://127.0.0.1:9001/app/;
}
```

访问http://localhost:1024/users/123.txt，实际访问地址：http://127.0.0.1:9001/app/123.txt

总结，proxy_pass没有斜杠，则只替换ip和端口部分，有斜杠则替换全部



## root和alias的区别

location内写root

最终的文件路径是将 `root` 指定的路径与请求的 URI 拼接起来

```nginx
server {
    root /var/www; # 全局 root

    location /app/ {
        root /opt/homebrew/var/reactrouter/dist;
    }
}
```



**`root` 与 `alias`**：当使用 `root` 时，Nginx 会将 URI 和 `root` 拼接起来。而使用 `alias` 时，Nginx 会将请求的路径替换成 `alias` 指定的目录，避免路径拼接错误。

```nginx
# 最终访问的路径是/opt/homebrew/var/web/router/dist/app/
location /app/ {
    root /opt/homebrew/var/web/router/dist/;
    expires 1h;
    try_files $uri $uri/ /index.html;
}
```



在使用 `alias` 时，路径的实际解析会从 `alias` 开始替换，所以 `try_files` 的 `$uri` 会映射到 `alias` 的路径，而不是 `root` 的路径。

我们以这个配置为例

```nginx
server {
  listen 20003;
  server_name localhost;
  root /opt/homebrew/var/web;

  location /vue-app/ {
    alias /opt/homebrew/var/web/vue-app/dist/;
    expires 1h;
    try_files $uri $uri/ /index.html;
    error_page 404 /index.html;
  }
```

在 `location /vue-app/` 中，`alias` 会替换掉匹配的 `location` 前缀，因此：

- 请求路径 `/vue-app/home` 实际会解析为 /opt/homebrew/var/web/vue-app/dist/home。
- 请求路径 `/vue-app/` 实际会解析为 `/opt/homebrew/var/web/vue-app/dist/`。

当使用 `try_files $uri $uri/ /index.html` 时：

- `$uri` 是 `/vue-app/home`，因此会查找 `/opt/homebrew/var/web/vue-app/dist/vue-app/home`（无效）。
- `$uri/` 是 `/vue-app/home/`，因此会查找 `/opt/homebrew/var/web/vue-app/dist/vue-app/home/`（无效）。
- 回退到 `/index.html` 时，它会解析为 `/opt/homebrew/var/web/index.html`，而不是期望的 `/opt/homebrew/var/web/vue-app/dist/index.html`。

**问题原因：**

- 默认 `/index.html` 是基于 `root` 的路径，而你的静态文件在 `alias` 指定的目录下，所以路径不匹配。

### try_files $uri $uri/ /vue-app/index.html;中的/vue-app/指的是什么？

> 在 `try_files $uri $uri/ /vue-app/index.html;` 这行配置中,/vue-app/是指浏览器url中的路径还是指资源文件在服务器上的路径?

`/vue-app/index.html` 指的是 **浏览器 URL 路径**，而不是服务器上的实际文件路径。

如何理解`try_files $uri $uri/ /vue-app/index.html;`呢，即先找$uri，再找$uri/，找不到最终再查找/vue-app/index.html，也就是匹配/vue-app/规则



## return 和rewrite重定向

```nginx
location / {
    return 301 /app/;
}

location / {
    rewrite ^/$ /app/ permanent;
}
```

return 301 和 rewrite 都可以实现重定向

return 301适用于简单的重定向，不需要进一步修改 URL 路径。



## 使用302 Location进行重定向



