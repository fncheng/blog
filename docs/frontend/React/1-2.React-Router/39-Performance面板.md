---
title: Performance面板的使用
---

Performance面板中的Idle

在 Chrome DevTools 的 Performance 面板中，"Idle" 状态表示浏览器在当前没有任务执行或渲染工作时处于空闲状态。这通常是指浏览器没有正在处理的 JavaScript 代码、用户输入或其他活动。

Shallow Size和Retained Size

### Shallow Size

- **定义**：Shallow Size 表示对象本身所占用的内存大小，不包括其引用的其他对象所占用的内存。
- **例子**：如果有一个对象 `obj`，它有一个属性指向另一个对象，那么 `obj` 的 Shallow Size 只计算 `obj` 自身的内存，而不计算它引用的那个对象的内存。

### Retained Size

- **定义**：Retained Size 表示一个对象在内存中被保留的总大小，包括该对象本身和所有被该对象引用的对象的大小。这意味着它包括了该对象直接和间接引用的所有内存。
- **例子**：继续以 `obj` 为例，如果它引用了另一个对象 `childObj`，那么 `obj` 的 Retained Size 会包括 `obj` 自身的内存和 `childObj` 的内存，以及 `childObj` 引用的所有对象。

