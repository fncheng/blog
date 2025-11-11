## Table

![image-20241018173417422](https://minimax-1256590847.cos.ap-shanghai.myqcloud.com/img/image-20241018173417422.png)

## ElPopover跑到左上角

在流式输出时，鼠标hover到链接上去，展示原文卡片，使用ElPopover实现。这个时候Popover卡片会闪烁到左上角

这是为什么？

代码如下:
```vue
<!-- 原文链接hover卡片 -->
    <ElPopover
      v-model:visible="hoverCardVisible"
      trigger="hover"
      :virtual-ref="virtualRef"
      virtual-triggering
      placement="top"
      :width="320"
      :offset="0"
      :show-arrow="false"
      :persistent="false"
      popper-class="source-hover-popover"
    >
      <template #default>
        <SourceHoverCard :sourceData="currentSourceData" @click="handleSourceClick" />
      </template>
    </ElPopover>
```

首先我们要知道Element Plus 的 `ElPopover` 是基于 **@popperjs/core** 定位库实现的。
 当 popper 初始化时，它会根据传入的 `reference` 元素计算出位置：

```ts
createPopper(referenceEl, popperEl, options)
```

### 核心原因

这里因为采用了 `virtual-ref` 虚拟触发模式

当采用了虚拟触发时，Element Plus 会通过这个对象的 `getBoundingClientRect()` 方法来确定弹窗的位置。

如果你的 `virtualRef` 在某个时刻是 `undefined` 或者：

```ts
virtualRef.getBoundingClientRect = () => ({
  top: 0, left: 0, right: 0, bottom: 0, width: 0, height: 0
})
```

那么 Popper.js 拿到的坐标是 `(0, 0)`，于是它就「正确地」——
 把弹窗放到了 **页面左上角**。😅

而流式输出时（例如聊天流、AI 输出、逐字渲染等），`virtualRef` 通常是：

- 被 `v-for` 动态生成；
- 或者其位置（getBoundingClientRect）还未更新；
- 或者在内容还没渲染完时就触发了 Popover 渲染。

👉 Popper 在初始化时拿到错误的位置信息，定位自然出错。

### 解决方案

虚拟引用对象 + rect 缓存

```ts
// 处理原文链接hover事件
const handleSourceLinkHover = (event: MouseEvent, docIndex: number) => {
  if (!sourceData.value) {
    return
  }

  // 清除之前的定时器
  if (hoverTimer.value) {
    clearTimeout(hoverTimer.value)
  }

  const document = sourceData.value[`${docIndex}`]
  currentSourceData.value = document
  const target = event.target as HTMLElement
  // 缓存 rect，避免下一帧 DOM 变动导致失效
  const rect = target.getBoundingClientRect()
  // 手动构造 Virtual Element 对象
  virtualRef.value = {
    getBoundingClientRect: () => rect,
    contextElement: target,
  }

  // 延迟显示，避免频繁触发
  hoverTimer.value = setTimeout(async() => {
    await nextTick()
    hoverCardVisible.value = true
  }, 200)
}
```

这里将target.getBoundingClientRect()缓存一下

#### 为什么要缓存 rect

如果直接：

```ts
getBoundingClientRect: () => target.getBoundingClientRect()
```

那在流式更新时，target 的布局可能还没稳定，Popper 一调用它就返回 `(0,0)`。

而用缓存：

```ts
const rect = target.getBoundingClientRect()
getBoundingClientRect: () => rect
```

意味着我们“冻结”了此时的位置信息，Popper 定位不会跳。