---
title: grid布局
---

## grid layout 网格布局 与flex layout

[文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Grid_Layout/Relationship_of_Grid_Layout)

[阮一峰](https://www.ruanyifeng.com/blog/2019/03/grid-layout-tutorial.html)

首先，flex布局服务一维布局（沿横向或纵向的），grid布局服务于二维布局（同时沿着横向和纵向）。

具体可以看[mdn](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Grid_Layout/Relationship_of_Grid_Layout)的例子



display: grid

### what is grid？

网格是一组相交的水平线和垂直线，它定义了网格的列和行。

grid布局的概念，grid布局由最外层的container、内部的item构成，item内就是内容了

新单位: fr

cell



`display: grid` 后容器都是块级元素，也可设成行内块元素`display: inline-grid`



`grid-template-columns`属性定义每一列的列宽，即每一行几个；`grid-template-rows`属性定义每一行的行高，对应每一列几个。



```css
.container {
  display: grid;
  grid-template-columns: 100px 100px 100px;
  grid-template-rows: 100px 100px 100px;
}
```

除了使用绝对单位，也可以使用百分比。

#### repeat

`repeat()`函数，简化重复书写。接受两个参数，第一个参数是重复的次数，第二个参数是所要重复的值。

`repeat()`重复某种模式也是可以的。

```css
grid-template-columns: repeat(2, 100px 20px 80px);
```



grid-template-columns和grid-template-rows用于创建几行几列的网格





## gap

gap是 row-gap 和 column-gap 的简写

网格间距

```css
.container {
  gap: 10px 5px;
  /* 等效于 */
  column-gap: 10px;
  row-gap: 5px;
}
```



### item属性



```css
.item-1 {
  grid-column-start: 2;
  grid-column-end: 4;
}
/* 上面代码指定，1号项目的左边框是第二根垂直网格线，右边框是第四根垂直网格线。 */
```

这四个属性的值还可以使用`span`关键字，表示"跨越"，即左右边框（上下边框）之间跨越多少个网格。

```css
.item-1 {
  grid-column-start: span 2;
}
/* 上面代码表示，1号项目的左边框距离右边框跨越2个网格。 */
```



### grid单元格对齐方式控制

[【网格布局中的盒模型对齐】](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Grid_Layout/Box_Alignment_in_CSS_Grid_Layout)

属性 [`align-self`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/align-self) 和 [`align-items`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/align-items) 用于控制项目在块方向的轴上对齐

align-items作用于父元素，属性将所有直接子节点上的 align-self 值设置为一个组。

justify-items、align-items 控制整个grid盒模型的对齐方式

justify-self、Align-self 控制单个盒内元素自身的对齐方式，分别对应水平和垂直。



## 合并单元格

[Grid Areas](https://developer.mozilla.org/zh-CN/docs/Glossary/Grid_areas)

#### [grid-template-areas](https://developer.mozilla.org/zh-CN/docs/Web/CSS/grid-template-areas)

grid-template-areas 会受到 grid-grid-template-columns 和 grid-template-rows 的影响



### grid-column

是 `grid-column-start` 和 `grid-column-end` 的简写

span关键字 表示跨越

```css
grid-column: 1 / 3;
/*
表示1～3 不包含3
等效于 grid-column: 1 / span 2;
*/
grid-column: 2 / -1;
/* 表示从第二个grid开始，到该行最后一个 */

gird-column: span 2; /* 注意有个空格 */
/* 表示该元素占2个网格 */
```







#### grid-column-start

**span**关键字，表示"跨越"，即左右边框（上下边框）之间跨越多少个网格。



### 总结

##### 学完之后谈谈对grid布局的认识，以及什么时候用grid布局，什么时候用flex？

当页面内容需要对齐排列时，而某一个元素可能长一点，也可能短一点。这个时候就用grid。

<img src="/Users/cheng/Library/Application Support/typora-user-images/image-20220331125857553.png" alt="image-20220331125857553" style="zoom:50%;" />

上面的例子是使用flex布局的justify-content: space-between，由于最右边的元素长短不一，导致中间的元素没有对齐。

这个时候使用grid就非常容易解决
