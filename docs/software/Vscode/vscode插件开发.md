---
title: vscode插件开发
---

## VSCODE插件



Mocha测试扩展

[官方文档](https://code.visualstudio.com/api/working-with-extensions/testing-extension)



### 打包插件vsix

[官方文档](https://code.visualstudio.com/api/working-with-extensions/publishing-extension)



Your First extension: https://code.visualstudio.com/api/get-started/your-first-extension



### 安装vsce

```sh
$ npm install -g vsce
```



```sh
$ cd myExtension
$ vsce package
# myExtension.vsix generated
$ vsce publish
# <publisherID>.myExtension published to VS Code Marketplace
```





## 问题

`Cannot find module 'vscode'`

这是一个遗留问题，具体可看[npm模块](https://www.npmjs.com/package/vscode)，vscode模块已被废弃，请使用

`@types/vscode`

