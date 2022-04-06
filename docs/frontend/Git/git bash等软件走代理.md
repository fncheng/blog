## Git bash,cmd设置临时代理

```bash
环境：shadowsocks、windows
本地ss端口设置(这里1080)

cmd命令行:(不用socks5)(临时设置)(也可放置环境变量)
set http_proxy=http://127.0.0.1:7890
set https_proxy=http://127.0.0.1:7890

ps:一定要用cmd命令行，千万别用powershell !!!
简易测试命令：curl https://www.google.com（别用ping）
```

 **上面命令的作用是设置环境变量，不用担心，这种环境变量只会持续到cmd窗口关闭，不是系统环境变量。** 

以git clone为例:

```bash
#https方式
git clone https://github.com/siwadiya/Photo_Show.git 
#ssh
git clone git@github.com:siwadiya/Photo_Show.git
```

### HTTPS全局代理

目前来看，设置代理后加速最明显的是 `HTTPS`， 为其设置代理的方式如下

打开 `git bash`，然后输入

```bash
git config --global http.proxy "http://127.0.0.1:7890"
git config --global https.proxy "https://127.0.0.1:7890"
```

这样设置之后，`git clone https://github.com/username/repo.git` 的速度基本能跑满带宽

但是，这种方式并不适用于 `git clone git@github.com:username/repo.git` (ssh方式通信)

### [SSH代理](https://upupming.site/2019/05/09/git-ssh-socks-proxy/)

在`~/.ssh/config`文件中添加以下

```bash
ProxyCommand connect -S 127.0.0.1:7891 %h %p
#MacOS
ProxyCommand nc -v -x 127.0.0.1:7890 %h %p
```

### proxyCommand

https://bugwz.com/2019/10/09/ssh-proxycommand/#2-1-%E9%80%9A%E8%BF%87ssh%E5%8E%9F%E7%94%9F%E6%94%AF%E6%8C%81%E7%9A%84%E6%8C%87%E4%BB%A4%E5%AE%9E%E7%8E%B0

https://gist.github.com/chuyik/02d0d37a49edc162546441092efae6a1

### [npm和yarn的源,代理设置](https://www.51noip.cn/2018/02/01/npm-yarn-proxy/)

