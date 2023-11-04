## 自定义hooks和响应式设计

使用window.innerWidth配合Col的span属性来控制元素排列

```tsx
import { ref, onMounted, onBeforeUnmount } from 'vue';

/**
 * @key 列数
 * @value 对应ant-col-span的值
 */
const spanCol = {
    2: 12,
    3: 8,
    4: 6,
    6: 4,
};Ï

export const useWindowWidth = () => {
  const windowWidth = ref(window.innerWidth);

  const handleResize = () => {
    windowWidth.value = window.innerWidth;
  };

  onMounted(() => {
    window.addEventListener('resize', handleResize);
  });

  onBeforeUnmount(() => {
    window.removeEventListener('resize', handleResize);
  });

  return windowWidth;
};

export const useDefaultSpanConfig = () => {
  const windowWidth = useWindowWidth();

  if (windowWidth.value > 1920) {
    return spanCol[6];
  }
  if (windowWidth.value > 1440) {
    return spanCol[4];
  }
  if (windowWidth.value > 1024) {
    return spanCol[3];
  } else {
    return spanCol[2];
  }
};
```

