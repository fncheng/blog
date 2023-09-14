## useAsyncEffect

下面是 `useAsyncEffect` 的完整源代码：

```javascript
import { useEffect, useRef } from "react";

function useAsyncEffect(asyncFunc, deps) {
  const isMountedRef = useRef(true);

  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    const runAsyncFunc = async () => {
      try {
        await asyncFunc();
      } catch (error) {
        if (isMountedRef.current) {
          throw error;
        }
      }
    };

    runAsyncFunc();

    return () => {
      isMountedRef.current = false;
    };
  }, deps);
}

export default useAsyncEffect;
```

`useAsyncEffect` 使用了两个 `useEffect` 钩子函数来管理异步副作用：

1. 第一个 `useEffect` 钩子函数是用来跟踪组件是否被卸载的。它会在组件第一次挂载时运行，返回一个函数，在组件卸载时更新 `isMountedRef` 的值为 `false`。
2. 第二个 `useEffect` 钩子函数是用来执行异步函数和捕获错误的。它会在组件挂载后或者依赖项变化时运行。每次运行时，它都会定义一个异步函数 `runAsyncFunc` 来运行传递给 `useAsyncEffect` 的异步回调函数。如果异步函数没有抛出错误，它将继续运行，直到组件被卸载。如果异步函数抛出了错误，并且组件尚未被卸载，将抛出错误。

这里使用了一个 `isMountedRef` 来记录组件是否已经被卸载。在 `runAsyncFunc` 函数中，使用 `isMountedRef.current` 来判断组件是否已被卸载。如果组件已经被卸载，`runAsyncFunc` 将不会继续执行，因此不会产生任何错误。如果组件尚未被卸载，`runAsyncFunc` 将抛出错误，并向上层其它异常处理层传递该错误。

最后，`useAsyncEffect` 返回 `undefined`，因为它并不需要返回任何值。

这就是 `useAsyncEffect` 的完整源代码。



### useEffect和useAsyncEffect

- `useEffect` 用于处理副作用，包括同步和异步操作，但不会等待异步操作完成。
- `useAsyncEffect` 通常用于处理异步操作，它会等待异步操作完成后再触发下一次渲染，确保渲染时数据已经准备好。