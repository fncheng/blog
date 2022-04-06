---
title: js事件
tags:
- JavaScript
---

**HTML DOM事件**

json的语法可以表示三种类型的值:

- 简单值
- 对象
- 数组

<!-- more -->

1.简单值

表单事件

| 属性                                                         | 描述                                                         |
| :----------------------------------------------------------- | :----------------------------------------------------------- |
| [oninput](https://www.runoob.com/jsref/event-oninput.html)   | oninput 事件在用户输入时触发。<br />该事件在 \<input> 或 \<textarea> 元素的值发生改变时触发。<br />**提示：** 该事件类似于 [onchange](https://www.runoob.com/jsref/event-onchange.html) 事件。不同之处在于 oninput 事件在元素值发生变化是立即触发， onchange 在元素失去焦点时触发。另外一点不同是 onchange 事件也可以作用于\<keygen> 和 <select> 元素。 |
| [ondblclick](https://www.runoob.com/jsref/event-ondblclick.html) | ondblclick 事件会在对象被双击时发生。                        |
|                                                              |                                                              |



### 键盘事件

https://www.jianshu.com/p/8f839f558319

- `keydown`：按下键盘键
- `keypress`：紧接着`keydown`事件触发（只有按下字符键时触发）
- `keyup`：释放键盘键

触发顺序为：keydown -> keypress ->keyup
