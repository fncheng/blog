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

### 从指定源下载

```sh
pnpm add axios --registry=https://registry.npmmirror.com
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

### peerDependencies

什么是peerDependencies，有什么用？

peerDependencies 是 npm（或 yarn/pnpm）里 package.json 文件中的一个字段，
意思是：“我的包需要宿主项目（或者使用我的人）也安装某个依赖，而且版本要满足我的要求”。

简单来说：
自己不直接安装，而是要求用我这个包的人，必须在他的项目里也安装，并且版本要合适。



## npm安装包-npm install

**版本号`~`、`^`、`*`的区别**

^: 会匹配最新的大版本依赖包，比如^1.2.3会匹配所有1.x.x的包，包括1.3.0，但是不包括2.0.0

~: 会匹配最近的小版本依赖包，比如~1.2.3会匹配所有1.2.x版本，但是不包括1.3.0

安装指定版本的包

```sh
npm i package_name@latest
npm i package_name@4 
# 安指定大版本最新的包，比如大版本4最新的包是4.12，则安装的就是4.12，但是package.json中显示的是4
```

从指定源安装

```sh
yarn add intelligent-form --registry http://192.168.0.168:4873/
# 指定registry
```





## npm发布包-npm publish

第一步注册用户

```sh
npm adduser [--registry=url] [--scope=@orgname] [--auth-type=legacy]

aliases: login, add-user
```

如果不是第一次使用，那么执行登录

```sh
npm login
```

### npm包添加贡献者

npm-owner

https://www.npmjs.cn/cli/owner/

```sh
npm owner add <user> [<@scope>/]<pkg>
npm owner rm <user> [<@scope>/]<pkg>
npm owner ls [<@scope>/]<pkg>

aliases: author
```

### 发布

```sh
npm publish --registry https://registry.npmmirror.com
```

除此之外可以指定仓库源

```sh
npm login --registry https://registry.npmjs.org/ # 指定npm源
...
npm publish --access public --registry https://registry.npmjs.org/
```

### 常见问题

1. 长时间登不上去，先看看npm registery源是哪个，因为发布到npm上所以需要先切换到npm源

2. You must sign up for private packages

   @xxx开头的包默认是私有包，npm发布私有包是需要收费的，--access public指定为公共包

   ```sh
   npm publish --access public
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



## pnpm

安装pnpm

```sh
curl -fsSL https://get.pnpm.io/install.sh | sh -
### 安装

in Linux or macOS：

```sh
curl -f https://get.pnpm.io/v6.16.js | node - add --global pnpm
```



```sh
$ pnpm
Version 6.24.4
Usage: pnpm [command] [flags]
       pnpm [ -h | --help | -v | --version ]

Manage your dependencies:
      add                  Installs a package and any packages that it depends on. By
                           default, any new package is installed as a prod dependency
      import               Generates a pnpm-lock.yaml from an npm package-lock.json
                           (or npm-shrinkwrap.json) file
   i, install              Install all dependencies for a project
  it, install-test         Runs a pnpm install followed immediately by a pnpm test
  ln, link                 Connect the local project to another one
      prune                Removes extraneous packages
  rb, rebuild              Rebuild a package
  rm, remove               Removes packages from node_modules and from the project's
                           package.json
      unlink               Unlinks a package. Like yarn unlink but pnpm re-installs
                           the dependency after removing the external link
  up, update               Updates packages to their latest version based on the
                           specified range

Review your dependencies:
      audit                Checks for known security issues with the installed
                           packages
  ls, list                 Print all the versions of packages that are installed, as
                           well as their dependencies, in a tree-structure
      outdated             Check for outdated packages

Run your scripts:
      exec                 Executes a shell command in scope of a project
      run                  Runs a defined package script
      start                Runs an arbitrary command specified in the package's
                           "start" property of its "scripts" object
   t, test                 Runs a package's "test" script, if one was provided

Other:
      pack
      publish              Publishes a package to the registry
      root

Manage your store:
      store add            Adds new packages to the pnpm store directly. Does not
                           modify any projects or files outside the store
      store prune          Removes unreferenced (extraneous, orphan) packages from the
                           store
      store status         Checks for modified packages in the store
```

### pnpm安装目录

使用brew安装的pnpm所在目录为**/opt/homebrew/Cellar/pnpm/**

不要执行pnpm self-update命令，这样会在~/Library/pnpm/.tools/目录下安装一个新的pnpm

## pnpm + monorepo项目中安装包

```sh
pnpm add crypto-js -filter agent-base
# 或
pnpm add lodash-es -F agent-base
# agent-base是子包
```







## yarn报错

error Error: certificate has expired
    at TLSSocket.onConnectSecure (node:_tls_wrap:1659:34)
    at TLSSocket.emit (node:events:517:28)
    at TLSSocket._finishInit (node:_tls_wrap:1070:8)
    at ssl.onhandshakedone (node:_tls_wrap:856:12)

解决办法：

尝试禁用SLL证书

```sh
yarn config set strict-ssl false
```

然后重新安装
