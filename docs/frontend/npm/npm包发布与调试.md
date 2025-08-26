## npm link

`npm link` 用于在本地开发多个 NPM 包时，**创建软链接**，使项目可以像安装 `npm` 包一样引用本地开发的包，而不需要手动发布到 `npm` 仓库。



## pnpm link使用

```sh
pnpm link --global
```

link后在项目中使用包

```sh
pnpm link agents-components 1.7.5-pref06-hongyanhe-10001
```



**取消本地项目中的链接：** 进入**主项目 (Package B)** 目录，执行：

```sh
pnpm unlink <package-name>
# 例如：pnpm unlink my-ui-library
```

**取消全局链接：**

```sh
pnpm unlink --global <package-name>
# 例如：pnpm unlink --global my-ui-library
```