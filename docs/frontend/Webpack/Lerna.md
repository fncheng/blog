## Lerna

Lerna初始化
```sh
lerna init -i
```
--independent/-i – 使用独立的 版本控制模式。


### 2022 Update
> As pointed out by my great fellow at the comment section, Lerna is now being held by the Nx team and it's not going to > be maintained anymore in a near future.
>
> The best solution nowadays is to use more native approaches for publishing (as NPM/YARN workspaces) or go straight to Nx.

stackoverflow上说Lerna 现在由 Nx 团队持有，并且在不久的将来将不再维护


#### 创建子项目

```sh
lerna create
```



### 安装package至workspace

```sh
lerna add react-dom packages/package1 
// or 
lerna add react-dom --scope=package1
```

为了设置Lerna开启Yarn工作空间，我们需要配置lerna.json。 让我们添加yarn作为我们的npm客户端，并指定我们使用yarn工作空间。

```json
// lerna.json
{
  "packages": ["packages/*"],
  "version": "independent",
  "npmClient": "yarn",
  "useWorkspaces": true
}
```

设置好yarn后就可以运行命令安装包了

```sh
yarn workspace app add react-dom@17.0.2
# 运行命令，即运行packages/app下 package.json中的scripts
yarn workspace app run start
```



#### 全局安装package

use -W flag (or --ignore-workspace-root-check)

```sh
yarn add react-error-overlay@6.0.9 -D -W
```

### lerna路径alias





## 遇到的问题

使用lerna创建react子项目后，运行项目

```sh
yarn workspace app run start
```

跑起来的项目热更新后总会出现

`Uncaught ReferenceError: process is not defined`的错误

查询到[相似问题](https://blog.csdn.net/qq_19689967/article/details/122209465)后说可能是react-error-overlay的版本问题，

但是我切换react-error-overlay的版本后，该问题仍然存在。

通过页面上一个[链接](https://stackoverflow.com/questions/70368760/react-uncaught-referenceerror-process-is-not-defined)发现了另一个解决方案，升级react-scripts v5，升级后问题得到解决。

