---
title: 动画库motion的使用
---



## motion没有类型提示的问题

首先遇到一个问题，发现motion.div没有任何属性类型提示。

这是因为**React 19 改进了 `HTMLAttributes<T>` 类型**，导致 `motion.div` 在 React 19 下的类型推导可能和 React 18 不一致。

如果你使用React18，建议使用 `framer-motion@10.x`

```sh
pnpm add framer-motion@^10.0.0
```

