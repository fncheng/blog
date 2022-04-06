---
title: vscode之prettier插件配置
tags:
- 电脑好软
- vscode
---

## 针对不同语言配置

**vscode使用prettier进行格式化的小伙伴一定会有这样的需求:**

对不同语言缩进不同的空格数

比如说html缩进4格,而css只想缩进2格

我在网上看个很多别人写的prettier自定义配置,但是都没弄懂.

最后还是反复看官方文档才终于搞懂了

<!-- more -->

#### <i style="display:none">官方文档</i>

- #### [官方文档](https://prettier.io/docs/en/options.html)

之前看了官方文档,在vscode全局配置文件`setting.json`中修改使不同语言使用不同格式化插件

```json
"[html]": {
        "editor.defaultFormatter": "HookyQR.beautify"
    },
"[css]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
```

这样虽然解决了问题,但是很麻烦

### 1. 单个项目配置

[我的prettierrc配置](https://github.com/fncheng/CodeConfig/blob/master/.prettierrc)

prettier官方给出了针对不同项目配置prettier的方法:

在项目根目录建立`.prettierrc`文件

```json
{
    "semi": false,
    "overrides": [
        {
            "files": "*.test.js",
            "options": {
                "semi": true
            }
        },
        {
            "files": ["*.html", "legacy/**/*.js"],
            "options": {
                "tabWidth": 4
            }
        },
        {
            "files": ["*.css"],
            "options": {
                "tabWidth": 2
            }
        }
    ]
}
```

从上面可以看出,`.prettierrc`文件对不同格式的文件自定义了不同的`tabWidth`值,而`tabWidth`就是缩进的空格数,这样做可以方便地配置不同格式下prettier的选项,但是对我来说还不够,因为每建一个项目就要建一个这个文件(我有时候会忘记).于是我想弄成全局配置.

### 2. 全局配置

官方文档在扩展设置一栏中给了一个`prettier.configPath`

> prettier.configPath
> 提供更漂亮的配置文件的自定义路径。
>
> 注意，如果设置了该值，将始终使用该值，并且本地配置文件将被忽略。全局默认值的一个更好的选择是将~/.prettierrc文件放在主目录中。

在setting.json中配置如下:

```json
//指定全局全局配置文件
"prettier.configPath": "***\\.prettierrc",
```

`.prettierrc`就是上面写的配置文件,只要在`setting.json`中指定配置文件,就会应用到全局

<strong style="color:red">需要注意的是,如果设置了这个选项,那你项目目录的`.prettierrc`文件就会失效.</strong>

## prettier设置详解

prettier给出了如下设置选项

```json
prettier.arrowParens	//在单独的箭头函数周围加上()	默认always
prettier.bracketSpacing	//在对象{}之间加上空格
prettier.endOfLine		//换行，LF(unix)还是CRLF(Windows)
prettier.htmlWhitespaceSensitivity
prettier.insertPragma
prettier.jsxBracketSameLine	//在jsx中把'>' 是否单独放一行 //已弃用
prettier.bracketSameLine // 代替"jsxBracketSameLine"
prettier.jsxSingleQuote	//jsx中使用单引号
prettier.printWidth
prettier.proseWrap
prettier.quoteProps
prettier.requirePragma // 单文件控制是否使用prettier格式化
prettier.semi	//行末分号
prettier.singleQuote	//使用单引号而不是双引号
prettier.tabWidth	//tab的宽度
prettier.trailingComma	//尾随逗号 <es5|none|all>
prettier.useTabs   //使用制表符代替空格缩进
prettier.vueIndentScriptAndStyle //是否缩进Vue文件中的代码<script>和<style>标记
prettier.embeddedLanguageFormatting
```



#### requirePragma

在文件头添加

```js
/**
 * @prettier
 */

或者
/**
 * @format
 */
来控制 文件是否被prettier格式化
如果未添加文件头，则该文件不会被格式化
```



### 小程序wxml格式化

微信开发者工具setting.json添加如下代码

```json
"html.format.wrapLineLength": 80,
"wxml.format.wrapLineLength": 80,
"[wxml]": {
    "editor.defaultFormatter": "wechat.miniprogram.wxml-language-features"
}
```





## EditorConfig配置

https://github.com/editorconfig/editorconfig/wiki/EditorConfig-Properties

```properties
root = true

[*]
# 字符集
charset = utf-8
# 缩进风格，类似于useTabs
indent_style = space
# 缩进大小
indent_size = 2
end_of_line = lf
max_line_length = 80
# 是否删除行尾的空格
trim_trailing_whitespace = true
# 是否在文件的最后插入一个空行
insert_final_newline = true

[*.md]
trim_trailing_whitespace = false
```

indent_style = sapce 等同于 prettier.useTabs=false



个人用配置

```properties
root = true

[*]
charset = utf-8
indent_style = space
indent_size = 2
tab_width = 2
end_of_line = lf
max_line_length = 80
trim_trailing_whitespace = true
trim_trailing_whitespace = true

[*.md]
trim_trailing_whitespace = false
```

