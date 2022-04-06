### 前端项目中的.env文件

https://juejin.cn/post/6844904153890684935

通过process.env可以获取当前运行环境的信息。



#### .env文件

```yaml
// .env
NDOE_ENV=development
PROT=10086
APP_KEY=***********
HOST_URL=**********
```

创建.env文件后，需要编写代码来查找解析文件并将其写入到项目中，可以利用第三方包，比如`dotenv`

```js
const dotenv = require('dotenv');
dotenv.config(); 

console.log(process.env.PROT); // 10086
```

