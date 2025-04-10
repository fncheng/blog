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



toolbar设置

```ts
new MindElixir({
        el: mindmapContainer.value,
        direction: MindElixir.RIGHT,
        draggable: false,
        contextMenu: true,
        toolBar: false, // 可以开启toolbar
        nodeMenu: false
      })
```

## 居中展示

`mind.toCenter()`

## 自定义toolbar

```vue
<template>
  <div ref="mindmapContainer" id="mindmap-container"></div>
  <div class="mind-elixir-toolbar">
    <ElIcon class="center-screen" title="居中展示" @click="toCenter">
      <LocationFilled />
    </ElIcon>
    <ElIcon class="full-screen" title="全屏展示" @click="toFullScreen">
      <FullScreen />
    </ElIcon>
  </div>
</template>

<script setup lang="ts">
import useFullScreen from '@/hooks/useFullScreen'
import { FullScreen, LocationFilled } from '@element-plus/icons-vue'
import { ElIcon } from 'element-plus'
import MindElixir, { type MindElixirInstance, type NodeObj } from 'mind-elixir'
import { nextTick, ref, watch } from 'vue'

/**
 * 思维导图数据结构
 */
/* const Data = {
  id: 'root',
  topic: '思维导图',
  children: [
    {
      id: 'node1',
      topic: '子节点 1',
      children: []
    },
    {
      id: 'node2',
      topic: '子节点 2',
      children: []
    }
  ]
} */

const props = defineProps<{ data: any }>()

let mind: MindElixirInstance
const mindmapContainer = ref<HTMLDivElement | null>(null)

const { toggle } = useFullScreen(mindmapContainer)

const renderMindMap = (mindMapData: NodeObj) => {
  if (!mindMapData) return
  nextTick(() => {
    if (mindmapContainer.value) {
      mind = new MindElixir({
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

const toCenter = () => {
  mind.toCenter()
}

const toFullScreen = () => {
  toggle()
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

defineExpose({
  toCenter
})
</script>

<style lang="css" scoped>
#mindmap-container {
  width: 100%;
  height: 100%;
  position: relative;
}
.mind-elixir-toolbar {
  background-color: #fff;
  position: absolute;
  right: 10px;
  bottom: 10px;
  z-index: 999;

  .center-screen,
  .full-screen {
    cursor: pointer;
  }

  .center-screen {
    margin-right: 10px;
  }
}
</style>
```

