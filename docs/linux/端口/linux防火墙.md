---
title: linux防火墙
---

## Centos

### Linux端口常用命令

⚠️注意：firewall-cmd是cenots上的防火墙管理工具

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



## Ubuntu

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

