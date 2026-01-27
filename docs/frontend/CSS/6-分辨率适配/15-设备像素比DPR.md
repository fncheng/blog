## 像素比（DPR）

获取设备像素比——window.devicePixelRatio

```ts
```

使用 `matchMedia()` 监听 DPR 变化

```js
const dprQuery = window.matchMedia("(resolution: 2dppx)");
dprQuery.addEventListener("change", (e) => {
  if (e.matches) {
    console.log("DPR 变为 2");
  }
})
```



### DPPX和resolution

`resolution` 媒体查询可以检查以下三种单位之一：

- **dpi** — 每英寸点数（dots per inch）
- **dpcm** — 每厘米点数（dots per centimeter）
- **dppx** — 每像素单位点数（dots per px unit）

`1dppx` 代表 **1 倍像素密度**，`2dppx` 代表 **2x DPR**

如果你需要在 **CSS 中使用 DPR**，可以通过 `:root` 变量传递：

```css
:root {
  --dpr: 1; /* 默认值 */
}

@media (resolution: 2dppx) {
  :root {
    --dpr: 2;
  }
}

@media (resolution: 3dppx) {
  :root {
    --dpr: 3;
  }
}
```

然后在 **JS 读取 CSS 变量**：

```js
const dpr = getComputedStyle(document.documentElement).getPropertyValue("--dpr");
console.log("DPR:", dpr);
```

示例：

```css
@media screen and (max-resolution: 300dpi) {
    .title {
        color: blue;
    }
}
@media screen and (max-resolution: 192dpi) {
    .title {
        color: green;
    }
}
@media screen and (max-resolution: 128dpi) {
    .title {
        color: yellow;
    }
}

@media (resolution: 1x) {
    .content {
        color: red;
    }
}
@media (resolution: 2x) {
    .content {
        color: blue;
    }
}

@media (min-resolution: 1dppx) {
    .bg {
        background-color: pink;
    }
}
@media (min-resolution: 2dppx) {
    .bg {
        background-color: lightgreen;
    }
}
```