使用了contenteditable属性的元素会有一个蓝色边框

如何去除这个样式

```vue
<style lang="css">
  /* 去除 contenteditable 元素的默认边框 */
  [contenteditable="true"]:focus {
    outline: none;
    border: none;
  }
</style>
```



音频播放时对应文字高亮

```vue
<template>
    <section style="width: 100%">
        <h3>editor</h3>
        <audio
            @timeupdate="handleTimeUpdate"
            controls
            src="https://www.iflyrec.com/MediaStreamService/v1/files/HyjyPHJ-mz316425221292290048/data?token=3f417f133927480b805609a8524a3218"
        ></audio>
        <div class="paragraph" :contenteditable="true" @click="handleActive">
            <span
                v-for="(item, index) in content"
                :key="index"
                :data-wb="item.time[0]"
                :data-we="item.time[1]"
                >{{ item.text }}</span
            >
        </div>
    </section>
</template>

<script setup lang="ts">
import { getContent } from '@/api/api'
import { ref, useCssModule } from 'vue'

defineOptions({ name: 'EditorView' })

type ContentType = {
    text: string
    time: [number, number]
}

const content = ref<ContentType[]>([])

getContent().then((res) => {
    const { transcriptResult } = res
    const data = JSON.parse(transcriptResult)
    const { words } = data.ps[0]
    console.log('res: ', words)
    content.value = words
})
const $style = useCssModule()

/**
 * 高亮某个元素
 * @param target 需要高亮的元素
 */
const highlight = (target: HTMLElement) => {
    target.classList.add($style.active)
}
/**
 * 清除高亮
 */
const clearHighlight = () => {
    const spans = document.querySelectorAll('.paragraph span')
    spans.forEach((span) => span.classList.remove($style.active))
}

const handleActive = (e: MouseEvent) => {
    const target = e.target as HTMLElement
    clearHighlight()

    if (target.tagName === 'SPAN') {
        highlight(target)
    }
}
const handleTimeUpdate = (e: Event) => {
    const target = e.target as HTMLAudioElement
    const currentTime = Math.floor(target.currentTime * 1000)
    console.log(currentTime)
    highlightCurrentWord(currentTime)
}

const highlightCurrentWord = (currentTime: number) => {
    clearHighlight()
    const spans: NodeListOf<HTMLSpanElement> = document.querySelectorAll('.paragraph span')
    spans.forEach((span) => {
        const startTime = Number(span.dataset.wb)
        const endTime = Number(span.dataset.we)
        if (startTime && endTime) {
            if (currentTime >= startTime && currentTime <= endTime) {
                highlight(span)
            }
        }
    })
}
</script>

<style lang="scss" module>
.active {
    color: #fff;
    background-color: #4499ff;
}
</style>

<style lang="css">
[contenteditable='true']:focus {
    outline: none;
    border: none;
}
</style>
```

使用requestAnimationFrame优化

```vue
<template>
    <section style="width: 100%">
        <h3>editor</h3>
        <audio
            @timeupdate="handleTimeUpdate"
            @play="handleAudioPlay"
            @pause="handleAudioPause"
            controls
            src="https://www.iflyrec.com/MediaStreamService/v1/files/HyjyPHJ-mz316425221292290048/data?token=3f417f133927480b805609a8524a3218"
        ></audio>
        <div class="paragraph" :contenteditable="true" @click="handleActive">
            <span
                v-for="(item, index) in content"
                :key="index"
                :data-wb="item.time[0]"
                :data-we="item.time[1]"
                >{{ item.text }}
            </span>
        </div>
    </section>
</template>

<script setup lang="ts">
import { getContent } from '@/api/api'
import { ref, useCssModule } from 'vue'

defineOptions({ name: 'EditorView' })

type ContentType = {
    text: string
    time: [number, number]
}

const content = ref<ContentType[]>([])
const audioCurrentTime = ref<number>()
const isPlaying = ref<boolean>(false)
const lastTime = ref<number>()

getContent().then((res) => {
    const { transcriptResult } = res
    const data = JSON.parse(transcriptResult)
    const { words } = data.ps[0]
    console.log('res: ', words)
    content.value = words
})
const $style = useCssModule()

/**
 * 高亮某个元素
 * @param target 需要高亮的元素
 */
const highlight = (target: HTMLElement) => {
    target.classList.add($style.active)
}
/**
 * 清除高亮
 */
const clearHighlight = () => {
    const spans = document.querySelectorAll('.paragraph span')
    spans.forEach((span) => span.classList.remove($style.active))
}

const handleActive = (e: MouseEvent) => {
    const target = e.target as HTMLElement
    clearHighlight()

    if (target.tagName === 'SPAN') {
        highlight(target)
    }
}
const handleTimeUpdate = (e: Event) => {
    const target = e.target as HTMLAudioElement
    const currentTime = Math.floor(target.currentTime * 1000)
    console.log(currentTime)
    audioCurrentTime.value = currentTime
    updateHighlight()
}

const highlightCurrentWord = (currentTime: number) => {
    clearHighlight()
    const spans: NodeListOf<HTMLSpanElement> = document.querySelectorAll('.paragraph span')
    spans.forEach((span) => {
        const startTime = Number(span.dataset.wb)
        const endTime = Number(span.dataset.we)
        if (startTime && endTime) {
            if (currentTime >= startTime && currentTime <= endTime) {
                highlight(span)
            }
        }
    })
}

const updateHighlight = () => {
    if (!isPlaying.value) return
    if (audioCurrentTime.value && audioCurrentTime.value !== lastTime.value) {
        highlightCurrentWord(audioCurrentTime.value)
        lastTime.value = audioCurrentTime.value
    }
    requestAnimationFrame(updateHighlight)
}
const handleAudioPlay = () => {
    isPlaying.value = true
    requestAnimationFrame(updateHighlight)
}
const handleAudioPause = () => {
    isPlaying.value = false
}
</script>

<style lang="scss" module>
.active {
    color: #fff;
    background-color: #4499ff;
}
</style>

<style lang="css">
[contenteditable='true']:focus {
    outline: none;
    border: none;
}
</style>
```

关于动态添加active高亮样式，可以采用动态class来处理

```vue
<div class="paragraph" :contenteditable="true" @click="handleActive">
    <span
          v-for="(item, index) in content"
          :class="{
                  [$style.active]:
                  audioCurrentTime &&
                  audioCurrentTime >= item.time[0] &&
                  audioCurrentTime <= item.time[1]
                  }"
          :key="index"
          :data-wb="item.time[0]"
          :data-we="item.time[1]"
          >{{ item.text }}
    </span>
</div>
```

