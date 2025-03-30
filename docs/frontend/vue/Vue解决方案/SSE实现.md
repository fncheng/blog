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

#### 实现自定义打字机

```ts
interface TypewriterOptions {
    chunkSize?: number
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

