# React-Router 6

## React Router6 对比 React Router5

React-Router6对比React-router5，更像Vue-Router了

- 首先5的Route path都是绝对路径，不支持相对路径，而6则支持相对路径



Route组件属性

- `path`：定义路由的路径，可以是字符串或字符串数组。例如，`path="/users"` 或 `path={['/users', '/admins']}`。
- `element`：指定路由对应的组件。例如，`element={<Home />}`。
- `children`：在路由匹配时渲染的子元素。与 `element` 属性互斥，不能同时使用。
- `caseSensitive`：指定路由路径是否区分大小写，默认为 `false`。
- `sensitive`：指定路由是否对 URL 参数区分大小写，默认为 `false`。
- `mergeParams`：在嵌套路由中，是否将父路由的参数合并到子路由中，默认为 `false`。
- `index`：指定路由为默认路由，即没有匹配的路径时显示的组件。
- `fallback`：指定当路由匹配时渲染的后备组件（通常在路由懒加载时使用）。
- `caseSensitive`：指定路由路径是否区分大小写，默认为 `false`。
- `sensitive`：指定路由是否对 URL 参数区分大小写，默认为 `false`。

其中没有5的component属性了，取而代之的是element属性

### Outlet组件

在 React Router 6 中，`<Outlet>` 组件用于渲染嵌套路由的子路由内容。它充当了父级路由组件的占位符，用于显示嵌套路由的子路由。

类似于Vue Router中的router-view



### Link

即`<router-link />`



#### 编程式导航

useNavigate

```jsx
const navigate = useNavigate()
navigate("/b"); // 跳转
```

```ts
export declare function useNavigate(): NavigateFunction;
export interface NavigateFunction {
    (to: To, options?: NavigateOptions): void;
    (delta: number): void;
}

export interface NavigateOptions {
    replace?: boolean;
    state?: any;
    preventScrollReset?: boolean;
    relative?: RelativeRoutingType;
}
```

### Link和NavLink

`<NavLink>`是`<Link>`的一个特定版本，会在匹配上当前的url的时候给已经渲染的元素添加参

```html
<a href="/b">to b</a>

<a aria-current="page" class="active" href="/">a</a>
```

上面是Link渲染出来的，下面是NavLink渲染的，可以看到多出来一个class="active"

这样就可以设置默认激活，做上色等操作

[aria-content](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current)是无障碍属性



### URL prarms传递

```jsx
import { Routes, Route, useParams } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route
        path="invoices/:userid"
        element={<Invoice />}
      />
    </Routes>
  );
}

function Invoice() {
  let params = useParams();
  return <h1>Invoice {params.userid}</h1>;
}
```



### 嵌套路由

`<Outlet />` 组件即 Vue-Router中的 `router-view`

```jsx
function Header() {
  return (
    <ul className="navs">
      <li className="nav">
        <Link to="/invoices/1">to invoice 1</Link> |
        <Link to="/invoices/2">to invoice 2</Link>
      </li>
    </ul>
  );
}
function View() {
  return (
    <Routes>
      <Route path="a" element={<Invoices />}></Route>
      <Route path="b/:userid" element={<Invoice />}></Route>
      <Route path="/invoices" element={<Invoices />}>
        <Route path=":invoiceid" element={<Invoice />}></Route>
        <Route path="2" element={<SendInvoice />}></Route>
      </Route>
    </Routes>
  );
}
function Invoices() {
  return (
    <>
      <h3>Invoices</h3>
      <Outlet />
    </>
  );
}

function Invoice() {
  const params = useParams();
  return (
    <>
      <div>Invoice id</div>
      <div>{params.invoiceid}</div>
    </>
  );
}

function SendInvoice() {
  return <div>SendInvoice</div>;
}
```



## React Router6嵌套路由

使用createBrowserRouter创建配置式路由

```tsx
const routes: RouteObject[] = [
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { path: "", element: <span>/</span> },
      { path: "/about", element: <span>About</span> },
      { path: "test", element: <span>Test</span> },
      {
        path: "layout",
        element: <Layout />,
        children: [
          { path: "1", element: <span>layout1</span> },
          { path: "2", element: <span>layout2</span> },
          {
            path: "3",
            element: <Layout3 />,
            children: [
              { path: "1", element: <span>layout/3-1</span> },
              { path: "2", element: <span>layout/3-2</span> }
            ]
          }
        ]
      }
    ]
  },
  { path: "/login", element: <span>Login</span> }
];
const router = createBrowserRouter(routes);

const App = () => <RouterProvider router={router} />
```

