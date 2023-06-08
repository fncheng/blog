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
