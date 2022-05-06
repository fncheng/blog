---
title: 前端工程化ESLint及Prettier
---

## 前提

参考文档：https://zhuanlan.zhihu.com/p/210446846

需要安装的 npm 包

```sh
yarn add eslint
     eslint-plugin-vue
     prettier
     eslint-plugin-prettier
     eslint-config-prettier
-D
```

## ESLint

[官网](https://cn.eslint.org/docs/user-guide/getting-started)

### eslint忽略

```js
You may use special comments to disable some warnings.
Use // eslint-disable-next-line to ignore the next line.
Use /* eslint-disable */ to ignore all warnings in a file.
```

### 规则

- `"off"` or `0` - 关闭规则
- `"warn"` or `1` - 将规则视为一个警告（不会影响退出码）
- `"error"` or `2` - 将规则视为一个错误 (退出码为1)

规则有两个选项，一个是字符串，一个是对象。

字符串选项：

- `"double"` (默认) 要求尽可能地使用双引号
- `"single"` 要求尽可能地使用单引号
- `"backtick"` 要求尽可能地使用反勾号

对象选项：

- `"avoidEscape": true` 允许字符串使用单引号或双引号，只要字符串中包含了一个其它引号，否则需要转义
- `"allowTemplateLiterals": true` 允许字符串使用反勾号



eslint的规则是数组对象式

数组的第一个值是上面的值之一，第二个是可配置对象

```js
 "camelcase": ['warn', { properties: 'never',allow: ['default_AddressArray']}]
```



### 配置

### extends 和 plugins 区别

#### extends

*plugins与rules结合是eslint基础能力*，extends可以看做是去集成一个个配置方案的最佳实践。

eslint自带一些规则，可以通过设置`"extends": "eslint:recommended"` 来启用推荐的规则，

`extends` 属性值可以是到基本[配置文件](https://cn.eslint.org/docs/user-guide/configuring#using-configuration-files)的绝对路径，也可以是相对路径。ESLint 解析一个相对于使用它的配置文件的基本配置文件的相对路径。（[相关文档](https://cn.eslint.org/docs/user-guide/configuring#using-a-configuration-file)）

当启用一个插件所带的配置文件时，通过设置 `plugin:vue/recommended` ，这表明该份配置来自于 eslint-plugin-vue 插件的recommend 规则。

绝对路径为`node_modules/eslint-plugin-vue/lib/config/recommended.js` 

可以把把extends理解为去集成eslint风格或者eslint插件的最佳实践，它配置的内容实际就是一份份别人配置好的`.eslintrc.js`。



> extends的模块命名以eslint-config- 开头，例如eslint-config-airnb、eslint-config-prettier，也支持npm作用域模块，如@vue/eslint-config-prettier
>
> 使用的时候可以用缩写也可以用全名
>
> 比如 airnb、prettier、@vue/prettier

eslintrc.js 配置 https://segmentfault.com/a/1190000020168436

```js
module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['plugin:vue/essential', '@vue/prettier'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
  },
  parserOptions: {
    parser: '@typescript-eslint/parser',
  },
}
```



#### plugins

plugin插件主要是为eslint新增一些检查规则

对于新增的规则，如何使用呢？

第一步，先安装对应插件，比如 `eslint-plugin-vue` 

```sh
yarn add eslint-plugin-vue -D
```

第二步，加载插件，plugins只是加载了插件，可以理解为赋予了eslint解析规则的能力，真正开启这个规则的检查能力还是要通过rules配置

在配置文件里配置插件时，可以使用 `plugins` 关键字来存放插件名字的列表。插件名称可以省略 `eslint-plugin-` 前缀。

```js
// .eslintrc.js
module.exports = {
  extends:[
    'plugin:vue/recommended' // eslint-plugin-vue 插件中的extends
  ]
  plugins: [
    // 'eslint-plugin-vue'
    'vue'
  ],
  rules: {
    'eslint-plugin-react/jsx-boolean-value': 2 // 自定义插件规则
  }
}
```



### eslint-plugin-vue

[docs](https://eslint.vuejs.org/)

1. `extends`是一个数组，数组第一个成员`"plugin:vue/essential"`表示的是：引入`eslint-plugin-vue`插件，并开启`essential`类别中的一系列规则。

   `eslint-plugin-vue`把所有规则分为四个类别，依次为：`base, essential, strongly-recommended, recommended`，基本规则、基本、强烈推荐、推荐。
   
   > 如果要让Vue组件内属性按顺序排列，则需设置'plugin:vue/recommended'。

后面的每个类别都是对前一个类别的拓展。除了这四个类别外，还有两个未归类的规则，所有的类别及规则都可以在[这里查看](https://vuejs.github.io/eslint-plugin-vue/rules/)。

2. `plugins`的属性值是一个字符串列表：

   - 在使用插件之前，你必须安装它
   - 插件名称可以省略`eslint-plugin-`前缀

## eslint 开启 vue/attributes-order

将 vue 属性按顺序格式化 https://blog.csdn.net/rudy_zhou/article/details/106660242

该规则位于`plugin:vue/recommended`中，在 extends 中添加 `plugin:vue/recommended` 即可。

#### 解决 vue router 路由懒加载 时报 Parsing error: Unexpected token import

`Babel-ESLint`： 一个对 Babel 解析器的包装，babel 本身也是 js 解析器的一种。如果我们的代码需要经过 babel 转化，则对应使用这个解析器

```sh
yarn add babel-eslint -D
```

```js
module.exports = {
  extends: 'eslint:recommended',
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 5, //ES的版本，默认为5
    sourceType: 'module', //指定源代码存在的位置，script | module，默认为script。
  },
  rules: {
    semi: 2,
  },
}
```

由于解析器只有一个，用了「vue-eslint-parser」就不能用「babel-eslint」。所以「vue-eslint-parser」的做法是，在解析器选项中，再传入一个解析器选项 parser。从而在内部处理「babel-eslint」，检测\<script>中的 js 代码



## Prettier 与 ESLint 的集成

### Prettier

关于 prettier：看[这篇文章](../../software/Vscode/Prettier插件配置.md)

#### eslint与prettier的冲突

eslint默认句末加分号和使用双引号，即

`semi: false`，`quote: double`

而prettier则 

## eslint-config-prettier

[`eslint-config-prettier`](https://github.com/prettier/eslint-config-prettier)是 ESLint 的配置库，用于关闭那些不需要或与 Prettier 冲突的 ESLint 规则。这可以让你在使用 Prettier 时，可以使用你最喜欢的 ESLint 共享配置而不使用该共享配置里有关样式的规则。注意，这个配置只是关闭规则，因此仅在与其他配置一起使用时才有意义。

若是单独使用`eslint-config-prettier`（即不使用`eslint-plugin-prettier`），则应该如下继承配置:

```js
// .eslintrc.*
{
  "extends": ["some-other-config-you-use", "prettier"]
}
```

因为`eslint-config-prettier`是要关闭其他配置的样式规则，所以必须放在其他 ESLint 配置之后。



eslint-config-prettier 还附带了一个小的 CLI 工具来帮助您检查您的配置是否包含任何不必要的规则或与 Prettier 冲突的规则。具体可以看[文档](https://github.com/prettier/eslint-config-prettier/#cli-helper-tool)。

```sh
npx eslint-config-prettier path/to/main.js
```





## eslint-plugin-prettier

https://github.com/prettier/eslint-plugin-prettier#readme

[`eslint-plugin-prettier`](https://github.com/prettier/eslint-plugin-prettier)是使用 Prettier 进行格式化的 ESLint 插件，它会将 Pretter 作为 ESLint 的一条规则来运行并进行格式化，然后与格式化之前的代码进行对比，如果出现了不一致，这个地方就会被 Prettier 进行标记并报告出来。

若是单独使用`eslint-plugin-prettier`（即不使用`eslint-config-prettier`），则应该如下进行配置:

```json
// .eslintrc.*
{
  "plugins": ["prettier"],
  "rules": {
    "prettier/prettier": "error"
  }
}
```

若是你禁用了所有其他与代码格式化相关的 ESLint 规则，则`eslint-plugin-prettier`插件将工作地最好。若是使用了另一个在代码格式化方面与 Prettier 不一致的 ESLint 规则，则引起校验错误是无可避免的。正如上面`eslint-config-prettier`所介绍的，你可以使用`eslint-config-prettier`来禁用所有 ESLint 的与格式化相关的规则。

```js
rules:{
	"prettier/prettier": ["error", {"singleQuote": true, "parser": "flow"}]
}
```

In eslintrc.js

```js
{
  "extends": ["plugin:prettier/recommended"]
}
```

what is `plugin:prettier/recommended` do ?

```js
{
  "extends": ["prettier"],
  "plugins": ["prettier"],
  "rules": {
    "prettier/prettier": "error",
    "arrow-body-style": "off",
    "prefer-arrow-callback": "off"
  }
}
```



## eslint-config-prettier 和 eslint-plugin-prettier 的集成

参考：https://blog.windstone.cc/front-end-engineering/code-formatter/eslint/eslint-prettier.html

同时启用`eslint-plugin-prettier`和`eslint-config-prettier`，其配置为:

```js
// .eslintrc.*
{
  "extends": ["some-other-config-you-use", "prettier"],
  "plugins": ["prettier"],
  "rules": {
    "prettier/prettier": "error"
  }
}
```

### 推荐配置

以上这种方式的集成配置较为繁琐，`eslint-plugin-prettier`提供了一种简单的配置方式。

```js
// .eslintrc.*
{
  "extends": ["plugin:prettier/recommended"]
}
```

上面这一行配置做了三件事情:

- 启用了`eslint-plugin-prettier`插件
- 设置了`"prettier/prettier"`规则为`"error"`
- 继承了`eslint-config-prettier`配置

若是打开`node_modules/eslint-plugin-prettier/eslint-plugin-prettier.js`文件，可以看到:

```js
module.exports = {
  configs: {
    recommended: {
      extends: ['prettier'],
      plugins: ['prettier'],
      rules: {
        'prettier/prettier': 'error',
      },
    },
  },
  // ...
}
```

### 重写prettier验证规则

以上的配置都是使用的 Prettier 的默认配置，若是想要自定义 Prettier 的配置，需要做两件事情:、

1. 针对不会被 ESLint 格式化的文件类型，需要在项目根目录添加一个`.prettierrc`的配置文件
2. 针对会被 ESLint 格式化的文件类型，Prettier 会作为 ESLint 的一个规则运行并格式化文件，因此需要在`.eslintrc.*`的`rule`里添加如下配置

`.prettierrc`配置如下:

[.prettierrc配置文件](https://github.com/fncheng/prettier-config/blob/master/.prettierrc)



`.eslintrc.*`配置如下:

在rules增加如下内容：

```js
rules:{
  'prettier/prettier': ['error', { semi: false, singleQuote: true }],
  // 单引号和行末不加分号
}
```



## eslint-plugin-vue

```js
```



## 最终配置

### 使用vue-cli初始化的eslint.js

```js
module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ["plugin:vue/essential", "eslint:recommended", "@vue/prettier"],
  parserOptions: {
    parser: "babel-eslint",
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    // 重写prettier验证规则
    "prettier/prettier": [
      "warn",
      // 针对会被 ESLint 格式化的文件类型，Prettier 会作为 ESLint 的一个规则运行并格式化文件，因此需要添加如下配置
      { semi: false, singleQuote: true, trailingComma: "all" },
    ],
  },
}

```



```js
// eslintrc.js
module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/recommended',
    'plugin:prettier/recommended',
     // 'prettier/vue',
    '@vue/prettier',   // @vue/eslint-config-prettier 中的extends，eslint-config可以省略
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['vue'],
  rules: {
    semi: ['error', 'never'],
    quotes: ['error', 'single'],
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
    'vue/require-name-property':['error'], // vue组件名必须
    'vue/component-definition-name-casing': ['error', 'PascalCase'], // 组件名帕斯卡尔写法
  },
}
```



## 常见问题

vscode ESLint插件和 Prettier 插件在保存时冲突报错

解决办法： 将 vue 文件默认格式化工具设置为 ESLint