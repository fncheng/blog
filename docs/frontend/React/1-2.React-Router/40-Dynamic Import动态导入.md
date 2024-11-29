## Dynamic Import

首先我们要知道懒加载和动态导入是两个概念

懒加载是一种优化技术，指的是在真正需要某个资源时才加载它

动态导入是一种在代码中按需加载模块的方法，而不是在应用程序启动时一次性加载所有模块，体现在浏览器Network中按需加载模块（js文件）。在 Webpack、Vite 等构建工具中，动态导入会将导入的模块打包成一个单独的文件，只有当代码执行到该导入语句时才会请求该文件。

```tsx
import './styles.css';
import { createBrowserRouter, RouteObject, RouterProvider } from 'react-router-dom';
import { Suspense, lazy } from 'react';

const modules: Record<string, () => Promise<any>> = import.meta.glob('./pages/**/*.tsx');
console.log('modules: ', modules);

const createLazyComponent = (path: string) => {
  const Component = lazy(modules[`./${path}.tsx`]);
  return (
    <Suspense fallback={<div>loading...</div>}>
      <Component key={path} />
    </Suspense>
  );
};

const handleAsyncRoutes = (routes: RouteConfig[]): any =>
  routes.map((route) => {
    console.group('route: ', route);
    if (route.children) {
      route.children = handleAsyncRoutes(route.children);
    }
    if (route.path && route.element) {
      return route;
    }
    if (route.componentPath && !route.element) {
      return {
        ...route,
        path: route.path,
        element: createLazyComponent(route.componentPath)
      };
    } else return route;
  });

type RouteConfig = RouteObject & {
  name?: string;
  componentPath?: any;
  children?: RouteConfig[];
};

const routes: RouteConfig[] = [
  {
    path: '/',
    componentPath: 'pages/AppLayout',
    // element: <AppLayout />,
    children: [
      { path: '', element: <span>/</span> },
      { path: 'about', element: <span>About</span> },
      { path: 'test', element: <span>Test</span> },
      {
        path: 'layout',
        // element: <Layout />,
        componentPath: 'pages/Layout',
        children: [
          { path: '1', element: <span>layout1</span> },
          { path: '2', element: <span>layout2</span> },
          {
            path: '3',
            // element: <Layout3 />,
            componentPath: 'pages/Layout3',
            children: [
              { path: '1', element: <span>layout/3-1</span> },
              { path: '2', element: <span>layout/3-2</span> }
            ]
          }
        ]
      }
    ]
  },
  { path: '/login', element: <span>Login</span> }
];
const routesFinal = handleAsyncRoutes(routes);
const router = createBrowserRouter(routesFinal);

export default function App() {
  return (
    <div className='App'>
      <RouterProvider router={router} />
    </div>
  );
}
```

### dynamic-import-vars

