



封装QuillEditor组件

```vue
<template>
    <div class="quill-editor-container">
        <QuillEditor
            ref="quillRef"
            v-model:content="innerContent"
            :options="editorOptions"
            content-type="html"
            @update:content="handleContentChange"
        />
    </div>
</template>

<script lang="ts" setup>
import { computed, useTemplateRef } from 'vue'
import { QuillEditor } from '@vueup/vue-quill'
import type { QuillOptions } from 'quill'
import Quill from 'quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'

interface QuillEditorProps {
    modelValue: string // 外部传入的内容
    toolbar?: string | any[] | object // 工具栏配置
    placeholder?: string // 占位符
    readOnly?: boolean // 是否只读
    theme?: 'snow' | 'bubble'
}

// 定义 props
const props = withDefaults(defineProps<QuillEditorProps>(), {
    modelValue: '',
    placeholder: '请输入内容...',
    readOnly: false
})

// 定义 emits
const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void
    (e: 'change', value: string): void
}>()

const innerContent = computed(() => props.modelValue)

const toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],
    ['blockquote', 'code-block'],
    [{ header: 1 }, { header: 2 }],
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ script: 'sub' }, { script: 'super' }],
    [{ indent: '-1' }, { indent: '+1' }],
    [{ size: ['small', false, 'large', 'huge'] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ color: [] }, { background: [] }],
    [{ align: [] }],
    ['clean'],
    ['link', 'image', 'video']
]

// 编辑器配置
const editorOptions = computed<QuillOptions>(() => ({
    theme: 'snow',
    placeholder: props.placeholder,
    readOnly: props.readOnly,
    modules: {
        toolbar: props.toolbar || toolbarOptions
    }
}))

// 内容变化时触发
const handleContentChange = (content: string) => {
    emit('update:modelValue', content)
    emit('change', content)
}

// 暴露方法给父组件（如获取 Quill 实例）
const quillRef = useTemplateRef('quillRef')

defineExpose({
    getQuillInstance: () => quillRef.value?.getQuill(),
    getContent: () => innerContent.value
})
</script>

<style scoped>
.quill-editor-container {
    width: 100%;
    min-height: 200px;
}

:deep(.ql-editor) {
    min-height: 150px;
}
</style>
```

