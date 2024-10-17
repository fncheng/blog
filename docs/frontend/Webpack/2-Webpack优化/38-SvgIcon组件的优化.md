## SvgIcon组件

#### 封装SvgIcon组件

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

### vite-plugin-svg-icons

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

