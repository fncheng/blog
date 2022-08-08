---
title: css吸顶效果
---

## 吸顶效果

高度固定的header吸顶，滚动条滑动时，header始终在可视区域内

方法一：

```css
.header {
  height: 50px;
  width: 100%;
  background-color: beige;
  position: fixed;
  top: 0;
}
.content {
  margin-top: 50px;
}
```

只要给header设置固定定位并设置top:0 即可实现吸顶。由于设置绝对定位后，header会脱离文档流，形成一个单独的图层，所以会遮挡其下方内容区域。因此要给内容区域设置一个margin-top，值为header的高度。

方法二：

```css
.header {
  height: 50px;
  width: 100%;
  background-color: beige;
  position: sticky;
  top: 0;
}
```

粘性定位 ：`position:relative`和`position:fixed`的结合体

这样就无需设置内容区域的marign-top 了。