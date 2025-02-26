## Markdown中数学公式的渲染

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