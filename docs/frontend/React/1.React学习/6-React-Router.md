## React-Router 5 demo

```tsx
import './styles.css'
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom'
import Topics from './Topic'

export default function App() {
  return (
    <BrowserRouter>
      <nav>
        <ul>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/about'>About</Link>
          </li>
          <li>
            <Link to='/topics'>Topics</Link>
          </li>
        </ul>
      </nav>

      <Switch>
        <Route path='/about' render={()=> <span>About</span>}>
        </Route>
        <Route path='/topics' component={Topics}>
        </Route>
        <Route path='/'>
          Home
        </Route>
      </Switch>
    </BrowserRouter>
  )
}
```



## React-Router 5 hooks

以下是 React-Router-DOM 5 中提供的常用 Hook：

### useParams

`useParams()`：用于获取 URL 中的参数。

比如定义了路由参数

```tsx
<Route path="/users/:id">
```

访问了`/users/123` 路由时，useParams就会得到`{ id: '123' }`



### useLocation

`useLocation()`：用于获取当前页面的 URL 信息，包括 pathname、search 和 hash。

params传参可以通过location.state获取

```tsx
history.push(`/xxxxx`, {
  id: 'xxx',
});

const location = useLocation();
const { id } = location.state;
```



### useHistory

`useHistory()`：用于获取跳转的历史记录并进行操作，例如后退或前进。

### useRouteMatch

`useRouteMatch()`：用于检查当前的 URL 是否与给定的路径模式匹配，并返回匹配信息。



### useHistory返回值为undefined

请注意，要使用 `useHistory`，你必须在你的 `App` 组件（或其他包含你的路由器组件的祖先组件）中使用 `<BrowserRouter>` 组件。

以下是 `Route` 组件的参数及其用法：

1. `path`

   这个参数指定路由的匹配路径。一旦应用程序中的 URL 与 `path` 模式匹配，该路由组件将呈现。`path` 支持通配符和动态段，你可以使用 `:parameter` 表示动态路径段，这样在后续的代码中可以使用 `props.match.params.parameter` 来获取参数的值。

   ```jsx
   <Route path="/" exact component={Home} />
   <Route path="/users" component={Users} />
   <Route path="/users/:id" component={UserProfile} />
   ```

2. `component`

   这个参数指定路由匹配成功后要渲染的组件。当浏览器 URL 与 `path` 参数匹配时，该组件将被渲染。它通常是编写路由处理逻辑的核心部分。

   ```jsx
   <Route path="/" exact component={Home} />
   <Route path="/users" component={Users} />
   ```

3. `exact`

   这个参数指定是否需要严格匹配路由路径。如果指定了 `exact`，则只有在 URL 完全匹配 `path` 时才会渲染组件。如果没有指定 `exact`，则路由是模糊匹配的，只要 URL 包含 `path` 路径中的任何内容，就会渲染该组件。

   ```jsx
   <Route path="/" exact component={Home} />
   ```

以上是 `Route` 组件最常用的三个参数。除了这些参数之外，还有一些其他的参数可以被用来自定义路由行为，例如 `render`、`children`、`location` 等。





## Router组件

BrowserRouter和HashRouter都是Router组件

```tsx
function Router(props) {
  const computeRootMatch = (pathname) => { path: "/", url: "/", params: {}, isExact: pathname === "/" };
  const location = props.history.location;
  
  return (
		<RouterContext.Provider
        value={{
          history: props.history,
          location: location,
          match: Router.computeRootMatch(state.location.pathname),
          staticContext: props.staticContext
        }}
      >
        <HistoryContext.Provider
          children={props.children || null}
          value={props.history}
        />
      </RouterContext.Provider>
  )
}
```

### Switch组件

`<Switch>` 组件的主要作用是从上到下逐一匹配路由，一旦匹配到第一个路由，就停止匹配并渲染该路由的内容。

```tsx
function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/about" component={About} />
        <Route component={NotFound} /> {/* 匹配不到任何路由时显示 404 页面 */}
      </Switch>
    </BrowserRouter>
  );

```

上述代码如果不用Switch组件包裹，NotFound页面会在每个路由页面都显示



## 嵌套路由

在 React-Router 中，如果你使用嵌套路由，你仍然需要使用 `Route` 组件来定义路由规则。每个嵌套的路由都需要在 `Route` 组件中进行定义。

```tsx
<Route path="/dashboard">
  <Dashboard>
    <Route path="/dashboard/profile" component={Profile} />
    <Route path="/dashboard/settings" component={Settings} />
  </Dashboard>
</Route>
<Route path='about'></Route>
```

实际应用

```tsx
const handleRoute = (routes: RouteConfig[]) =>
  routes.map((r: RouteConfig, i) => {
    if (r.routes && r.routes.length > 0) {
      return (
        <Route path={r.path} key={i}>
          <r.component>{handleRoute(r.routes)}</r.component>
        </Route>
      );
    } else return <Route {...r} key={i}></Route>;
  });

const App = () => {
    return (
        <BrowserRouter>
            <Switch>{handleRoute(routes)}</Switch>
        </BrowserRouter>
    );
};
```



<iframe src="https://codesandbox.io/embed/react-router-qian-tao-lu-you-bian-li-ban-j29fnm?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="react-router-嵌套路由(遍历版)"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>



## React-Router 5 Route组件源码

以下是Route组件核心实现

```tsx
import * as React from 'react';
import { RouterContext } from './RouterContext';
import matchPath from './matchPath';

function Route(props) {
  const { path, children, render, component: Component, ...rest } = props;
  const match = React.useMemo(() => {
    return matchPath(path || "/", rest);
  }, [path, rest]);

  return (
    <RouterContext.Consumer>
      {context => {
        const location = props.location || context.location;
        const routeProps = {match, location, ...rest};
        let element;

        if (match) {
          if (Component) {
            element = <Component {...routeProps} />;
          } else if (render) {
            element = render(routeProps);
          } else if (children) {
            element = children(routeProps);
          } else {
            element = null;
          }
        } else {
          if (children) {
            element = children(routeProps);
          } else {
            element = null;
          }
        }

        return element;
      }}
    </RouterContext.Consumer>
  );
}

export default Route;
```

`Route` 组件使用了 React 的 context，它通过 `RouterContext.Consumer` 获取了当前 `Router` 组件的 `location` 属性，然后基于传入的 `path` 属性和当前路径判断是否匹配。如果匹配，则使用 `component`、`render` 或 `children` 中的一个方式渲染组件。如果不匹配，则直接返回 `null`。

需要注意的是，如果你使用路由参数，比如 `/users/:userId`，则 `match` 对象将具有 `params` 属性，它包含传递给路由的参数。





## history库push方法如何实现的

```ts
function push(path, state) {
  const location = { ...this.location, state };
  const action = 'PUSH';
  const pathName = typeof path === 'object' ? path.pathname : path;
  const url = createUrl(this.createHashHistory ? '#' : '', pathName, state);

  this.entries.push(location);
  this.index++;
  this.location = location;
  this._updateUrl(url);

  const event = new PopStateEvent('popstate', { state });
  window.dispatchEvent(event);

  this._invokeListeners(this.listeners, action, location);
}
```

