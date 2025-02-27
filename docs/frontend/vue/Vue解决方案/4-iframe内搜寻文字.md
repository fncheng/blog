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

