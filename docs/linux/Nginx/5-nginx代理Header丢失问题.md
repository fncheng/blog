## 记录一次nginx代理后提示用户未登录的情况

使用nginx代理后接口提示用户未登录，但是对比请求后发现所有参数都相同

以下是nginx配置：
```nginx
server {
    listen 21000;
    
    # 处理主路径请求
    location ^~ /iflytek/aicc-flint/ {
        alias /Users/cheng/iFly/zhong_wu_liu/aicc-flint-zwl/skybox-aicc-flint/;
        # # 自动添加末尾斜杠（可选）
        # rewrite ^/vue-app$ $scheme://$host$uri/ permanent;
        expires 1h;
        # # 优先尝试返回具体文件，找不到则返回 index.html
        try_files $uri $uri/ /iflytek/aicc-flint/index.html;
        error_page 404 /iflytek/aicc-flint/index.html;
    }

    location ^~ /iflytek/proxyApi/ {
        rewrite ^/iflytek/proxyApi(/.*)$ $1 break;
        proxy_pass http://172.29.246.41:30056/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # 错误页面配置（可选）
    error_page 404 /iflytek/aicc-flint/index.html;
    error_page 500 502 503 504 /iflytek/aicc-flint/index.html;

    # include nginxconfig.io/general.conf;
}
```



proxy_pass拼接的也没问题，但是就是提示用户未登录，分析原因应该是后端没接受到对应的鉴权信息

前端这边会传递一个自定义Header `SKYBOX_TOKEN_USER_KEY` 给后端，所以可能的原因就是这个Header没传递过去

查阅得知：

1.nginx要添加 `proxy_set_header Cookie` 头，否则 Nginx 不会自动将客户端 cookie 传递给后端。

```nginx
proxy_set_header Cookie $http_cookie;
```

2.如果后端有跨域校验，请加上 Origin 和 Referer

```nginx
proxy_set_header Origin $http_origin;
proxy_set_header Referer $http_referer;
```

修改后还是不行

然后看到一个提示，Header中不能有下划线_，默认情况下，Nginx 会丢弃 header 名中含 `_` 的字段

需要手动开启：
```nginx
http{
    underscores_in_headers on;
}
```

设置完之后就能正常访问啦！

