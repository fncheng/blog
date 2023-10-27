# TSConfig选项

[[tsconfig配置说明](https://code.visualstudio.com/docs/typescript/typescript-compiling#_tsconfigjson)](https://code.visualstudio.com/docs/typescript/typescript-compiling#_tsconfigjson)

https://www.typescriptlang.org/tsconfig

[[tsconfig.json文件有什么用？](https://fe.ecool.fun/topic/8f02af9e-ae19-40dd-896d-a568cca4b963?orderBy=updateTime&order=desc&tagId=19)](

基本配置

```json5
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

配置说明

[[compilerOptions](https://www.tslang.cn/docs/handbook/compiler-options.html)](https://www.tslang.cn/docs/handbook/compiler-options.html)

```json5
{
  "compilerOptions": {
    "target": "es2020",
    // experimentalDecorators: 启用对装饰器的实验性支持
    "experimentalDecorators": true,
    "baseUrl": ".",
    // jsx: https://www.typescriptlang.org/tsconfig#jsx
    // react17后推荐使用react-jsx
    "jsx": "react-jsx",
    "paths": {
      "@/*":["src/*"]
    }
  },
  // `include`指定要解析的文件和目录，比如这里设置了.umirc.ts，这样在编写umi配置的时候就会有编辑器提示了
  "include": [
    "mock/**/*",
    "src/**/*",
    "config/**/*",
    "config/.umirc.ts",
    "typings.d.ts"
  ],
  "exclude": [
    "node_modules"
  ],
  // files   : 用来指定被编译的文件列表，只有编译少量文件才使用
  files: []
}
```

### include

`include`指定要解析的文件和目录

### compilerOptions.types

1. **使用默认类型声明文件**：如果您的项目依赖于一些常见的第三方库（例如Node.js或DOM），通常不需要显式设置 `compilerOptions.types` 字段。TypeScript 会自动查找和使用与这些库相关的默认类型声明文件。

2. **指定自定义类型声明文件**：如果您使用了一些不包含默认类型声明文件的第三方库，或者您自己编写了类型声明文件，您可以在 `compilerOptions.types` 中列出这些类型声明文件的名称。

   ```json
   "compilerOptions": {
     "types": ["my-custom-types", "another-custom-types"]
   }
   ```

3. **禁用默认类型声明文件**：如果您想完全禁用默认类型声明文件的加载，您可以将 `compilerOptions.types` 字段设置为空数组。

   ```json
   "compilerOptions": {
     "types": []
   }
   ```

   



## tsconfig.node.json是什么

我们注意到`tsconfig.json`中多了这样一段代码

```json
{
    "references": [{ "path": "./tsconfig.node.json" }]
}
```

在查阅了 [[相关文档](https://www.typescriptlang.org/docs/handbook/project-references.html)](https://www.typescriptlang.org/docs/handbook/project-references.html) 后，得知这是 TypeScript 3.0 新增的 **“项目引用（Project References）”** 功能，它允许用户为项目的不同部分使用不同的 TypeScript 配置。

然后再看`tsconfig.node.json` 文件，其内容如下：

```json
{
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "node",
    "allowSyntheticDefaultImports": true
  },
  "include": ["vite.config.ts"]
}
```

注意到 `"include": ["vite.config.ts"]` 这段代码，它说明 `tscnofig.node.json` 是专门用于 `vite.config.ts` 这一文件的 TypeScript 配置文件。





```json5
{
  "compilerOptions": {
    "target": "ESNext", // 将代码编译为最新版本的 JS
    "lib": ["DOM", "DOM.Iterable", "ESNext"],
    "module": "ESNext",
    "skipLibCheck": true,
    "baseUrl": ".",
    "paths": {
        "@/*": ["src/*"]
    },

    /* Bundler mode */
    "moduleResolution": "node",
    // "allowImportingTsExtensions": true,
    "resolveJsonModule": true, // 允许引入 JSON 文件
    "isolatedModules": true, // 该属性要求所有文件都是 ES Module 模块。
    "noEmit": true,
    "jsx": "react-jsx",

    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```