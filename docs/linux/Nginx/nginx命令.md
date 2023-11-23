## Nginx命令

- nginx -h：查看帮助
- nginx -v：查看nginx的版本
- nginx -V：查看版本和nginx的配置选项
- nginx -t：测试配置文件的正确性
- Nginx -T: 测试配置文件，并显示配置文件（这个命令可以快速查看配置文件）
- nginx -q：测试配置文件，但是只显示错误信息
- nginx -s：发送信号，下面详细介绍
- nginx -p：设置前缀
- nginx -c：设置配置文件
- nginx -g：附加配置文件路径

### 服务启动

```sh
# nginx
# 当然我们可以只用-c选项制定配置文件，不指定的话就是使用默认的配置
# nginx -c [path]
```

### 服务停止

停止nginx服务的方法有很多,建议使用下面的第一和第二种。

```sh
# 立即停止
# nginx -s stop 
或者
# 平滑停止
# nginx -s quit
或者
# kill TERM | INT | QUIT PID
或者（不建议这么停止服务）
# kill -9 PID
```

**nginx退出一定要用`nginx -s quit`**!!!



### 重新加载配置

```sh
nginx -t; nginx -s reload
```

通过systemctl启动的nginx 请使用`sudo systemctl reload nginx`,
而通过`sudo nginx -c`启动的请使用`sudo nginx -s reload`

reload会使用默认的配置，如果需要指定配置，请使用-c

```sh
nginx -s reload -c /etc/nginx/nginx.conf
```

