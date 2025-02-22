## CSS自定义属性（变量）

https://developer.mozilla.org/zh-CN/docs/Web/CSS/Using_CSS_custom_properties

```css
:root {
	--main-bg-color: green;
}
.app {
	background-color: var(--main-bg-color);
}
```

> **注意：**自定义属性名是大小写敏感的，`--my-color` 和 `--My-color` 会被认为是两个不同的自定义属性。

### 备用值

```css
.app {
  background-color: var(--main-bg-color, orange);
}
```



VSCode插件推荐**CSS Variable Autocomplete**

## margin-block、margin-inline

margin-block用于设置垂直方向的margin值

margin-inline用于设置水平方向的margin值



## width: max-content

当使用 `width: max-content;` 时，元素的宽度将根据其内容自动调整到适应内容的最大宽度。这意味着元素的宽度将根据内容中最长的部分来确定。



## inset属性

`inset` 是一个 CSS 属性，它是 `top`、`right`、`bottom` 和 `left` 属性的简写属性
