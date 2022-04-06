### useState

```js
import { ref } from '@vue/reactivity'

const useState = function (initialState) {
  const state = ref(initialState)
  const setState = (value) => {
    // console.log(value)
    state.value = value
  }
  return [state, setState]
}
export default useState
```

