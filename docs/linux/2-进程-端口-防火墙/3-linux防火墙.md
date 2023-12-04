---
title: linux防火墙
---

## iptables

```sh
#
sudo iptables -L
```



## Centos

### firewalld和firewall-cmd

`firewall-cmd` 和 `firewalld` 是 CentOS/RHEL 系统中用于配置和管理防火墙的两个关联工具。

`firewalld` 是一个动态的防火墙管理器，用于配置 iptables 规则。它提供了一个 D-Bus 接口和一个命令行接口，可以通过这两个接口进行防火墙规则的配置和管理。`firewalld` 允许用户在运行时动态地更改防火墙规则，而无需重启防火墙服务。

`firewall-cmd` 是用于与 `firewalld` 交互的命令行工具。它提供了一种简化的方式来配置 `firewalld`，并执行防火墙操作。`firewall-cmd` 命令通过调用 `firewalld` 的 D-Bus 接口来实现防火墙的配置。

主要命令和用法：

- **`--add-service`：** 添加一个服务。
- **`--add-port`：** 添加一个端口。
- **`--list-all`：** 列出当前防火墙规则的详细信息。
- **`--reload`：** 重新加载防火墙规则。

> ```bash
> firewall-cmd --zone=public --add-port=8888/tcp --permanent	#开启端口
> firewall-cmd --list-ports	#查看开放的端口
> firewall-cmd --query-port=8888/tcp	#查看端口是否开启
> lsof -i:8888	#查看端口占用
> netstat -tunlp |grep 8888	#查看指定端口的进程情况
> ```

最后是怎么解决的呢...

`reboot`重启下服务器就好了

#### 开放端口

```bash
# 查看端口开放情况
firewall-cmd --list-ports
# 开放端口
firewall-cmd --zone=public --add-port=19132/tcp --permanent
# 命令含义：
# –zone #作用域
# –add-port=80/tcp #添加端口，格式为：端口/通讯协议
# –permanent #永久生效，没有此参数重启后失效

firewall-cmd --reload #重启firewall
systemctl stop firewalld.service #停止firewall
systemctl disable firewalld.service #禁止firewall开机启动
```



#### 端口开放失败问题

- 腾讯云安全组已开启端口,但是服务器内部`firewall-cmd --list-ports`查看不到

#### [firewall-cmd查看端口及操作端口](https://blog.csdn.net/y534560449/article/details/65629697)

[附宝塔面板端口修改教程](https://www.jianshu.com/p/cded5a53cb5f)



## Ubuntu ufw

ufw操作防火墙https://zhuanlan.zhihu.com/p/98880088

#### 查看防火墙

```sh
$ sudo ufw status
Status: inactive #inactive表示关闭
```

#### 开启/关闭防火墙

```sh
sudo ufw enable
sudo ufw disable
```

#### 开放端口

```sh
sudo ufw allow [port] #port端口号
sudo ufw allow 80/udp #开放udp 80端口

# ufw allow open port on ipv4 only

```

#### 禁用端口

```sh
sudo ufw deny [port] #禁用端口
```

#### 删除规则

```sh
sudo ufw delete allow 80/tcp
sudo ufw delete deny 19132/udp
```

#### ufw禁用ipv6

```sh
$ vi /etc/default/ufw
```

将`IPV6=yes`改成`IPV6=no`，然后重启防火墙。



#### ufw reset

`ufw reset` 是一个用于重置 UFW 防火墙设置和规则到默认状态的命令。执行该命令会清除现有的防火墙规则和设置，并重置为默认值，即开启所有入站和出站连接。
