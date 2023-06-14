## node安装

Ubuntu安装nodejs

```sh
apt install node	❌ # 无法安装
```

#### 正确方式：

安装说明：https://github.com/nodesource/distributions/blob/master/README.md

```sh
# Using Ubuntu
curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt-get install -y nodejs
```



## 使用nvm安装node

https://segmentfault.com/a/1190000020807954

#### 1. 安装nvm

https://github.com/nvm-sh/nvm

```sh
# install nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash
// or
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash
# 验证nvm是否安装成功
nvm -v
```

#### 2. nvm安装node

```sh
# 最新的lts版本
nvm install --lts

# windows 需要准确的版本号才可以下载(v要不要都可以)
nvm install v15.14.0
```

使用指定版本node

```sh
nvm use <版本号>
nvm use v10.16.3
```

使用nvm use切换node后要设置default

```sh
nvm alias default v15.14.0
```

