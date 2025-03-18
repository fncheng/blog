## v-md-editor

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

当我们引入npm.js时，实际上引入的是creator(parserNpm)的返回值

```js
import createKatexPlugin from '@kangc/v-md-editor/lib/plugins/katex/npm'

VMdEditor.use(vuepressTheme)
VMdEditor.use(createKatexPlugin())
/* createKatexPlugin 就是creator(parserNpm)
createKatexPlugin() 说明creator(parserNpm)返回的是一个函数
 
 
*/

// creator是一个函数,这个函数返回一个createKatexPlugin函数
export default function (parser) {
  return function createKatexPlugin(katexOptions) {
    return {
      install(VMdEditor) {
        VMdEditor.vMdParser.use(parser, katexOptions);
      },
    };
  };
}
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