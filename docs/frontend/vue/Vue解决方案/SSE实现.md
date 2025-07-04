# SSE实现逐字符展示

## 使用EventSource

```ts
const start = () => {
    const source = new EventSource('/proxyApi/events')
    source.addEventListener('message', (e) => {
        console.log('Message from server:', e.data)
        content.value += `${e.data}\n\n`
        const message = e.data
        if (message === '[DONE]') {
            source.close()
        }
    })
    return source.close
}
```



前端代码

```vue
<template>
    <div>
        <h3>server sent events</h3>
        <div id="sse">{{ content }}</div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

defineOptions({ name: 'SSEView' })

const content = ref<string>('')

const source = new EventSource('http://127.0.0.1:3000/events')
source.addEventListener('message', (e) => {
    console.log('Message from server:', e.data)
    // content.value += `${e.data}\n\n`
    const message = e.data
    console.log('message: ', message)
    displayMessageWithEffect(message)
})

function displayMessageWithEffect(message: string) {
    let index = 0
    const container = document.getElementById('sse')
    if (container) {
        const newMessageElement = document.createElement('p')
        const intervalId = setInterval(() => {
            newMessageElement.textContent += message[index]
            index++

            // 当所有字符都显示完时，停止定时器
            if (index === message.length) {
                clearInterval(intervalId)
            }
        }, 100) // 每隔 50ms 显示一个字符
        container.appendChild(newMessageElement)
    }
}
</script>

```

### 优化

使用requestAnimationFrame优化逐字符展示文本频率

```ts
function displayMessageWithEffect(message: string) {
    let index = 0
    const container = document.getElementById('sse')
    if (container) {
        const newMessageElement = document.createElement('p')
        container.appendChild(newMessageElement)

        const updateText = () => {
            if (index < message.length) {
                newMessageElement.textContent += message[index]
                index++
                requestAnimationFrame(updateText)
            }
        }
        updateText()
    }
}
```



通过 `requestAnimationFrame` 替代 `setInterval`，`requestAnimationFrame` 会将更新逻辑合并到浏览器的渲染周期内，优化了 DOM 更新的时机，避免不必要的 DOM 重排和重绘。

### 为什么使用 requestAnimationFrame

- `requestAnimationFrame` 会在下一次浏览器重绘之前执行，因此相较于 `setInterval`，它能减少不必要的渲染，提高效率。
- 如果页面中有多个动画或需要高频更新的场景，使用 `requestAnimationFrame` 可以确保性能优化，避免阻塞主线程。

改完之后发现字符显示的效果变快了

这是因为 `requestAnimationFrame` 被触发的频率较高，通常它会在每个浏览器的重绘周期内执行，也就是通常每秒 60 次（每个帧大约 16.7 毫秒）。这个频率远远高于原来使用 `setInterval(100)` 的 100 毫秒一次的间隔，所以字符显示速度明显加快了。



## 文字逐字展示（打字机效果）

方案一：直接更新DOM

```ts
const start = () => {
    const source = new EventSource('/proxyApi/events')
    source.addEventListener('message', async (e) => {
        console.log('Message from server:', e.data)
        const chars: string[] = e.data.split('')
        for (const char of chars) {
            content.value += char
            await new Promise((resolve) => setTimeout(resolve, 20))
        }
        // content.value += `${e.data}\n\n`
        const message = e.data
        if (message === '[DONE]') {
            source.close()
        }
        // displayMessageWithEffect(message)
    })
    return source.close
}
```

优化方案：

#### **使用文档片段（DocumentFragment）**

```ts
const fragment = document.createDocumentFragment();
const tempEl = document.createElement('div');
fragment.appendChild(tempEl);

for (const char of chars) {
  tempEl.textContent += char;
  await delay(50);
}

outputEl.appendChild(fragment); // 单次DOM操作
```

