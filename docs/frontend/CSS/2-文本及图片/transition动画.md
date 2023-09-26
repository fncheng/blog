# transition动画

## transition

https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Transitions/Using_CSS_transitions

> CSS transitions 可以决定哪些属性发生动画效果 (明确地列出这些属性)，何时开始 (设置 delay），持续多久 (设置 duration) 以及如何动画 (定义*timing function*，比如匀速地或先快后慢)。



### transition-timing-function

> *描述:* 这个 `transition-timing-function` 属性描述了动画随着时间运动的速度-时间函数。可以使用几种常见的调速函数，也可以使用立方贝塞尔(cubic bezier)函数加控制点来自定义动画的变换速度方式。对于立方贝塞尔曲线方程，我们需要两个点的（X,Y）来控制曲线。点 P0 固定是 (0,0) 而 P3 固定是 (1,1)。有了这个四个点就能计算出一条立方贝塞尔曲线。

```css
transition-timing-function: linear|ease|ease-in|ease-out|ease-in-out|cubic-bezier(n,n,n,n);
```

| 值                    | 描述                                                         |
| --------------------- | ------------------------------------------------------------ |
| linear                | 规定以相同速度开始至结束的过渡效果（等于 cubic-bezier(0,0,1,1)）。 |
| ease                  | 规定慢速开始，然后变快，然后慢速结束的过渡效果（cubic-bezier(0.25,0.1,0.25,1)）。 |
| ease-in               | 规定以慢速开始的过渡效果（等于 cubic-bezier(0.42,0,1,1)）。  |
| ease-out              | 规定以慢速结束的过渡效果（等于 cubic-bezier(0,0,0.58,1)）。  |
| ease-in-out           | 规定以慢速开始和结束的过渡效果（等于 cubic-bezier(0.42,0,0.58,1)）。 |
| cubic-bezier(n,n,n,n) | 在 cubic-bezier 函数中定义自己的值。可能的值是 0 至 1 之间的数值。 |

![](https://www.webhek.com/wordpress/wp-content/uploads/2015/12/bezier.png)

## 下拉菜单动画

[CodeSandBox](https://codesandbox.io/s/transition-dropdown-768jfp?file=/src/Transform.tsx)

来看一段过渡动画

```css
.agi-zoom-in-top-enter-active,.agi-zoom-in-top-leave-active {
    opacity: 1;
    -webkit-transform: scaleY(1);
    transform: scaleY(1);
    transition: opacity .3s cubic-bezier(.23,1,.32,1),-webkit-transform .3s cubic-bezier(.23,1,.32,1);
    transition: transform .3s cubic-bezier(.23,1,.32,1),opacity .3s cubic-bezier(.23,1,.32,1);
    transition: transform .3s cubic-bezier(.23,1,.32,1),opacity .3s cubic-bezier(.23,1,.32,1),-webkit-transform .3s cubic-bezier(.23,1,.32,1);
    -webkit-transform-origin: center top;
    transform-origin: center top
}

.agi-zoom-in-top-enter,.agi-zoom-in-top-leave-active {
    opacity: 0;
    -webkit-transform: scaleY(0);
    transform: scaleY(0)
}
```

首先元素出现的时候启用`transition: transform .3s cubic-bezier(.23,1,.32,1),opacity .3s cubic-bezier(.23,1,.32,1)`这条规则，并且transform-origin为元素上边框中间

元素消失的时候先将元素不透明度降低到1用来隐藏元素，然后将元素拍平【transform: scaleY(0)】

`scaleY(0)` 将元素在垂直方向上的尺寸缩放为原来的0%，使其变得不可见（高度为0）



## transform

```css
scale(sx, sy)
```

*sx*

[`number`]，表示缩放向量的横坐标。

*sy*

[`number`]，表示缩放向量的纵坐标。如果未设置，则他的默认值被设置为 ***sx***。 从而使得元素在保持原有形状下均等缩放



scale(2) 表示横向和纵向都放大2倍

当坐标值处于区间 [`-1, 1]` 之外时，该变换将在相应的坐标方向上放大该元素，当处在区间之中时，该变换将在相应的坐标方向上缩小该元素。当值为1时将不进行任何处理，当为负数时，将进行*像素点反射*之后再进行大小的修改（即缩为0再放大 ）。





Animation动画

### 关键帧@keyframes

要使用关键帧, 先创建一个带名称的 `@keyframes` 规则，以便后续使用 [`animation-name`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/animation-name) 属性将动画同其关键帧声明匹配。每个 `@keyframes` 规则包含多个关键帧，也就是一段样式块语句，每个关键帧有一个百分比值作为名称，代表在动画进行中，在哪个阶段触发这个帧所包含的样式。





## animation

```css
animation: name duration timing-function delay iteration-count direction fill-mode;
```



## 使用transform给元素添加显示和隐藏动画

使用 `display: none;` 样式属性的元素不会显示任何过渡动画，因为该属性会立即将元素从文档流中移除，导致元素在下一帧中就不再存在，因此无法应用过渡效果。

要为元素添加过渡动画，你可以使用 CSS 的 `transition` 属性或 CSS 动画来实现。

```css
.zoom-enter {
    transform: scaleY(1);
    opacity: 1;
    max-height: fit-content;
}
.zoom-leave {
    max-height: 0;
    transform: scaleY(0);
    opacity: 0;
    padding: 0;
    margin: 0;
}
```

这样会有一个问题，当元素收起来时，原有的高度还在那里，下面的元素不会往上移动，导致页面有空白

要解决这个问题，你可以使用一种叫做“折叠元素（Collapsible Element）”的方法，以确保隐藏的元素不再占据空间。

以下是一种常见的实现方式，使用 `max-height` 属性来实现折叠元素的效果：

```css
/* 初始状态 */
.collapse-element {
  max-height: 1000px; /* 初始高度设置为足够大，确保元素可见 */
  transition: max-height 0.3s ease; /* 定义过渡效果 */
  overflow: hidden; /* 隐藏溢出的内容 */
}

/* 隐藏状态 */
.collapse-element.collapsed {
  max-height: 0; /* 高度设置为 0，元素不可见 */
}
```

这样设置后元素还会有空白存在

通常是因为在折叠状态下元素的边框、内边距或外边距（margin）等属性仍然存在

### max-height会导致transform-origin 失效
