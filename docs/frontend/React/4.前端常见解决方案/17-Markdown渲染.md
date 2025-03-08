## Markdown中数学公式的渲染

来看一段GPT返回的文本

```txt
**欧拉公式**（Euler's Formula）是复分析和复数理论中的一个基础公式，它将复指数函数与三角函数之间建立了联系。其形式为：\n\n\\[\ne^{ix} = \\cos(x) + i \\sin(x)\n\\]\n\n其中：\n- \\( e \\) 是自然对数的底数，约等于 2.71828。\n- \\( i \\) 是虚数单位，满足 \\( i^2 = -1 \\)。\n- \\( x \\) 是实数。\n\n### 欧拉公式的含义\n欧拉公式揭示了复数指数形式和三角函数的关系。特别地：\n- \\( \\cos(x) \\) 是复指数函数的**实部**。\n- \\( \\sin(x) \\) 是复指数函数的**虚部**。\n\n### 欧拉公式的推导\n\n欧拉公式的推导通常是通过级数展开。首先，考虑自然指数函数、余弦函数和正弦函数的泰勒级数展开：\n\n- **自然指数函数** \\( e^x \\) 的泰勒级数：\n  \\[\n  e^x = 1 + x + \\frac{x^2}{2!} + \\frac{x^3}{3!} + \\frac{x^4}{4!} + \\dots\n  \\]\n\n- **余弦函数** \\( \\cos(x) \\) 的泰勒级数...
```

其中Katex不支持 `\[`和 `\]` ，它只支持 `$$` 或直接使用 `\\(` 和 `\\)` 来包围行内公式

那么ChatGPT为什么不直接返回转换为渲染后的 HTML 或 KaTeX 支持的格式呢。

因为 ChatGPT 本身并不执行 KaTeX 渲染操作，它只是生成原始的 LaTeX 代码或数学表达式。

- **LaTeX 表达式**：ChatGPT 会直接返回符合 LaTeX 语法的文本。这对于数学公式的表示非常有用，尤其是用于科学和数学领域，但它并不自动将其渲染成 HTML 或其他可视化格式，因为它的输出是纯文本。

- **KaTeX 渲染**：KaTeX 是一个 JavaScript 库，用于在浏览器中渲染 LaTeX 公式。它并不会自动将原始 LaTeX 代码转换为 HTML，而是需要在前端通过特定的函数（如 `katex.renderToString` 或 `katex.render`）将这些 LaTeX 代码转换为 HTML 格式。ChatGPT 并不执行这些渲染过程，而只是提供了 LaTeX 代码本身。



需要使用正则匹配对应的块级数学公式和行内数学公式分别处理

```vue
<template>
    <div ref="mathContainer" v-html="renderedContent"></div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import katex from 'katex'
import { marked } from 'marked'

const props = defineProps<{
    content: string
}>()

// Function to render display math mode formulas
// 渲染块级数学公式
const renderDisplayMath = (content: string) => {
    return content.replace(/\\\[((.|\n)+?)\\\]/g, (match, formula) => {
        try {
            return katex.renderToString(formula, {
                displayMode: true,
                throwOnError: true
            })
        } catch (e) {
            console.error('KaTeX display math error:', e)
            return match
        }
    })
}

// Function to render inline math mode formulas
// 渲染行内数学公式
const renderInlineMath = (content: string) => {
    return content.replace(/\\\((.+?)\\\)/g, (match, formula) => {
        try {
            const str = katex.renderToString(formula, {
                displayMode: false,
                throwOnError: true
            })
            return str
        } catch (e) {
            console.error('KaTeX inline math error:', e)
            return match
        }
    })
}

const renderedContent = computed(() => {
    let processed = renderDisplayMath(props.content)
    processed = renderInlineMath(processed)
    // Then process markdown
    processed = marked(processed)
    return processed
})
</script>
```

上面有两段正则分别是：

1. `/\\\[((.|\n)+?)\\\]/g` 这条正则用来匹配块级数学公式 `\` 和 `\]`语法
1. `/\\\((.+?)\\\)/g` 这条正则用于匹配行内数学公式 `\(` 和 `)\`







## @kangc/v-md-editor中数学公式渲染

```ts
<v-md-preview :text="content" @copy-code-success="() => emit('copyCodeSuccess')" :height="height"></v-md-preview>

import VMdPreview from "@kangc/v-md-editor/lib/preview"
import createKatexPlugin from "@kangc/v-md-editor/lib/plugins/katex/npm"
VMdPreview.use(createKatexPlugin())
```



## 富文本编辑器ckeditor

```sh
npm install @ckeditor/ckeditor5-vue

pnpm add @ckeditor/ckeditor5-vue
```

`@ckeditor/ckeditor5-build-classic` 是 **CKEditor 官方预构建的 Classic 版本**，它已经包含了一些基础插件和配置，适用于大多数富文本编辑场景。