---
title: css import
---



### css中的@import

**`@import `**[CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)[@规则](https://developer.mozilla.org/en-US/docs/Web/CSS/At-rule)，用于从其他样式表导入样式规则。这些规则必须先于所有其他类型的规则，[`@charset`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/@charset) 规则除外; 因为它不是一个[嵌套语句](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Syntax#nested_statements)，@import不能在[条件组的规则](https://developer.mozilla.org/zh-CN/docs/Web/CSS/At-rule#conditional_group_rules)中使用。

```css
@import url('./styles/base.css')
```



### Sass中的@import

Sass 拓展了 `@import` 的功能，允许其导入 SCSS 或 Sass 文件。被导入的文件将合并编译到同一个 CSS 文件中，另外，被导入的文件中所包含的变量或者混合指令 (mixin) 都可以在导入的文件中使用。

```scss
@import './styles/base.scss'
```

## 变量

sass用$，css中用--，var引用

```scss
$content: "First content"; //sass

:root {
  --header-height: 86px; // css
}
height: var(--header-height); // css 使用
```

