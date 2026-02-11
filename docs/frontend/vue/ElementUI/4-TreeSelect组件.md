## Antd的TreeSelect支持虚拟列表

具体应用详见中航智慧办公平台运营数据导出模块

```vue
<ATreeSelect
          style="width: 100%"
          v-model:value="orgIds"
          :tree-data="treeData"
          :field-names="fieldNames"
          placeholder="请选择部门"
          :tree-checkable="true"
          multiple
        />
```

- treeCheckable  显示 checkbox
- treeCheckStrictly checkable 状态下节点选择完全受控（父子节点选中状态不再关联），会使得 `labelInValue` 强制为 true



设置open属性可以让下拉框一直显示，方便调试

```vue
<ATreeSelect
          ref="treeSelectRef"
          v-model:value="formData.orgIds"
          :tree-data="treeData"
          :field-names="orgFieldNames"
          :load-data="onLoadData"
          placeholder="请选择部门"
          :tree-checkable="true"
          :max-tag-count="1"
          multiple
          :popup-class-name="$style['custom-tree-select']"
          style="width: 100%"
        />
```

## 懒加载

```vue
<template>
  <a-tree-select
    v-model:value="value"
    :tree-data="treeData"
    :load-data="onLoadData"
    tree-checkable
    show-search
    allow-clear
    placeholder="请选择"
  />
</template>

const onLoadData: TreeSelectProps['loadData'] = (treeNode) => {
  console.log('treeNode: ', treeNode)
  return new Promise(async (resolve) => {
    try {
      const nodeId = treeNode.value || treeNode.id
      const children = await fetchOrgList(nodeId)
      treeData.value = updateTreeData(treeData.value, nodeId, children)
      resolve(undefined)
    } catch (error) {
      console.error('加载子节点失败:', error)
      resolve(undefined)
    }
  })
}
```





## 分页滚动加载



## Select滚动加载

Select默认开启了

使用popup-scroll事件

核心功能：

- ✅ 滚动加载：当滚动到距离底部10px时自动加载下一页

- ✅ 搜索防抖：使用 VueUse 的 useDebounceFn，300ms 防抖

- ✅ 懒加载：只在下拉框打开时才初始化数据

- ✅ 加载状态：显示加载中的 Spin 组件

- ✅ 多选支持：支持 mode="multiple"

- ✅ 自定义字段映射：通过 fieldNames 配置

```vue
<template>
  <ASelect
    v-bind="$attrs"
    v-model:value="selectedValue"
    :style="{ width: '100%', ...style }"
    :options="options"
    :field-names="fieldNames"
    :filter-option="false"
    :loading="loading && !isLoadingMore"
    :placeholder="placeholder"
    :allow-clear="allowClear"
    :disabled="disabled"
    :list-height="listHeight"
    @search="onSearch"
    @dropdownVisibleChange="onDropdownVisibleChange"
    @popup-scroll="onPopupScroll"
  >
    <template #notFoundContent>
      <ASpin
        v-if="loading && !isLoadingMore"
        :class="$style['spin-wrapper']"
        size="small"
        tip="加载中..."
        spinning
      ></ASpin>
      <div v-else>{{ notFoundText }}</div>
    </template>
    <template #dropdownRender="{ menuNode }">
      <component :is="menuNode" />
      <div v-if="canLoadMore" :class="$style['loading-more']">
        <template v-if="isLoadingMore">
          <ASpin size="small" />
          <span :class="$style['loading-text']">加载中...</span>
        </template>
        <span v-else :class="$style['loading-text-placeholder']">向下滚动加载更多</span>
      </div>
    </template>
  </ASelect>
</template>
```

