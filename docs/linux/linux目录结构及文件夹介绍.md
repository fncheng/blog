---
title: linux目录介绍及软件安装目录
tags:
- linux
description: linux目录和windows目录有很大的不同.linux目录类似一个树型结构,最顶层是跟目录
---

## 目录结构

[参考链接](https://blog.csdn.net/aqxin/article/details/48324377)

http://c.biancheng.net/view/2833.html

linux的软件安装目录也是有讲究的.

`/usr/lib`：理解为`C:/Windows/System32`。

`/usr/local`：**Local Installed**，用户级的程序目录，可以理解为`C:/Progrem Files/`。用户自己编译的软件默认会安装到这个目录下。

`/opt`：用户级的程序目录，可以理解为`D:/Software`，opt有可选的意思，这里可以用于放置第三方大型软件（或游戏），当你不需要时，直接`rm -rf`掉即可。在硬盘容量不够时，也可将/opt单独挂载到其他磁盘上使用。

源码放哪里？
`/usr/src`：系统级的源码目录。
`/usr/local/src`：用户级的源码目录。

[Linux各个目录的作用及内容](http://www.linuxidc.com/Linux/2015-04/116032.htm)
[Linux 各目录及每个目录的详细介绍](http://www.linuxidc.com/Linux/2013-01/77368.htm)

## linux目录介绍

`/bin`: 目录又称为二进制目录，包含了那些供系统管理员和普通用户使用的重要linux命令的二进制映像。该目录存放的内容包括各种可执行文件，还有某些可执行文件的符号连接。常用的命令有：cp、dmesg、kill、login、rm、ping、chomd、bash、cat、echo、ls、 mail、vi等。

/etc` : 系统管理和配置文件



`/usr/bin` : 众多的应用程序

`/etc`: 系统管理和配置文件，其中包含所有系统管理和维护方面的配置文件

`/etc/cron.d`: 

> .d结尾的目录：
>
> .d实际是表示directory,目录的意思。一般为了保持对原有配置方式的兼容，而增加的.d结尾目录。
>
> 比如conf目录已经有了，还想再增加一个配置目录，可以取名conf.d目录。

`opt`: 



| 一级目录 | 功能（作用）                                                 |
| -------- | ------------------------------------------------------------ |
| /bin/    | 存放系统命令，普通用户和 root 都可以执行。放在 /bin 下的命令在单用户模式下也可以执行 |
| /sbin/   | 超级管理命令,这里存放的是系统管理员使用的管理程序            |
| /etc/    | 配置文件保存位置。系统内所有采用默认安装方式（rpm 安装）的服务配置文件全部保存在此目录中，如用户信息、服务的启动脚本、常用服务的配置文件等 |
| /usr/   | **Unix System Resource**，系统级的目录,可以理解为 `C:/Windows/`，`/usr/lib`理解为`C:/Windows/System32`。 |
| /mnt/ | 系统提供该目录是为了让用户临时挂载别的文件系统的 |

### var目录

/var 目录用于存储动态数据，例如缓存、日志文件、软件运行过程中产生的文件等。

### var还是opt？

https://serverfault.com/questions/96416/should-i-install-linux-applications-in-var-or-opt#

