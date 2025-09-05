实现boder"**左右两边各锁进一点，整条横线不顶满左右**"

### 方式一：用 margin 配合 border-bottom

```
.my-line {
  border-bottom: 1px solid #f0f0f0;
  margin: 0 10px; /* 左右各缩进10px */
}
```

这样整条线左右都会少 10px。

------

### 方式二：用 `::after` 伪元素（不影响内容区域）

```
.my-line {
  position: relative;
}
.my-line::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 10px;   /* 往右缩进 */
  right: 10px;  /* 往左缩进 */
  height: 1px;
  background-color: #f0f0f0;
}
```

好处：不会影响到 `my-line` 元素本身的布局，只是额外画了一条线。

------

### 方式三：用 `box-shadow` 模拟（少见）

```
.my-line {
  box-shadow: inset 10px -1px 0 0 #f0f0f0,
              inset -10px -1px 0 0 #f0f0f0;
}
```

这个方式比较 trick，适合一些特殊情况下替代 `border`。

------

👉 如果你这个容器里还要有内容，建议用 **方式二（伪元素）**，不会让内容被 `margin` 挤偏。