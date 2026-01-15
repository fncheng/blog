有这样一个需求：

开发时想用本地的组件库代码，于是我的导入就是：

```ts
 import TAgentTalk from "../../../../agents-components/packages/agent-talk/src/index.vue";
```

而生产环境则是 `import { TAgentTalk } from 'agents-components';` 有什么好的方案吗，我本来是想在vite中设置

```ts
{
  find: '@agents-components',
    replacement: __DEV__
      ? path.resolve(__dirname, '../agent-components/packages/')
    : 'agents-components'
}
```

这样开发时 `import { TAgentTalk } from 'agents-components'`
 其实指向的是 **本地源码**，
 但是打包时会自动指向 **真正的 npm 包**。



不过这样还有一个问题，就是编辑器对@agents-components是没有类型提示的，我该怎么做让@agents-components的类型提示跟agents-components提示一样，可否写个声明表明@agents-components就是agents-components

你只需要在 `env.d.ts` 或 `types/` 里写一个声明文件，告诉 TS：

> “@agents-components 和 agents-components 是同一个模块”

```ts
declare module '@agents-components' {
  export * from 'agents-components'
}
```


