Pinia 支持两种定义 `store` 的方式：`Options API` 和 `Setup API`

## State

Options：

```ts
export const useMainStore = defineStore('main', {
    state: () => ({
        count: 0
    }),
    actions: {
        increment() {
            this.count++
        }
    }
})
```

Setup:

```ts
export const useUserStore = defineStore('userStore', () => {
  const username = ref('jack')
  const sayHi = () => {
    alert(`Hi ${username}`)
  }
  return { username, sayHi }
})
```

### 如何确保响应式

1. **直接使用 `store` 实例**： 直接在模板中使用 `store` 实例的属性是正确的做法，这样可以确保属性的响应式：

   ```vue
   <template>
     <p>{{ store.count }}</p> <!-- 正确的响应式访问 -->
   </template>
   
   <script setup lang="ts">
   import { useCounterStore } from '@/stores/counter';
   
   const store = useCounterStore(); // store 是响应式的
   </script>
   ```

2. **使用 `computed` 包装属性**： 如果你需要在 `setup` 函数中处理 `store` 的属性，使用 `computed` 包装可以确保响应式：

   ```ts
   import { computed } from 'vue';
   import { useCounterStore } from '@/stores/counter';
   
   const store = useCounterStore();
   const count = computed(() => store.count); // 使用 computed 保持响应式
   ```

3. **使用 `toRefs` 保持响应式**： `toRefs` 将 `store` 的 `state` 转换为响应式的引用：

   ```ts
   import { toRefs } from 'vue';
   import { useCounterStore } from '@/stores/counter';
   
   const store = useCounterStore();
   const { count } = toRefs(store); // 使用 toRefs 保持响应式
   ```