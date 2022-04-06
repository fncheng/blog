传递变量





首先nodejs接收命令行传入的变量使用process.argv

```js
console.log(process.argv.slice(2))
```

执行bash

```sh
$ node node.js name=joe
[
  '/Users/cheng/.nvm/versions/node/v16.4.1/bin/node',
  '/Users/cheng/Github/google-zx/node.js',
  'name=joe'
]
```

所以通过process.argv.slice(2) 就可以拿到 参数数组了。