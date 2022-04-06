### ssh密钥生成

https://docs.microsoft.com/zh-cn/azure/virtual-machines/linux/create-ssh-keys-detailed

```bash
ssh-keygen \
    -m PEM \
    -t rsa \
    -b 4096 \
    -C "azureuser@myserver" \
    -f ~/.ssh/mykeys/myprivatekey \
    -N mypassphrase
```

**命令解释**

`ssh-keygen` = 用于创建密钥的程序

`-m PEM` = 将密钥的格式设为 PEM

`-t rsa` = 要创建的密钥类型，本例中为 RSA 格式

`-b 4096` = 密钥的位数，本例中为 4096

`-C "azureuser@myserver"` = 追加到公钥文件末尾以便于识别的注释。 通常以电子邮件地址用作注释，但也可以使用任何最适合你基础结构的事物。

`-f ~/.ssh/mykeys/myprivatekey` = 私钥文件的文件名（如果选择不使用默认名称）。 追加了 `.pub` 的相应公钥文件在相同目录中生成。 该目录必须存在。

`-N mypassphrase` = 用于访问私钥文件的其他密码。

```sh
$ ssh-keygen -t rsa -C "dongcheng96@foxmail.com"
Enter file in which to save the key (/Users/cheng/.ssh/id_rsa): /Users/cheng/.ssh/banwa_id_rsa #输入保存路径
```



### 服务器开启ssh

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



### 在服务器上安装公钥

键入以下命令，在服务器上安装公钥：

```bash
cd .ssh
cat id_rsa.pub >> authorized_keys
```



### ssh配置

参考https://www.cyberciti.biz/faq/create-ssh-config-file-on-linux-unix/

#### /etc/ssh/sshd_config配置

```
PasswordAuthentication no	#禁用密码登陆
```

#### /etc/ssh/ssd_config

> This files set the default configuration for all users of OpenSSH clients on that desktop/laptop and it must be readable by all users on the system.

```sh
#	$OpenBSD: ssh_config,v 1.34 2019/02/04 02:39:42 dtucker Exp $

# This is the ssh client system-wide configuration file.  See
# ssh_config(5) for more information.  This file provides defaults for
# users, and the values can be changed in per-user configuration files
# or on the command line.

# Configuration data is parsed as follows:
#  1. command line options
#  2. user-specific file
#  3. system-wide file
# Any configuration value is only changed the first time it is set.
# Thus, host-specific definitions should be at the beginning of the
# configuration file, and defaults at the end.

# Site-wide defaults for some commonly used options.  For a comprehensive
# list of available options, their meanings and defaults, please see the
# ssh_config(5) man page.

# Host *
#   ForwardAgent no
#   ForwardX11 no
#   PasswordAuthentication yes
#   HostbasedAuthentication no
#   GSSAPIAuthentication no
#   GSSAPIDelegateCredentials no
#   BatchMode no
#   CheckHostIP yes
#   AddressFamily any
#   ConnectTimeout 0
#   StrictHostKeyChecking ask
#   IdentityFile ~/.ssh/id_rsa
#   IdentityFile ~/.ssh/id_dsa
#   IdentityFile ~/.ssh/id_ecdsa
#   IdentityFile ~/.ssh/id_ed25519
#   Port 22
#   Ciphers aes128-ctr,aes192-ctr,aes256-ctr,aes128-cbc,3des-cbc
#   MACs hmac-md5,hmac-sha1,umac-64@openssh.com
#   EscapeChar ~
#   Tunnel no
#   TunnelDevice any:any
#   PermitLocalCommand no
#   VisualHostKey no
#   ProxyCommand ssh -q -W %h:%p gateway.example.com
#   RekeyLimit 1G 1h

Host *
	SendEnv LANG LC_*
```

#### ~/.ssh/config

> `~/.ssh/config` or `$HOME/.ssh/config` : This is user’s own configuration file which, overrides the settings in the global client configuration file, /etc/ssh/ssh_config.

