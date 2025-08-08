---
title: 虚拟列表方案
---



## vue-virtual-scroller

https://codesandbox.io/p/devbox/vue-virtual-scroller-tfjnjl

https://vue-virtual-scroller-demo.netlify.app/

```sh
npm i vue-virtual-scroller@next
pnpm add vue-virtual-scroller@next
```

main.ts中引入

```ts
import { RecycleScroller, DynamicScroller } from 'vue-virtual-scroller'
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'

const app = createApp(App)
app.component('RecycleScroller', RecycleScroller)
app.component('DynamicScroller', DynamicScroller)
```





### RecycleScroller

适用于**每个列表项高度相同** 或者 **高度可预估** 的情况

✅ **必须指定 min-item-size / item-size（每个项的固定高度）**

```vue
<script setup lang="ts">
import { ref, computed } from 'vue'

const showCount = ref(5)

const itemHeight = computed(() => 200 / showCount.value)

const list = ref(
    Array.from({ length: 100 }, (v, i) => ({
        id: String(i),
        title: `title ${i}`
    }))
)
</script>

<template>
  <div class="wrapper">
    <ElSlider v-model="showCount" :max="10" :min="1"></ElSlider>
    <RecycleScroller class="scroller" :items="list" :item-size="itemHeight" key-field="id">
      <template #default="{ item }">
        <div class="user">
          {{ item }}
        </div>
      </template>
    </RecycleScroller>
  </div>
</template>

<style scoped>
.wrapper {
  width: 400px;
}
.scroller {
  height: 200px;
  border: 1px solid #ccc;
}
</style>
```

需要注意的是

RecycleScroller组件的class 外部height必须得有，items和item-size属性也是必须的

## DynamicScroller

适用于 **每个列表项高度不固定** 的情况，它能 **动态计算每个项的高度**，从而提供更准确的虚拟滚动。

✅ **自动计算列表项高度，适用于内容高度不固定的情况**
✅ 适用于 **富文本、聊天消息、评论区等场景**
✅ **需要使用 `DynamicScrollerItem` 子组件来自动计算高度**

- min-item-size / item-size 必须指定

```vue
<DynamicScroller class="scroller" :items="list" :min-item-size="itemHeight">
            <template #default="{ item, index }">
                <DynamicScrollerItem :item="item" :size-dependencies="[item.title]">
                    <div class="dynamic-item flex">
                        <h4>{{ index + 1 }}</h4>
                        <p>{{ item.title }}</p>
                    </div>
                </DynamicScrollerItem>
            </template>
        </DynamicScroller>
```

出现文本重叠的情况

设置 :active属性

`DynamicScrollerItem` 的工作机制是：

- 它会在 `:active="true"` 时，**真实挂载组件并测量高度**；
- 如果是 `:active="false"`，则不会渲染 DOM 内容，仅保留数据结构；
- `DynamicScroller` 会自动决定哪些项应该 active（可视区域内的项）；
- 但如果你手动管理 `:active`（常用于自定义渲染策略），你必须保证：
  - 可视区域内的项是 active 的；
  - 否则不会测量或更新高度，就会导致错位或重叠。



设置active后滚动变得更丝滑了，同时也不会出现快速滚动时页面内容空白的问题

## 滚动到底部和顶部

无论你用的是 `RecycleScroller` 还是 `DynamicScroller`，要**滚动到顶部或底部**，常见有两种方式：

方法一：直接操作 DOM 的 `scrollTop` 属性

```ts
// 滚动到顶部
scrollerRef.value?.$el.scrollTop = 0

// 滚动到底部
scrollerRef.value?.$el.scrollTop = scrollerRef.value?.$el.scrollHeight
```

方法二：使用 `scrollToItem(index)` 方法（推荐）

```ts
// 滚动到第 0 项（顶部）
scrollerRef.value?.scrollToItem(0)

// 滚动到最后一项（底部）
scrollerRef.value?.scrollToItem(items.length - 1)
```

DynamicScroller组件第一次初始化时没滚动也会执行一遍scroll-end事件

#### 1. **初始内容高度不足，容器不满**

- `DynamicScroller` 会根据数据动态计算 item 高度。
- 如果**初始数据量少，高度不足以撑满容器**，就会立即触发 `scroll-end`，提示你“我已经到底了”，可以加载更多数据。





## ElSelect的虚拟滚动

自带的ElSelectV2和RecycleScroller

RecycleScroller的内存占用比ElSelectV2要好，但是RecycleScroller回显有问题

```vue
<ElSelectV2
        v-model="selected"
        :options="list"
        :props="{ label: 'title', value: 'id' }">
</ElSelectV2>

<ElSelect v-model="selected">
	<RecycleScroller class="scroller" :items="list" :item-size="itemHeight" key-field="id">
    <template v-slot="{ item }">
      <ElOption :label="item.title" :value="item.id"></ElOption>
    </template>
  </RecycleScroller>
</ElSelect>
```

## ElTable的虚拟滚动

