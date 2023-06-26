## webpack搭建React开发环境

遇到报错`'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.ts(2686)`

这个问题是由于没有正确设置tsconfig.json导致的。React jsx需要引入React，如果tsconfig中设置了`"jsx": "react-jsx"`就可以不用引入。

