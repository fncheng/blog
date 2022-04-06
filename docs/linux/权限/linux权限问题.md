---
title: linux权限问题详解
tags:
- linux
description: linux的权限问题有三种,rwx,分别对应着读,写,和操作.linux中的每个用户必须属于一个组,不能独立于组外.在linux中每个文件都有所有者,所在组,其他组的概念. 
---

## ls -lh命令查看权限

首先在linux目录下通过`ls -lh`命令查看目录下所有文件的权限

```bash
total 7.5M
drwxr-xr-x  5 root root 4.0K Aug 27 17:35 backup
drwxrwxrwx  3 root root 4.0K Jan 31 17:13 Recycle_bin
drwxr-xr-x 11 root root 4.0K Aug 29 09:26 server
drwxr-xr-x  3 root root 4.0K Nov 10 18:27 themes
-rw-r--r--  1 root root 7.5M Sep  5 08:57 wordpress-4.6.15.tar.gz
drwxrwxrwx  3 root root 4.0K Jan 31 17:13 wwwlogs
drwxrwxrw-  7 root root 4.0K Jan 31 17:13 wwwroot
```

![](https://img-blog.csdn.net/20170513152626838?watermark/2/text/aHR0cD)

其中rwx分别代表着read,write,eXecute

- r(Read，读取)：对文件而言，具有读取文件内容的权限；对目录来说，具有浏览目录的权限。
- w(Write,写入)：对文件而言，具有新增,修改,删除文件内容的权限；对目录来说，具有新建，删除，修改，移动目录内文件的权限。
- x(eXecute，执行)：对文件而言，具有执行文件的权限；对目录了来说该用户具有进入目录的权限。

1. 目录的只读访问不允许使用cd进入目录，必须要有执行的权限才能进入。
2. 只有执行权限只能进入目录，不能看到目录下的内容，要想看到目录下的文件名和目录名，需要可读权限。
3. 一个文件能不能被删除，主要看该文件所在的目录对用户是否具有写权限(**即w权限**)，如果目录对用户没有写权限，则该目录下的所有文件都不能被删除，文件所有者除外
4. 目录的w位不设置，即使你拥有目录中某文件的w权限也不能写该文件

![](https://i.loli.net/2020/02/12/zOotH9qUC12ce5y.png)

在`-rwxr-xr-x 1 www   www   644 Jan 31 17:12 index.html`中

index.html文件属于www用户,www组;

