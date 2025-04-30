---
title: TanstackQuery使用
---

## TanstackQuery使用

`TanStack Query`（以前称为 `React Query`）是一个用于数据获取、缓存和同步的库，主要用于 React 和 Vue（称为 `@tanstack/vue-query`）。它可以帮助管理服务器状态，并优化数据获取的体验。

- **数据缓存**：自动缓存请求结果，减少不必要的请求。
- **自动重试**：网络错误时会自动重试请求。

https://tanstack.com/query/v5/docs/framework/react/quick-start



默认情况下，`TanStack Query` 会在**页面重新聚焦**时重新获取数据：

```ts
useQuery({
  queryKey: ['posts'],
  queryFn: fetchPosts,
  refetchOnWindowFocus: true, // 默认就是 true
});
```

```ts
const { data, error, isLoading } = useQuery({
  queryKey: ['posts', userId],
  queryFn: fetchPosts,
  staleTime: 1000 * 60 * 5,  // 数据在 5 分钟内不会重新请求
  cacheTime: 1000 * 60 * 10, // 数据在 10 分钟后会被清除
  refetchOnWindowFocus: true,
  refetchInterval: 5000,  // 每 5 秒重新请求数据
  onError: (error) => {
    console.error('请求失败:', error);
  },
  onSuccess: (data) => {
    console.log('数据获取成功:', data);
  },
});
```

### queryKey带参数

`queryKey: ['user', userId]`



## 封装自定义 Query Hooks

```ts
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchUser = async (userId) => {
  const { data } = await axios.get(`/api/users/${userId}`);
  return data;
};

export const useUserQuery = (userId) => {
  return useQuery({
    queryKey: ['user', userId],
    queryFn: () => fetchUser(userId),
    enabled: !!userId, // 仅在 userId 存在时执行查询
    staleTime: 5 * 60 * 1000, // 数据 5 分钟后变“陈旧”
  });
};
```



## 乐观更新

乐观更新是指在服务器响应之前，先假设操作成功并更新 UI。useMutation 配合 queryClient 可以实现这一点。

**场景**：用户点赞一篇帖子，立即更新点赞数，而不是等待服务器返回。

```tsx
import { useMutation, useQueryClient } from '@tanstack/react-query';

function LikeButton({ postId }) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (newLike) => api.postLike(postId, newLike),
    onMutate: async (newLike) => {
      // 在 mutation 执行前取消旧查询，避免冲突
      await queryClient.cancelQueries(['post', postId]);
      // 获取旧数据
      const previousPost = queryClient.getQueryData(['post', postId]);
      // 乐观更新
      queryClient.setQueryData(['post', postId], (old) => ({
        ...old,
        likes: old.likes + 1,
      }));
      // 返回旧数据，以便回滚
      return { previousPost };
    },
    onError: (err, newLike, context) => {
      // 如果出错，回滚到旧数据
      queryClient.setQueryData(['post', postId], context.previousPost);
    },
    onSettled: () => {
      // 不管成功或失败，重新获取最新数据
      queryClient.invalidateQueries(['post', postId]);
    },
  });

  return (
    <button onClick={() => mutation.mutate({ liked: true })}>
      Like ({queryClient.getQueryData(['post', postId])?.likes || 0})
    </button>
  );
}
```

## 分页查询

原本的分页查询逻辑

```tsx
import { fetchComments } from './api'
import { useEffect, useState } from 'react'

export default function () {
    const [pageNum, setPageNum] = useState(1)
    const [data, setData] = useState<any[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState(false)

    const getData = async () => {
        setIsLoading(true)
        try {
            let res = await fetchComments({ postId: pageNum })
            setData(res)
        } catch (error) {
            console.error(error)
            setError(true)
        } finally {
            setIsLoading(false)
        }
    }
    useEffect(() => {
        getData()
    }, [pageNum])

    console.log('render')

    if (isLoading) return <p>Loading...</p>
    if (error) return <p>Error loading posts</p>

    return (
        <div>
            <ul>{data?.map((item) => <li key={item.id}>{item.name}</li>)}</ul>
            <button onClick={() => setPageNum(pageNum + 1)}>{pageNum}</button>
        </div>
    )
}
```

