## Web Worker的两种调用方式

第一种：

```ts
const worker = new Worker(new URL('./myWorker.ts', import.meta.url), { type: 'module' })
worker.postMessage(largeText)
worker.onmessage = (e) => {
    const lines = e.data
    console.log('处理完成：', lines.length, '行')
}
```

- 构建后 Worker 代码独立成文件，体积较大时更合理（比如splitWorker.ce1a7527.js）



第二种：

```ts
import myWorker from './myWorker?worker'
const worker = new myWorker()
worker.postMessage(largeText)
worker.onmessage = (e) => {
    const lines = e.data
    console.log('处理完成：', lines.length, '行')
}
```

- 构建后也会生成Worker文件

需要注意的是：

如果使用第二种方案，如果你的web worker文件作为第三方库使用的，在主项目中引入后打包，构建后的产物是不会包含web worker文件的。

## Web Worker中的self

- 在 Worker 文件里（比如 `myWorker.ts`），你其实是在定义 Worker 自己的“事件监听器”；
- `self` 就是指向 Worker 自身，所以你可以通过 `self.postMessage()` 来向主线程发消息；
- 主线程那边是用 `worker.onmessage` 来接收消息。



## 封装成Promise异步调用

```ts
// splitWorkerClient.ts
// 封装一个调用 worker 的 Promise 函数
import SplitWorker from '../workers/splitWorker?worker&inline'

export function createSplitWorker(text: string): Promise<string[]> {
  return new Promise((resolve, reject) => {
    const worker = new SplitWorker()

    worker.onmessage = (e) => {
      resolve(e.data)
      worker.terminate()
    }

    worker.onerror = (err) => {
      reject(err)
      worker.terminate()
    }

    worker.postMessage(text)
  })
}
```

