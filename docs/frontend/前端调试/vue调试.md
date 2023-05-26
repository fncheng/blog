## 如何调试项目中的node_modules

我在阅读vue源码时，需要console.log打印来调试一下，首先去node_modules对应包下的package.json查看main字段，该字段代表了包的入口文件。

但是我们一般用的是脚手架项目，所以是module字段

[关于package.json 中的 Module 字段是干嘛的](https://github.com/sunyongjian/blog/issues/37)