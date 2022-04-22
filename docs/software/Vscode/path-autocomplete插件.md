---
title: 路径补全插件
---

## path-autocomplete

### 配置路径别名

`path-autocomplete.pathMappings` 对于定义绝对或相对路径的别名很有用。

```json
"path-autocomplete.pathMappings": {
    "/test": "${folder}/src/Actions/test", // alias for /test
    "/": "${folder}/src", // the absolute root folder is now /src,
    "$root": ${folder}/src // the relative root folder is now /src
    // or multiple folders for one mapping
    "$root": ["${folder}/p1/src", "${folder}/p2/src"] // the root is now relative to both p1/src and p2/src
}
```

为了能够在编辑器中输入@后提示路径 需要在setting.json中加入如下字段:

```json
"path-autocomplete.pathMappings": {
    "@": "${folder}/src/", // alias for /test
}
```



## VSCODE go to definition功能识别路径别名

需要配置jsconfig.json/tsconfig.json

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

