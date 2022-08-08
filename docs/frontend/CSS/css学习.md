---
title: css笔记
---

## 推荐的 css 书写顺序

1. 位置属性(position, top, right, z-index, display, float 等)
2. 大小(width, height, padding, margin)
3. 文字系列(font, line-height, letter-spacing, color- text-align 等)
4. 背景(background, border 等)
5. 其他(animation, transition 等)

---

1. 影响文档流的属性（比如：display, position, float, clear, visibility, table-layout 等）
2. 自身盒模型的属性（比如：width, height, margin, padding, border 等）
   3. 排版相关属性（比如：font, line-height, text-align, text-indent, vertical-align 等等）
      4. 装饰性属性（比如：color, background, opacity, cursor 等）
         5. 生成内容的属性（比如：content, list-style, quotes 等）

---

<!-- more -->

### font 属性

font 简写属性在一个声明中设置所有字体属性。

可设置的属性是（按顺序）：

- font-style 字体风格
- font-variant ——字体异体
- font-weight——字体粗细
- font-size/line-height——字体大小
- font-family

font-size 和 font-family 的值是必需的。如果缺少了其他值，默认值将被插入，如果有默认值的话。

### 背景- 简写属性

```css
body {
  background: #ffffff url('img_tree.png') no-repeat right top;
}
```

当使用简写属性时，属性值的顺序为：:

- background-color——背景颜色
- background-image ——背景图片
- background-repeat——背景图像平铺
- background-attachment—— 背景图像是否固定或者随着页面的其余部分滚动。
- background-position——背景图像位置

### CSS 链接

链接的状态：

- a:link - 正常，**未访问**过的链接
- a:visited - 用户**已访问**过的链接
- a:hover - 当用户**鼠标悬浮**在链接上时
- a:active - 链接**被点击**的那一刻

text-decoration 属性主要用于删除链接中的下划线

```css
a:link {
  color: #ff0000;
} /* 未访问链接*/
a:visited {
  color: #00ff00;
} /* visited link */
a:hover {
  color: #ff00ff;
} /* mouse over link */
a:active {
  color: #0000ff;
} /* selected link */
```

### background 属性

当使用简写属性时，属性值的顺序为：

- background-color 颜色
- background-image 地址
- background-repeat 平铺
- background-attachment 滚动
- background-position 起始位置

## CSS 定位

### display 属性

```css
display:inline;/* 块元素表现得更像行内元素 */

display:block/* 行内元素表现得更像块元素 */

display: inline-block; /* 既有行内元素的特征，又有块元素的特征，例如button标签 */
```

```css
ul a,
span {
  border-left: #cccccc 1px solid;
  /* 显示模式为行内块元素，即在一行之内可以分成一块一块显示 */
  display: inline-block;
  /* 盒子高度为40px (行内元素本身是没有宽、高属性的，通过display将显示模式转换为块元素后可以设置宽高) */
  height: 40px;
  /* 行高40px */
  /* 行高和盒子高度设置一致，可以使盒内元素垂直居中显示 */
  line-height: 40px;
  /* margin和padding中四个值的先后顺序为：上右下左 */
  padding: 0px 10px;
  /* 左外边距 */
  margin-left: -8px;
}
```

### CSS float 属性

float 属性定义元素在哪个方向浮动。以往这个属性总应用于图像，使文本围绕在图像周围，不过在 CSS 中，任何元素都可以浮动。浮动元素会生成一个块级框，而不论它本身是何种元素。

### position 属性

## 导航栏

### 水平导航栏

两种方法实现水平导航栏

1. 内嵌列表项

   ```css
   li {
     display: inline;
   }
   ```

2) 浮动列表项

   ```css
   li {
     float: left;
   }
   a {
     display: block;
     width: 60px;
   }
   ```

### pdding 的先后顺序为：

<span style="color:red;font-size:1.5em">上右下左</span>

###

### 样式的继承

标签样式继承自最近的父辈

### CSS3 border-radius 属性

向 div 元素添加圆角边框

### 表示方位（background-position 属性）

[参考手册](https://www.w3cschool.cn/cssref/pr-background-position.html)

1. 方位名词

   上下左右中

2. 坐标系

   x,y 值

```CSS
/* 背景简写  */
/* background：背景颜色 背景图片地址 背景平铺 背景滚动 背景位置 */
.background{
    background: pink url();
}
/* 注意：简写是有默认值的，如果之前有单一属性写法，简写的默认值会覆盖掉之前的值 */
```

## 盒子模型

内盒模型：

外盒模型：

- margin：外边距，用来移动盒子

<b style="color:red">行内元素不要添加上下边距</b>

### 让块级元素水平居中？

```css
margin: 0 auto; /* 上下边距为0，左右边距自动分配 */
```

### transition

给当前元素设置
