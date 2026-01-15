## nginx rewrite重写路径

先看配置：

```nginx
location / {
    root /Users/cheng/iFly/zhong_wu_liu/aicc-flint-zwl/;
    rewrite ^/iflytek/aicc-flint/(.*)$ /skybox-aicc-flint/$1 break;
    expires 1h;
    try_files $uri $uri/ /skybox-aicc-flint/index.html;
    error_page 404 /skybox-aicc-flint/index.html;
}
```

当我们访问http://localhost:21000/iflytek/aicc-flint/train/pre-train ，会发生什么？

首先是命中location / 规则

第二步 rewrite 生效

此时路径 `/iflytek/aicc-flint/train/pre-train` 会被 rewrite 成：/skybox-aicc-flint/train/pre-train

所以这里rewrite的作用就是把URI中的虚拟路径（实际文件路径中不存在的）给去掉

最终访问的文件路径就是root拼上/skybox-aicc-flint/train/pre-train



## **alias + try_files** 的安全写法

```nginx
location /agent/smart-office/ {
    alias /usr/share/nginx/plugin_ui/agent/;
    index index.html index.htm;
    try_files $uri $uri/ /index.html;
}
```

这里 `/index.html` **直接对应 alias 指向的目录**，这是最推荐的方式。