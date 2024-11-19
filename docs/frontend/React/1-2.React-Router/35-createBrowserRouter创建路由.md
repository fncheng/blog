## 通过createBrowserRouter创建路由

**1. 创建路由（routes.tsx）**

```tsx
import { createBrowserRouter } from 'react-router-dom';
import Home from './Home';
import About from './About';
import App from './App';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,  // App 作为顶级路由
    children: [
      {
        path: 'home',
        element: <Home />,
      },
      {
        path: 'about',
        element: <About />,
      },
    ],
  },
]);
```

**2. 使用 RouterProvider 包裹应用（main.tsx 或 index.tsx）**

```tsx
import React from 'react';
import ReactDOM from 'react-dom';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes';

ReactDOM.render(
  <RouterProvider router={router} />,
  document.getElementById('root')
);
```

## React的beforeEach实现

Vue的路由守卫beforeEach在页面路由发生变化时便会执行。
React没有提供类似的Api，但是AppApp 组件在每次路由变化时都会被执行。于是我们可以通过 React Router 的一些功能来实现类似的效果。

使用 useEffect 和 useLocation 实现路由守卫

```tsx
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // 类似于 beforeEach 的效果
    const handleRouteChange = () => {
      // 这里可以执行路由守卫逻辑，比如权限验证
      const isAuthenticated = false; // 假设为未登录状态
      if (!isAuthenticated && location.pathname !== '/login') {
        navigate('/login'); // 如果没有登录就跳转到登录页
      }
    };
    handleRouteChange(); // 路由变化时触发
    // 如果有条件，可以在此加入监听路由变化的逻辑
  }, [location.pathname]);
return <App />;
```

当我们满怀欣喜的以为就能大功告成时，却发现控制台报错了：
`Uncaught Error: useLocation() may be used only in the context of a <Router> component.`

原来这是因为 React Router提供的hooks `useLocation`,`useNavigate`必须在Router组件的内部使用

要解决这个问题，你需要确保 App 组件在 Router 组件的包裹下运行

在index.tsx中包裹
```tsx
ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);
```

但是如果使用的是createBrowserRouter呢？

那我们就需要将App组件作为根路由

routes.tsx

```tsx
export const routes: RouteConfig[] = [
    {
        path: "/login",
        element: (
            <Login />
        ),
        meta: {
            name: "登录页",
        },
    },
    {
        path: "/",
        errorElement: <Error />,
        element: <App />,
        children: [
            { path: "", element: <Home /> },
            {
                path: "about1",
                element: <About1 />,
            },
            {
                id: "user",
                path: "about",
                element: <About />,
                meta: { requireAuth: true },
                loader: userLoader,
            },
            { path: "test", element: <Test /> },
        ],
    },
    { path: "*", element: <NotFound /> },
];
```

App.tsx

```tsx
export default function App() {
    const { isLogin } = useContext(GlobalContext);

    const location = useLocation();
    const matches = useMatches();
    // to 即我们要跳转的页面路由元信息
    const to = matches.find((item) => item.pathname === location.pathname);
    console.log("to: ", to);
    const navigate = useNavigate();

    const handleRouteChange = () => {
        console.log("------全局路由守卫------", isLogin);
        // 如果未登录，且去的页面不是登录页，则重定向到登录页
        if (!isLogin && location.pathname !== "/login") {
            navigate("/login");
        }
        // 如果已登录，不可直接去登录页，应通过logout退出登录来跳转登录页
        if (isLogin && location.pathname === "/login") {
            navigate("/");
        }
        // 需要鉴权的页面
        if (to?.handle?.meta?.requireAuth) {
            // 判断有没有这个页面的权限
            // ...
            // 没有则跳转至指定页
            navigate("/unpermission");
        }
    };

    useEffect(() => {
        handleRouteChange();
    }, [location]);

    return <AppLayout />;
}
```

index.tsx

```tsx
root.render(
    <Suspense fallback={<Loading />}>
        <Router />
    </Suspense>
);
```



### 如果我同时还需要全局Context怎么办

将ContextProvider组件放在最外面

首先创建Context并提供Provider组件

```tsx
interface IGlobalContext {
  isLogin: boolean
  setLogin: React.Dispatch<React.SetStateAction<boolean>>
}

export const GlobalContext = createContext<IGlobalContext>({
  isLogin: JSON.parse(localStorage.getItem('isLogin') || 'false'),
  setLogin: () => {}
})

// 创建 Provider 组件
interface GlobalProviderProps {
  children: JSX.Element;
}
export const GlobalProvider: React.FC<GlobalProviderProps> = ({ children }) => {
  const [isLogin, setLogin] = useState<boolean>(() => {
    const storeValue = localStorage.getItem("isLogin");
    return storeValue ? JSON.parse(storeValue) : false;
  });

  return (
    <GlobalContext.Provider value={{ isLogin, setLogin }}>
        {children}
    </GlobalContext.Provider>);
};

// 创建自定义 hook，便于使用
export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error('useGlobalContext must be used within a GlobalProvider');
  }
  return context;
};
```

在index.tsx中最外层用 GlobalProvider 包裹

```tsx
root.render(
    <GlobalProvider>
        <Suspense fallback={<Loading />}>
            <Router />
        </Suspense>
    </GlobalProvider>
);
```

请注意：当Context Provider的value属性发生变化时，所有使用 `useContext` 或 `Context.Consumer` 订阅了该 `Provider` 的组件都会重新渲染。

如果没有订阅该 `Context` 的组件不会受到影响，因此不会重新渲染。

React 使用的是浅比较（`Object.is`），如果 `value` 是一个引用类型（比如对象或数组），即使它的内容没有变化，只要引用变了，所有消费该 `Context` 的组件都会重新渲染。





最终实现

```tsx
const routes = [
    // ...
]

const router = createBrowserRouter(routes);

const Router = () => <RouterProvider router={router} />;

export default Router;
```



## 使用loadable-components实现lazy load和code splitting

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



==pMinDelay使用Promise.race,那么不是应该率先返回其中的promise而不是delayPromise吗，因为promise比较快?==

**即使`Promise.race`先返回了 `delayPromise`，最后仍然返回 `promise`**。这是通过 `.then(() => promise)` 这一部分实现的。



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

