---
title: tree-shaking
---

## tree-shaking

https://juejin.cn/post/7004297344300777502

Tree-shaking只支持ESM的引入方式，不支持 Common JS 的引入方式。

- ESM: export + import
- Common JS: module.exports + require

```js
import { add } from 'lodash'	// 不支持
import { add } from 'lodash-es' // 支持
```

原因是lodash是module.exports 导出的



<img src="/Users/cheng/Library/Application Support/typora-user-images/image-20220810100605663.png" alt="image-20220810100605663" style="zoom:70%;" />



使用lodash之前的大小

<img src="https://minimax-1256590847.cos.ap-shanghai.myqcloud.com/img/image-20231020164837256.png" alt="image-20231020164837256" style="zoom:67%;" />

引入lodash并使用后

<img src="https://minimax-1256590847.cos.ap-shanghai.myqcloud.com/img/image-20231020165449685.png" alt="image-20231020165449685" style="zoom:67%;" />

而使用lodash-es后 大小几乎没变

<img src="https://minimax-1256590847.cos.ap-shanghai.myqcloud.com/img/image-20231020165625226.png" alt="image-20231020165625226" style="zoom:67%;" />



### 什么是Tree-shaking

Tree-shaking 是一种用于优化 JavaScript 代码的技术，主要用于移除代码中未被使用的部分，以减小最终打包生成的文件大小。

具体来说，Tree-shaking 的过程是在构建时通过静态分析确定哪些模块、函数和变量没有被实际使用，然后将这些未使用的部分从最终的打包结果中移除，以减小文件体积。

要使 Tree-shaking 生效，有几个前提条件：

1. 使用 ES2015 模块系统：Tree-shaking 主要基于 ES2015 模块的静态结构，因此确保你的代码是使用 `import` 和 `export` 进行模块化的。
2. 生产环境构建：Tree-shaking 在生产环境下才会生效
3. 静态分析：Tree-shaking 的原理是通过静态分析确定代码中的依赖关系，因此对于动态导入和一些运行时生成的模块，Tree-shaking 的效果可能会受到限制。

Tree-shaking 的静态分析是通过对代码的抽象语法树（Abstract Syntax Tree，AST）进行分析实现的。AST 是代码在解析阶段被转换为的一种树状结构表示，它反映了代码的语法结构，每个节点代表了代码中的一个语法单元。

### 如何转换成AST

将源代码转换成AST通常需要专门的解析器，以下是一些常用的解析器

1. **Esprima**
2. **Babel**
3. **Acorn**