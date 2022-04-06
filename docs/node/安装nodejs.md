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



