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



## el-tooltip显示箭头

show-arrow 显示箭头

effect="light" 白色

```vue
<el-tooltip
		:content="item.tableName"
		:popper-class="$style['recommend-app-item-tooltip']"
		placement="top" show-arrow>
  <div class="activity-database">{{ item.tableName }}</div>
</el-tooltip>
```

箭头不显示的问题

```vue
.recommend-app-item-tooltip {
  z-index: 9999 !important;
  max-width: 240px;
  max-height: 500px;
  :global(.el-popper__arrow) {
    display: block;
  }
}
```



## ElTooltip实现文字截断时才生效

不截断则不生效

判断单行文本是否被截断，若被截断则使用el-tooltip

```vue
<template>
  <el-tooltip
    v-bind="props"
    :class="$style['auto-tooltip']"
    :popper-class="$style['auto-tooltip-popper']"
    show-arrow
    effect="light"
    :disabled="isDisabled"
  >
    <div ref="textRef" :class="$style['auto-tooltip-content']" @mouseenter="handleMouseEnter">
      <slot></slot>
    </div>
  </el-tooltip>
</template>

<script setup lang="ts">
import { ElTooltip, type ElTooltipProps } from 'element-plus'
import { ref } from 'vue'

const props = defineProps</* @vue-ignore */ Partial<ElTooltipProps>>()

const isDisabled = ref(true)
const textRef = ref<HTMLElement | null>(null)

// 鼠标移入时校验
const handleMouseEnter = () => {
  if (textRef.value) {
    const outerWidth = textRef.value.clientWidth
    // 获取 slot 内的实际内容元素，如果 slot 是元素则使用它，否则使用外层容器
    const contentElement = (textRef.value.firstElementChild as HTMLElement) || textRef.value

    const innerWidth = contentElement.scrollWidth
    // 当内容宽度大于容器宽度时，会出现截断显示...，此时需要开启 tooltip
    const isOverflow = innerWidth > outerWidth
    // console.log('outerWidth: ', outerWidth)
    // console.log('innerWidth: ', innerWidth)
    isDisabled.value = !isOverflow
  }
}
</script>

<style lang="css" module>
.auto-tooltip {
  width: fit-content;
}
.auto-tooltip-popper {
  :global(.el-popper__arrow) {
    display: block;
  }
}
.auto-tooltip-content {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
```

升级版：

可以判断单行文本和多行文本

### 关键区别

| 文本类型 | 截断方式              | 检测方法                    |
| :------- | :-------------------- | :-------------------------- |
| 单行文本 | white-space: nowrap   | scrollWidth > clientWidth   |
| 多行文本 | -webkit-line-clamp: 2 | scrollHeight > clientHeight |

```html
<template>
  <el-tooltip
    v-bind="props"
    :class="$style['auto-tooltip']"
    :popper-class="$style['auto-tooltip-popper']"
    show-arrow
    effect="light"
    :disabled="isDisabled"
  >
    <div ref="textRef" :class="$style['auto-tooltip-wrapper']" @mouseenter="handleMouseEnter">
      <slot></slot>
    </div>
  </el-tooltip>
</template>

<script setup lang="ts">
import { ElTooltip, type ElTooltipProps } from 'element-plus'
import { ref } from 'vue'

const props = defineProps</* @vue-ignore */ Partial<ElTooltipProps>>()

const isDisabled = ref(true)
const textRef = ref<HTMLElement | null>(null)

// 鼠标移入时校验
const handleMouseEnter = () => {
  if (textRef.value) {
    // 获取 slot 内的实际内容元素，如果 slot 是元素则使用它，否则使用外层容器
    const contentElement = (textRef.value.firstElementChild as HTMLElement) || textRef.value

    // 方法1: 检测高度溢出（适用于多行文本 -webkit-line-clamp）
    const scrollHeight = contentElement.scrollHeight
    const clientHeight = contentElement.clientHeight
    const isHeightOverflow = scrollHeight > clientHeight

    // 方法2: 检测宽度溢出（适用于单行文本 white-space: nowrap）
    const scrollWidth = contentElement.scrollWidth
    const clientWidth = contentElement.clientWidth
    const isWidthOverflow = scrollWidth > clientWidth

    // 任一方向溢出都需要显示 tooltip
    const isOverflow = isHeightOverflow || isWidthOverflow

    console.log('检测结果:', {
      isHeightOverflow,
      scrollHeight,
      clientHeight,
      isWidthOverflow,
      scrollWidth,
      clientWidth,
      finalOverflow: isOverflow
    })

    isDisabled.value = !isOverflow
  }
}
</script>

<style lang="css" module>
.auto-tooltip {
  width: fit-content;
}
.auto-tooltip-popper {
  :global(.el-popper__arrow) {
    display: block;
  }
}
/* wrapper 不设置任何截断样式，由 slot 内容自己控制 */
</style>
```

外层

```vue
<template>
	<auto-tooltip
		:content="agentItem.desc"
		:show-arrow="true"
    effect="light"
		:teleported="true"
		placement="top"
		:popper-class="$style['recommend-app-item-desc-tooltip']"
		>
      <template #default>
    		<div v-if="agentItem.desc" :class="$style['recommend-app-item-desc']">
      		{{ agentItem.desc }}
  			</div>
		</template>
	</auto-tooltip>
</template>

<style lang="scss" module>
  .recommend-app-item-desc {
    font-size: 12px;
    color: #909399;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    line-height: 1.4;
    word-break: break-all;
  }

  .recommend-app-item-desc-tooltip {
    z-index: 9999 !important;
    max-width: 252px;
    max-height: 500px;
    :global(.el-popper__arrow) {
      display: block;
    }
  }
</style>
```



