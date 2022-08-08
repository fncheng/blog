---
title: 媒体查询
---

## 什么是媒体查询

媒体查询写入样式表

```css
/*
  @media mediatype and|not|only (media feature) {
     CSS-Code;
  }
  mediatype是指媒体的类型，有三个值，最常用的就是screen意为 在屏幕上
  and（可以将多个媒体特性连接到一起‘且’），ont（排除某个媒体类型‘非’），only，媒体特性
*/
```

[关于媒体查询](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/CSS_layout/Media_queries)

> **CSS媒体查询**为你提供了一种应用CSS的方法，仅在浏览器和设备的环境与你指定的规则相匹配的时候CSS才会真的被应用，例如“视口宽于480像素”的时候。

什么是视口宽度❓

这里的视口，指的是浏览器窗口，视口宽度就是浏览器可视区域的宽度(不包括搜索栏、书签栏等)window.innerWidth和window.innerHeight

== 而window.outerWidth和window.outerHeight 则是包括搜索栏在内的宽高



> 注意⚠️：媒体查询应该写在css文件的最后，防止规则被覆盖而未生效



书写顺序

1. 如果判断`min-width`，则从小到大
2. 如果判断`max-width`，则从大到小



逻辑操作符

and、not、only、,(逗号)



## prefers-color-scheme

https://developer.mozilla.org/zh-CN/docs/Web/CSS/@media/prefers-color-scheme

用于检测用户是否有将系统的主题色设置为亮色或者暗色。

