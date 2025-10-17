# Markdown中数学公式的渲染

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

## 封装一个工具函数renderAllMath

```ts
export function renderAllMath(content: string) {
    if (!content) return content
    let processed = content
    // 1. 渲染 $$...$$（块级）
    processed = processed.replace(/\$\$([\s\S]+?)\$\$/g, (match, formula) => {
        try {
            return katex.renderToString(formula, {
                displayMode: true,
                throwOnError: false
            })
        } catch (e) {
            console.error('KaTeX $$...$$ Error:', e)
            return match
        }
    })
    // 2. 渲染 \[...\]（MathJax 块级风格）
    processed = processed.replace(/\\\[([\s\S]+?)\\\]/g, (match, formula) => {
        try {
            return katex.renderToString(formula, {
                displayMode: true,
                throwOnError: false
            })
        } catch (e) {
            console.error('KaTeX \\[...\\] Error:', e)
            return match
        }
    })
    // 3. 渲染 \(...\)（行内公式）
    processed = processed.replace(/\\\((.+?)\\\)/g, (match, formula) => {
        try {
            return katex.renderToString(formula, {
                displayMode: false,
                throwOnError: false
            })
        } catch (e) {
            console.error('KaTeX \\(...\\) Error:', e)
            return match
        }
    })
    return processed
}
```

说明：

正则`/\\\[((.|\n)+?)\\\]/g`简化为`/\\\[([\s\S]+?)\\\]/g`

- `[\s\S]` 能匹配任意字符（包括换行），比 `(.|\n)` 更常见







## @kangc/v-md-editor中数学公式渲染

```ts
<v-md-preview :text="content" @copy-code-success="() => emit('copyCodeSuccess')" :height="height"></v-md-preview>

import VMdPreview from "@kangc/v-md-editor/lib/preview"
import createKatexPlugin from "@kangc/v-md-editor/lib/plugins/katex/npm"
VMdPreview.use(createKatexPlugin())
```

### 关于v-md-editor中数学公式渲染不出来的问题

v-md-editor不能识别 `\[...\]` 和 `\(...\)` 语法

解决办法是不要使用v-md-editor自带的katex插件，改成使用自安装的katex

即v-md-editor组件不要执行`VMdPreview.use(createKatexPlugin())`

最终传入的content需要执行以下代码

```ts
const renderContent = computed(() => {
    let processed = renderBlockMath(content)
    processed = renderInlineMath(processed)
    // Then process markdown
    return processed
})
```



## 编写一个Katex Markdown渲染组件

```vue
<template>
    <MdPreview :content="renderContent"></MdPreview>
</template>

<script setup lang="ts">
import MdPreview from '@/components/MdPreview/index.vue'
import { renderAllMath } from '@/app/utils/katex'
import 'katex/dist/katex.min.css'
import { computed } from 'vue'
const { content } = defineProps<{ content: string }>()

const renderContent = computed(() => {
    return renderAllMath(content)
})
</script>
```

**MdPreview.vue**

```vue
<template>
    <v-md-preview :text="content"></v-md-preview>
</template>

<script setup lang="ts">
import VMdPreview from '@kangc/v-md-editor/lib/preview'
import '@kangc/v-md-editor/lib/style/preview.css'
import githubTheme from '@kangc/v-md-editor/lib/theme/vuepress.js'
import '@kangc/v-md-editor/lib/theme/style/vuepress.css'
import createKatexPlugin from '@kangc/v-md-editor/lib/plugins/katex/npm'
// import markdownItKatex from '@vscode/markdown-it-katex'
// import vscodeKatexPlugin from './vscode-katex-plugin'


defineOptions({
    name: 'MdPreview'
})

interface MdPreviewProps {
    content: string
}

const { content } = defineProps<MdPreviewProps>()

VMdPreview.use(githubTheme, {})
VMdPreview.use(createKatexPlugin())
</script>
```

其中最关键的就是**renderAllMath**函数的使用





