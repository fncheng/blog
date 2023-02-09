



### querySelector模糊匹配

```js
document.querySelector('div[class^="top"]')
```



### CSS属性选择器

[MDN](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Attribute_selectors)

```js
/* 存在 href 属性并且属性值包含"example"的<a> 元素 */
a[href*="example"] {
  font-size: 2em;
}
```

```js
/* 存在 class 属性并且属性值包含以空格分隔的"logo"的<a>元素 */
a[class~="logo"] {
  padding: 2px;
}
```

