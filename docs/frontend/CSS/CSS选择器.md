# CSS选择器

[CSS selector](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Selectors)



### 模糊匹配

```js
// class名必须以top开头
document.querySelector('div[class^="top"]')
document.querySelector('div[class*="top"]')
```



### 交集选择器

交集选择器,相交的部分就是要设置属性值的标签

```css
p.para1 {color: red};
```

**含义:类名为para的p标签文字颜色为红色**

### 并集选择器

并集选择器就是同时操控多个元素,选择器之间用`,`相隔

```css
h1,h2,h3 {color: red};
/*等效于*/
h1 {color:red};
h2 {color:red};
h3 {color:red};
```

### 兄弟选择器

相邻兄弟选择器（Adjacent sibling selector）可选择紧接在另一元素后的元素，且二者有相同父元素。

例如，如果要增加紧接在 **h1 元素后出现的段落**的上边距，可以这样写：

```css
h1 + p {margin-top:50px;}
```

**这个选择器读作：“选择紧接在 h1 元素后出现的段落，h1 和 p 元素拥有共同的父元素”。**

**注意:必须是紧接着的元素!!!**

### CSS属性选择器Attribute_selectors

[MDN传送门](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Attribute_selectors)

支持正则表达式

[class^="box"] 以box开头的class类名的元素

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

### :first-of-type和:first-child

1. :first-child 选择的是父元素下的第一个子元素，无论子元素的类型是什么。这意味着无论子元素是什么标签，只要是第一个子元素，都会匹配 :first-child。
2. :first-of-type 选择的是父元素下的第一个与指定类型匹配的子元素。这意味着它只会选择与指定类型匹配的子元素中的第一个元素。



## vue中的深度作用选择器

[👉Vue deep scope](https://vue-loader.vuejs.org/zh/guide/scoped-css.html#%E6%B7%B1%E5%BA%A6%E4%BD%9C%E7%94%A8%E9%80%89%E6%8B%A9%E5%99%A8)

有些像 Sass 之类的预处理器无法正确解析 `>>>`。这种情况下你可以使用 `/deep/` 或 `::v-deep` 操作符取而代之——两者都是 `>>>` 的别名，同样可以正常工作。



Vue3中深度作用选择器写法：

:deep()

```css
.part-content {
  :deep(.el-input-group__append) {
    padding-inline: 0.6771vw;
  }
}
```

全局样式 :global()
