---
title: scp命令
tags:
- linux
- ftp
description: linux scp命令用来向linux传输文件
---

## Linux scp命令

**语法**

```bash
$ scp
usage: scp [-346BCpqrv] [-c cipher] [-F ssh_config] [-i identity_file]
           [-l limit] [-o ssh_option] [-P port] [-S program]
           [[user@]host1:]file1 [...] [[user@]host2:]file2
```

### [在Linux中安全传输文件的14个SCP命令示例](https://www.linuxtechi.com/scp-command-examples-in-linux/)

[<span style="font-size:1.5rem">runoob教程</span>](https://www.runoob.com/linux/linux-comm-scp.html)

报错提示

```bash
scp: /www/wwwroot/filelist//sga.txt: Permission denied
```

上网查了才知道原来是由于没有该目录的操作权限，默认的是在/tmp有权限



### scp从本地复制文件到远程主机

```sh
scp -P <port> <local_file_path> <remote_user>@<remote_host>:<remote_path>
#-P port：注意是大写的P, port是指定数据传输用到的端口号
# 比如
scp -P 50000 sga.txt cheng@***.***.**.**:/www/wwwroot/filelist/
```

