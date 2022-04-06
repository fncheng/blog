### css变量

[定义](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Using_CSS_custom_properties)

声明：--符号**`--main-color: black;`**

使用：var() `color: **var(--main-color)**;`

```css
:root {
  --main-bg-color: pink;
}

body {
  background-color: var(--main-bg-color);
}
```

