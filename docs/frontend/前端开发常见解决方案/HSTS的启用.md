### 如何给前端项目启用HSTS

在 Nginx 配置文件中（通常位于 `/etc/nginx/nginx.conf` 或 `/etc/nginx/sites-available/default`），你可以在 `server` 块中添加以下配置：

```nginx
server {
    listen 443 ssl;
    server_name example.com;

    # 配置 SSL 证书
    ssl_certificate /path/to/your/certificate.crt;
    ssl_certificate_key /path/to/your/private.key;

    # 启用 HSTS
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;

    # 其他配置...
}
```

`max-age=31536000` 表示浏览器将记住 HSTS 规则 1 年（以秒为单位）。

`includeSubDomains` 表示此规则适用于该域的所有子域。

`always` 关键字确保无论请求是如何处理的，HSTS 头都将被添加。