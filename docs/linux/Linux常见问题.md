### 用户相关

修改用户密码

passwd命令

```sh
[root@localhost ~]#passwd [选项] 用户名
```

选项：

- -S：查询用户密码的状态，也就是 /etc/shadow 文件中此用户密码的内容。仅 root 用户可用；
- -l：暂时锁定用户，该选项会在 /etc/shadow 文件中指定用户的加密密码串前添加 "!"，使密码失效。仅 root 用户可用；
- -u：解锁用户，和 -l 选项相对应，也是只能 root 用户使用；
- --stdin：可以将通过管道符输出的数据作为用户的密码。主要在批量添加用户时使用；
- -n 天数：设置该用户修改密码后，多长时间不能再次修改密码，也就是修改 /etc/shadow 文件中各行密码的第 4 个字段；
- -x 天数：设置该用户的密码有效期，对应 /etc/shadow 文件中各行密码的第 5 个字段；
- -w 天数：设置用户密码过期前的警告天数，对于 /etc/shadow 文件中各行密码的第 6 个字段；
- -i 日期：设置用户密码失效日期，对应 /etc/shadow 文件中各行密码的第 7 个字段。

```
mmo.:my
```



### iTerm2保持连接不断开

https://liangbogopher.github.io/2017/08/12/iterm2-ssh

`vim ~/.ssh/config`, 新增：

```
Host *
    ServerAliveInterval 60 
    #表示ssh客户端每隔30秒给远程主机发送一个no-op包，no-op是无任何操作的意思，这样远程主机就不会关闭这个SSH会话。
```



### Linux安装nodejs

https://github.com/nodesource/distributions/blob/master/README.md



### pts/* vs tty 

https://www.huaweicloud.com/articles/161d831351007679724f240d9b13da36.html

tty：Teletypes，电传打字机，通过串行线用打印机键盘通过阅读和发送信息的东西。

pty：虚拟终端

pts：伪终端(Pseudo Terminal)，为伪终端的实例。例如，它们是终端窗口中的不同选项卡。



### locate

In Ubuntu system `/usr/bin/locate -> /etc/alternatives/locate -> /usr/bin/mlocate`

