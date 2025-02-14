## SvgIcon组件

### 封装SvgIcon组件

```vue
<template>
  <svg v-if="iconName" :class="className" aria-hidden="true">
    <use :xlink:href="iconName"></use>
  </svg>
</template>

<script setup lang="ts">
import { computed } from 'vue'

defineOptions({
  name: 'SvgIcon'
})
const { name } = defineProps({
  name: {
    type: String,
    required: true
  },
  className: {
    type: String
  }
})
const iconName = computed(() => {
  return `#icon-${name}`
})
</script>

<style>
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor; /* 使图标颜色继承字体颜色 */
  overflow: hidden;
}
</style>
```

全局注册SvgIcon组件，并加载所有svg图标

```js
// 定义一个加载目录的函数
const requireAll = (requireContext: Record<string, () => Promise<any>>) =>
  Object.keys(requireContext).map((key) => requireContext[key])
// 批量导入svg目录下的svg文件

const svgFiles = import.meta.glob('./*.svg')

requireAll(svgFiles)
```

main.ts

```ts
// src/main.ts

import { createApp } from 'vue';
import App from './App.vue';
import SvgIcon from './components/SvgIcon.vue';

// 引入自动导入的 SVG 图标
import './icons/index';

const app = createApp(App);

// 全局注册 SvgIcon 组件
app.component('SvgIcon', SvgIcon);
app.mount('#app');
```

### 使用vite-plugin-svg-icons生成组件

```ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import path from 'path'

export default defineConfig({
  plugins: [
    vue(),
    createSvgIconsPlugin({
      iconDirs: [path.resolve(__dirname, 'src/assets/icons')],
      symbolId: `icon-[name]`
    })
  ]
})
```



## 方法三：直接导入 SVG 并封装成组件

安装 `vite-svg-loader`：

```sh
pnpm add vite-svg-loader -D
```

配置vite.config.ts

```ts
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import svgLoader from 'vite-svg-loader';

export default defineConfig({
  plugins: [
    vue(),
    svgLoader(),
  ],
});
```

直接在组件中使用

```vue
<script setup lang="ts">
import HomeIcon from '@/assets/icons/home.svg';
</script>

<template>
  <HomeIcon />
</template>
```





| 方法                     | 适用场景                                           | 优势                        | 缺点                           |
| ------------------------ | -------------------------------------------------- | --------------------------- | ------------------------------ |
| `vite-plugin-svg-icons`  | 适用于大量小图标，按 `<SvgIcon name="xxx" />` 使用 | 使用方便，自动管理          | 仅适用于 symbol 方式           |
| `vite-plugin-svg-sprite` | 适用于合并多个 SVG 进行 sprite 使用                | 体积小，适用于 UI 组件库    | 需要手动管理 `<use>` 标签      |
| `vite-svg-loader`        | 适用于少量 SVG 直接导入                            | 直接当 Vue 组件使用，易管理 | 适用于少量图标，不适合大量使用 |
