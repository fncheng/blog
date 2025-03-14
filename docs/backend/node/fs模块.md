https://javascript.ruanyifeng.com/nodejs/fs.html#toc8

[nodejs/api/fs](http://nodejs.cn/api/fs.html)

fs模块用于操作文件，包括文件目录的创建、删除、查询以及文件的读取和写入。

### createReadStream()

`createReadStream`方法往往用于打开大型的文本文件，创建一个读取操作的数据流。所谓大型文本文件，指的是文本文件的体积很大，读取操作的缓存装不下，只能分成几次发送，每次发送会触发一个`data`事件，发送结束会触发`end`事件。

### createWriteStream()

`createWriteStream`方法创建一个写入数据流对象，该对象的`write`方法用于写入数据，`end`方法用于结束写入操作。



Node.js仅支持如下编码：utf8, ucs2, ascii, binary, base64, hex，并不支持中文GBK或GB2312之类的编码，

所以在使用fs.writeFile写入gbk文件时,需要使用额外的模块iconv-lite



### path模块







fs.readdirSync

### fs.stat / fs.statSync

stat方法的参数是一个文件或目录，它产生一个对象，该对象包含了该文件或目录的具体信息。我们往往通过该方法，判断正在处理的到底是一个文件，还是一个目录。







## 读取文件

### [fs.readFileSync(path[, options])](http://nodejs.cn/api/fs.html#fsreadfilesyncpath-options)

同步读取文件

如果指定了 `encoding` 选项，则此函数返回字符串。 否则它返回缓冲区（raw buffer）。







## fs/promise

fs/promise 作为fs模块的promise支持

```js
const fs = require('fs/promises');
fs.readFile('./README.md', 'utf-8').then((res) => {
  console.log(res);
});
```

## 写入文件

writeFile用于往文件写入内容，`fs.writeFile` 函数每次写入文件都会覆盖原来的内容。如果您希望将数据追加到文件的末尾而不是覆盖文件，可以使用 `fs.appendFile` 函数。

fs.appendFile(file, data, options, callback)



## chmod

使用 Node.js 中的 `chmod` 函数时，可以使用类似 `0o755` 的八进制数来指定权限标识，来给文件赋予相应的权限。需要注意的是，不要随意给文件开放过高的权限，以保护文件的安全性。



## fs.mkdirSync和fs.mkdirsSync

`fs.mkdirSync` 是 Node.js 标准库中的同步方法，用于创建一个新目录。如果目录已经存在，或者路径中的某个父目录不存在，则会抛出错误。

`fs.mkdirsSync` 是 `fs-extra` 库中的同步方法，用于递归地创建目录。如果路径中的某个父目录不存在，它会自动创建这些父目录。



## fs.unlink

删除文件
