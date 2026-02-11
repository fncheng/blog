## @kangc/v-md-editor

https://code-farmer-i.github.io/vue-markdown-editor/zh/examples/base-editor.html

使用

```js
import VMdEditor from '@kangc/v-md-editor'
import createKatexPlugin from '@kangc/v-md-editor/lib/plugins/katex/npm'

VMdEditor.use(createKatexPlugin())
```



我们先来看npm.js的代码

```js
import creator from './creator';
import parserNpm from './parser-npm';

export default creator(parserNpm);
```

我们再来看creator的代码

```ts
export default function (parser) {
  return function createKatexPlugin(katexOptions) {
    return {
      install(VMdEditor) {
        VMdEditor.vMdParser.use(parser, katexOptions);
      },
    };
  };
}
```

1. creator函数是一个高阶函数，接收一个参数parser

- 参数parser，通常由parser-npm.js 提供，它负责扩展 Markdown 解析器以支持 KaTeX。

- 返回一个函数createKatexPlugin

   该函数接受一个katexOptions参数，用于传递KaTeX相关的配置选项。

2. createKatexPlugin函数返回一个包含install方法的对象：

- 这个对象是一个Vue插件，内部定义了一个install方法。

- install方法接受一个VMdEditor参数，表示Markdown编辑器实例。

- 在install方法中，调用VMdEditor.vMdParser.use方法，传入先前的parser和katexOptions，将KaTeX解析功能添加到Markdown解析器中。



再来看parser-npm.js的代码

```ts
import parserCreator from './parser-creator';
import katex from 'katex';

export default parserCreator(katex);
```

- parserCreator接收katex作为参数

**综上可知，引入的parserNum就是parserCreator(katex)函数返回的结果，而parser-creator返回一个parser函数**

将parser函数作为参数，传递给creator函数

也就是说最终得到的createKatexPlugin函数，已经绑定了parser函数



整个过程的执行流程如下：

```txt
用户代码
  ↓
VMdEditor.use(createKatexPlugin())
  ↓
createKatexPlugin(katexOptions) → 返回 { install }
  ↓
install(VMdEditor)
  ↓
VMdEditor.vMdParser.use(parser, katexOptions)
  ↓
parser(vMdParser, katexOptions)
  ↓
vMdParser.extendMarkdown((mdParser) => ...)
  ↓
mdParser.use(markdownItKatex, { ...katexOptions, katex })
  ↓
markdown-it 支持 KaTeX，公式渲染成功
```





parser-creator的代码

```ts
import markdownItKatex from '@/utils/markdown-it-katex';
export default function parserCreator(katex) {
  return function parser(vMdParser, katexOptions) {
    vMdParser.extendMarkdown((mdParser) => {
      if (katex) {
        mdParser.use(markdownItKatex, {
          ...katexOptions,
          katex,
        });
      }
    });
  };
}
```

- parserCreator是一个高阶函数，接收katex作为参数，返回另一个函数





当我们引入npm.js时，实际上引入的是creator(parserNpm)的返回值

```js
import createKatexPlugin from '@kangc/v-md-editor/lib/plugins/katex/npm'

// 而parserNpm 则是parserCreator(katex)
// parserCreator也是一个函数，返回一个parser函数
// parserCreator 返回一个能使用 markdownItKatex 插件的解析器函数
// 当编辑器初始化时，这个解析器函数会被调用
export default function parserCreator(katex) {
  return function parser(vMdParser, katexOptions) {
    vMdParser.extendMarkdown((mdParser) => {
      if (katex) {
        mdParser.use(markdownItKatex, {
          ...katexOptions,
          katex,
        });
      }
    });
  };
}
// 所以creator(parserNpm) 就是createKatexPlugin(parser)
```

**1.export default function parserCreator(katex)**

这是一个高阶函数，接受一个参数 katex。

**参数 katex**：这里传入的是 KaTeX 库的实例（通常是从 import katex from 'katex' 导入的）。

**返回**：parserCreator 返回另一个函数（parser），这使得 parserCreator 成为一个函数工厂（Function Factory），用于生成定制化的解析器函数。

**为什么用高阶函数？**

- 高阶函数允许将 katex（KaTeX 实例）“绑定”到返回的 parser 函数中，形成闭包（Closure）。这样，parser 函数可以在后续调用时访问 katex，而无需重复传递。
- 这种设计提高了代码的模块化和可复用性，允许在不同上下文中生成不同的解析器。

---

**2.return function parser(vMdParser, katexOptions)**

再来分析返回的parser函数，有两个参数

