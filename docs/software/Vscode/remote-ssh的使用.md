---
title: remote-ssh的使用过程
tags:
- vscode
- linux
---

## Linux使用ssh密钥登录

首先在vscode下载remote-ssh相关插件

### 参考链接:

[VSCode 配置 Remote-SSH 远程开发](https://xirikm.net/2019/619-1)

<!-- more -->

### 在服务器上安装公钥

键入以下命令，在服务器上安装公钥：

```bash
cd .ssh
cat id_rsa.pub >> authorized_keys
```



### 配置SSH密钥登陆

用户目录下的 `.ssh` 文件夹内的 id_rsa 和 id_rsa.pub 两个文件,分别对应为私钥和公钥。将 id_rsa.pub 文件中的内容复制到你远程主机用户目录下 .ssh 文件夹内名为 authorized_keys 的文件中即可。

或者将id_rsa.pub复制到.ssh目录下,然后执行

```bash
cat id_rsa.pub >> authorized_keys
```



### 遇到的问题

- 用`ssh-keygen`生成密钥的时候,如果本地已经存在id_rsa,id_rsa.pub 文件,可以直接使用.

- 如果服务器不支持密钥登陆,则需要开启.参考链接:[设置SSH通过密钥登陆](https://hyjk2000.github.io/2012/03/16/how-to-set-up-ssh-keys/)

  ```bash
  vim /etc/ssh/sshd_config
  #修改如下内容
  RSAAuthentication yes
  PubkeyAuthentication yes
  ```

- 完成以上操作后,使用root用户可以正常登陆,但是用普通用户登陆仍然要输入密码

  **这里的原因是.ssh目录与authorized_keys文件的权限不能太大,像766这种肯定是无法登陆的.**

  **于是我对照root用户下的权限,改成了700,测试发现可以登陆了**
  
  注意: .ssh目录权限改为700,authorized_keys 权限改为600
  
  ```sh
  chmod 700 ~/.ssh
  chmod 600 ~/.ssh/authorized_keys
  ```
  
  
  
  

### /etc/ssh/sshd_config配置

```
PasswordAuthentication no	#禁用密码登陆
```



### authorized_keys文件

远程主机将用户的公钥，保存在登录后的用户主目录的$HOME/.ssh/authorized_keys文件中。公钥就是一段字符串，只要把它追加在authorized_keys文件的末尾就行了。





[Github密钥生成看这里！](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent)

### rsa和ed25519

ssh rsa 和ed25519都是ssh key的类型，具体可以看[这篇文章](https://cloud.tencent.com/developer/article/1493298)

ed25519比rsa更先进安全，优先选择ed25519，其次rsa
