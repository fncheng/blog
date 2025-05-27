## PDF.js的使用

1. **安装 PDF.js 库**

```sh
pnpm add pdfjs-dist
```

2.引入PDF.js

```tsx
import { useEffect, useRef } from 'react'
import * as pdfjsLib from 'pdfjs-dist'
import 'pdfjs-dist/web/pdf_viewer.css'
// import pdfWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?worker'

// pdfjsLib.GlobalWorkerOptions.workerSrc = URL.createObjectURL(new pdfWorker())
pdfjsLib.GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/build/pdf.worker.mjs', import.meta.url).href

interface PDFViewerProps {
    fileUrl: string // PDF 文件的 URL
}

const PDFViewer: React.FC<PDFViewerProps> = ({ fileUrl }) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null)
    useEffect(() => {
        const loadingTask = pdfjsLib.getDocument(fileUrl)
        loadingTask.promise
            .then((pdf: any) => {
                console.log('PDF 加载成功:', pdf)

                // 渲染第 1 页
                pdf.getPage(1).then((page: any) => {
                    const viewport = page.getViewport({ scale: 1.5 })
                    const canvas = canvasRef.current

                    if (canvas) {
                        const context = canvas.getContext('2d')
                        canvas.height = viewport.height
                        canvas.width = viewport.width

                        const renderContext = {
                            canvasContext: context,
                            viewport: viewport
                        }

                        page.render(renderContext)
                    }
                })
            })
            .catch((error: any) => {
                console.error('PDF 加载失败:', error)
            })
    }, [fileUrl])
    return (
        <div>
            <h3>pdf预览</h3>
            <canvas ref={canvasRef} height={500}></canvas>
        </div>
    )
}

export default PDFViewer
```

这里使用 `/assets/pdf.worker.mjs` 是因为使用了`vite-plugin-static-copy` 插件将 Worker 文件复制到输出目录中

```ts
import { defineConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy'

export default defineConfig({
  plugins: [
    viteStaticCopy({
      targets: [
        {
          src: 'node_modules/pdfjs-dist/build/pdf.worker.mjs',
          dest: 'assets',
        },
      ],
    }),
  ],
});
```

这种方法可以有效避免 CDN 依赖，尤其适合在内网环境或生产部署时直接使用本地文件

### 在Vite项目中引入worker文件

方式一：利用 Vite 的 URL 机制动态生成 worker 地址

```ts
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf";
// 使用 Vite 内置的 URL 机制获取 pdf.worker.js 的打包后路径
pdfjsLib.GlobalWorkerOptions.workerSrc = new URL("pdfjs-dist/build/pdf.worker.js", import.meta.url).href;
```

方式二：将 worker 文件放到 public或assets 目录

需要注意的是，如果设置了route base，那么你的路径也需要带上base

```ts
pdfjsLib.GlobalWorkerOptions.workerSrc =  '/app/assets/pdf.worker.mjs'
```





## 多页PDF文件渲染

`pdf.js` **默认加载 PDF 时只会渲染第一页**

修改组件，实现多页渲染

```tsx
const PDFViewer: React.FC<PDFViewerProps> = ({ fileUrl }) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null)

    const [pdfDocument, setPdfDocument] = useState<any>(null) // PDF 对象
    const [currentPage, setCurrentPage] = useState<number>(1) // 当前页
    const [numPages, setNumPages] = useState<number>(0) // 总页数

    useEffect(() => {
        const loadingTask = pdfjsLib.getDocument(fileUrl)
        loadingTask.promise
            .then((pdf: any) => {
                console.log('PDF 加载成功:', pdf)

                setPdfDocument(pdf)
                setNumPages(pdf.numPages)
                setCurrentPage(1)

                renderPage(pdf, currentPage)

                // 渲染第 1 页
                // pdf.getPage(1).then((page: any) => {
                //     const viewport = page.getViewport({ scale: 1.5 })
                //     const canvas = canvasRef.current

                //     if (canvas) {
                //         const context = canvas.getContext('2d')
                //         canvas.height = viewport.height
                //         canvas.width = viewport.width

                //         const renderContext = {
                //             canvasContext: context,
                //             viewport: viewport
                //         }

                //         page.render(renderContext)
                //     }
                // })
            })
            .catch((error: any) => {
                console.error('PDF 加载失败:', error)
            })
    }, [fileUrl])

    /**
     * 渲染 PDF 页面
     * @param pdf PDF 文档对象
     * @param pageNumber 页面号
     */
    const renderPage = (pdf: any, pageNumber: number) => {
        pdf.getPage(pageNumber).then((page: any) => {
            const viewport = page.getViewport({ scale: 1.5 })
            const canvas = canvasRef.current

            if (canvas) {
                const context = canvas.getContext('2d')
                canvas.height = viewport.height
                canvas.width = viewport.width

                const renderContext = {
                    canvasContext: context,
                    viewport: viewport
                }

                page.render(renderContext)
            }
        })
    }
    /**
     * 上一页
     */
    const handlePreviousPage = () => {
        if (currentPage > 1) {
            const prevPage = currentPage - 1
            setCurrentPage(prevPage)
            renderPage(pdfDocument, prevPage)
        }
    }
    /**
     * 下一页
     */
    const handleNextPage = () => {
        if (currentPage < numPages) {
            const nextPage = currentPage + 1
            setCurrentPage(nextPage)
            renderPage(pdfDocument, nextPage)
        }
    }
    return (
        <div>
            <h3>pdf预览</h3>
            <canvas ref={canvasRef} height={500}></canvas>
            {/* 分页控制 */}
            <div style={{ marginTop: '10px' }}>
                <Button onClick={handlePreviousPage} disabled={currentPage <= 1}>
                    上一页
                </Button>
                <span style={{ margin: '0 10px' }}>
                    第 {currentPage} 页 / 共 {numPages} 页
                </span>
                <Button onClick={handleNextPage} disabled={currentPage >= numPages}>
                    下一页
                </Button>
            </div>
        </div>
    )
}
```



