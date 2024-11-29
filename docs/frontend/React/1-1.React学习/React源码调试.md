源码中含有flow类型，直接使用会报错



__EXPERIMENTAL__ is not defined

由于使用的是最新源码，含有一些实验性功能，会导致上述错误



### React中的dispatcher

在 React 的函数式组件中，hooks（如 `useState` 和 `useEffect`）需要依赖一个运行时上下文，来跟踪当前正在渲染的组件，以及该组件的状态、上下文等信息。

为了实现这一点，React 使用了一个 **dispatcher**，它是一个内部的抽象层，负责将 hooks 调用分发到当前组件的正确上下文中。

### resolveDispatcher 的作用

在代码中，`resolveDispatcher` 的职责是获取当前上下文中正在工作的 `dispatcher`。

```ts
function resolveDispatcher() {
  const dispatcher = ReactCurrentDispatcher.current;
  if (dispatcher === null) {
    throw new Error(
      'Invalid hook call. Hooks can only be called inside of the body of a function component.'
    );
  }
  return dispatcher;
}
```

