# 利用视口单位实现适配布局

https://aotu.io/notes/2017/04/28/2017-4-28-CSS-viewport-units/index.html

视口，在桌面端，毫无疑问指的就是浏览器的可视区域；但是在移动端，它指的则是三个 Viewport 中的 Layout Viewport 。

Layout Viewport（布局视口）、 Visual Viewport（视觉视口）、Ideal Viewport。

根据[CSS3规范](https://drafts.csswg.org/css-values-3/#viewport-relative-lengths)，视口单位主要包括以下4个：

- **vw** : 1vw 等于视口宽度的1%
- **vh** : 1vh 等于视口高度的1%
- **vmin** : 选取 vw 和 vh 中最小的那个
- **vmax** : 选取 vw 和 vh 中最大的那个

视口单位区别于`%`单位，视口单位是依赖于视口的尺寸，根据视口尺寸的百分比来定义的；而`%`单位则是依赖于元素的祖先元素。

例如，在桌面端浏览器视口尺寸为650px，那么 1vw = 650 * 1% = 6.5px（这是理论推算的出，如果浏览器不支持0.5px，那么实际渲染结果可能是7px）。



## 视口（Viewport）

https://developer.mozilla.org/zh-CN/docs/Web/CSS/Viewport_concepts

⚠️：`innerHeight` 和 `innerWidth` 所组成的区域通常被认为是**布局视口(layout viewport)** 。浏览器的框架不被认为是 viewport 的一部分.

Web 浏览器包含两个 viewport，**布局视口(layout viewport)**和**视觉视口(visual viewport)**。



#### \<iframe>

需要注意的是，当你在 CSS 中使用 `vw` 和 `vh` 设置 `iframe` 的样式时，`1vh` 表示的是 `iframe` 高度的1%，但 `1vw` 表示的则是 document 宽度的 1%。







使用vw作为css的单位，在浏览器内缩放时，元素不会跟着放大和缩小。

```css
// 100px 大小的div baseWidth=750px 1vw= 7.5px
div{
  width: 13.3333vw;
  height: 13.3333vw;
}
```