```ts
const start = () => {
    const source = new EventSource('/proxyApi/events')
    source.addEventListener('message', async (e) => {
        console.log('Message from server:', e.data)
        const container = document.getElementById('sse')
        if (container) {
            const fragment = document.createDocumentFragment()
            const tempEl = document.createElement('p')
            fragment.appendChild(tempEl)
            container.appendChild(fragment)
            const chars: string[] = e.data.split('')
            for (const char of chars) {
                tempEl.textContent += char
                await sleep(20)
            }
        }
        const message = e.data
        if (message === '[DONE]') {
            source.close()
        }
    })
    return source.close
}
```



#### **利用 CSS 动画优化渲染**

```css
#output {
  will-change: contents; /* 提前声明变化属性 */
  contain: content;       /* 限制浏览器重排范围 */
}
```

#### **任务调度优化**

```js
function scheduleUpdate(char) {
  requestAnimationFrame(() => {
    outputEl.textContent += char;
  });
}
```

## 实现自定义打字机

这个打字机用于将**纯文本**逐字符展示

```ts
interface TypewriterOptions {
    /**
     * 每一帧输出多少个字符（一次“打”多少字）
     */
    chunkSize?: number
    /**
     * 每一帧的时间间隔（ms），越小越快
     */
    delay?: number
}

class Typewriter {
    private target: HTMLElement
    private chunkSize: number
    private delay: number
    private buffer: string[]
    private isRendering: boolean
    constructor(targetEl: HTMLElement, { chunkSize = 5, delay = 30 }: TypewriterOptions = {}) {
        this.target = targetEl
        this.chunkSize = chunkSize
        this.delay = delay
        this.buffer = []
        this.isRendering = false
    }

    addText(text: string) {
        this.buffer.push(...text.split(''))
        if (!this.isRendering) this.render()
    }

    async render(): Promise<void> {
        this.isRendering = true
        while (this.buffer.length > 0) {
            const chunk = this.buffer.splice(0, this.chunkSize)
            // 使用 DocumentFragment 避免多次 DOM 更新
            const fragment = document.createDocumentFragment()
            const span = document.createElement('span')
            span.innerHTML = chunk.join('')
            fragment.appendChild(span)
            this.target.appendChild(fragment)
            await new Promise((resolve) =>
                requestAnimationFrame(() => setTimeout(resolve, this.delay))
            )
        }
        this.isRendering = false
    }
}

export default Typewriter

// 使用
// const writer = new Typewriter(document.getElementById('output')!, { chunkSize: 10 })
// writer.addText('Hello, World!')
```



### Vue中的实现

```ts
interface TypeWriterOptions {
    /**
     * 每一帧输出多少个字符（一次“打”多少字）
     */
    chunkSize?: number
    /**
     * 每一帧的时间间隔（ms），越小越快
     */
    delay?: number
    /**
     * 每次更新的回调
     */
    onUpdate?: (currentText: string) => void
}

class TypeWriter {
    private buffer: string[] = []
    private chunkSize: number
    private delay: number
    private isRendering = false
    private currentText = ''
    private onUpdate?: (text: string) => void
    constructor({ chunkSize = 2, delay = 80, onUpdate }: TypeWriterOptions = {}) {
        this.chunkSize = chunkSize
        this.delay = delay
        this.onUpdate = onUpdate
    }

    addText(text: string) {
        this.buffer.push(...text.split(''))
        if (!this.isRendering) this.render()
    }

    async render(): Promise<void> {
        this.isRendering = true
        while (this.buffer.length > 0) {
            const chunk = this.buffer.splice(0, this.chunkSize).join('')
            this.currentText += chunk
            this.onUpdate?.(this.currentText)
            await new Promise((resolve) =>
                requestAnimationFrame(() => setTimeout(resolve, this.delay))
            )
        }
        this.isRendering = false
    }

    destory() {
        this.buffer = []
        this.currentText = ''
        this.isRendering = false
    }
}

export default TypeWriter

// 使用
// const writer = new Typewriter(document.getElementById('output')!, { chunkSize: 10 })
// writer.addText('Hello, World!')
```

