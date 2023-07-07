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
