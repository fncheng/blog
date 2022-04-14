[jsconfig.json](https://code.visualstudio.com/docs/languages/jsconfig)

```js
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  },
  "exclude": [
    "node_modules",
    "build",
    "config",
    "dist",
    "static",
  ],
  "include": ["src/**/*"]
}
```

### JSConfig选项

https://code.visualstudio.com/docs/languages/jsconfig#_jsconfig-options

| **Option**               | **Description**                                              |
| ------------------------ | ------------------------------------------------------------ |
|                          |                                                              |
| `experimentalDecorators` | Enables experimental support for proposed ES decorators. 开启ES装饰器 |
|                          |                                                              |
|                          |                                                              |
|                          |                                                              |
|                          |                                                              |



exclude

`exclude`属性（全局模式）告诉语言服务哪些文件不属于您的源代码。

include

`include`属性（全局模式）显式设置项目中的文件。



[jsconfig compilerOptions](https://code.visualstudio.com/docs/languages/jsconfig#_jsconfig-options)





### 报错

Experimental support for decorators is a feature that is subject to change in a future release. Set the 'experimentalDecorators' option in your 'tsconfig' or 'jsconfig' to remove this warning.ts(1219)

```json
```



### [tsconfig](https://code.visualstudio.com/docs/typescript/typescript-compiling#_tsconfigjson)

https://www.typescriptlang.org/tsconfig

```json
{
  "compilerOptions": {
    "target": "es2020",
    "experimentalDecorators": true,
    "baseUrl": ".",
    "paths": {
      "@/*":["src/*"]
    }
  },
  "exclude": [
    "node_modules"
  ]
}
```

[compilerOptions](https://www.tslang.cn/docs/handbook/compiler-options.html)



### tsconfig常见报错

Cannot write file '/Users/cheng/Benetech/crm/src/store/getRoutes.js' because it would overwrite input file.

it was the result of the option: `allowJs: true`.

由allowJs导致的报错。
