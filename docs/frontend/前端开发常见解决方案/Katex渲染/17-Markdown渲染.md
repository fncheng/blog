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



## 给v-md-preview组件添加防抖

原本代码

```vue
<template>
    <v-md-preview :text="content"></v-md-preview>
</template>

<script setup lang="ts">
defineOptions({
    name: 'MdPreview'
})

interface MdPreviewProps {
    content: string
}

const { content } = defineProps<MdPreviewProps>()
</script>
```

使用refDebounced添加防抖

```vue
<template>
  <v-md-preview :text="debounceValue" class="mermaid-preview"></v-md-preview>
</template>

<script setup lang="ts">
import { refDebounced } from '@vueuse/core'
import { toRef } from 'vue'

defineOptions({
  name: 'MdPreview'
})

interface MdPreviewProps {
  content: string
}

const props = defineProps<MdPreviewProps>()

const debounceValue = refDebounced(toRef(props, 'content'), 300)
</script>

<style scoped>
:deep(.mermaid-preview) {
  .v-md-mermaid {
    display: flex;
    justify-content: center;
    margin: 1em 0;
  }
}
</style>
```



## 在@kangc/v-md-editor中渲染mermaid流程图

报错 TypeError: Cannot read properties of undefined (reading 'languages') 是因为 VuePress 主题在尝试通过 Prism.languages 检查代码语言（包括 mermaid）时，找不到 Prism 实例导致的。

在 @kangc/v-md-editor 中，如果你使用的是 VuePress 主题（@kangc/v-md-editor/lib/theme/vuepress.js），它内部依赖 Prism.js 来处理代码块的解析和高亮。

```ts
// 1. 必须引入 prismjs
import Prism from 'prismjs'
// 如果需要其他语言高亮，也可以在此引入
import 'prismjs/components/prism-json'
import 'prismjs/components/prism-bash'

// ... mermaid 导入
import createMermaidPlugin from '@kangc/v-md-editor/lib/plugins/mermaid/npm'
import '@kangc/v-md-editor/lib/plugins/mermaid/mermaid.css'
import mermaid from 'mermaid'


function setupVMd(instance: any) {
    instance.use(githubTheme, {
        // 2. 必须将 Prism 传入主题配置
        Prism,
        extend(md: any) {
            md.use(MarkdownItPluginEcharts, { echarts })
        }
    })
    instance.use(createKatexPlugin())
    // 3. 注册 mermaid 插件
    instance.use(createMermaidPlugin({ mermaid }))
}
// ...
```

流式输出mermaid语法的问题

当模型输出了 ```mermaid`但还没输完里面的内容（比如只输出了`grap` 而不是 `graph TD`）时，`v-md-editor` 已经触发了组件更新。

Mermaid 尝试解析 `grap`，发现是不合法的语法，于是抛出 `UnknownDiagramError` 并在页面显示红色的 Syntax Error。

#### 方案一：动态替换未闭合的 Mermaid 标签（推荐 🌟）

这是最优雅的方案。我们可以编写一个 Computed 属性，检测 Markdown 文本。如果发现有一个 `mermaid` 代码块**没有闭合**（即还没有输出最后的 ` `），我们就暂时把它替换成 ````text` 或 ````loading`。

这样，在流式输出的过程中，用户看到的是一段普通的文本代码块；一旦模型输出完毕（闭合了代码块），它就会瞬间变成 Mermaid 图表。

处理未闭合的mermaid语法

```ts
// 处理未闭合的 mermaid 代码块
const safeContent = computed(() => {
  const text = content.value
  // 正则匹配未闭合的 mermaid 代码块
  // 匹配规则：以 ```mermaid 开头，但是后面没有 ``` 结束的代码块
  const mermaidRegex = /```mermaid([\s\S]*?)$/
  
  if (mermaidRegex.test(text)) {
    // 检查是否真的未闭合（排除已经有结束符的情况）
    // 注意：上面的正则已经隐含了"位于末尾"且"未闭合"的语义，但为了保险，
    // 我们再次确认该段落是否确实没有结束标记
    const lastMermaidIndex = text.lastIndexOf('```mermaid')
    const lastCloseIndex = text.lastIndexOf('```', lastMermaidIndex + 10) // 从 mermaid 后开始找
    
    // 如果没有找到结束标记，说明未闭合
    // 或者找到的结束标记在 mermaid 标记之前（这理论上不应该发生，因为 lastIndexOf 是从后往前找的，
    // 但如果 text 是 ```mermaid ... ``` ... ```mermaid ... 这种结构，我们需要小心）
    // 更简单的逻辑：从最后一个 ```mermaid 开始截取，看这段字符串里有没有 ```
    const lastBlock = text.slice(lastMermaidIndex)
    if (!lastBlock.slice(10).includes('```')) {
      // 未闭合，将其替换为 text 类型，这样就不会触发 mermaid 渲染
      return text.slice(0, lastMermaidIndex) + '```text' + lastBlock.slice(10)
    }
  }
  return text
})
```

封装hooks useSafeMermaid.ts

```ts
import { computed, type Ref } from 'vue'

/**
 * 处理流式输出中的 Markdown 内容，主要是为了防止 Mermaid 在未闭合时渲染导致报错
 * @param content Ref<string> 原始 Markdown 内容
 * @returns Ref<string> 处理后的安全内容
 */
export function useSafeMermaid(content: Ref<string>) {
  return computed(() => {
    const text = content.value
    // 正则匹配未闭合的 mermaid 代码块
    // 匹配规则：以 ```mermaid 开头，但是后面没有 ``` 结束的代码块
    const mermaidRegex = /```mermaid([\s\S]*?)$/

    if (mermaidRegex.test(text)) {
      const lastMermaidIndex = text.lastIndexOf('```mermaid')
      // 检查最后一段是否真的没有闭合
      // 从 mermaid 后开始找
      const lastBlock = text.slice(lastMermaidIndex)

      // 如果这一段里没有结束标记 ``` (注意要排除掉开头的 ```mermaid 这10个字符)
      if (!lastBlock.slice(10).includes('```')) {
        // 未闭合，将其替换为 text 类型，这样就不会触发 mermaid 渲染
        // 这里替换为 text 是为了让用户看到原始代码，也可以替换为 loading 等自定义块
        return text.slice(0, lastMermaidIndex) + '```text' + lastBlock.slice(10)
      }
    }
    return text
  })
}
```



