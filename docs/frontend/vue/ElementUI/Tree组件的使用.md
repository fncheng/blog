## ElementUI Tree组件

Tree组件获取和设置选中节点有两种方式：通过 node 或通过 key。 如果需要通过 key 来获取或设置，则必须设置 `node-key`。

```vue
<script lang="ts" setup>
import { ElTree } from 'element-plus'
import type Node from 'element-plus/es/components/tree/src/model/node'
const treeRef = ref<InstanceType<typeof ElTree>>()
</script>
```

getCheckedNodes、getCheckedKeys