---
title: stylelint格式化css
---

## 安装stylelint

```sh
$ yarn add stylelint
```

配置好.stylelintrc.js文件



## 命令行使用

```sh
$ npx stylelint "path/*.css"
```



## VSCode使用

安装[stylelint](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint)插件，插件会自动读取本地配置

### 自动修复

插件提供自动修复功能，在`setting.json`中添加如下代码

```jsonc
"editor.codeActionsOnSave": {
    "source.fixAll.stylelint": true,
},
```



## 配置

### stylelint order

https://github.com/hudochenkov/stylelint-order

in stlyelintrc.js

```js
{
	"plugins": [
		"stylelint-order"
	],
	"rules": {
		"order/order": [
			"custom-properties",
			"declarations"
		],
		"order/properties-order": [
			"width",
			"height"
		]
	}
}
```



选择预设配置

```sh
$ yarn add stylelint-config-recess-order -D
```

至此，配置文件如下

```js
module.exports = {
  extends: ['stylelint-config-recommended', 'stylelint-config-recess-order'],
  plugins: ['stylelint-order']
}
```

