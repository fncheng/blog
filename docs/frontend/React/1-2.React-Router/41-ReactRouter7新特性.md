ReactRouter7新特性

## Link的viewTransition属性

可以给Link、NavLink、Form属性添加viewTransition属性，以添加路由切换时的过渡动画。

This automatically wraps the navigation update in `document.startViewTransition()`

更多内容详见：https://reactrouter.com/how-to/view-transitions#basic-view-transition

## Await和loader的并发渲染

### 移除defer

原来的loader

```ts
return defer({ number, name, data, abortController })
```

改成

```ts
return { number, name, data, abortController }
```

配合React19的 use 使用

使用Await

```tsx
<Suspense fallback={<Loading />}>
    <Await resolve={number} errorElement={<GlobalLoading />}>
        {(data) => {
            console.log('render number')
            return (
                <div style={{ color: 'red' }}>
                    <h3>Number: {data}</h3>
                </div>
            )
        }}
    </Await>
</Suspense>
```

使用use

```tsx
const NumberComponent = useCallback(() => {
    const resolvedNumber = use(number)
    console.log('render number')
    return (
        <div style={{ color: 'red' }}>
            <h3>Number: {resolvedNumber}</h3>
        </div>
    )
}, [number])
return (
    <Suspense fallback={<Loading />}>
        <NumberComponent />
    </Suspense>
)
```





## lazy

原来懒加载一个组件：

```tsx
const About1 = React.lazy(() => import('../pages/About/About1.tsx'))

const routes = [
    {
        path: 'about1',
        element: <About1 />,
        errorElement: <Error />
    },
]
```

使用Route.lazy后

```tsx
const routes = [
    {
        path: 'about1',
        lazy: async () => {
            const About1 = await import('../pages/About/About1.tsx')
            return { Component: About1.default }
        },
        errorElement: <Error />
    },
]
```

Route.lazy更加灵活，还可以添加loader数据等

```tsx
lazy: async () => {
  const { Dashboard } = await import("./Dashboard");
  const data = await fetchDashboardData(); // 你可以加载数据或执行其他逻辑
  return {
    Component: Dashboard,
    loaderData: data,
  };
}
```