requestAnimationFrame有个问题：不会在后台运行，也就是切换浏览器标签页后，文字不会继续输出，会被暂停！！！

### 支持暂停和恢复

```ts
export interface TypeWriterOptions {
    /**
     * 每一帧输出多少个字符（一次“打”多少字）
     */
    chunkSize?: number
    /**
     * 每一帧的时间间隔（ms），越小越快
     */
    delay?: number
    /**
     * 每次更新的回调
     */
    onUpdate?: (currentText: string) => void
    onFinished?: () => void
}

class TypeWriter {
    private buffer: string[] = []
    private chunkSize: number
    private delay: number
    private isRendering = false
    private isPaused = false
    private currentText = ''
    private onUpdate?: (text: string) => void
    private onFinished?: () => void
    constructor({ chunkSize = 2, delay = 80, onUpdate, onFinished }: TypeWriterOptions = {}) {
        this.chunkSize = chunkSize
        this.delay = delay
        this.onUpdate = onUpdate
        this.onFinished = onFinished
    }

    addText(text: string) {
        this.buffer.push(...text.split(''))
        if (!this.isRendering) this.render()
    }

    async render(): Promise<void> {
        this.isRendering = true
        while (this.buffer.length > 0) {
            if (this.isPaused) {
                await new Promise((resolve) => setTimeout(resolve, 50))
                continue
            }
            const chunk = this.buffer.splice(0, this.chunkSize).join('')
            this.currentText += chunk
            this.onUpdate?.(this.currentText)

            await new Promise((resolve) => setTimeout(resolve, this.delay))
        }
        this.isRendering = false
        if (!this.buffer.length) {
            this.onFinished?.()
        }
    }

    pause() {
        this.isPaused = true
    }

    resume() {
        if (this.isPaused) {
            this.isPaused = false
            if (!this.isRendering) this.render()
        }
    }

    destory() {
        this.buffer = []
        this.currentText = ''
        this.isRendering = false
    }
}

export default TypeWriter

// 使用
// const writer = new Typewriter(document.getElementById('output')!, { chunkSize: 10 })
// writer.addText('Hello, World!')
```

关于render的优化

另一种实现方式：递归 + `setTimeout` 的“回调式写法”

```ts
render() {
    this.isRendering = true
    const step = () => {
        if (this.destroyed || this.buffer.length === 0) {
            this.isRendering = false
            if (!this.destroyed) this.onFinished?.()
            return
        }

        if (this.isPaused) {
            this.timer = setTimeout(step, 50)
            return
        }

        const chunk = this.buffer.splice(0, this.chunkSize).join('')
        this.currentText += chunk
        this.onUpdate?.(this.currentText)
        this.timer = setTimeout(step, this.delay)
    }

    step()
}
```

setTimeout其实和requestAnimationFrame有同样的问题，切换标签页至后台时，setTimeout会有一个最小间隔限制（一般是1000ms）：`setTimeout(fn, delay)` 在非活动标签页中，`delay` 会被**强制提升到最小值**

此时页面输出会变得很慢，所以此方案也不行。

最佳解决方案：

当标签切换至后台时，页面输出可以停止，但是文字仍然会推进缓存中，当切回来时，一次性输出缓存的页面数据

