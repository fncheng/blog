## import和动态import

`import`和`import()`是两种不同的导入模块的方式。

1. import：**import** 是ES6模块的一种语法，用于在静态代码中导入其他模块。它通常用于顶层作用域，并且需要在模块的最前面使用。它可以导入整个模块或只导入特定的部分。

   ```js
   import { foo } from './module.js'; // 导入特定部分
   import * as myModule from './module.js'; // 导入整个模块
   ```

2. import()：**import()** 是ES动态导入的一种语法，用于在运行时异步加载模块。它返回一个Promise，并且可以根据需要动态地导入模块。这种方式适用于按需加载或延迟加载模块。例如：

   ```js
   import('./module.js') // 动态导入模块
     .then(module => {
       // 使用导入的模块
       module.foo();
     })
     .catch(error => {
       // 处理导入失败的情况
       console.log(error);
     });
   ```

[动态import和Promise的关系](https://github.com/fncheng/fe/issues/21)

### dynamic-import-vars

[动态导入的四条规则](https://github.com/rollup/plugins/tree/master/packages/dynamic-import-vars#limitations)

1. Imports must start with `./` or `../`.

   即所有导入都必须相对于导入文件开始

2. 导入必须以文件扩展名结尾



## 使用loadable-components动态导入

https://loadable-components.com/docs/dynamic-import/

需要注意的是，必须有cacheKey这个属性

```tsx
const AsyncPage = loadable(
    (props: { page: string }) => import(/* @vite-ignore */ `../pages/${props.page}/index.tsx`),
    {
        fallback: <div> Layout Loading...</div>,
        cacheKey: (props) => props.page,
    }
);
```



使用p-min-delay来解决页面加载过快的闪烁问题

```tsx
const AsyncPage = loadable(
    (props: { page: string }) => pMinDelay(import(`../pages/${props.page}/index.tsx`), 500),
    {
        fallback: <div> Layout Loading...</div>,
        cacheKey: (props) => props.page,
    }
);
```

