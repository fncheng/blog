---
title: vscode更新特性
---

### VSCode单项目配置

VSCode有项目配置和全局配置

项目配置会覆盖全局配置，可用于对单个项目精确控制。

比如关于eslint修复的单独控制

```json
{
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true,
    "source.fixAll.stylelint": true
  }
}
```



### vscode颜色配置

新增特性：

#### [更新快速选择和建议小部件颜色](https://code.visualstudio.com/updates/v1_57#_updated-quick-pick-suggest-widget-colors)

我们更新了快速选择和建议小部件中的焦点状态，以更好地与我们的树小部件样式保持一致。这引入了一些控制焦点前景的新颜色标记：

以下设置均设为 `"#ff0000"`

- `list.focusHighlightForeground`  输入建议匹配前景色 <img src="https://minimax-1256590847.cos.ap-shanghai.myqcloud.com/img/image-20210630142735982.png" alt="image-20210630142735982" style="zoom:50%;" />
- `quickInputList.focusForeground` <img src="https://minimax-1256590847.cos.ap-shanghai.myqcloud.com/img/image-20210630143004743.png" alt="image-20210630143004743" style="zoom:50%;" />
- `editorSuggestWidget.selectedForeground`  输入建议选中项文字前景色 <img src="https://minimax-1256590847.cos.ap-shanghai.myqcloud.com/img/image-20210630143239445.png" alt="image-20210630143239445" style="zoom:50%;" />





JSDOC @link使用

```js
/**
 * See {@link MyClass} and [MyClass's foo property]{@link MyClass#foo}.
 * Also, check out {@link http://www.google.com|Google} and
 * {@link https://github.com GitHub}.
 */
function myFunction() {}

function MyClass() {}
```



### 原生支持彩色括号显示BracketColor

[1.60更新特性](https://code.visualstudio.com/updates/v1_60#_high-performance-bracket-pair-colorization)

```json5
"editor.bracketPairColorization.enabled": false,
// 自定义颜色
"workbench.colorCustomizations" : { 
    "editorBracketHighlight.foreground1" : "#FFD700" , 
    "editorBracketHighlight.foreground2" : "#DA70D6" , 
    "editorBracketHighlight.foreground3" : "#87CEFA" , 
    // ... 
} ,
```

目前存在的问题：

Vue template中<>括号颜色会突出显示 [issue](https://github.com/microsoft/vscode/issues/132476)

该问题已修复，预计于1.61发布



### JSDOC自动补全

jsdoc auto complete功能于1.68版本失效了，起初我以为是这个功能被移除了，后来才发现是被设置为默认关闭了。[issues#149385](https://github.com/microsoft/vscode/issues/149385)

解决办法：[issues#152970](https://github.com/microsoft/vscode/issues/152970)

```json
  "editor.quickSuggestions": {
    "comments": true
  },
```



### Emmet

在jsx文件中键入div出不来提示，如下设置即可

```json
"emmet.showExpandedAbbreviation": "allways"
```



### Linked editing for JSX tags

https://code.visualstudio.com/updates/v1_79#_linked-editing-for-jsx-tags

目前已原生支持在html、tsx等文件中补全元素名称，但是vue文件还不支持

Auto Rename Tag 可以设置只对vue文件激活

```json
"auto-rename-tag.activationOnLanguage": [
    "vue"
],
```





### 只读模式

https://code.visualstudio.com/updates/v1_79#_readonly-mode

将工作区的某些文件夹或文件显式标记为只读

### JSDoc @param 补全
https://code.visualstudio.com/updates/v1_79#_jsdoc-param-completions



## Emmet支持CSS Modules

https://code.visualstudio.com/updates/v1_80#_improved-emmet-support-for-css-modules-in-jsxtsx

输入`..test`，生成`<div styleName={styles.test}>|</div>`



## 查看函数调用链Show Call Hierarchy

右键，有个选项Show Call Hierarchy，可以查看函数在哪里被调用了



## typescript.preferences.autoImportFileExcludePatterns

在管理大型 **Vue 3 + TypeScript** 项目时非常有用，它的核心作用是：**“告诉 VS Code，在自动补全/导入（Auto Import）时，不要去扫描和建议哪些文件。”**

以下需要排除的情况：

1. 排除某些庞大的依赖包内部文件

2. 排除构建产物或临时文件

   你不希望 VS Code 自动从 `dist` 目录或 `index.d.ts` 的备份文件中导入代码。

   ```json
   "typescript.preferences.autoImportFileExcludePatterns": [
     "**/dist/**",
     "**/.cache/**"
   ]
   ```

3. 排除特定类型的测试文件

   如果你不希望在编写业务组件时，自动导入 `.spec.ts` 或 `.test.ts` 中定义的 mock 数据：

   ```json
   "typescript.preferences.autoImportFileExcludePatterns": [
     "**/*.spec.ts",
     "**/*.test.ts"
   ]
   ```

   

这个选项**它没有预设的默认值（即默认为空列表 `[]`）**。

即使它是空的，VS Code 也会自动处理的情况：

- **排除常见的忽略目录**：默认情况下，它通常不会从 `node_modules` 的非导出部分（没有在 `package.json` 的 `exports` 中定义的路径）提取建议。

- **tsconfig 约束**：它主要遵循你项目根目录下 `tsconfig.json` 中的 `exclude` 字段。如果你在 `tsconfig.json` 里排除了 `dist`，那么自动导入通常也不会去扫描 `dist`。