```ts
import { Select as ASelect, Spin as ASpin, type SelectProps } from 'ant-design-vue'
import { ref, computed, watch } from 'vue'
import { useDebounceFn } from '@vueuse/core'

interface PaginatedSelectProps extends /* @vue-ignore */ SelectProps {
  value?: any
  fetchData: (params: {
    pageNum: number
    pageSize: number
    keyword?: string
  }) => Promise<{ data: any[]; total: number }>
  listHeight?: number
  fieldNames?: { label: string; value: string }
  placeholder?: string
  pageSize?: number
  allowClear?: boolean
  disabled?: boolean
  notFoundText?: string
  style?: Record<string, any>
}

const props = withDefaults(defineProps<PaginatedSelectProps>(), {
  fieldNames: () => ({ label: 'label', value: 'value' }),
  placeholder: '请选择',
  pageSize: 10,
  allowClear: true,
  disabled: false,
  notFoundText: '暂无数据',
  style: () => ({})
})

const selectedValue = defineModel<any>('value', {
  default: () => []
})

const options = ref<any[]>([])
const loading = ref(false)
const isLoadingMore = ref(false)
const pageNum = ref(1)
const total = ref(0)
const keyword = ref('')
const isInitialized = ref(false)

const canLoadMore = computed(() => options.value.length < total.value)

/**
 * 加载数据
 */
const loadData = async (reset: boolean = false) => {
  if (loading.value || isLoadingMore.value) return

  if (reset) {
    pageNum.value = 1
    options.value = []
    loading.value = true
  } else {
    // 加载更多时使用 isLoadingMore
    isLoadingMore.value = true
  }

  try {
    const result = await props.fetchData({
      pageNum: pageNum.value,
      pageSize: props.pageSize,
      keyword: keyword.value
    })

    if (reset) {
      options.value = result.data
    } else {
      options.value = [...options.value, ...result.data]
    }

    total.value = result.total
    isInitialized.value = true
  } catch (error) {
    console.error('加载数据失败:', error)
    if (reset) {
      options.value = []
      total.value = 0
    }
  } finally {
    loading.value = false
    isLoadingMore.value = false
  }
}

/**
 * 搜索防抖处理
 */
const onSearch = useDebounceFn((value: string) => {
  keyword.value = value
  loadData(true)
}, 300)

/**
 * 下拉框展开/收起
 */
const onDropdownVisibleChange = (open: boolean) => {
  if (open && !isInitialized.value) {
    loadData(true)
  }
}

/**
 * 滚动加载
 */
const onPopupScroll = (e: any) => {
  const target = e.target
  if (!target) return

  // 计算是否滚动到底部（距离底部小于10px时触发）
  const scrollHeight = target.scrollHeight
  const scrollTop = target.scrollTop
  const clientHeight = target.clientHeight
  const isBottom = scrollHeight - scrollTop - clientHeight < 10

  if (isBottom && canLoadMore.value && !loading.value && !isLoadingMore.value) {
    pageNum.value++
    loadData(false)
  }
}

/**
 * 重置数据
 */
const reset = () => {
  pageNum.value = 1
  keyword.value = ''
  options.value = []
  total.value = 0
  isInitialized.value = false
}

// 监听 value 变化，如果清空了选择，可以选择是否重置
watch(
  () => props.value,
  (newVal) => {
    if (!newVal || (Array.isArray(newVal) && newVal.length === 0)) {
      // 可以根据需要决定是否重置
      // reset()
    }
  }
)

defineExpose({
  reset,
  loadData
})
```

```scss
.spin-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 8px;
}

.loading-more {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px 12px;
  border-top: 1px solid #f0f0f0;
  background-color: #fff;
  column-gap: 8px;
  min-height: 40px; /* 固定最小高度，避免闪烁 */
}

.loading-text {
  font-size: 14px;
  color: #999;
}

.loading-text-placeholder {
  font-size: 12px;
  color: #d9d9d9;
}
```







### 3. 视觉效果

有更多数据可加载（未触底）：

```
┌─────────────────┐
│ 选项 1          │
│ 选项 2          │
│ 选项 3          │
├─────────────────┤
│ 向下滚动加载更多 │ ← 淡色提示
└─────────────────┘
```

滚动到底部加载中：

```
┌─────────────────┐
│ 选项 1          │
│ 选项 2          │
│ 选项 3          │
├─────────────────┤
│ 🔄 加载中...    │ ← 同样高度，无闪烁
└─────────────────┘
```

所有数据加载完成：

```
┌─────────────────┐
│ 选项 1          │
│ 选项 2          │
│ 选项 3          │
│ 选项 4          │
└─────────────────┘ ← 底部区域消失
```

这样就完美解决了高度闪烁的问题，同时还给用户提供了友好的提示！

