## useWebSocket

```ts
const { send, data } = useWebSocket(wsUrl.value, {
  onConnected(ws) {
    send(JSON.stringify(message))
  },
  onMessage(ws, event) {
    const receiveData = JSON.parse(data.value)
    if (receiveData?.payload?.output?.payload?.text) {
      optimizePrompt.value += receiveData.payload.output.payload.text
      versionSelectorRef.value?.debouncedSetSessionStorage(
        selectedVersion.value,
        optimizePrompt.value
      )
    }
    if (optimizePrompt.value.length > 0) {
      optimizingLoading.value = false
    }
  },
  onError(ws, event) {
    console.log('onError: ', event)
    optimizingLoading.value = false
  }
})
```



## 使用useSessionStorage优化sessionStorage操作

原代码：

```ts
import { defineStore } from 'pinia'
import { ref } from 'vue'

const KEY = 'production_indicator_scenarios'
const KEY_ACTIVE_SCENARIO = 'production_indicator_active_scenario'

export interface Scenario {
  id: string
  title: string
  icon: string
  color: string
  bodyId?: string
  versionId?: string
  nodeCode?: string
}

const DEFAULT_SCENARIOS = {
  // ...
}

export const useScenarioStore = defineStore('scenario', () => {
  const getScenarios = () => {
    try {
      const data = sessionStorage.getItem(KEY)
      return data ? JSON.parse(data) : DEFAULT_SCENARIOS
    } catch {
      return DEFAULT_SCENARIOS
    }
  }
  const getActiveScenario = () => {
    try {
      const activeScenario = sessionStorage.getItem(KEY_ACTIVE_SCENARIO)
      return activeScenario ? JSON.parse(activeScenario) : {}
    } catch {
      return null
    }
  }

  const scenarios = ref<Record<string, Scenario>>(getScenarios())
  const activeScenario = ref<Scenario | null>(getActiveScenario())

  const setScenarios = (data: Partial<Scenario>) => {
    console.group('缓存scenarios: ', data)
    const oldData = JSON.parse(sessionStorage.getItem(KEY) || '{}')
    const newData = { ...oldData, ...data }
    scenarios.value = newData
    sessionStorage.setItem(KEY, JSON.stringify(newData))
  }
  const setActiveScenario = (data: Scenario | null) => {
    activeScenario.value = data
    sessionStorage.setItem(KEY_ACTIVE_SCENARIO, JSON.stringify(data))
  }

  const clearScenarios = () => {
    scenarios.value = {}
    sessionStorage.removeItem(KEY)
  }
  const clearActiveScenario = () => {
    activeScenario.value = null
    sessionStorage.removeItem(KEY_ACTIVE_SCENARIO)
  }
  return {
    scenarios,
    activeScenario,
    getScenarios,
    setScenarios,
    clearScenarios,
    clearActiveScenario,
    getActiveScenario,
    setActiveScenario
  }
})
```

优化后的代码：

```ts
export const useScenarioStore = defineStore('scenario', () => {
  const scenarios = useSessionStorage<Record<string, Scenario>>(KEY, DEFAULT_SCENARIOS)
  const activeScenario = useSessionStorage<Scenario | null>(KEY_ACTIVE_SCENARIO, null)

  const getScenarios = computed (() => scenarios.value)
  const getActiveScenario = computed (() => activeScenario.value)

  const setScenarios = (data: Record<string, Scenario>) => {
    scenarios.value = {
      ...scenarios.value,
      ...data
    }
  }
  const setActiveScenario = (data: Scenario | null) => {
    activeScenario.value = data
  }

  const clearScenarios = () => {
    scenarios.value = { ...DEFAULT_SCENARIOS }
  }
  const clearActiveScenario = () => {
    activeScenario.value = null
  }
  return {
    getScenarios,
    getActiveScenario,
    setScenarios,
    setActiveScenario,
    clearScenarios,
    clearActiveScenario,
  }
})
```

