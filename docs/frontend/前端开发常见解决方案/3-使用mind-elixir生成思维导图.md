## MindElixir生成思维导图

文档：https://docs.mind-elixir.com/zh-Hans/docs/getting-started/quick-start

```ts
import MindElixir, { E } from 'mind-elixir';

// 获取 DOM 容器
const container = document.getElementById('map-container');

// 初始化 Mind-Elixir
const mind = new MindElixir({
  el: container, // 绑定 DOM
  direction: MindElixir.LEFT, // 思维导图方向（LEFT, RIGHT, TOP, BOTTOM）
  editable: true, // 是否可编辑
  contextMenu: true, // 是否启用右键菜单
  toolBar: true, // 是否显示工具栏
  nodeMenu: true, // 是否启用节点菜单
  keypress: true, // 是否启用键盘快捷键
});

// 思维导图数据结构
const data = MindElixir.new('思维导图');
mind.init(data);
```

思维导图数据结构：

```json
{
  "nodeData": {
    "id": "root",
    "topic": "思维导图",
    "children": [
      {
        "id": "node1",
        "topic": "子节点 1",
        "children": []
      },
      {
        "id": "node2",
        "topic": "子节点 2",
        "children": []
      }
    ]
  }
}
```



### Vue组件

```vue
<template>
  <div ref="mindmapContainer" id="mindmap-container"></div>
</template>

<script setup lang="ts">
import MindElixir, { type NodeObj } from 'mind-elixir'
import { nextTick, ref, watch } from 'vue'

const props = defineProps<{ data: any }>()

const mindmapContainer = ref<HTMLDivElement>()
const renderMindMap = (mindMapData: NodeObj) => {
  if (!mindMapData) return
  nextTick(() => {
    if (mindmapContainer.value) {
      const mind = new MindElixir({
        el: mindmapContainer.value,
        direction: MindElixir.RIGHT,
        draggable: false,
        contextMenu: true,
        toolBar: false,
        nodeMenu: false
      })
      mind.init({ nodeData: mindMapData })
    }
  })
}

watch(
  () => props.data,
  (newVal) => {
    if (newVal) {
      renderMindMap(newVal)
    }
  },
  { immediate: true }
)
</script>

<style lang="css" scoped>
#mindmap-container {
  width: 100%;
  height: 100%;
}
</style>
```

