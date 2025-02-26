## useDefaultSpanConfig

```ts
import { debounce } from 'lodash-es'
import { useEffect, useState } from 'react'

/**
 * @key 列数
 * @value 对应ant-col-span的值
 */
const spanCol = {
    2: 12,
    3: 8,
    4: 6,
    6: 4
}

/**
 * 屏幕分辨变化时获取窗口宽度
 */
export const useWindowWidth = () => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)
    useEffect(() => {
        const handleResize = debounce(() => {
            setWindowWidth(window.innerWidth)
        }, 50)
        window.addEventListener('resize', handleResize)
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])
    return windowWidth
}

export const useDefaultSpanConfig = () => {
    const windowWidth = useWindowWidth()

    if (windowWidth > 1920) {
        return spanCol[6]
    } else if (windowWidth > 1440) {
        return spanCol[4]
    } else if (windowWidth > 1024) {
        return spanCol[3]
    } else return spanCol[2]
}
```



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

    const spaonConfig = computed(() => {
        if (windowWidth.value > 1920) {
            return spanCol[6]
        }
        if (windowWidth.value > 1440) {
            return spanCol[4]
        }
        if (windowWidth.value > 1024) {
            return spanCol[3]
        } else {
            return spanCol[2]
        }
    })
    return spaonConfig
};
```

