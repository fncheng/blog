## 富文本编辑器ckeditor

```sh
npm install @ckeditor/ckeditor5-vue

pnpm add @ckeditor/ckeditor5-vue
```

`@ckeditor/ckeditor5-build-classic` 是 **CKEditor 官方预构建的 Classic 版本**，它已经包含了一些基础插件和配置，适用于大多数富文本编辑场景。



```ts
const renderContent = computed(() => {
  const latexRegex = /\$\$(.*?)\$\$/g
  let match
  let replacedHtml = props.htmlStr
  while ((match = latexRegex.exec(props.htmlStr)) !== null) {
    const latexFormula = match[1]
    const katexRendered = katex.renderToString(latexFormula, {
      throwOnError: false
    })
    replacedHtml = replacedHtml.replace(match[0], katexRendered)
  }
  return replacedHtml
})
```

修改成

```ts
const renderContent = computed(() => {
  const latexRegex = /\$\$(.*?)\$\$/g;
  return props.htmlStr.replace(latexRegex, (match, latexFormula) => {
    return katex.renderToString(latexFormula, {
      throwOnError: false
    });
  });
});
```

