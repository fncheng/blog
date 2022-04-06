## Babel的使用

`<template>`中暂时还不支持可选链语法



按需加载

[babel-plugin-import](https://github.com/ant-design/babel-plugin-import)

#### 风格

- `["import", { "libraryName": "antd" }]`: 模块化导入js
- `["import", { "libraryName": "antd", "style": true }]`: 模块化导入 js 和 css（LESS/Sass 源文件）
- `["import", { "libraryName": "antd", "style": "css" }]`: 以模块化方式导入 js 和 css（css 构建文件）



### Babel执行顺序

- 插件在 Presets 前运行。
- 插件顺序从前往后排列。
- Preset 顺序是颠倒的（从后往前）。