## Vue PDF.js

将上面的代码转换成Vue代码

发现第一页能正常显示，但是点击下一页报错Cannot read from private field

经排查是pdfDoc.getPage这里出了了问题：
和vue3的proxy有关，

vue2是通过defineProperty来监听数据的改变和读取，
vue3是通过proxy来改变数据的。
但是在pdfjs-dist源码中，做了一个拦截校验，校验内容就是当前传入的参数，是否有obj对象，如果没有的话，直接抛出读不到私有变量错误。在之前老项目中，这样写是没有问题的：在pdfjs-dist拦截校验的时候，是一个MaskXXX（好像叫这个名字）的对象。在vue3中，pdfjs-dist拦截校验的时候，获取到的是一个proxy对象

==正确解法：pdfDoc.getPage的pdfDoc不要使用响应式写法！！！==

[Issue传送门](https://github.com/mozilla/pdf.js/issues/16312)

```ts
import * as pdfjsLib from 'pdfjs-dist'
import 'pdfjs-dist/web/pdf_viewer.css'
// import pdfWorker from 'pdfjs-dist/build/pdf.worker.mjs?worker';

// pdfjsLib.GlobalWorkerOptions.workerSrc = URL.createObjectURL(new pdfWorker());
pdfjsLib.GlobalWorkerOptions.workerSrc = '/assets/pdf.worker.mjs'

type PDFViewerProps = {
    fileUrl: string
}

const props = defineProps<PDFViewerProps>()

const canvasRef = ref<HTMLCanvasElement | null>(null)

let pdfDoc: any = '' // 不能使用响应式变量
const currentPage = ref<number>(1)
const numPages = ref<number>(0)

watch(
    () => props.fileUrl,
    (val) => {
        const loadingTask = pdfjsLib.getDocument(val)
        loadingTask.promise
            .then((pdf: any) => {
                console.log('PDF 加载成功:', pdf)

                pdfDoc = pdf
                numPages.value = pdf.numPages
                currentPage.value = 1
                renderPage(currentPage.value)
            })
            .catch((err: any) => {
                console.log('PDF 加载失败:', err)
            })
    },
    { immediate: true }
)

const renderPage = async (pageNumber: number) => {
    if (!pdfDoc) return
    const page = await pdfDoc.getPage(pageNumber)
    if (page) {
        const viewport = page.getViewport({ scale: 1 })
        const canvas = canvasRef.value
        if (canvas) {
            const context = canvas.getContext('2d')
            canvas.height = viewport.height
            canvas.width = viewport.width
            page.render({
                canvasContext: context,
                viewport
            })
        }
    }
}

const handlePreviousPage = () => {
    if (currentPage.value > 1) {
        currentPage.value -= 1
        renderPage(currentPage.value)
    }
}
const handleNextPage = () => {
    if (currentPage.value < numPages.value) {
        currentPage.value += 1
        renderPage(currentPage.value)
    }
}
```

如何正确引入pdf.worker

写法一：

```ts
pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.mjs',
    import.meta.url
).toString()
```



## Web Viewer方式预览

还可以利用`pdf.js` 提供的 **Web Viewer** (`viewer.html`) 来加载 PDF 文件，可以直接在 `<iframe>` 中使用，非常方便，并且支持完整的 `pdf.js` 交互功能，如分页、缩放、搜索等。

```html
<iframe
  src="https://mozilla.github.io/pdf.js/web/viewer.html?file=https://example.com/sample.pdf"
  width="100%"
  height="600px"
></iframe>
```

先下载二进制blob，然后提供给WebViewer

```ts
const pdfViewerUrl = ref('')
const pdfUrl = ref('')

getDownloadPdf().then((res) => {
  console.log('res', res)
  pdfUrl.value = URL.createObjectURL(res)
  pdfViewerUrl.value = `/pdfjs/web/viewer.html?file=${pdfUrl.value}`
})
```

### 控制pdf翻页

如果 `Web Viewer` 是嵌套在 `iframe` 里，你需要 **获取 iframe 内部的 `PDFViewerApplication`**

```ts
const iframe = document.getElementById("pdfIframe"); // 获取 iframe
const pdfViewer = iframe.contentWindow.PDFViewerApplication; // 访问 iframe 内部对象

// 翻页
pdfViewer.page++; // 下一页
pdfViewer.page--; // 上一页
```

下载pdf并展示

```ts
const pdfViewerUrl = ref('')
const pdfUrl = ref('')

const iframeRef = useTemplateRef('iframeRef')
/** iframe文档 */
let iframeDocument: Document | null | undefined
let pdfDocument: PDFDocumentProxy | undefined
let pdfViewerApp: any

const downloadPdfFun = async () => {
  console.log('123', props.filePath)
  let res = await downloadPdf(props.filePath)
  if (res) {
    console.group('respdf==============: ', res)
    pdfUrl.value = URL.createObjectURL(res)
    pdfViewerUrl.value = `/pdfjs/web/viewer.html?file=${pdfUrl.value}`
    loading.value = false
    iframeRef.value?.addEventListener('load', () => {
      /** 等待iframe加载完成 */
      // iframeDocument = iframeRef.value?.contentDocument || iframeRef.value?.contentWindow?.document
      // console.group('iframeDocument: ', iframeDocument)
      // const el = iframeDocument?.querySelector('#mainContainer')
      // console.log('el: ', el)
      if (iframeRef.value?.contentWindow) {
        const pdfWindow = iframeRef.value.contentWindow
        pdfViewerApp = iframeRef.value.contentWindow.PDFViewerApplication
        console.group('pdfViewerApp: ', pdfViewerApp)
        pdfViewerApp.eventBus.on('documentloaded', () => {
          /** 等待PDFViewerApplication加载完成 */
          iframeDocument = pdfWindow.document
          console.log('PDF文档加载完成', iframeDocument)
          // 创建高亮区域
          let div = iframeDocument.createElement('div')
          div.style.backgroundColor = 'rgba(75, 114, 239, 0.2)'
          div.style.left = '5%'
          div.style.right = '5%'
          div.style.position = 'absolute'
          div.id = 'layerUnique'

          const pagesCount = pdfViewerApp.pagesCount
          pdfDocument = pdfViewerApp.pdfDocument
          console.log('pdfDocument: ', pdfDocument)
        })
      }
    })
  }
}
```

**优化点**

1. **`PDFViewerApplication` 访问时机**
   - 你在 `iframe` `load` 事件中直接访问 `PDFViewerApplication`，但它可能还未初始化完成，建议使用 `webviewerloaded` 事件监听。
2. **`documentloaded` 事件**
   - 你使用 `eventBus.on('documentloaded', callback)` 来监听 PDF 加载完成，但如果 `pdf.js` 的版本较新，应该监听 `pagesinit` 事件更稳定。
3. **iframe 的 `contentWindow` 安全性**
   - 你可以在 `iframe` 加载完成后，先检查 `contentWindow` 是否可用。



### contentDocument和contentWindow.document的区别

| 属性                          | 说明                                      | 兼容性                                   | 推荐使用 |
| ----------------------------- | ----------------------------------------- | ---------------------------------------- | -------- |
| iframe.contentDocument        | 直接访问 iframe 内部的 document           | 现代浏览器支持，但部分旧版 IE 可能不支持 | ✅ 推荐   |
| iframe.contentWindow.document | 先访问 iframe 的 window，再获取 dÏocument | 更通用，兼容所有浏览器                   | ✅ 可选   |



## 触发pdfjs自带的搜索功能

```ts
const pdfViewerApp = iframeRef.value.contentWindow.PDFViewerApplication

pdfViewerApp.findBar.open()
pdfViewerApp.findBar.findField.value = 'admin';
pdfViewerApp.findBar.dispatchEvent(new Event('input'));
```

