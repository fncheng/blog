## Nginx配置

```nginx
server {
        listen       80;
        server_name  localhost;

        #charset koi8-r;

        #access_log  logs/host.access.log  main;

        location / {
		root /act/adms/gui;
		try_files $uri $uri/ /index.html;
                index index.html index.html;
        }

       	location /adms/ {
	    rewrite ^/adms/(.*) /$1 break;
            proxy_pass http://localhost:8080;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;

	    add_header Cache-Control "public, max-age=3600";
	    etag on;
            #在TOMCAT配置CORS不太容易 所以在NGINX进行配置,这样就不需要在TOMCAT进行配置
            #参加跨域支持 Allow-Origin用*有时候不行
            add_header Access-Control-Allow-Origin  $http_origin;
            add_header Access-Control-Allow-Methods '*';
            add_header Access-Control-Allow-Credentials 'true';
            add_header Access-Control-Allow-Headers 'X-Requested-With,Accept, Authorization,DNT,X-CustomHeader,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type';
            if ($request_method = 'OPTIONS') {
               add_header 'Access-Control-Max-Age' 1728000;
               add_header 'Access-Control-Allow-Credentials' 'true';
               add_header 'Access-Control-Allow-Methods' 'GET, POST, DELETE, PUT, OPTIONS';
               add_header 'Access-Control-Allow-Headers' 'Accept, Authorization,DNT,X-CustomHeader,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type';
               add_header 'Content-Type' 'application/json charset=UTF-8';
               add_header 'Content-Length' 0;
               return 204;
            }
        }
}
```

