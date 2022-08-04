<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Shadow DOM与虚拟DOM](#shadow-dom%E4%B8%8E%E8%99%9A%E6%8B%9Fdom)
  - [**Shadow DOM**](#shadow-dom)
  - [**Virtual DOM**](#virtual-dom)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Shadow DOM与虚拟DOM

可以想象成我们在 Vue 或者 React 中使用的一个个组件，是一种将 HTML 结构、Style 封装起来的结构。我们熟悉的 `video` 标签，其实就是 `Shadow DOM` 的封装。

### **Shadow DOM**

Shadow DOM是浏览器提供的一个可以允许将隐藏的DOM树添加到常规的DOM树中——它以shadow root为起始根节点，在这个根节点的下方，可以是任意元素，和普通的DOM元素一样。

### **Virtual DOM**

虚拟DOM是由js实现的避免DOM树频繁更新，通过js的对象模拟DOM中的节点，然后通过特定的render方法将它渲染成真实的节点，数据更新时，渲染得到新的 Virtual DOM，与上一次得到的 Virtual DOM 进行 diff，得到所有需要在 DOM 上进行的变更，然后在 patch 过程中应用到 DOM 上实现UI的同步更新。**本质上是JavaScript对象**

是用 JS 对象描述 DOM 节点的数据。