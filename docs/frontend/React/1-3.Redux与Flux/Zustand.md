## Zustand

https://github.com/pmndrs/zustand

```ts
import { create } from "zustand";

interface userStore {
  count: number;
  increament: () => void;
}

export const useUserStore = create<userStore>((set) => ({
  count: 0,
  increament: () => set((state) => ({ count: state.count + 1 }))
}));
```

### getState

`getState()` 用于获取当前的状态

## Zustand persist

persist用于持久化存储，将状态持久化到本地存储（如 localStorage）中



### with TypeScript

```ts
const useUserStore = create<userStore>()(
  persist(
    (set) => ({
      count: 0,
      increament: () => set((state) => ({ count: state.count + 1 }))
    }),
    {
      name: "USER_INFO"
    }
  )
)
```

设置storage选项

```ts
export const zStore = create<CounterStore>()(
    persist(
        (set) => ({
            count: 0,
            increment: () => set((state) => ({ count: state.count + 2 }))
        }),
        { name: 'Counter', storage: createJSONStorage(() => sessionStorage) }
    )
)
```



### 针对特定字段

```ts
const useUserStore = create<userStore>()(
  persist(
    (set) => ({
      count: 0,
      increament: () => set((state) => ({ count: state.count + 1 }))
    }),
    {
      name: "USER_INFO",
      partialize: (state) => ({ count: state.count }),
    }
  )
)
```





## Zustand使用immer

在Zustand中使用immer时，`produce`函数应该写在`set`函数内部

```tsx
export const zStore = create<CounterStore>()(
    immer(
        persist(
            (set) => ({
                count: 0,
                increment: () =>
                    set((state) => {
                        state.count += 2
                    })
            }),
            { name: 'Counter', storage: createJSONStorage(() => sessionStorage) }
        )
    )
)
```



```tsx
const useUserStore = create<userStore>()(
  persist(
    (set) => ({
      userState: {
        count: 0,
        name: "name"
      },
      increament: () =>
        set(
          produce((draft) => {
            draft.userState.count += 1;
          })
        ),
      SET_COUNT: (val: number) =>
        set(
          produce((draft: userStore) => {
            draft.userState.count += val;
          })
        )
    }),
    {
      name: "USER_INFO"
    }
  )
);
```

### selector

在 Zustand 中，`selector` 是一个用于优化和筛选状态的工具。它允许你从整个状态树中只订阅某一部分状态，而不是订阅整个 store。这样可以有效减少组件的重渲染次数，提升性能

```ts
const { count, increment } = useStore(zStore, useShallow((store) => ({
    count: store.count,
    increment: store.increment
})))
```

等效于

```ts
const { count, increment } = zStore(useShallow(store) => ({
    count: store.count,
    increment: store.increment
})))
```

这里为什么要用useShallow，原因是Zustand 默认情况下会使用 `Object.is` 来对比状态的变化，而 `Object.is` 在对比对象时，会检查引用是否相同。

当你使用 `useStore` 的 `selector` 返回一个对象时，如果每次渲染时返回的是一个新对象（即便里面的值没变），Zustand 会认为状态发生了变化，因为对象的引用不一样。这就会导致组件频繁重新渲染，甚至可能导致栈溢出等问题。



## 在Axios拦截器内使用zutand导致hooks报错

在axios拦截器内使用zustand可能会导致报错，原因是axios拦截器是在全局作用域中执行的，而zustand的Hook函数只能在React函数组件中使用。

要解决这个问题，您可以将拦截器的处理逻辑封装在一个自定义的函数组件中，然后在该组件内部使用zustand。然后，在拦截器内部调用该组件来执行处理逻辑。

我们可以使用useStore.getState()来获取当前状态的快照

```ts
import axios from "axios";
import { useUserStore } from "../store";
service.interceptors.request.use(
  (config) => {
    const count = useUserStore.getState().userState.count;
    console.log("count: ", count);
    if (count) {
      config.headers["auth"] = count;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
```



## zustand和context

使用context可能会有性能问题，特别是当状态变化时，所有使用该 `Context` 的组件都会重新渲染。

`zustand` 针对性能进行了优化，通过避免不必要的渲染，提供了较好的性能。

## zustand是如何针对性能进行优化的

1. **浅比较：** `zustand` 使用浅比较来检测状态的变化。当状态发生变化时，`zustand` 会检查状态对象的引用是否发生了变化，而不是深度逐个比较对象的每个属性。这种做法在某些情况下可以提高性能，尤其是在状态较为复杂且变化频繁的情况下。
2. **Immer.js 支持：** `zustand` 支持使用 Immer.js 这个库来处理状态的不可变性。Immer.js 允许你通过“写入”方式来修改状态，而在内部会以不可变的方式处理。这种方式有助于提高性能，同时保持了简单的 API。
3. **派发函数：** 在 `zustand` 中，当状态发生变化时，你可以通过派发函数来通知订阅者（组件）状态的变化。这种方式使得组件只会在其所依赖的状态发生变化时进行渲染，而不是每次状态变化都进行渲染。
4. **懒惰创建状态：** `zustand` 采用了懒惰创建状态的方式。即使你定义了多个状态，只有当组件真正订阅了这些状态时，它们才会被创建。这有助于避免在初始加载时创建不必要的状态对象。
5. **使用 Proxy：** `zustand` 使用 JavaScript 的 Proxy 对象来拦截对状态的操作，使得可以在操作发生时进行必要的处理。这种机制使得 `zustand` 能够实现一些高级的状态管理功能，同时避免了不必要的渲染。

派发函数就是指zustand的set函数



### 使用zustand后套了很多个括号怎么优化

提取状态和派发函数

```ts
const useStore = create(set => {
  const state = {
    count: 0,
  };

  const increment = () => set(s => ({ count: s.count + 1 }));
  const increment = () => set(produce(s => { s.count += 1 })); // 使用immer

  return { ...state, increment };
});
```

将逻辑分解为更小的函数

```ts
const createState = () => {
  return {
    count: 0,
  };
};

const createActions = set => {
  return {
    increment: () => set(s => ({ count: s.count + 1 })),
  };
};

const useStore = create(set => {
  const state = createState();
  const actions = createActions(set);

  return { ...state, ...actions };
});
```

