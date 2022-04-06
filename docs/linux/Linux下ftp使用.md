## Linux下ftp的使用

https://wangchujiang.com/linux-command/c/ftp.html

ftp和vsftpd区别：

ftp是客户端，而vsftpd是用来搭建ftp服务器的服务端软件。

首先需要安装ftp软件包，未安装则会提示：

```bash
zsh: command not found: ftp
```

centos安装ftp

```bash
yum install ftp
```

macOS安装：

```sh
brew install inetutils
```

[inetutils的介绍](https://formulae.brew.sh/formula/inetutils)



### sftp命令

常用命令：https://zhuanlan.zhihu.com/p/51749905

sftp传输文件的脚本

```bash
#!/bin/bash
sftp cheng@111.229.22.116 <<EOF
put /Users/cheng/Github/put /home/cheng/Github/
EOF
```

> 需要注意⚠️的是：sftp命令无法识别～符号，所以必须使用路径全名

EOF

Shell 中通常将EOF与 << 结合使用，表示后续的输入作为子命令或子Shell的输入，直到遇到EOF为止，再返回到主调Shell。

可以把EOF替换成其他东西，意思是把内容当作标准输入传给程序。

回顾一下< <的用法。当shell看到< <的时候，它就会知道下一个词是一个分界符。在该分界符以后的内容都被当作输入，直到shell又看到该分界符(位于单独的一行)。这个分界符可以是你所定义的任何[字符串](https://link.jianshu.com/?t=http://www.jbxue.com/zt/zifuchuan/)。



### sftp自动补全

brew 安装with-readline

```sh
alias sftp="with-readline sftp"
```





