preview-markdown.vue

```ts
/**
 * 延迟渲染 Mermaid（使用防抖机制）
 */
const scheduleMermaidRender = (diagramId: string, code: string, containerId: string, delay: number = 500) => {
  // 检查是否已有缓存
  if (mermaidSvgCache.has(diagramId)) {
    const svg = mermaidSvgCache.get(diagramId)
    const diagramDom = document.getElementById(containerId)
    if (diagramDom && svg) {
      diagramDom.innerHTML = svg
      return
    }
  }

  // 清除之前的定时器
  const existing = mermaidRenderMap.get(diagramId)

  // 关键优化：如果已经有一个针对相同代码(ID相同)的定时器在运行，并且代码看起来是完整的
  // 那么不要重置定时器，让它继续跑，以便尽快渲染
  // 仅更新 containerId (因为 DOM 可能变了)
  if (existing && existing.timer && isMermaidCodeComplete(code)) {
    existing.containerId = containerId
    return
  }

  if (existing && existing.timer) {
    clearTimeout(existing.timer)
  }

  // 更新代码
  mermaidRenderMap.set(diagramId, {
    code,
    timer: null,
    containerId
  })
```

```ts
// 监听内容变化，清理旧的渲染任务
watch(
  () => renderedContent.value,
  () => {
    // 当内容变化时，不再暴力清除所有定时器
    // 而是依赖 scheduleMermaidRender 内部的逻辑来管理定时器
    // 这样可以避免流式输出时频繁取消已完整代码块的渲染任务
    
    // 清理逻辑移至 scheduleMermaidRender 或组件销毁时
  }
)
```

