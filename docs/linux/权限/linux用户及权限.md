---
title: linux用户相关
tags:
- linux
---

> 起因:
>
> 想远程通过remote ssh远程连接服务器,写代码,保存在服务器上运行,而不用本地运行.而通过root用户登陆不太好,所以需要创建一个用户,并设置好权限.

创建用户前,我们需要了解一下[linux的用户和用户组以及权限的概念](https://blog.csdn.net/yue7603835/article/details/73699258).

## [新建用户](https://blog.csdn.net/beitiandijun/article/details/41678251)

### adduser命令

会自动为创建的用户指定主目录、系统shell版本，会在创建时输入用户密码。

```bash
adduser apple
```

这样在创建用户名时，就创建了用户的主目录(/home/apple)以及密码。

默认情况下：

adduser在创建用户时会主动调用  /etc/adduser.conf；

在创建用户主目录时默认在/home下，而且创建为 /home/用户名

### useradd命令

需要使用参数选项指定上述基本设置，如果不使用任何参数，则创建的用户无密码、无主目录、没有指定shell版本。

```bash
useradd tt
```

```bash
useradd
Usage: useradd [options] LOGIN
       useradd -D
       useradd -D [options]

Options:
  -b, --base-dir BASE_DIR       base directory for the home directory of the
                                new account
                                #为新用户指定home目录
  -c, --comment COMMENT         GECOS field of the new account
  #加上备注文字。备注文字会保存在passwd的备注栏位中；
  -d, --home-dir HOME_DIR       home directory of the new account
  #指定用户登入时的启始目录；
  -D, --defaults                print or change default useradd configuration
  -e, --expiredate EXPIRE_DATE  expiration date of the new account
  -f, --inactive INACTIVE       password inactivity period of the new account
  -g, --gid GROUP               name or ID of the primary group of the new
                                account
  -G, --groups GROUPS           list of supplementary groups of the new
                                account
  -h, --help                    display this help message and exit
  -k, --skel SKEL_DIR           use this alternative skeleton directory
  -K, --key KEY=VALUE           override /etc/login.defs defaults
  -l, --no-log-init             do not add the user to the lastlog and
                                faillog databases
                                #不要将用户添加到lastlog和faillog数据库
  -m, --create-home             create the user's home directory
  								#自动建立用户的登入目录
  -M, --no-create-home          do not create the user's home directory
  -N, --no-user-group           do not create a group with the same name as
                                the user
  -o, --non-unique              allow to create users with duplicate
                                (non-unique) UID
  -p, --password PASSWORD       encrypted password of the new 
  								#新帐号的密码
  -r, --system                  create a system account
  								#建立系统帐号
  -R, --root CHROOT_DIR         directory to chroot into
  								
  -s, --shell SHELL             login shell of the new account
  								#指定用户登入后所使用的shell
  -u, --uid UID                 user ID of the new account
  								#指定用户id
  -U, --user-group              create a group with the same name as the user
  -Z, --selinux-user SEUSER     use a specific SEUSER for the SELinux user mapping
```



[参考链接](https://www.cnblogs.com/52php/p/5677628.html)

## 深入理解 sudo 与 su 之间的区别

两个命令的最大区别是：

`sudo`命令需要输入当前用户的密码,而`su`命令则需要输入root用户的密码.另外一个区别是其默认行为。sudo 命令只允许使用提升的权限运行单个命令，而 su 命令会启动一个新的 shell，同时允许使用 root 权限运行尽可能多的命令，直到明确退出登录。

### [su命令](https://wangchujiang.com/linux-command/c/su.html)



```bash
su [options] [-] [USER [arg]...]

Change the effective user id and group id to that of USER.
A mere - implies -l.   If USER not given, assume root.

Options:
 -m, -p, --preserve-environment  do not reset environment variables 
 								 #变更身份时，不要变更环境变量；
 -g, --group <group>             specify the primary group
 -G, --supp-group <group>        specify a supplemental group

 -, -l, --login                  make the shell a login shell
 #改变身份时，也同时变更工作目录，以及HOME,SHELL,USER,logname。此外，也会变更PATH变量；
 -c, --command <command>         pass a single command to the shell with -c
#执行完指定的指令后，即恢复原来的身份；
 --session-command <command>     pass a single command to the shell with -c
                                 and do not create a new session
#执行完指定的指令后，即恢复原来的身份；并且不会创建一个新的会话
 -f, --fast                      pass -f to the shell (for csh or tcsh)
 -s, --shell <shell>             run shell if /etc/shells allows it

 -h, --help     display this help and exit
 -V, --version  output version information and exit
```



## [用户和用户组的概念](https://blog.51cto.com/13438667/2061590)

Linux用户分为管理员和普通用户，普通用户又分为系统用户和自定义用户。可以查看/etc/passwd来查看。

```bash
root:x:0:0:root:/root:/bin/bash
sshd:x:74:74:Privilege-separated SSH:/var/empty/sshd:/sbin/nologin
www:x:1000:1000::/home/www:/bin/bash
cheng:x:1002:1002:cheng,cheng,,:/home/cheng:/usr/bin/zsh
```

以`root:x:0:0:root:/root:/bin/bash` 为例

![](https://pic1.zhimg.com/80/v2-83338ceda500e5ffc3bc56b9477da368_720w.jpg)

- login_name 注册名 root
- passwd 口令   由于 passwd 不再保存密码信息，所以用 x 占位代表。
- uid 用户标识号
- gid 组标识号
- users 注释性描述
- home_directory 用户主目录     /home/www
- shell 登陆shell  ---> /bin/bash

## 用户组

```sh
adm:x:4:syslog,ubuntu
组名:口令:组标识号:组内用户列表
```



#### 查看用户

https://www.runoob.com/linux/linux-user-manage.html

```sh
$ cat /etc/passwd # 查看所有用户列表
# 用户名:口令:用户标识号:组标识号:注释性描述:主目录:登录Shell
# root:x:0:0:root:/root:/bin/bash
# www-data:x:33:33:www-data:/var/www:/usr/sbin/nologin
# cheng:x:1000:1000:cheng:/home/cheng:/usr/bin/zsh
# lxd:x:998:100::/var/snap/lxd/common/lxd:/bin/false
$ w 							# 查看当前活跃的用户
$ cat /etc/group  # 
```

### 用户组

#### 修改用户组

```sh
$ usermod -G groupname username
```

> 将一个用户添加到用户组中，千万不能直接用： 
>
> usermod -G groupA 
>
> 这样做会让你离开其他的用户组，仅加入GroupA
>
> 正确的做法应该是 usermod -aG groupname username
>
> -a 代表 append

### usermod命令

```sh
$ usermod -G www
用法：usermod [选项] 登录

选项：
  -c, --comment 注释            GECOS 字段的新值
  -d, --home HOME_DIR           用户的新主目录
  -e, --expiredate EXPIRE_DATE  设定帐户过期的日期为 EXPIRE_DATE
  -f, --inactive INACTIVE       过期 INACTIVE 天数后，设定密码为失效状态
  -g, --gid GROUP               强制使用 GROUP 为新主组
  -G, --groups GROUPS           新的附加组列表 GROUPS
  -a, --append GROUP            将用户追加至上边 -G 中提到的附加组中，
                                并不从其它组中删除此用户
  -h, --help                    显示此帮助信息并推出
  -l, --login LOGIN             新的登录名称
  -L, --lock                    锁定用户帐号
  -m, --move-home               将家目录内容移至新位置 (仅于 -d 一起使用)
  -o, --non-unique              允许使用重复的(非唯一的) UID
  -p, --password PASSWORD       将加密过的密码 (PASSWORD) 设为新密码
  -R, --root CHROOT_DIR         chroot 到的目录
  -P, --prefix PREFIX_DIR       prefix directory where are located the /etc/* files
  -s, --shell SHELL             该用户帐号的新登录 shell
  -u, --uid UID                 用户帐号的新 UID
  -U, --unlock                  解锁用户帐号
  -v, --add-subuids FIRST-LAST  add range of subordinate uids
  -V, --del-subuids FIRST-LAST  remove range of subordinate uids
  -w, --add-subgids FIRST-LAST  add range of subordinate gids
  -W, --del-subgids FIRST-LAST  remove range of subordinate gids
  -Z, --selinux-user  SEUSER       用户账户的新 SELinux 用户映射
```





## [在linux中为用户设置root权限](https://linoxide.com/usr-mgmt/give-normal-user-root-privileges/)

#### usermod命令

```bash
Usage: usermod [options] LOGIN

Options:
  -c, --comment COMMENT         new value of the GECOS field
  -d, --home HOME_DIR           new home directory for the user account
  -e, --expiredate EXPIRE_DATE  set account expiration date to EXPIRE_DATE
  -f, --inactive INACTIVE       set password inactive after expiration
                                to INACTIVE
  -g, --gid GROUP               force use GROUP as new primary group
  #强制使用GROUP作为新的主要组
  -G, --groups GROUPS           new list of supplementary GROUPS
  -a, --append                  append the user to the supplemental GROUPS
                                mentioned by the -G option without removing
                                the user from other groups
  #将用户添加到-G选项提到的附加GROUPS上，而不将用户从其他组中删除
  -h, --help                    display this help message and exit
  -l, --login NEW_LOGIN         new value of the login name
  -L, --lock                    lock the user account
  -m, --move-home               move contents of the home directory to the
                                new location (use only with -d)
  -o, --non-unique              allow using duplicate (non-unique) UID
  -p, --password PASSWORD       use encrypted password for the new password
  -R, --root CHROOT_DIR         directory to chroot into
  -P, --prefix PREFIX_DIR       prefix directory where are located the /etc/* files
  -s, --shell SHELL             new login shell for the user account
  -u, --uid UID                 new UID for the user account
  -U, --unlock                  unlock the user account
  -v, --add-subuids FIRST-LAST  add range of subordinate uids
  -V, --del-subuids FIRST-LAST  remove range of subordinate uids
  -w, --add-subgids FIRST-LAST  add range of subordinate gids
  -W, --del-subgids FIRST-LAST  remove range of subordinate gids
  -Z, --selinux-user SEUSER     new SELinux user mapping for the user account

```

```sh
usermod -g root cheng
```

### 用户不在sudoers文件中的解决方法

https://blog.csdn.net/attagain/article/details/11987297

编辑/etc/sudoers

```sh
## Allow root to run any commands anywhere
root    ALL=(ALL)       ALL
cheng    ALL=(ALL)       ALL   #添加这一行
```



### 修改密码



### 修改文件所有者-chown

```sh
$ chown -R user:group ~/.ssh/ # -R表示递归
```

参数：

- user:group 指定所有者和所属工作组。当省略“：组”，仅改变文件所有者；
- file：指定要改变所有者和工作组的文件列表。支持多个文件和目标，支持shell通配符。

变更文件的组-chgrp

```sh
$ chgrp -R group /usr/meng
```



## 文件权限

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



## chmod

在 Unix 和 Linux 系统上使用 `chmod` 命令来修改文件权限时，常用八进制数表示法来指定权限。在这种方式下，用三个数字来表示权限标识，其中每个数字都由三个二进制位组成，其中每一位分别对应了文件 owner、group 和 others 对于某项权限的开关状态。

具体来说，第一个数字表示 owner 的权限，第二个是 group 的权限，第三个是 others 的权限，而每个数字则是由下列三项权限相加而来：

- 4：读权限
- 2：写权限
- 1：执行权限

例如，以下三个数字分别代表了 Owner、Group 和 Others 的权限：

- 7（111）：拥有读、写和执行权限
- 5（101）：拥有读和执行权限
- 0（000）：没有任何权限
