## Devtool中的open in editor功能失效

当设置了Vite base后发现Vue Devtool中的Open in editor功能失效了

解决办法：

自定义一个 Vite 插件，添加 `/__open-in-editor` 中间件

1.安装launch-editor-middleware插件

2.vite.config.ts中编写插件

```ts
import type { Plugin } from 'vite'
import launchEditorMiddleware from 'launch-editor-middleware'

function openInEditorPlugin(): Plugin {
  return {
    name: 'vite-plugin-open-in-editor',
    configureServer(server) {
      server.middlewares.use('/__open-in-editor', launchEditorMiddleware())
    }
  }
}

export default defineConfig({
  base: '/iflytek/aicc-flint/',
  plugins: [
    vue(),
    openInEditorPlugin()
  ]
})
```



为什么要自定义插件？

默认情况下，Vite 在开发模式下会自动支持 `/__open-in-editor` 接口，
 **但在设置了 `base`（非 `/`）路径时，这个功能会失效**，因为路径会被前缀包住：

```
- /__open-in-editor
+ /iflytek/aicc-flint/__open-in-editor   ❌ Vue Devtools 找不到
```

所以，我们通过插件把 `/__open-in-editor` **强制绑定到根路径**，绕过 base 路径。