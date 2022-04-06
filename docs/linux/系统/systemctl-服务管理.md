## systemctl

systemd是Linux系统最新的初始化系统(init),作用是提高系统的启动速度，尽可能启动较少的进程，尽可能更多进程并发启动。
systemd对应的进程管理命令是systemctl

很多命令后跟ctl，ctl是什么的缩写？

`control`

> Systemctl是一个systemd工具，主要负责控制systemd系统和服务管理器。

**systemctl命令** 是系统服务管理器指令，它实际上将 service 和 chkconfig 这两个命令组合到一起。

```sh
systemctl start nfs-server.service . # 启动nfs服务
systemctl stop nfs-server.service    # -- Stop (deactivate) one or more units
systemctl enable nfs-server.service # 设置开机自启动
systemctl disable nfs-server.service # 停止开机自启动
systemctl status nfs-server.service # 查看服务当前状态
systemctl restart nfs-server.service # 重新启动某服务
systemctl list-units --type=service # 查看所有已启动的服务
```

#### systemctl daemon-reload

重新加载某个服务的配置文件，如果新安装了一个服务，归属于 systemctl 管理，要是新服务的服务程序配置文件生效，需重新加载。





[systemd指南](https://linux.cn/article-5926-1.html)





## service

service命令其实是去/etc/init.d目录下，去执行相关程序



### sysctl





参考：

[**systemctl VS sysctl VS service VS init.d**](http://kaige.org/2019/07/24/systemctl-VS-sysctl-VS-service-VS-init-d/)

