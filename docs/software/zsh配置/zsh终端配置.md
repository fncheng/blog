---
title: zsh终端配置
tags:
- linux
---



### 安装zsh

[zsh官网](https://github.com/ohmyzsh/ohmyzsh/wiki/Installing-ZSH)

centos

```bash
yum install zsh	#安装zsh

chsh -s $(which zsh)	#使其成为默认shell
```

Ubuntu

```sh
apt intsall zsh
```



### 安装oh-my-zsh

[oh-my-zsh官网](https://github.com/ohmyzsh/ohmyzsh)

```bash
//wget方式安装
sh -c "$(wget https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh -O -)"
//curl方式安装
sh -c "$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

#### 导入oh-my-zsh配置

```bash
git clone https://github.com/fncheng/myzsh.git ## 官方oh-my-zsh配置

git clone https://gitee.com/fn386/myzsh.git ~/.oh-my-zsh/custom  ##也可导入自己的配置
# 一键安装脚本
sh -c "$(curl -fsSL https://raw.githubusercontent.com/fncheng/myzsh/master/install.sh)"
```

#### 更新oh-my-zsh

```sh
$ omz update
```



### 插件配置

#### [autojump](https://github.com/wting/autojump)自动跳转插件

autojump需要单独安装

```bash
# clone 到本地
git clone git://github.com/wting/autojump.git
# 进入clone目录，接着执行安装文件
cd autojump
./install.py
# 接着根据安装完成后的提示，在~/.zshrc最后添加下面语句：
vim ~/.zshrc    
[[ -s /home/cheng/.autojump/etc/profile.d/autojump.sh ]] && source /home/cheng/
.autojump/etc/profile.d/autojump.sh
```

ubuntu20.04 安装时遇到**/usr/bin/env: ‘python’: No such file or directory**

这是因为ubuntu默认安装了python3环境，可通过`python3 -V`查看

解决方法：安装python-is-python3

```sh
$ apt intall python-is-python3
```



安装后启用插件

```bash
# 编辑~/.zshrc   
vim ~/.zshrc    
# 在plugins后括号里添加安装的插件名字
plugins=(
  git 
  autojump
  zsh-autosuggestions
  zsh-syntax-highlighting
)
# 最后刷新
source ~/.zshrc    
```



#### [zsh-autosuggestions]()

1. 安装到`$ZSH_CUSTOM/plugins`（默认情况下`~/.oh-my-zsh/custom/plugins`）

```bash
git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions
```

2.将插件添加到插件列表中，以供Oh My Zsh加载（在内部`~/.zshrc`）：

```bash
plugins=(zsh-autosuggestions)
```

#### [语法高亮插件 zsh-syntax-highlighting](https://github.com/zsh-users/zsh-syntax-highlighting)

请注意，`zsh-syntax-highlighting`该插件必须是最后一个来源。

1. 将此存储库克隆到oh-my-zsh的plugins目录中：

   ```bash
   git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting
   ```

2. 在中激活插件`~/.zshrc`：

   ```bash
   plugins=( [plugins...] zsh-syntax-highlighting)
   ```

#### docker补全插件

[文档](https://docs.docker.com/compose/completion/#zsh)

##### With oh-my-zsh shell

Add `docker` and `docker-compose` to the plugins list in `~/.zshrc` to run autocompletion within the oh-my-zsh shell. In the following example, `...` represent other Zsh plugins you may have installed.

```
plugins=(... docker docker-compose)
```

### zsh走代理

https://fangzf.me/2017/05/08/%E8%AE%A9-Zsh-%E7%BB%88%E7%AB%AF%E8%B5%B0%E4%BB%A3%E7%90%86/

```bash
vim ~/.zshrc

# where proxy
proxy () {
  export http_proxy="http://127.0.0.1:7890"
  export https_proxy="http://127.0.0.1:7890"
  echo "HTTP Proxy on"
}

# where noproxy
noproxy () {
  unset http_proxy
  unset https_proxy
  echo "HTTP Proxy off"
}
```



### zsh清空历史记录

```sh
$ history -c
```

