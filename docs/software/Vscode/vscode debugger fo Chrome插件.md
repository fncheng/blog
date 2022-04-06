---
title: Debugger for Chrome
tags:
- vscode
---

[参考链接](http://shooterblog.site/2018/05/19/%E6%89%8B%E6%8A%8A%E6%89%8B%E6%95%99%E4%BD%A0%E7%94%A8Vscode%20Debugger%E8%B0%83%E8%AF%95%E4%BB%A3%E7%A0%81/#Debugger-For-Chrome)

https://www.barretlee.com/blog/2019/03/18/debugging-in-vscode-tutorial/



### Lanuch.json常见缩写名

VS Code支持`tasks.json` 文件中字符串内部的变量替换， 并具有以下预定义的变量：

- ${workspaceFolder}包含task.json文件的工作区文件夹的路径
- ${workspaceRootFolderName}在VS Code中打开的文件夹名称，不带任何斜杠（/）
- ${file}当前打开的文件
- ${relativeFile}当前打开的文件，相对于包含该文件的工作区文件夹
- ${fileBasename}当前打开文件的基本名称
- ${fileBasenameNoExtension}当前打开文件的基本名称，不带扩展名
- ${fileDirname}当前打开的文件的目录名
- ${fileExtname}当前打开文件的扩展名
- ${cwd}启动时任务运行器的当前工作目录
- ${lineNumber}当前在活动文件中选择的行号



### 参数：

- `type`，必填项，调试类型，当前为 node，如果是 PHP 调试，则在安装 PHP 调试插件后写 php；
- `request`，必填项，有两种类型，分别是 `launch` 和 `attach`，前者的意思就是 VSCode 会打开这个程序然后进入调试，后者的意思是你已经打开了程序，然后接通 Node.js 的内部调试协议进行调试，如果你看过上面的“Node.js 的调试原理”一文，应该可以大致理解；
- `program`，程序的启动入口；
- `console`，表示程序的输出显示位置，默认展示在Debug Panel，而设置 `"console": "integratedTerminal"` 后 ，程序会输出在Vscode内置terminal中，



### debug

您必须指定`file`或`url`以针对本地文件或URL启动Chrome。如果您使用url，请设置`webRoot`为提供文件的目录。这可以是绝对路径，也可以是使用`${workspaceFolder}`（在Code中打开的文件夹）的路径。`webRoot`用于将url（例如“ http：//localhost/app.js”）解析为磁盘上的文件（例如`/Users/me/project/app.js`），因此请注意正确设置了URL 。



配置文件：https://gist.github.com/fncheng/0e3b7b0d6d7567fec547daa1146ee37c