```ts
export interface TypeWriterOptions {
    /**
     * 每一帧输出多少个字符（一次“打”多少字）
     */
    chunkSize?: number
    /**
     * 每一帧的时间间隔（ms），越小越快
     */
    delay?: number
    /**
     * 每次更新的回调
     */
    onUpdate?: (currentText: string) => void
    onFinished?: () => void
}

class TypeWriter {
    private buffer: string[] = []
    private chunkSize: number
    private delay: number
    private isRendering = false
    private isPaused = false
    private destroyed = false
    private currentText = ''
    private onUpdate?: (text: string) => void
    private onFinished?: () => void
    private animationFrameId: number | null = null
    private timeoutId: number | null = null
    constructor({ chunkSize = 2, delay = 80, onUpdate, onFinished }: TypeWriterOptions = {}) {
        this.chunkSize = chunkSize
        this.delay = delay
        this.onUpdate = onUpdate
        this.onFinished = onFinished
        this.handleVisibilityChange = this.handleVisibilityChange.bind(this)
        document.addEventListener('visibilitychange', this.handleVisibilityChange)
    }

    private handleVisibilityChange() {
        if (document.hidden) {
            // Tab is hidden, process text without rendering to accumulate it
            // No need to set isPaused, as render will handle it
        } else {
            // Tab is visible again, immediately update with current accumulated text
            this.onUpdate?.(this.currentText)
            // Resume rendering if it was paused or not finished
            if (!this.isRendering && this.buffer.length > 0) {
                this.render()
            }
        }
    }

    addText(text: string) {
        this.buffer.push(...text.split(''))
        if (!this.isRendering) this.render()
    }

    async render(): Promise<void> {
        this.isRendering = true
        while (!this.destroyed && this.buffer.length > 0) {
            if (this.isPaused) {
                await new Promise((resolve) => setTimeout(resolve, 50))
                continue
            }

            const chunk = this.buffer.splice(0, this.chunkSize).join('')
            this.currentText += chunk

            if (!document.hidden) {
                this.onUpdate?.(this.currentText)
                await new Promise<void>((resolve) => {
                    this.animationFrameId = requestAnimationFrame(() => {
                        this.timeoutId = setTimeout(() => {
                            this.animationFrameId = null
                            this.timeoutId = null
                            resolve()
                        }, this.delay)
                    })
                })
            } else {
                // If hidden, just accumulate text, don't update UI or delay
                // The onUpdate will be called when tab becomes visible again
            }
        }
        this.isRendering = false
        if (!this.buffer.length && !document.hidden) {
            this.onFinished?.()
        }
    }

    pause() {
        this.isPaused = true
    }

    resume() {
        if (this.isPaused) {
            this.isPaused = false
            if (!this.isRendering) this.render()
        }
    }

    destroy() {
        this.destroyed = true
        this.buffer = []
        this.currentText = ''
        this.isRendering = false
        this.isPaused = false
        document.removeEventListener('visibilitychange', this.handleVisibilityChange)
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId)
            this.animationFrameId = null
        }
        if (this.timeoutId) {
            clearTimeout(this.timeoutId)
            this.timeoutId = null
        }
    }

    reset() {
        this.destroyed = false
        this.buffer = []
        this.currentText = ''
        this.isRendering = false
        this.isPaused = false
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId)
            this.animationFrameId = null
        }
        if (this.timeoutId) {
            clearTimeout(this.timeoutId)
            this.timeoutId = null
        }
    }
}

export default TypeWriter
```

### 使用时间驱动

