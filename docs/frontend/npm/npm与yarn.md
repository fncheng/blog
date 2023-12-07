---
title: npm使用
tags:
- nodejs
---

## NPM CLI vs Yarn CLI

https://github.com/zuojj/fedlab/issues/3

yarn对比npmhttps://zhuanlan.zhihu.com/p/23493436

从npm迁移到yarnhttps://classic.yarnpkg.com/en/docs/migrating-from-npm

### install package

安装模块

**-S, --save 安装包信息将加入到dependencies（生产阶段的依赖）**

```bash
npm install [package]

yarn add [package]

pnpm add [package]
```



***yarn add package*-name@tag 安装具体的“tag” (比如， beta 、 next 或者 *latest* )。**

package.json 文件的 dependencies 字段：

```json
"dependencies": {
    "gulp": "^3.9.1"
}
```

**-D, --save-dev 安装包信息将加入到devDependencies（开发阶段的依赖），所以开发阶段一般使用它**

```bash
npm install gulp --save-dev 或 npm install gulp -D

yarn add [package] [--dev/-D]

pnpm add -D [package]
```

package.json 文件的 devDependencies字段：

```bash
"devDependencies": {
    "gulp": "^3.9.1"
}
```

**-P, --peer 安装包至peerDependencies**

### update package

```sh
npm update --global                  	yarn global upgrade
																			yarn upgrade
```



## npm mirror换源

**npm更换源**

```sh
npm config get registry  // 查看npm当前镜像源

npm config set registry https://registry.npm.taobao.org/  // 设置npm镜像源为淘宝镜像

yarn config get registry  // 查看yarn当前镜像源

yarn config set registry https://registry.npm.taobao.org/  // 设置yarn镜像源为淘宝镜像
```

**镜像源地址部分如下：**

```text
npm --- https://registry.npmjs.org/

cnpm --- https://r.cnpmjs.org/

taobao --- https://registry.npm.taobao.org/

nj --- https://registry.nodejitsu.com/

rednpm --- https://registry.mirror.cqupt.edu.cn/

npmmirror --- https://registry.npmmirror.com/

deunpm --- http://registry.enpmjs.org/
```



## npx vs npm

https://www.ruanyifeng.com/blog/2019/02/npx.html



npx cache folder：

`~/.npm/_npx` on macOS

`%AppData%/npm-cache/_npx` on Windows



npx 等效于  yarn create



## 清除缓存

```sh
yarn cache clean
```





## 从yarn迁移到yarn2

只需在具体项目下执行

```sh
yarn set version berry
```

yarn会创建 .yarn 目录和 .yarnrc.yml 文件，用户需要关注的只是 .yarnrc.yml 文件，它等同于1代的 .yarnrc 文件。

### 配置.yarnrc.yml

yarnrc.yml默认只有一句

```yaml
yarnPath: ".yarn/releases/yarn-berry.cjs"
```

加上一句

```yaml
npmRegistryServer: "https://registry.npmmirror.com/"
```

日常命令同一代