## 渲染echarts

引入`@lexmin0412/markdown-it-echarts`

```ts
VMdPreview.use(githubTheme, {})
VMdPreview.use(createKatexPlugin())
VMdPreview.use(MarkdownItPluginEcharts)
```

结果发现提示index.js:6 Uncaught (in promise) TypeError: Cannot read properties of undefined (reading 'rules')    at markdownItEcharts

原因是

> 你在组件内部 (`<script setup>`) 里直接对 `VMdPreview` 调用了 `.use()`，
>  这意味着每次该组件被加载时都会重复初始化一次插件体系，而这时 markdown-it 实例还没准备好，
>  因此 `MarkdownItPluginEcharts` 收到的 `md` 是 `undefined`，就会报：
>  `Cannot read properties of undefined (reading 'rules')`

为防止重复注册，把 `v-md-preview` 的插件注册（主题、echarts、katex）**抽离到独立模块**中，只执行一次。
 不要在组件内调用 `.use()`。

新建src/plugins/v-md-preview.ts

在main.ts中注册

## VMdPreview统一注册

```ts
import VMdPreview from '@kangc/v-md-editor/lib/preview'
import '@kangc/v-md-editor/lib/style/preview.css'

import githubTheme from '@kangc/v-md-editor/lib/theme/vuepress.js'
import '@kangc/v-md-editor/lib/theme/style/vuepress.css'

import createKatexPlugin from '@kangc/v-md-editor/lib/plugins/katex/npm'
import 'katex/dist/katex.min.css'

import MarkdownItPluginEcharts from '@lexmin0412/markdown-it-echarts'
import * as echarts from 'echarts'

console.group('v-md-preview初始化')

VMdPreview.use(githubTheme, {
    extend(md: any) {
        md.use(MarkdownItPluginEcharts, { echarts })
    }
})
VMdPreview.use(createKatexPlugin())

export default VMdPreview
```

进一步
`@kangc/v-md-editor` 提供两大核心组件：v-md-editor和v-md-preview

> 两者使用的底层渲染引擎是一致的，都支持通过 `.use(plugin)` 来扩展 markdown-it 插件。
>  所以我们只要封装一份通用的“注册逻辑”，让 **Editor 和 Preview 共用配置**。

```ts
import VMdPreview from '@kangc/v-md-editor/lib/preview'
import '@kangc/v-md-editor/lib/style/preview.css'

import VMdEditor from '@kangc/v-md-editor/lib/base-editor'
import '@kangc/v-md-editor/lib/style/base-editor.css'

import githubTheme from '@kangc/v-md-editor/lib/theme/vuepress.js'
import '@kangc/v-md-editor/lib/theme/style/vuepress.css'

import createKatexPlugin from '@kangc/v-md-editor/lib/plugins/katex/npm'
import 'katex/dist/katex.min.css'

import MarkdownItPluginEcharts from '@lexmin0412/markdown-it-echarts'
import * as echarts from 'echarts'

console.group('v-md-preview初始化')

function setupVMd(instance: any) {
    instance.use(githubTheme, {
        extend(md: any) {
            md.use(MarkdownItPluginEcharts, { echarts })
        }
    })
    instance.use(createKatexPlugin())
}

setupVMd(VMdPreview)
setupVMd(VMdEditor)

export { VMdPreview, VMdEditor }
```



[编辑器内显示公式时，根号错位或者不显示问题的修复办法](https://github.com/code-farmer-i/vue-markdown-editor/issues/317)

```
VMdEditor.xss.extend({
    whiteList: {
        svg: ['preserveaspectratio', 'viewbox', 'width', 'height'],
        path: ['d', 'fill', 'stroke', 'stroke-width'],
        rect: ['x', 'y', 'width', 'height', 'fill', 'stroke'],
        circle: ['cx', 'cy', 'r', 'fill', 'stroke'],
        g: ['transform']
    }
})
```

