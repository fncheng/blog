---
title: Element API
---

## 创建元素

### Document.createElement()

创建一个由标签名称 tagName 指定的 HTML 元素。

```js
document.createElement(tagName:string, {
	
});
```



### Element.classList

Element.classList.add( str: string )

Element.classList.remove( str: string )

### Element.className

Element.classList vs Element.className

<img src="https://minimax-1256590847.cos.ap-shanghai.myqcloud.com/img/image-20220125141856864.png" alt="image-20220125141856864" style="zoom:67%;" />



### Element.append()

在 `Element`的最后一个子节点之后插入一组 [`Node`](https://developer.mozilla.org/zh-CN/docs/Web/API/Node) 对象或 [`DOMString`](https://developer.mozilla.org/zh-CN/docs/Web/API/DOMString) 对象。



#### append() vs appendChild()

[`append()`](https://developer.mozilla.org/en-US/docs/Web/API/Element/append) 方法支持多个参数，接受字符串作为参数，会将字符串转换为文本节点再附加。



### 删除元素

**Element.remove()**

把对象从它所属的 DOM 树中删除。

[jquery方法](https://www.jquery123.com/remove/)



## 获取元素属性

Element.getAttribute()



jquery hover事件反复触发的原因：是因为我们每次触发hover时都会执行一次动画，当我们来回这样快速移动到目标元素上时并反复操作，会导致动画重复多次，上一次动画未结束，这次动画就紧接着来了，所以会导致动画的错乱。

解决办法：我们触发hover时先清空之前所有的动画，并使当前正在执行的动画立马完成。