使用useQuery后

```tsx
import { useQuery } from '@tanstack/react-query'
import { fetchComments } from './api'
import { useState } from 'react'

export default function () {
    const [pageNum, setPageNum] = useState(1)
    const { data, error, isLoading } = useQuery({
        queryKey: ['users', pageNum],
        queryFn: () => fetchComments({ postId: pageNum })
        // staleTime: 1000 * 60 * 5 // 5 分钟内不重新请求
    })

    console.log('render')

    if (isLoading) return <p>Loading...</p>
    if (error) return <p>Error loading posts</p>

    return (
        <div>
            <ul>{data?.map((item) => <li key={item.id}>{item.name}</li>)}</ul>
            <button onClick={() => setPageNum(pageNum + 1)}>{pageNum}</button>
        </div>
    )
}
```

### 使用useInfiniteQuery无限滚动

```tsx
import { useInfiniteQuery } from '@tanstack/react-query'
import { fetchComments } from './api'

export default function () {
    const { data, error, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage, isPending } = useInfiniteQuery({
        queryKey: ['users', 'infinite'],
        queryFn: ({ pageParam }) => fetchComments({ postId: pageParam }),
        initialPageParam: 1,
        getNextPageParam: (lastPage) => lastPage.postId + 1,
        staleTime: 1000 * 60 * 3 // 5 分钟内不重新请求
    })
    console.log('data: ', data)

    console.log('render')

    if (isPending) return <div>加载中...</div>
    if (isLoading) return <p>Loading...</p>
    if (error) return <p>Error loading posts</p>

    return (
        <div>
            <ul>
                {data.pages.map((page) => {
                    return page.data.map((item) => <li key={item.id}>{item.name}</li>)
                })}
            </ul>
            <span>{hasNextPage}</span>
            <button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
                {isFetchingNextPage ? '加载中...' : '加载更多'}
            </button>
        </div>
    )
}
```



## 自动取消请求

TanStack Query支持自动取消请求，前提是你给接口请求传递了一个AbortSignal实例。当查询变得过时或不活跃时（比如组件卸载），这个 signal 会被中止。

```tsx
const { data, error, isLoading } = useQuery({
        queryKey: ['posts'],
        queryFn: ({ signal }) => fetchPosts({ signal })
    })

export const fetchPosts = async ({ signal }: { signal: AbortSignal }) => {
    const { data }: { data: PostItem[] } = await axios.get('https://jsonplaceholder.typicode.com/posts', { signal })
    return data
}
```





## queryClient.fetchQuery和useQuery的区别

1.queryClient.fetchQuery

```ts
const qc = new QueryClient()
const number = qc.fetchQuery({
  queryKey: ['number'],
  queryFn: ({ signal }) => useNumber(signal),
})
```

**特点：**

- `number` 是一个 `Promise<T>`。
- 会**立即执行请求**（同步发起），无响应式绑定。
- **不会触发组件重新渲染**。
- 可以手动放在逻辑流程中使用，比如在 `beforeEnter`、`async setup`、或某个封装函数中使用。
- 适合 “**我现在就要请求数据，然后把结果传出去**” 的场景。

**适用场景**

在组件外使用、需要用 Promise 的地方，例如：

- `router.beforeEnter`
- `setup()` 外部的初始化
- 需要预拉取数据（SSG/SSR）
- 想手动等待数据加载完成

2.useQuery

```ts
const { data: number } = useQuery({
  queryKey: ['number'],
  queryFn: ({ signal }) => useNumber(signal),
})
```

**特点：**

- `number` 是一个 `ref<T | undefined>`，**响应式**。
- 适合用于组件中，用来绑定模板显示。
- 会在组件加载时自动请求（除非 `enabled: false`）。
- 自带 loading/error 状态、缓存、自动重新请求等。
