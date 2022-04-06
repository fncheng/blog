---
title: vscode snippet设置
tags:
- vscode
---

### [参考链接](https://juejin.im/post/5d0496415188257fff23b077)

起因是这样的

> 我在写js的时候输入for会有智能提示(js snippet插件的)
>
> ```js
> for (let index = 0; index < array.length; index++) {
>     const element = array[index];
>     
> }
> ```
>
> 但我目前只是刚接触js,所以想让他的效果是这样的
>
> ```js
> for ( i = 0; i < array.length; i++) {
>     
> }
> ```
>
> 于是上网查询了下,发现可以通过配置vscode内置的snippet来完成这一效果

<!-- more -->

### 具体操作

首先打开snippet的配置文件,每个格式都会有一个,形如`$language.json`的配置,我要配置的是js的,所以打开javascript.json.

具体路径:`文件\首选项\用户snippet,选择要配置的语言`

打开后会有一段注释,注释中已经给出了一个模板

```json
	"Print to console": {
		"prefix": "log",
		"body": [
			"console.log('$1');",
			"$2"
		],
		"description": "Log output to console"
	}
```

- `Print to console` 对应代码片段名称。
- `prefix` 对应触发代码片段的字符。
- `body` 对应代码片段内容，可以是字符串，也可以为数组，若为数组每个元素都做为单独的一行插入。`body` 的内容支持js的转义字符，如 `\n\r`  等，我个人不建议用 `\n` ，可另起一行给数组多插入一项，不然一行太多的话不容易观察代码块的格式。
- `description` 对应代码片段描述。

要达到我需要的效果,改写成如下代码

```json
	"Print to for": {
		"prefix": "for",
		"body": [
			"for ( ${1:index} = 0; ${1:index} < ${2:array}.length; ${1:index}++) {",
			"\t$0",
			"}"
		],
		"description": "Print to for"
	}
```

其中\t是制表符,用来对齐的

$1是光标的位置,按下Tab光标移动到$2,而$0则是终止Tab键的光标操作.

### Snippet常见变量

https://code.visualstudio.com/docs/editor/userdefinedsnippets

```markdown
TM_SELECTED_TEXT 当前选择的文本或空字符串
TM_CURRENT_LINE 当前行的内容
TM_CURRENT_WORD 光标下的单词内容或空字符串
TM_LINE_INDEX 基于零索引的行号
TM_LINE_NUMBER 基于一索引的行号
TM_FILENAME 当前文档的文件名
TM_FILENAME_BASE 当前文档的文件名，不带扩展名
TM_DIRECTORY 当前文件的目录
TM_FILEPATH 当前文档的完整文件路径
CLIPBOARD 剪贴板中的内容
WORKSPACE_NAME 打开的工作空间或文件夹的名称
```

```markdown
CURRENT_YEAR当年
CURRENT_YEAR_SHORT当前年份的后两位数字
CURRENT_MONTH月份为两位数（例如'02'）
CURRENT_MONTH_NAME月份的全名（例如“ July”）
CURRENT_MONTH_NAME_SHORT该月的简称（例如“ Jul”）
CURRENT_DATE该月的某天
CURRENT_DAY_NAME日期的名称（例如“星期一”）
CURRENT_DAY_NAME_SHORT当天的简称（例如“ Mon”）
CURRENT_HOUR当前小时（24小时制）
CURRENT_MINUTE当前分钟
CURRENT_SECOND当前秒
```

### 总结

- `Print to console` 对应代码片段名称。
- `prefix` 对应触发代码片段的字符。
- `body` 对应代码片段内容，可以是字符串，也可以为数组，若为数组每个元素都做为单独的一行插入。`body` 的内容支持js的转义字符，如 `\n\r`  等，我个人不建议用 `\n` ，可另起一行给数组多插入一项，不然一行太多的话不容易观察代码块的格式。
- `description` 对应代码片段描述。
- \t是制表符,用来对齐的
- $1是光标的位置,按下Tab光标移动到$2,而$0则是终止Tab键的光标操作.