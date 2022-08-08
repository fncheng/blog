## CSS background属性

[MDN](https://developer.mozilla.org/zh-CN/docs/Web/CSS/background)

**`background`**是一个简写属性，用于一次性集中定义各种背景属性，包括 color, image, origin 与 size, repeat 方式等等。

background包含的属性：

- [`background-clip`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/background-clip)
- [`background-color`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/background-color)
- [`background-image`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/background-image)
- [`background-origin`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/background-origin)
- [`background-position`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/background-position)
- [`background-repeat`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/background-repeat)
- [`background-size`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/background-size)
- [`background-attachment`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/background-attachment)



### 1.background-clip

设置元素的背景（背景图片或颜色）是否延伸到边框、内边距盒子、内容盒子下面。

value:

```css
border-box
背景延伸至边框外沿（但是在边框下层）。
padding-box
背景延伸至内边距（padding）外沿。不会绘制到边框处。
content-box
背景被裁剪至内容区（content box）外沿。
```

### 2.background-color

设置元素背景色

### 3.background-image

设置背景图片





Background-image 和image

1.能否懒加载： background-image无法使用懒加载，而img标签可以通过设置其src进行懒加载的实现

2.加载顺序不同： background-image是css属性，img标签中如果有src会立即请求，img会优先background-image进行请求

3.图片设置性不同：background-image 可以借助其本身css属性中的background-position、background-size来设置图片展示的位置关系，大小显示关系，而img标签无法直接设置其图片显示位置

4.img标签能更好的SEO，是html标签，代表文档内容，而background-image属于css，代表版式设计。而言之，img标签能更好的SEO，而background-image更加灵活。