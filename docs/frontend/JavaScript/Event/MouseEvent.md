---
title: 鼠标事件
---



## MouseEvent

[MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/MouseEvent)



**property：**

clientX，clientY：鼠标指针在点击元素（DOM）中的X坐标。距浏览器窗口

offsetX，offsetY：鼠标指针相对于目标节点内边位置的X坐标，即触发的元素。被点击的元素距左上角为参考原点的长度

screenX，screenY：鼠标指针相对于全局（屏幕）的X坐标；

x，y：clientX，clientY的别名

cl

### e.clientX和e.pageX

e.clientX

- `e.clientX` 返回鼠标事件相对于浏览器窗口视口（viewport）的水平坐标。即，它表示鼠标指针在视口内的横向位置。
- 它不考虑页面的滚动，因此在滚动页面时，即使鼠标在同一位置，`e.clientX` 的值也会保持不变。

e.pageX

- `e.pageX` 返回鼠标事件相对于整个文档页面的水平坐标。即，它表示鼠标指针在整个页面内的横向位置。
- 它考虑了页面的滚动，因此在滚动页面时，`e.pageX` 的值会随之改变，以反映鼠标在页面上的实际位置。

## Pointer Events

https://developer.mozilla.org/zh-CN/docs/Web/API/Pointer_events