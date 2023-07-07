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

