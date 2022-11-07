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

