react-router中Routes和Route  就像Vue中的路由表Routes

每一个Route都是一个路由，element属性控制渲染的组件，to属性控制route path



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

