## 基本参数

浏览器可视区域高度

```js
window.innerHeight
// 或
document.documentElement.clientHeight
```

元素相对于文档顶部的高度（即元素在文档中的位置）

```js
// 获取元素相对于文档顶部的高度
element.offsetTop
```

浏览器窗口顶部与文档顶部之间的距离，也就是滚动条滚动的距离·

```js
window.scrollY
// 或
document.documentElement.scrollTop
```

通过判断

element.offsetTop - window.scrollY < window.innerHeight

可以确定元素是否进入到了可视区域

有了 `Element.getBoundingClientRect` 后就更方便了

只要el.getBoundingClientRect().top - window.innerHeight < 0 就可以

## Element.getBoundingClientRect()

返回元素的大小及其相对于视口的位置。

返回一个[DOMRect](https://developer.mozilla.org/zh-CN/docs/Web/API/DOMRect)对象

x: 元素左上角到原点 x 坐标

y: 元素左上角到原点 y坐标

left：矩形的左边界到左侧视口距离

top: 矩形的上边界到上面视口的距离

right：矩形的右边界到左侧视口距离



### 获取页面滚动距离

window.scrollY表示的是视口距离文档顶部的距离，而不是页面滚动的距离

用最后的window.scrollY 减去 初始的window.scrollY就可以得到滚动距离instance



## [Intersection Observer API](https://developer.mozilla.org/zh-CN/docs/Web/API/Intersection_Observer_API)

### IntersectionObserver判断元素是否进入视口

```js
const observer = new IntersectionObserver(callback, options);
const targetElement = document.getElementById('myElement');
observer.observe(targetElement);

function callback(entries, observer) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // 目标元素进入视口
      console.log('目标元素进入视口');
    } else {
      // 目标元素退出视口
      console.log('目标元素退出视口');
    }
  });
}
// 停止观察
observer.unobserve(targetElement);
```