```ts
export interface TypeWriterOptions {
    /**
     * 每一帧输出多少个字符（一次“打”多少字）
     */
    chunkSize?: number
    /**
     * 每一帧的时间间隔（ms），越小越快
     */
    delay?: number
    /**
     * 页面不可见时是否跳过延时
     * true = 页面隐藏时仍然触发 delay
     * false = 页面隐藏时快速输出到缓冲
     * 默认 false
     */
    respectVisibilityDelay?: boolean
    /**
     * 每次更新的回调
     */
    onUpdate?: (currentText: string) => void
    onFinished?: () => void
}

/**
 * 对外可读的打字机状态
 */
export interface TypeWriterState {
    isRendering: boolean
    isPaused: boolean
    isDestroyed: boolean
    currentText: string
}

class TypeWriter {
    private buffer: string[] = []
    private chunkSize: number
    private delay: number
    private respectVisibilityDelay: boolean
    private isRendering = false
    private isPaused = false
    private destroyed = false
    private currentText = ''
    private onUpdate?: (text: string) => void
    private onFinished?: () => void
    private renderPromise: Promise<void> | null = null
    private timeoutId: number | null = null

    private startTime: number | null = null
    private baseChars: number = 0
    private lastVisibleTime: number | null = null

    private visibilityHandler?: () => void
    constructor({
        chunkSize = 2,
        delay = 80,
        onUpdate,
        onFinished,
        respectVisibilityDelay = true
    }: TypeWriterOptions = {}) {
        if (chunkSize < 1 || !Number.isFinite(chunkSize)) {
            throw new Error('chunkSize must be a positive integer')
        }
        if (delay < 0 || !Number.isFinite(delay)) {
            throw new Error('delay must be a non-negative integer')
        }
        this.chunkSize = Math.floor(chunkSize)
        this.delay = Math.floor(delay)
        this.onUpdate = onUpdate
        this.onFinished = onFinished
        this.respectVisibilityDelay = respectVisibilityDelay

        if (typeof document !== 'undefined') {
            this.visibilityHandler = this.handleVisibilityChange.bind(this)
            document.addEventListener('visibilitychange', this.visibilityHandler)
        }
    }

    /**
     * 页面可见性变化
     */
    private handleVisibilityChange() {
        if (typeof document === 'undefined') return
        if (!document.hidden) {
            this.refreshCurrentText()
            this.onUpdate?.(this.currentText)
            if (!this.isRendering && this.buffer.length > 0) {
                this.render()
            }
        }
    }

    addText(text: string) {
        if (this.destroyed) return
        if (!text) return
        this.buffer.push(...text.split(''))
        // 如果是第一次开始写，记录时间基线
        if (!this.startTime) {
            this.startTime = Date.now()
            this.baseChars = this.currentText.length
        }
        if (!this.isRendering) this.render()
    }

    private async _doRender() {
        this.isRendering = true
        try {
            while (!this.destroyed && this.buffer.length > 0) {
                if (this.isPaused) {
                    await this.delayFor(50)
                    continue
                }

                if (!this.shouldRenderFrame()) {
                    // 页面隐藏时啥都不做，不拼接，不耗时
                    await this.delayFor(200)
                    continue
                }

                // 页面可见时，实时推算应该显示到哪里
                this.refreshCurrentText()
                this.onUpdate?.(this.currentText)

                await this.delayFor(this.delay)
            }
            if (!this.destroyed && this.buffer.length === 0 && this.shouldRenderFrame()) {
                this.onFinished?.()
            }
        } finally {
            this.isRendering = false
            this.renderPromise = null
        }
    }
    /**
     * 根据当前时间推断应该显示到多少字符
     */
    private refreshCurrentText() {
        if (!this.startTime) return
        const now = Date.now()
        const elapsed = now - this.startTime
        const totalSteps = Math.floor(elapsed / this.delay)
        const targetChars = this.baseChars + totalSteps * this.chunkSize

        // 组装所有走到的文字
        const fullText = this.currentText + this.buffer.join('')
        this.currentText = fullText.slice(0, targetChars)

        // 更新 buffer
        const remaining = fullText.slice(targetChars)
        this.buffer = remaining.split('')
    }
    /**
     * 开始渲染
     */
    async render(): Promise<void> {
        if (this.renderPromise || this.destroyed) return
        this.renderPromise = this._doRender()
        return this.renderPromise
    }

    pause() {
        if (this.destroyed) return
        this.isPaused = true
    }

    resume() {
        if (this.destroyed) return
        this.isPaused = false
        if (!this.isRendering) this.render()
    }

    /**
     * 销毁，彻底停止并清理
     */
    destroy() {
        if (this.destroyed) return
        this.destroyed = true
        this.buffer = []
        this.currentText = ''
        this.isRendering = false
        this.isPaused = false
        if (this.timeoutId) {
            clearTimeout(this.timeoutId)
            this.timeoutId = null
        }
        if (typeof document !== 'undefined' && this.visibilityHandler) {
            document.removeEventListener('visibilitychange', this.visibilityHandler)
        }
    }

    /**
     * 重置到初始状态
     */
    reset() {
        this.destroyed = false
        this.buffer = []
        this.currentText = ''
        this.isRendering = false
        this.isPaused = false
        if (this.timeoutId) {
            clearTimeout(this.timeoutId)
            this.timeoutId = null
        }
        if (typeof document !== 'undefined' && this.visibilityHandler) {
            document.removeEventListener('visibilitychange', this.visibilityHandler)
            document.addEventListener('visibilitychange', this.visibilityHandler)
        }
    }

    /**
     * 外部可读取状态
     */
    getState(): TypeWriterState {
        return {
            isRendering: this.isRendering,
            isPaused: this.isPaused,
            isDestroyed: this.destroyed,
            currentText: this.currentText
        }
    }

    private delayFor(ms: number) {
        return new Promise((resolve) => {
            this.timeoutId = setTimeout(resolve, ms)
        })
    }
    /**
     * 判断是否在当前状态下应该做 UI 渲染
     */
    private shouldRenderFrame(): boolean {
        if (typeof document === 'undefined') return true
        if (!document.hidden) return true
        return this.respectVisibilityDelay
    }
}

export default TypeWriter
```





