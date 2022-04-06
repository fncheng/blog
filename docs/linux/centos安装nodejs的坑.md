---
title: centos安装nodejs的坑
tags:
- linux
- nodejs
---

## centos安装nodejs遇到的坑

https://linuxize.com/post/how-to-install-node-js-on-centos-7/

#### 1.添加NodeSource yum存储库

```bash
curl -sL https://rpm.nodesource.com/setup_10.x | sudo bash -
```

#### 2.安装Node.js和npm

```bash
sudo yum install nodejs
```

#### 3.验证Node.js和npm安装

```bash
node --version
npm --version
```

![image-20200410175256657](D:\blog\source\_posts\Linux\centos安装nodejs的坑.assets\image-20200410175256657.png)