[动态import和Promise的关系](https://github.com/fncheng/fe/issues/21)

[动态导入的四条规则](https://github.com/rollup/plugins/tree/master/packages/dynamic-import-vars#limitations)

1. Imports must start with `./` or `../`.

   即所有导入都必须相对于导入文件开始

2. 导入必须以文件扩展名结尾

## React.lazy配合Suspense实现组件延迟加载

```tsx
const LazyComponent = lazy(() => loadWithDelay(import('./LazyComponent'), 2000))

const Test = () => {
    const [isShow, setIsShow] = useState(false)
    return (
      <>
        <button onClick={() => setIsShow(!isShow)}>show lazy component</button>
        <Suspense fallback={<div>waiting...</div>}>
            {isShow && <LazyComponent />}
        </Suspense>
      </>
    )
}
```

模拟组件的延迟加载

```ts
export const loadWithDelay = (promise: Promise<any>, time: number) => {
    const delay = (d: number) => new Promise((resolve) => setTimeout(resolve, d))
    const delayPromise = delay(time)
    return Promise.all([promise, delayPromise]).then(() => promise)
}
```





## 使用loadable-components动态导入

https://loadable-components.com/docs/dynamic-import/

在此之前我们通过React.lazy和Suspense实现了路由模块的懒加载和代码分割

现在我了解到loadable-components这个库也可以实现以上效果并且功能更多还支持SSR

首先安装@loadable/component

```sh
pnpm add @loadable/component
```

使用loadable方法加载组件

```tsx
const Home = loadable(() => import("../pages/Home/index"));
```

还可以实现 *Full dynamic import*，即带变量的路径导入

```tsx
const AsyncPage = loadable(
    (props: { page: string }) => pMinDelay(import(`../pages/${props.page}/index.tsx`), 300),
    {
        fallback: <div> Layout Loading...</div>,
        cacheKey: (props) => props.page,
    }
);

const routes: RouteObject[] = [
    {
        path: "layout",
        element: <Layout1 />,
        children: [
            {
                path: "1",
                element: <AsyncPage page="layout1-1" />,
            },
            {
                path: "2",
                element: <AsyncPage page="layout1-2" />,
            },
        ],
    },
];
```

需要注意的是，如果你没有使用babel插件（`@loadable/babel-plugin`），那么你在使用*Full dynamic import*时，必须要设置cacheKey字段

当页面因加载过快出现闪烁问题时，我们还可以通过 *p-min-delay* 来延迟加载，以优化用户体验

```tsx
import pMinDelay from "p-min-delay";
const Home = loadable(() => pMinDelay(import("../pages/Home/index"), 300);
```

```tsx
import pMinDelay from "p-min-delay";
const AsyncPage = loadable(
    (props: { page: string }) => pMinDelay(import(`../pages/${props.page}/index.tsx`), 500),
    {
        fallback: <div> Layout Loading...</div>,
        cacheKey: (props) => props.page,
    }
);
```

## pMinDelay实现

pMinDelay源码很简单：

```ts
function pMinDelay(promise, minimumDelay, options = {}) {
    let delayPromise = new Promise(resolve => setTimeout(resolve, minimumDelay));

    // If `delayRejection` is true, delay both fulfillment and rejection of the promise
    if (options.delayRejection) {
        return Promise.all([promise, delayPromise]).then(
            values => values[0],
            error => Promise.reject(error)
        );
    }

    // If `delayRejection` is false or not provided, just race the two promises
    return Promise.all([promise, delayPromise]).then(() => promise);
}

export default pMinDelay;
```

`p-min-delay` 确保：

1. **至少等待设定的延迟时间**。
2. 如果 Promise 比设定时间早完成，延迟时间过后立即返回结果。
3. 如果 Promise 加载时间超过了设定的延迟时间，Promise 一完成就会立即返回结果，不会额外等待。



来看两段代码，这两段代码有什么区别？

```tsx
const loadWithDelay = (cb: Promise<any>, time: number) =>
    new Promise((resolve) =>
        setTimeout(() => {
            resolve(cb);
        }, time)
    );
```

返回的 `Promise` 在指定的延迟后立即fullfilled，并返回传入的 `Promise` 对象，而不管它的状态。

```tsx
const loadWithDelay = (cb: Promise<any>, time: number) =>
    new Promise((resolve) =>
        setTimeout(() => {
            resolve();
        }, time)
    ).then(() => cb);
```

上面的代码优化下：

```tsx
const loadWithDelay = (cb: Promise<any>, time: number) =>
    new Promise((resolve) => setTimeout(resolve, time)).then(() => cb);
```

返回的 `Promise` 在指定的延迟后执行 `cb`，并根据 `cb` 的结果来决定返回的 `Promise` 的解决或拒绝状态。



两段代码都可以模拟模块的延迟加载

### 手动实现pMinDelay

现在让我们使用setTimeout手动实现一个pMinDelay

```tsx
const loadWithDelay = (promise: Promise<any>, time: number) => {
    const delay = (d: number) => new Promise((resolve) => setTimeout(resolve, d));
    const delayPromise = delay(time);
    return Promise.all([promise, delayPromise]).then(() => promise);
};
```

使用loadWithDelay

```tsx
const Test = lazy(() => loadWithDelay(import('../pages/Test/index.tsx'), 2000))
```

