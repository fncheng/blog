## vscode配置

```json
"diffEditor.codeLens": true,
"diffEditor.renderSideBySide": false, // 控制diff编辑器是并排显示还是行内显示差异 默认true并排显示，即出现左右俩个编辑框
```



## vscode的插件配置

默认配置在插件安装目录下的**package.json**文件

如果是全局配置需要在`/.code/User`目录下修改**setting.json**文件

修改完配置文件需要重启vscode

命令 reload window

<!-- more -->

vscode同步问题：

github 账户同步Mac端

Microsoft帐户同步Windows端



Vscode配置在`/Users/cheng/Library/Application\ Support/Code`下

Vscode @builtin 插件 目录：

`/Applications/Visual Studio Code.app/Contents/Resources/app/extensions`









## 微信开发者工具

更新包目录 `/Users/cheng/Library/Application\ Support/微信开发者工具/50a7d9210159a32f006158795f893857/WeappApplication` 





### VScode emmet



## VSCode插件vsix下载

手动构造

```
https://marketplace.visualstudio.com/_apis/public/gallery/publishers/{publisher}/vsextensions/{extension}/{version}/vspackage
```

以Vue-Offical为例：

```
https://marketplace.visualstudio.com/_apis/public/gallery/publishers/Vue/vsextensions/volar/2.2.10/vspackage
```

