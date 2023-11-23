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

```nginx
location /users/ {
    proxy_pass http://127.0.0.1:9001;
}
```

我们访问http://localhost:1024/users/123.txt，实际访问代理地址：http://127.0.0.1:9001/users/123.txt

### proxy_pass 加斜杠

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