```vue
<ElTableV2
        :data="list"
        :columns="[{ title: 'ID', key: 'id', dataKey: 'id', width: 150 }]"
        height="200"
        width="500"
      >
      </ElTableV2>
```

其中columns.witdth是必须要填的参数

发现了一个问题，在滚动的过程中，页面使用的内存会越来越高（Memory面板查看）。同样的问题在ElSelectV2上也出现了，而RecycleScroller包裹的Elselect在滚动时内存虽然也会上升，不过上升的速度较缓慢



### 虚拟列表的原理

源代码：https://github.com/fncheng/webpack-learn/blob/master/src/views/jsx.vue

虚拟列表的原理很简单，就是只渲染当前可见区域的数据项，而不是一次性渲染整个列表。这样可以显著减少 DOM 元素的数量，提高页面性能。

el-table的tempList为要展示的数据，这个数据是如何得来的呢：

通过截取源数据tableData，其中最重要的就是计算start和end，既列表的开始和结束位置

比如这里end = start + maxRow + 1，为什么要多出一个呢，这样做是为了确保最后一个元素也能够正常显示



总体来说，通过监听滚动事件，计算滚动位置，然后根据滚动位置更新虚拟列表的起始行索引和相应的数据，从而实现整个列表的滚动效果。



vue-virtual-scroller使用了transform来更新可见区域数据

更新transform和更新top属性的区别：

1. **性能优化：**
   - **`transform` 优势：** 使用 `transform` 可以利用 GPU 加速，因为它会将元素的渲染过程移到 GPU 上，从而提高性能。对于大型数据集，特别是需要频繁滚动的情况，这种优势可以显著减少 CPU 的计算负担。
   - **默认更新优势：** 默认的更新可见区域数据可能会在每次滚动时重新计算和渲染整个列表或可见区域，可能导致更多的 CPU 计算和页面重绘，相对而言性能可能较差。
2. **实现复杂度：**
   - **`transform` 优势：** 通过 `transform` 实现虚拟滚动通常相对简单，只需计算并设置偏移量即可。这样的实现通常更轻量。
   - **默认更新优势：** 默认的更新可见区域数据可能需要更多的逻辑，特别是需要处理动态高度的情况、懒加载等，可能导致实现相对较复杂。
3. **渲染效果：**
   - **`transform` 优势：** 使用 `transform` 可以平滑地实现滚动，因为它允许浏览器进行硬件加速，避免了大量的重绘。
   - **默认更新优势：** 默认的更新可见区域数据可能在滚动时出现明显的卡顿或闪烁，尤其是在处理大数据集时。
4. **浏览器兼容性：**
   - **`transform` 优势：** `transform` 在现代浏览器中有很好的兼容性，但在一些老版本浏览器可能存在兼容性问题。
   - **默认更新优势：** 默认的更新可见区域数据通常具有较好的兼容性，适用于更广泛的浏览器。



## TypeScript支持

```ts
declare module 'vue-virtual-scroller' {
    import type { DefineComponent } from 'vue'
    export const RecycleScroller: DefineComponent<{
        items: Array<any>
        itemSize?: number
        minItemSize?: number
        keyField?: string
    }>

    export const DynamicScroller: DefineComponent<{
        items: Array<any>
        itemSize: number
    }>

    export const DynamicScrollerItem: DefineComponent<{}>
}
```

定义组件类型

```ts
export type RecycleScrollerType = DefineComponent<
  RecycleScrollerProps,
  {},
  {},
  {},
  {},
  ComponentOptionsMixin,
  ComponentOptionsMixin,
  RecycleScrollerEmits,
  string,
  VNodeProps & AllowedComponentProps & ComponentCustomProps,
  Readonly<RecycleScrollerProps> & {
    onResize?: (() => any) | undefined;
    onVisible?: (() => any) | undefined;
    onHidden?: (() => any) | undefined;
    onUpdate?: ((startIndex: number, endIndex: number, visibleStartIndex: number, visibleEndIndex: number) => any) | undefined;
    'onScroll-start'?: (() => any) | undefined;
    'onScroll-end'?: (() => any) | undefined;
  },
  RecycleScrollerExpose
>;
```

优化：使用 `DefineComponent` 的命名参数形式。从 Vue 3.3 起你可以这样写，使用对象来声明各部分

```ts
export type DynamicScrollerType = DefineComponent<{
  props: DynamicScrollerProps
  emits: RecycleScrollerEmits
  expose: DynamicScrollerExpose
  slots: SlotsType<DynamicScrollerSlots>
}>
```









## items更新后视图没刷新的问题

源码中关于items数据的更新逻辑：

watch监听items，然后触发updateVisibleItems

```vue
watch: {
    items () {
      this.updateVisibleItems(true)
    },
}
```



```ts
watch: {
    items: {
      handler() {
        this.updateVisibleItems(true);
      },
      deep: true,
    },
}
```

但是这样可能会有性能问题，因为并不需要针对深层嵌套属性进行监控

最好的办法还是在items更新后手动调用 updateVisibleItems(true) 
