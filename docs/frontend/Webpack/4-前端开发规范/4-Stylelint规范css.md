# 使用Stylelint规范css

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

## 格式化sass

预处理器语言需要安装额外的插件，

https://github.com/stylelint-scss/stylelint-scss#readme

```sh
$ yarn add stylelint-scss -D
```

VSCode提供的Stylelint插件默认支持css、less、postcss语法。

为其添加scss的支持

```json
"stylelint.validate": [
        "css",
        "less",
        "postcss",
        "scss"
    ],
```



## stylelintignore

```js
# file
*.js
*.jsx
*.ts
*.tsx
*.jpg

# folder
node_modules
dist
config
```





## Umi项目使用@umijs/fabric

```sh
yarn add @umijs/fabric -D
```

```js
const fabric = require('@umijs/fabric');

module.exports = {
  ...fabric.stylelint,
};
```

