### npm安装指定版本的包

**版本号`~`、`^`、`*`的区别**

^: 会匹配最新的大版本依赖包，比如^1.2.3会匹配所有1.x.x的包，包括1.3.0，但是不包括2.0.0

~: 会匹配最近的小版本依赖包，比如~1.2.3会匹配所有1.2.x版本，但是不包括1.3.0

更新至最新版本：

```sh
npm i package_name@latest
npm i package_name@4 
# 安指定大版本最新的包，比如大版本4最新的包是4.12，则安装的就是4.12，但是package.json中显示的是4
```

### npm从指定源安装包

```sh
yarn add intelligent-form --registry http://192.168.0.168:4873/
# 指定registry
```

这样安装后在yarn.lock中会锁定源



### yarn upgrade

http://yarnpkg.top/Cliupgrade.html

此命令根据 `package.json` 文件中指定的版本范围，将所有依赖项更新到其最新的版本。`yarn.lock`文件也将被重新创建。