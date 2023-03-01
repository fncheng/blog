# Vue3是如何变快的

## 1.diff算法优化

vue2中虚拟dom是全量对比

vue3新增了静态标记（PatchFlag）

- 在与上次虚拟节点进行对比时，只对比带有patch flag的节点
- 并且可以通过flag的信息得知当前节点要对比的具体内容
- 在创建虚拟dom时，会根据dom中的内容添加静态标记

```vue
<div>
  <p>我是段落</p>
  <p>{{msg}}</p>
</div>
```

```js
import {
  createVNode as _createVNode,
  toDisplayString as _toDisplayString,
  openBlock as _openBlock,
  createBlock as _createBlock
} from "vue"

export function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (_openBlock(), _createBlock("div", null, [
    _createVNode("p", null, "我是段落"),
    _createVNode("p", null, _toDisplayString(_ctx.msg), 1 /* TEXT */)
  ]))
}
```

### PatchFlags

```js
export const enum PatchFlags {
  TEXT = 1, // 动态文本节点
  CLASS = 1 << 1, // 2 动态class
  STYLE = 1 << 2, // 4 动态style
  PROPS = 1 << 3, // 8 动态属性，但不包含类名和样式
  FULL_PROPS = 1 << 4, // 16 具有动态 key 属性，当 key 改变时，需要进行完整的 diff 比较
  HYDRATE_EVENTS = 1 << 5, // 32 带有监听事件的节点
  STABLE_FRAGMENT = 1 << 6, // 64 一个不会改变子节点顺序的 fragment
  KEYED_FRAGMENT = 1 << 7, // 128 带有key属性的 fragment 或部分带有 key
  UNKEYED_FRAGMENT = 1 << 8, // 256 子节点没有 key 的 fragment
  NEED_PATCH = 1 << 9, // 512 一个节点只会进行非 props 比较
  DYNAMIC_SLOTS = 1 << 10, // 1024
  HOISTED = -1,
  BAIL = -2
}
```

## 2.静态提升hoistStatic

vue2会比较每一个Vnode，这样对于一些不参与更新的元素，会浪费性能

Vue3diff算法在初始化时会给每一个虚拟节点一个patchFlag，并且只会比较patchFlag发生变化的Vnode，从而节省性能开销

看以下一段vue代码

```vue
<div>
  {{msg}}
  <span>123</span>
  <button @click="onClick">按钮</button>
</div>
```

- 无静态提升

```js
export function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (_openBlock(), _createElementBlock("div", null, [
    _createTextVNode(_toDisplayString(_ctx.msg) + " ", 1 /* TEXT */),
    _createElementVNode("span", null, "123"),
    _createElementVNode("button", { onClick: _ctx.onClick }, "按钮", 8 /* PROPS */, ["onClick"])
  ]))
}
```

- 有静态提升

```js
const _hoisted_1 = /*#__PURE__*/_createElementVNode("span", null, "123", -1 /* HOISTED */)
const _hoisted_2 = ["onClick"]

export function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (_openBlock(), _createElementBlock("div", null, [
    _createTextVNode(_toDisplayString(_ctx.msg) + " ", 1 /* TEXT */),
    _hoisted_1,
    _createElementVNode("button", { onClick: _ctx.onClick }, "按钮", 8 /* PROPS */, _hoisted_2)
  ]))
}
```



## 3.事件侦听缓存cacheHandlers

```vue
<div>
  <button @click="onClick">按钮</button>
</div>
```

- 开启事件侦听缓存之前

```js
export function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (_openBlock(), _createElementBlock("div", null, [
    _createElementVNode("button", { onClick: _ctx.onClick }, "按钮", 8 /* PROPS */, ["onClick"])
  ]))
}
```

- 开启cacheHandlers 之后

```js
export function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (_openBlock(), _createElementBlock("div", null, [
    _createElementVNode("button", {
      onClick: _cache[0] || (_cache[0] = (...args) => (_ctx.onClick && _ctx.onClick(...args)))
    }, "按钮")
  ]))
}
```

事件侦听缓存本质上是去除了不必要的diff比较