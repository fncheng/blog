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



vsce package报错问题

> File 'D:/project/vscode_extension/test/app.tsx' is not under 'rootDir' 'D:/project/vscode_extension/src'. 'rootDir' is expected to contain all source files.
>   The file is in the program because:
>     Matched by default include pattern '**/*'

原因是没有将test目录排除

解决办法：在tsconfig.json中exclude字段中添加"test"



### getWordRangeAtPosition(获取光标附件的单词)

**position**: `vscode.Position` 对象，表示你希望获取单词的光标位置。

**regex** (可选): 自定义正则表达式，用于定义“单词”的范围。例如，你可以传入一个正则来限定只识别数字或其他特殊字符。

```ts
const hoverProvider = vscode.languages.registerHoverProvider(
    ['html', 'css', 'less', 'scss', 'sass', 'stylus', 'vue', 'typescriptreact'],
    {
        provideHover(document, position, token) {
            // 获取光标附件的单词
            const range = document.getWordRangeAtPosition(position)
            outputChannel.appendLine('range: ' + range)
            const word = document.getText(range)
            outputChannel.appendLine('word: ' + word)

            if (VW_REGEX.test(word)) {
                return new vscode.Hover('识别到vw')
            }
        }
    }
)
```



undefined处理

```ts
const range = document.getWordRangeAtPosition(position, /\d+(\.\d+)?(rem|vw|px)/)
outputChannel.appendLine('range: ' + range)
if (range) {
    const word = document.getText(range)
    outputChannel.appendLine('word: ' + word)
    if (VW_REGEX.test(word)) {
        return new vscode.Hover('识别到vw')
    }
}
```

### registerHoverProvider

`vscode.languages.registerHoverProvider` 是 VSCode 插件 API 中的一个方法，用来为特定语言注册一个悬停提示的提供者。

```ts
vscode.languages.registerHoverProvider('language', {
    provideHover(document, position, token) {
        // 返回一个 Hover 对象，包含悬停提示信息
        return new vscode.Hover('This is a hover message');
    }
});
```

参数：

**language**: 第一个参数是语言标识符，指定你要在哪些文件类型（语言）中启用悬停提示。例如 `'javascript'`, `'typescript'`, `'css'`, `'html'` 等。

**HoverProvider**: 第二个参数是实现 `HoverProvider` 接口的对象，包含一个 `provideHover` 方法。



## 注册代码补全

```ts
const completeProvider = vscode.languages.registerCompletionItemProvider(LANS, {
    provideCompletionItems(document, position, token, context) {
        const lineText = document.getText(new vscode.Range(position.with(undefined, 0), position))

        const res = pxToVwRem(lineText, vscode)

        if (!res) return

        const item = new vscode.CompletionItem(
            `${res.pxValue}px => ${res.rem}`,
            vscode.CompletionItemKind.Snippet
        )
        const item2 = new vscode.CompletionItem(
            `${res.pxValue}px => ${res.vw}`,
            vscode.CompletionItemKind.Snippet
        )

        item.insertText = res.rem
        item2.insertText = res.vw

        return [item, item2]
    }
})

context.subscriptions.push(completeProvider)
```

## 开启日志OutputChannel

```ts
// 创建OutputChannel
const outputChannel = vscode.window.createOutputChannel('My Extension');
// appendLine记录日志
outputChannel.appendLine('插件激活');
outputChannel.appendLine(`操作时间：${new Date().toLocaleTimeString()}`);
// 显示输出面板
outputChannel.show(true);
```

