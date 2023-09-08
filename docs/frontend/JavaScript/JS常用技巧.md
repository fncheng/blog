## performance计算程序运行的时间

```js
// 开始时间
const startTime = performance.now();

// 执行程序

// 结束时间
const endTime = performance.now();

// 计算运行时间（毫秒）
const runTime = endTime - startTime;

console.log("程序运行时间：" + runTime + "毫秒");
```



## e.target和e.currentTarget

- `e.target`指的是触发事件的元素。它是实际触发事件的元素，可能是事件绑定的元素本身或其子元素。
- `e.currentTarget`指的是当前正在执行事件处理程序的元素（也称为事件监听器所附加的元素）。

例如，如果有一个父元素和一个子元素，并且将事件监听器添加到父元素上，则当子元素触发事件时，`e.target`将指向子元素，而`e.currentTarget`将指向父元素。

下面是一个示例：

```js
const parentElement = document.querySelector('#parent');
const childElement = document.querySelector('#child');

parentElement.addEventListener('click', function(e) {
  console.log('e.target:', e.target); // 输出触发事件的元素
  console.log('e.currentTarget:', e.currentTarget); // 输出当前正在执行事件处理程序的元素
});

childElement.click(); // 模拟点击子元素
```

输出结果：

```html
e.target: <div id="child"></div>
e.currentTarget: <div id="parent"></div>
```

在这个示例中，当子元素被点击时，`e.target`指向子元素，而`e.currentTarget`指向父元素。

