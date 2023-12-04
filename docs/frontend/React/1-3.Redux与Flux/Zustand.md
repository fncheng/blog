## Zustand

https://github.com/pmndrs/zustand

```ts
import { create } from "zustand";

interface userStore {
  count: number;
  increament: () => void;
}

const useUserStore = create<userStore>((set) => ({
  count: 0,
  increament: () => set((state) => ({ count: state.count + 1 }))
}));

export { useUserStore };
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
import create from 'zustand';
import produce from 'immer';

const useStore = create((set) => ({
  count: 0,
  increment: () => {
    set(produce((state) => {
      state.count += 1;
    }));
  },
}));
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

