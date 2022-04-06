---
title: Sass
---

## Sass @import 和 CSS @import

Sass @import 在以下情况不会导入 sass 文件：

- 文件拓展名是 `.css`；
- 文件名以 `http://` 开头；
- 文件名是 `url()`；
- `@import` 包含 media queries。

```scss
@import 'foo.css';
@import 'foo' screen;
@import 'http://foo.com/bar';
@import url(foo);
/* 以上四种情况不会生效 */
```

@import 可以嵌套使用

### 变量\$

变量支持块级作用域，嵌套规则内定义的变量只能在嵌套规则内使用（局部变量），不在嵌套规则内定义的变量则可在任何地方使用（全局变量）。将局部变量转换为全局变量可以添加 `!global` 声明：

### 插值语句#{ }

通过 `#{}` 插值语句可以在选择器或属性名中使用变量：



Vue中Sass使用路径别名：`~@`

