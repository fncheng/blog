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