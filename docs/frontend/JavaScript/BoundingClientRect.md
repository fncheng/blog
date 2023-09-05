## Element.getBoundingClientRect()

返回元素的大小及其相对于视口的位置。

返回一个[DOMRect](https://developer.mozilla.org/zh-CN/docs/Web/API/DOMRect)对象

x: 元素左上角到原点 x 坐标

y: 元素左上角到原点 y坐标

left：矩形的左边界到左侧视口距离

top: 矩形的上边界到上面视口的距离

right：矩形的右边界到左侧视口距离



### 获取页面滚动距离

window.scollY表示的是视口距离文档顶部的距离，而不是页面滚动的距离

用最后的window.scollY 减去 初始的window.scollY就可以得到滚动距离instance
