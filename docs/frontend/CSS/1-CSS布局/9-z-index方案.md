## zIndex方案

约定分层 + 使用 z-index 语义区间 + 避免滥用定位/层叠上下文

Element Plus 内部是**有一套 z-index 体系的**（简化说明）：

```ts
// Element Plus 内部大致是这样
zIndex: {
  normal: 1,
  dropdown: 1000,
  sticky: 1000,
  fixed: 2000,
  modal: 2000,
  popover: 3000,
  tooltip: 3000,
  message: 4000,
  notification: 5000,
}
```

### 推荐做法：z-index「分层区间」约定（强烈推荐）

#### 1️⃣ 给 z-index 一个“语义区间”

```txt
0 - 9        ：基础文档流（几乎不用）
10 - 99      ：页面内部层级（推荐）
100 - 199    ：吸顶 / 悬浮按钮
200 - 499    ：业务自定义浮层（非全局）
500 - 999    ：【预留】尽量不要用
1000+        ：Element Plus / UI 库
```

