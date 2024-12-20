## 流程

### npm-adduser

https://zhuanlan.zhihu.com/p/147804428

```sh
npm adduser [--registry=url] [--scope=@orgname] [--auth-type=legacy]

aliases: login, add-user
```

非第一次

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



## npm publish

```sh
npm publish --registry https://registry.npmmirror.com
```



### 可以指定仓库源

```sh
npm login --registry https://registry.npmjs.org/ # 指定npm源
...
npm publish --access public --registry https://registry.npmjs.org/
```





## 常见问题

1. 长时间登不上去，先看看npm registery源是哪个，因为发布到npm上所以需要先切换到npm源

2. You must sign up for private packages

   @xxx开头的包默认是私有包，npm发布私有包是需要收费的，--access public指定为公共包

   ```sh
   npm publish --access public
   ```

   

### npm link

生成本地npm包



#### npm仓库源

registry.nlark.com、registry.npmmirror.com、registry.npm.taobao.org 这三个仓库都是同一个，淘宝源