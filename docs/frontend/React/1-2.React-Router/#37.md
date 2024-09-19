## 使用NodeJS创建一个指定大小的文件

```js
const fs = require('fs')
const path = require('path')

const filePath = path.resolve(__dirname, 'test.txt')

// 比如10M
const targetSize = 10 * 1024 * 1024
const buffer = Buffer.alloc(targetSize)

fs.writeFile(filePath, buffer, (err) => {
  if (err) throw err
  console.log('文件创建成功')
})
```

也可以使用promise的方式，更美观

```js
const fs = require('fs/promises')

fs.writeFile(filePath, buffer)
  .then(() => {
    console.log('文件创建成功')
  })
  .catch((err) => {
    throw err
  })
```