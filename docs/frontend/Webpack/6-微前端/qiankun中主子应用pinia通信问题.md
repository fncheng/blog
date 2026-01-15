## qiankun架构中主子应用pinia store数据互通

# 总体方案：

### **使用 qiankun 的 GlobalState 做“状态总线”，主、子应用的 Pinia 通过 GlobalState 同步彼此的 sidebarWidth。**

Pinia 仍然独立：

- 主应用：`mainStore.sidebarWidth`
- 子应用：`baseStore.sidebarWidth`

但：

- 主应用 Pinia → 写入 GlobalState
- 子应用 Pinia → 写入 GlobalState
- 主/子应用都监听 GlobalState 变化 → 更新自己的 Pinia

> 主应用调用 actions.setGlobalState，是主应用 → 所有子应用
>
> 子应用调用 props.actions.setGlobalState，是子应用 → 主应用（及其他子应用）





**主应用**globalState.ts

```ts
import { initGlobalState } from 'qiankun'

const initialState = {
  sidebarWidth: sessionStorage.getItem('sidebarWidth') ? JSON.parse(sessionStorage.getItem('sidebarWidth') || '256') : 256
}

export const actions = initGlobalState(initialState)

```

main.ts

```ts
import { actions } from './globalState'
import useConfigStore from './stores/config'

registerMicroApps({
  // ...
  props: { actions }
})

actions.onGlobalStateChange((state) => {
  console.group('state: ', state)
  const configStore = useConfigStore()
  configStore.setSidebarWidth(state.sidebarWidth, false)
})
```

主应用store

```ts
import { defineStore } from 'pinia'
import { useSessionStorage } from '@vueuse/core'
import { computed } from 'vue'
import { actions } from '@/globalState'

const KEY_SIDEBAR_WIDTH = 'sidebarWidth'

const useConfigStore = defineStore('configStore', () => {
  const sidebarWidth = useSessionStorage(KEY_SIDEBAR_WIDTH, 256)
  const getSidebarWidth = computed(() => sidebarWidth.value)
  const setSidebarWidth = (width: number, sync = true) => {
    sidebarWidth.value = width
    sync && actions.setGlobalState({ sidebarWidth: width })
  }

  return {
    getSidebarWidth,
    setSidebarWidth
  }
})

export default useConfigStore
```



**子应用** 

main.ts

```ts
renderWithQiankun({
  mount(props: any) {
    const actions = props.actions
    actions.onGlobalStateChange((state: any) => {
      console.group('state: ', state);
      const store = useConfigStore()
      setGlobalActions(props.actions)
      store.setSidebarWidth(state.sidebarWidth, false)
    })
    render(props);
  },
  bootstrap() {},
  update() {},
  unmount(props: any) {
    instance.unmount();
    instance._container.innerHTML = '';
    instance = null;
    history.destroy(); // 不卸载router会导致其他应用路由失败
    router = null;
  },
});
```

store

```ts
import { useSessionStorage } from '@vueuse/core'
import { defineStore } from 'pinia'
import { computed } from 'vue'

let actions: any = null // 全局保存 props.actions

export const setGlobalActions = (a: any) => {
  actions = a
}

const KEY_SIDEBAR_WIDTH = 'sidebarWidth'

const useConfigStore = defineStore('configStore', () => {
  const sidebarWidth = useSessionStorage(KEY_SIDEBAR_WIDTH, 256)
  const getSidebarWidth = computed(() => sidebarWidth.value)
  const setSidebarWidth = (width: number, sync = true) => {
    sidebarWidth.value = width
    sync && actions && actions.setGlobalState({ sidebarWidth: width })
  }
  return {
    getSidebarWidth,
    setSidebarWidth
  }
})

export default useConfigStore
```



## 可行性分析

1. **主应用：**
   - `actions.onGlobalStateChange` 更新自己的 Pinia store，`sync = false` ✅
   - `setSidebarWidth` 时写入 GlobalState，同步给子应用 ✅
   - 使用 `useSessionStorage` 保存宽度，页面刷新依旧保留 ✅
2. **子应用：**
   - 通过 `mount(props)` 获取 `props.actions` 并保存到全局 `actions` ✅
   - 监听 `onGlobalStateChange` 同步到 Pinia store，`sync = false` ✅
   - 本地修改 Pinia store 时通过 `setSidebarWidth(width, true)` 同步给主应用 ✅
3. **死循环问题**：
   - 通过 `sync` 参数区分“本地修改”和“外部同步”，避免循环触发 ✅



## 可优化的地方

**初始化值统一**

- 现在主应用的 `initialState` 是从 `sessionStorage` 读取，子应用在 `onGlobalStateChange` 时第一次触发回调拿到值。
- 可以在子应用 `mount` 时直接初始化 store 的 sidebarWidth，避免第一次渲染闪烁：

子应用的mount部分修改：

```ts
mount(props: any) {
    render(props);

    const actions = props.actions
    setGlobalActions(actions)

    const store = useConfigStore()
    store.setSidebarWidth(actions.getGlobalState?.().sidebarWidth ?? 256, false)

    actions.onGlobalStateChange((state: any) => {
      console.group('state: ', state);
      store.setSidebarWidth(state.sidebarWidth, false)
    })
  },
```

**优点**

- 子应用 store 一开始就拿到主应用的 sidebarWidth，不会闪烁
- `sync=false` 避免再次 setGlobalState，防止死循环
- 后续主应用修改 sidebarWidth，子应用仍然会同步更新



## onGlobalStateChange

子应用中的onGlobalStateChange内，sync=false，用来表明是被动获取的更新，不需要再通知别的应用更新了，避免循环

```ts
props.actions.onGlobalStateChange((state: any) => {
      console.group('state: ', state);
      store.setSidebarWidth(state.sidebarWidth, false)
      // 这里是从主应用获取通知，然后同步状态，所以不需要再通知主应用，因此sync=false
      desktopStore.setHistoryActiveId(state.historyActiveId ?? '', false)
      desktopStore.setIsNewChat(state.isNewChat ?? true, false)
    })
```

