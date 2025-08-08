---
title: Mockjs使用
---



## 使用

```ts
import mockjs from 'mockjs'

mockjs.mock('/api/getdata', 'get', {
  code: 200,
  body: {
    name: 'zs',
    age: 20
  }
})
```
然后在需要使用的页面引入即可

如果使用fetch请求的话，则需要额外安装fetchMock
```ts
import fetchMock from 'fetch-mock'
// 初始化 fetch-mock
fetchMock.config.overwriteRoutes = true

fetchMock.mock('/api/getdata1', {
      code: 200,
      data: {
        username: 'mock',
        age: 18
      }
    })
```

## 规则

http://mockjs.com/examples.html

```js
@id // 随机身份证
@guid // 随机id
@ip // 随机ip地址

// 数字
"number|1-100": 100   // 随机数字1-100内
"number|+1": 202  // 202开始自增1
// 布尔值
'boolean': '@boolean'
// 或者用0/1代替
'numnber|0-1': 0

// 时间
@date
Random.date('yyyy-MM-dd')
@time

// 姓名
@name
Random.name()
@name(true) // 有middle name


```



## Vite使用mockjs

在vite中使用mockjs

```sh
```



```ts
mock(/\/role\/(\d+)$/, {
    code: 200,
    body: {
        uuid: "1",
        username: "王霞",
        email: "y.grp@qq.com",
        mobile: "13337811783",
        roleIds: ["38", "48", "84", "2"],
        orgIds: ["85", "9", "97"],
        tag: "id quis",
        remark: "Lorem Ut sit",
        createDate: "2006-05-28",
        modifyDate: "1989-08-30",
        modifyUser: "eu velit Ut anim est",
        createUser: "voluptate laborum occaecat",
    },
});

mock(/\/role\/list\?.*/, {
    code: 200,
    body: {
        "content|20": [
            {
                uuid: "@uuid",
                roleName: "@cname",
                tag: "@tag",
                roleIds: ["38", "48", "84", "2"],
                orgIds: ["85", "9", "97"],
                remark: "Lorem Ut sit",
                createDate: "@date",
                modifyDate: "@date",
                modifyUser: "@name",
                createUser: "@name",
            },
        ],
    },
});
```

返回一个本地文件

```ts
import { MockMethod } from 'vite-plugin-mock';
import fs from 'fs';
import path from 'path';

export default [
  {
    url: '/api/getFile',
    method: 'get',
    response: () => {
      // 读取本地文件内容
      const filePath = path.resolve(__dirname, '../files/sample.txt'); // 替换为你的文件路径
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      
      return {
        code: 0,
        data: fileContent,
        filename: 'sample.txt',
      };
    },
  },
] as MockMethod[];
```



编写mock请求

```ts
import { MockMethod } from 'vite-plugin-mock';
import Mock from 'mockjs';

export default [
  {
    url: '/agent/proxyApi/flames-agent-manager/flames/api/v1/share4M/extract',
    method: 'post',
    response: () => {
      return {
        code: 0,
        data: {
          name: Mock.mock('@cname'),
          age: Mock.mock('@integer(20, 50)'),
        },
      };
    },
  },
  {
    url: '/agent/proxyApi/flames-agent-manager/flames/api/v1/share4M/check4Object',
    method: 'post',
    response: () => {
      return {
        code: 0,
        data: {
          name: Mock.mock('@cname'),
          age: Mock.mock('@integer(20, 50)'),
        },
      };
    },
  },
] as MockMethod[];

```

可以设置statusCode来模拟HTTP状态码

```ts
declare interface MockMethod {
    url: string;
    method?: MethodType;
    timeout?: number;
    statusCode?: number;
    response?: ((this: RespThisType, opt: {
        url: Recordable;
        body: Recordable;
        query: Recordable;
        headers: Recordable;
    }) => any) | any;
    rawResponse?: (this: RespThisType, req: IncomingMessage, res: ServerResponse) => void;
}
```

