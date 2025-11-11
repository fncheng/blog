## iframe内使用querySelector

**方法 1：使用 `contentDocument`**

适用于同源 `iframe`（**iframe 的 src 与主页面同源**）。

```ts
const iframe = document.querySelector("iframe"); // 获取 iframe 元素
const iframeDoc = iframe.contentDocument; // 获取 iframe 的 document
const element = iframeDoc.querySelector(".some-class"); // 在 iframe 内查询元素
console.log(element);
```

**方法 2：使用 `contentWindow.document`**

`contentWindow` 也是 `iframe` 内部的 `window`，可以通过 `.document` 访问 `iframe` 的 DOM：

```ts
const iframe = document.querySelector("iframe"); 
const iframeDoc = iframe.contentWindow.document;
const element = iframeDoc.querySelector("#some-id");
console.log(element);
```

**方法 3：等待 iframe 加载后查询**

```ts
const iframe = document.querySelector("iframe");

iframe.addEventListener("load", () => {
  const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
  const element = iframeDoc.querySelector(".target-class");
  console.log(element);
});
```

| 属性                         | 类型            | 作用                                    | 典型用途                               |
| ---------------------------- | --------------- | --------------------------------------- | -------------------------------------- |
| **`iframe.contentWindow`**   | `Window` 对象   | 表示 `<iframe>` 内部页面的全局 `window` | 用来访问 iframe 内的 JS 变量、执行脚本 |
| **`iframe.contentDocument`** | `Document` 对象 | 表示 `<iframe>` 内部页面的文档对象      | 用来访问 iframe 内的 DOM 内容          |



```ts
const iframeWindow = iframeDom.contentWindow || iframeDom.contentDocument.parentWindow
```

这是一种兼容性写法

现代浏览器（Chrome / Firefox / Safari / Edge）

直接使用：

```
iframeDom.contentWindow
```

就能拿到 iframe 内的 `window` 对象。
 例如：

```
iframeDom.contentWindow.document // iframe 内的文档
```

⚙️ 旧版 IE（IE8、IE9）

IE 曾经使用另一种属性链：

```
iframeDom.contentDocument.parentWindow
```

才能获取到 `window` 对象。