- **vMdParser**：@kangc/v-md-editor 提供的解析器实例。它是一个对象，包含 extendMarkdown 方法，用于扩展底层的 Markdown 解析器。
- **katexOptions**：一个可选的对象，包含 KaTeX 的配置选项，例如 { throwOnError: false, errorColor: '#cc0000' }。

**返回**：parser 函数本身不直接返回值，而是通过调用 vMdParser.extendMarkdown 修改 vMdParser 的行为。

---

**3. vMdParser.extendMarkdown((mdParser) => {...})**



VMdParser是定义的一个class，在utils/v-md-parser.js中，其中有个方法extendMarkdown

```js
extendMarkdown(extender) {
    if (!this.themeConfig) {
        return console.error('Please use theme before using plugins');
    }

    const { markdownParser } = this.themeConfig;

    extender(markdownParser);
}
```

```js
export default function parserCreator(katex) {
  return function parser(vMdParser, katexOptions) {
    vMdParser.extendMarkdown((mdParser) => {
      if (katex) {
        mdParser.use(markdownItKatex, {
          ...katexOptions,
          katex,
        });
      }
    });
  };
}
```

内部的extender实际就是传入的函数

```js
(mdParser) => {
    if (katex) {
        mdParser.use(markdownItKatex, {
            ...katexOptions,
            katex,
        });
    }
}
```

函数参数mdParser则是markdownParser，markdownParser是themeConfig内的prismTheme.markdownParser（位于theme/vuepress/theme.js中）







markdown-it-katex源码

```js
md.inline.ruler.after('escape', 'math_inline', math_inline);
```

这行代码是在 markdown-it 解析器中注册一个新的行内规则（inline rule），具体含义可以分解为：

1. `md.inline.ruler` - 这是 markdown-it 的行内规则管理器
2. `.after('escape', ...)` - 表示新规则将被添加到 'escape' 规则之后
3. `'math_inline'` - 这是新规则的名称
4. `math_inline` - 这是处理该规则的函数

为什么要放在 'escape' 规则之后：

1. markdown-it 按顺序处理规则
2. 'escape' 规则处理转义字符（如 \）
3. 数学公式解析需要在转义字符处理之后进行，以确保正确识别公式中的特殊字符

**注册渲染规则**：

```js
md.renderer.rules.math_inline = inlineRenderer;
md.renderer.rules.math_block = blockRenderer;
```





### math_inline方法的参数state是什么

`state` 是 markdown-it 在解析过程中的状态对象，由 markdown-it 解析器内部创建和传递。它包含了当前解析过程中的所有必要信息。

主药属性：

- src：当前正在解析的完整文本字符串
- **pos**: 当前解析位置（索引）
- **posMax**: 可解析的最大位置
- **pending**: 待处理的普通文本
- bMarks: 每行开始位置的数组
- eMarks: 每行结束位置的数组
- tShift：每行的缩进量，用于确定当前行的实际内容起始位置



## 在@kangc/v-md-editor编辑器中输入```任意语法会报错

**这是 v-md-editor 在「Markdown 尚未合法闭合」时触发的一类已知问题，本质是：**

> 👉 **Markdown 解析 → 生成的 VNode 树不稳定**
>  👉 **插件（highlight / mermaid）在 DOM / VNode 尚未完成时介入**
>  👉 **Vue 3 在 diff 组件时拿到了一个已经被销毁或未初始化的 vnode**

最终在 `shouldUpdateComponent` 里访问到了 `null.emitsOptions` 

⚠️ 这个错误不是 Mermaid 抛的，是 Vue 在 patch 组件时炸的

这是 v-md-editor 的 bug 吗？

> 是的，但它是「边输入边渲染型 Markdown 编辑器的结构性问题」

可行的解决方案（按推荐程度）

方案一：

输入中「禁止 Mermaid / fence 实时渲染」（最稳）

核心思路：

> **编辑态不渲染 Mermaid，只在 preview / blur / debounce 后渲染**





## markdown-it-katex

markdown-it-katex已经很久不维护了，如需使用还请使用@vscode/markdown-it-katex



## createMermaidPlugin

```ts
import createMermaidPlugin from '@kangc/v-md-editor/lib/plugins/mermaid/npm'
```

createMermaidPlugin有哪些参数呢

```ts
interface MermaidPluginOptions {
  /**
   * Mermaid 初始化配置
   * 会直接传给 mermaid.initialize
   */
  mermaid?: Mermaid.MermaidConfig

  /**
   * 自定义 mermaid 代码块 className
   * 默认是 'mermaid'
   */
  className?: string
}
```





