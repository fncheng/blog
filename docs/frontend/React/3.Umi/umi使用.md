## Umi命令

检查插件注册情况

```sh
yarn umi plugin list
```



## Umi状态管理

[@umijs/plugin-model](https://v3.umijs.org/zh-CN/plugins/plugin-model#umijsplugin-model)

```ts
import { useState } from 'react';

export default function useAuthModel() {
  const [user, setUser] = useState(0);
  return { user, setUser };
}

// in About.tsx
import { useModel } from 'umi';
const { user, setUser } = useModel('count', (model) => ({
    user: model.user,
    setUser: model.setUser,
  }));
```

useModel第二个参数为可选，可用于性能优化，取出model中需要的部分

相关：[model性能优化](https://pro.ant.design/zh-CN/docs/simple-model/#%E4%B8%89model-%E6%80%A7%E8%83%BD%E4%BC%98%E5%8C%96)



## Umi mock

关联：[mockjs的使用](https://github.com/fncheng/js-learn/issues/11)

当接口名带变量时如何解决

如果你想在 mock 接口中使用 REST 参数，你可以使用 Express 的 REST 参数语法 `(req, res, next, ...restArgs)`，其中 `restArgs` 代表一个数组，它包含请求路径之后的所有参数。

例如，如果你有一个动态路由 `/api/user/:id`，并想要在接口中接受一个名为 `extra` 的 REST 参数，可以这样写：

```typescript
export default {
  'GET /api/user/:id': (req, res, next, ...restArgs) => {
    const userId = req.params.id;
    const extraParam = restArgs[0];

    // 做一些处理，并返回响应
    res.send({
      status: 'ok',
      message: 'success',
      data: {
        userId,
        extraParam,
      },
    });
  },
};
```

当你发送 `/api/user/100?extra=isNew` 的 GET 请求时，`100` 会被作为 `:id` 的值，而 `['isNew']` 会被作为 `restArgs` 参数传递进去。因此，该接口的响应结果将会是：

```json
{
  "status": "ok",
  "message": "success",
  "data": {
    "userId": "100",
    "extraParam": "isNew"
  }
}
```



## Umi的Prompt

Umi Prompt 组件是 React Router 提供的 Prompt 组件的 Umi 封装版本，用于在路由切换前提示用户是否要离开当前页面。其工作原理是通过在路由切换时调用 history.block 方法，注册一个回调函数，在该回调函数中展示提示框，并根据用户的选择，决定是否允许路由切换。

```tsx
import { useHistory } from 'umi';

export default function MyComponent() {
  const history = useHistory();

  const handleBeforeUnload = (message) => {
    return `Are you sure you want to leave this page?`;
  };

  const handleGoToNextPage = () => {
    history.block(handleBeforeUnload);
    history.push('/next-page');
  };

  return (
    <div>
      <button onClick={handleGoToNextPage}>Go to next page</button>
    </div>
  );
}
```

需要注意`history.block()`只有在页面路径变化时才会生效



history.block的原理又是什么

在 React-Router 中，history 对象被封装成了一个名为 `historyEnhancer` 的高阶函数，通过对原生 history 对象进行封装和扩展，添加了路由切换监听的功能。

对 history 对象的扩展主要是在 `createBrowserHistory` 和 `createHashHistory` 等函数中进行的。这些函数分别返回一个 `browserHistory` 或 `hashHistory` 对象，该对象是一个封装后的 history 对象，实现了路由切换的监听和控制功能。

history 对象的监听和控制功能是通过注册 `beforeunload` 和 `popstate` 事件来实现的。当路由切换时，会触发 `beforeunload` 事件和 `popstate` 事件，路由组件会根据当前的 block 回调函数来判断是否需要进行路由切换的阻止或提示。如果 block 回调函数返回 null、undefined 或一个空字符串，则路由切换会被允许。如果 block 回调函数返回一个字符串，则会显示一个提示框，让用户进行确认或取消操作。如果需要取消路由切换，则回调函数可以调用 `event.preventDefault()` 方法。

## React-Router 封装 historyEnhancer 的源码

### historyEnhancer

`historyEnhancer` 函数接收一个原生的 history 对象作为参数，并返回一个包含 `listen` 和 `block` 方法的对象。其中：

- `listen` 方法用于注册路由切换的监听器，当路由切换时，将会调用所有注册的监听器执行。returns 可以用于取消该监听器。
- `block` 方法用于设置路由切换时的回调函数，在该函数中可以进行路由的保存、校验、阻止等操作。该方法返回一个函数，用于取消该 block 回调函数的注册。

```tsx
const historyEnhancer = (history) => {
  const listeners = [];

  const listen = (listener) => {
    listeners.push(listener);

    return () => {
      const index = listeners.indexOf(listener);
      if (index >= 0) {
        listeners.splice(index, 1);
      }
    };
  };

  const block = (prompt) => {
    let unblock;

    const listener = (location, action) => {
      if (unblock) {
        unblock();
        unblock = null;
      }
      const message = typeof prompt === 'function' ? prompt(location, action) : prompt;
      if (message) {
        unblock = history.block(message);
      }
    };

    const unlisten = history.listen(listener);

    return () => {
      unlisten();
      if (unblock) {
        unblock();
        unblock = null;
      }
    };
  };

  return {
    ...history,
    listen,
    block,
  };
};
```

`historyEnhancer` 是一个高阶函数，它接收一个 `createHistory` 函数作为参数，返回一个新的函数，这个函数又接收一组选项参数，返回一个被封装和扩展后的 `history` 对象以及一些用于控制路由切换的方法和属性。

```tsx
import { createBrowserHistory, History } from "history";
import historyEnhancer from "./historyEnhancer";

const history: History = historyEnhancer(createBrowserHistory())
```

`historyEnhancer(createHistory)()` 返回的被封装和扩展后的 `history` 对象包括了以下常用属性和方法：

- `history.location`：返回当前地址栏的 URL 信息，包含 `pathname`、`search`、`hash` 等属性。
- `history.push(path, [state])`：将路径 `path` 添加到历史记录中，可选的 `state` 对象也一同添加到历史记录中。
- `history.replace(path, [state])`：将路径 `path` 替换当前记录的路径，可选的 `state` 对象也一同添加到历史记录中。
- `history.goBack()`：回到上一个历史记录。
- `history.goForward()`：前往下一个历史记录。
- `history.listen(listener)`：添加一个路由切换的监听器，当路由切换时会调用该监听器。
- `history.block(prompt)`：弹出一个提示，询问用户是否在离开当前页面之前阻止路由切换的行为。



### 在history库中，又是如何实现block方法的呢

在 `history` 库中，`block` 方法的实现主要是依赖 `createTransitionManager` 来实现的。

`createTransitionManager` 函数用于创建一个状态转换管理器，它负责监听 `history` 变化以及调度路由切换。在 `createTransitionManager` 中，会创建以下对象：

- `listeners`：存储路由变化相关的回调函数
- `confirmTransitionTo`：用于调度路由切换的方法
- `appendListener`：用于添加路由变化相关的回调函数的方法
- `notifyListeners`：用于通知所有回调函数的方法

`block` 方法的实现就是为 `confirmTransitionTo` 添加一个阻止路由切换的逻辑。具体实现如下：

```typescript
function createTransitionManager(): TransitionManager {
  // ...
  let prompt: TransitionPrompt | null = null

  const setPrompt = (nextPrompt: TransitionPrompt | null) => {
    prompt = nextPrompt
    return () => {
      if (prompt === nextPrompt) prompt = null
    }
  }

  const confirmTransitionTo = (
    location: Location,
    action: Action,
    getUserConfirmation: GetUserConfirmation,
    callback: Function
  ) => {
    // ...
    const unblock = prompt && prompt(message, unblock)

    if (unblock == null) {
      doConfirmTransitionTo()
    } else {
      // ...
    }
  }

  const block = (prompt: TransitionPrompt = true): UnregisterCallback => {
    const unblock = setPrompt(prompt)

    return () => {
      if (unblock) unblock()
    }
  }

  return {
    // ...
    block,
  }
}
```

在 `createTransitionManager` 中，我们定义了一个名为 `prompt` 的变量，它用来暂存当前正在使用的阻止路由切换的函数。`setPrompt` 方法用于设置阻止路由切换的函数并返回一个解除阻止的函数，`confirmTransitionTo` 方法则会根据 `prompt` 是否存在来决定是否触发阻止路由切换。

而 `block` 方法就是为 `prompt` 变量设置阻止路由切换的函数，同时返回一个解除阻止的函数。

当我们在路由发生变化时，`confirmTransitionTo` 被调用，如果 `prompt` 存在，那么 `prompt` 将会被传递给阻止路由切换的函数，并且阻止路由切换的逻辑会被触发；如果 `prompt` 不存在，那么将直接执行路由切换的逻辑。

回到我们使用 `history` 的实际场景中，我们可以通过调用 `history.block` 方法来为当前的路由设置阻止路由切换的逻辑。当用户尝试离开当前路由时，`block` 方法设置的函数将会被触发，询问用户是否确认离开当前页面。
