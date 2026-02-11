## 按需引入

### unplugin-vue-components

unplugin-vue-components和unplugin-auto-import分别是做什么的？

unplugin-vue-components可以自动生成全局typescript类型文件

unplugin-auto-import是按需自动导入组件

- **自动导入 Vue 组件**：无需手动在每个文件中写 `import` 语句。

- 根据组件的使用情况，**按需引入组件及其相关依赖**，优化打包结果，避免引入未使用的组件。

unplugin-auto-import是自动导入API

- **自动导入常用的 API**，如 Vue 的 `ref`、`reactive`、`computed`，或者你指定的第三方库（如 Vue Router 的 `useRouter`）。
- 避免反复手动写 `import { ref } from 'vue'`，提高开发效率。
- 提供全局类型支持，保证编辑器有良好的类型提示。

需要注意的是：如果项目使用monorepo架构，则需要在vite.config.ts中显式开启dts

```ts
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig(({ command, mode }) => {
  return {
    plugins: [
      vue(),
      AutoImport({
        resolvers: [ElementPlusResolver()],
        dts: './auto-imports.d.ts'
      }),
      Components({
        // 1. 自动导入 Element Plus 组件
        resolvers: [ElementPlusResolver()],
        // 2. 关键：如果要自动导入 monorepo 中其他 packages 的组件
        globs: ['../../packages/ui/src/components/**/*.vue'], 
        // 3. 这里的 dts 会生成在当前子应用目录下
        dts: 'src/components.d.ts', 
      }),
      ElementPlus({}),
    ],
  }
})
```

## unplugin-auto-import配置项

1. imports

   告诉 AutoImport：哪些函数可以被自动导入

2. resolvers

3. dirs





如果只是想要自动导入ElementPlus的样式

则使用另外的插件 **unplugin-element-plus**

```ts
// vite.config.ts
import { defineConfig } from 'vite'
import ElementPlus from 'unplugin-element-plus/vite'

export default defineConfig({
  // ...
  plugins: [ElementPlus({})],
})
```



### 关于类型提示

*unplugin-vue-components* 生成的components.d.ts会声明组件类型

而这个文件是需要在tsconfig.json中的include内引入

```json
"include": [
  "env.d.ts",
  "auto-imports.d.ts",
  "components.d.ts",
  "src/types/*.d.ts",
  "src/**/*",
  "src/**/*.vue"
],
```



**TypeScript 报错**： 由于是自动导入，TS 初始可能不认识 `ref` 或 `ElButton`。插件生成的 `auto-import.d.ts` 和 `components.d.ts` **必须**包含在 `tsconfig.json` 的 `include` 数组中。

**Vue 模板中的组件类型**： 如果你在子应用中引用了 Monorepo 内部其他 package 的组件，记得在 `Components` 插件的 `globs` 中配置这些路径，否则这些组件不会被自动注册。

**eslint 报错**： 自动导入会导致 ESLint 报 `no-undef` 错误。`unplugin-auto-import` 可以生成一个 `.eslintrc-auto-import.json` 文件，你需要将其添加到 ESLint 的 `extends` 中。