## nodejs实现SSE

```js
router.get('/events', async (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream')
  res.setHeader('Cache-Control', 'no-cache')
  res.setHeader('Connection', 'keep-alive')

  const sendData = (event, data) => {
    res.write(`event: ${event}\n`)
    res.write(`data: ${data}\n\n`)
  }

  sendData('message', 'Connected')
  await sleep(1000)

  sendData(
    'message',
    '\u53ef\u80fd\u4f1a\u5728\u540e\u7eed\u7684\u6570\u636e\u6e32\u67d3\u65f6\u51fa\u73b0\u4e0d\u5fc5\u8981\u7684\u91cd\u590d\u64cd\u4f5c\uff0c'
  )
  await sleep(1000)

  sendData(
    'message',
    '如果你想要对消息进行更细粒度的控制，比如添加时间戳、作者信息等，可以将每个消息包装成一个更复杂的 HTML 元素。'
  )
  await sleep(2000)
  sendData('message', '[DONE]')

  // 处理客户端关闭连接
  req.on('close', () => {
    res.end()
  })
})
```

使用

```ts
const writerInstance = ref<TypeWriter | null>(null)
let timeout = ref<number>()

const initWriterInstance = () => {
    writerInstance.value = new TypeWriter({
        chunkSize: 2,
        delay: 80,
        onUpdate: (text) => {
            content.value = text
        }
    })
}

const handleStartTypewriterDemo = () => {
    if (writerInstance.value) {
        writerInstance.value.destory()
        clearTimeout(timeout.value)
    }
    writerInstance.value?.addText('你好，这是一个打字机的演示！\n你可以在任意时刻追加更多文本。')
    timeout.value = setTimeout(() => {
        writerInstance.value?.addText('\n这是追加的新内容！支持多段输入。')
    }, 2000)
}
```

### 封装成hooks

```ts
```



## 使用@microsoft/fetch-event-source

https://github.com/Azure/fetch-event-source

安装

```sh
pnpm add @microsoft/fetch-event-source
```

使用

```ts
import { fetchEventSource } from '@microsoft/fetch-event-source'

const ctrl = new AbortController()
const signal = ctrl.signal
fetchEventSource('/proxyApi/events', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        foo: 'bar'
    }),
    signal,
    onmessage: (e) => {
        console.log('Message from server:', e.data)
        // content.value += `${e.data}\n\n`
        const message = e.data
        if (message === '[DONE]') {
            ctrl.abort()
        }
        displayMessageWithEffect(message)
    }
})
const dispose = () => ctrl.abort()
return dispose
```

