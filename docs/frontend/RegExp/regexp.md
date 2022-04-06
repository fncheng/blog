#### [String.prototype.match()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/match)

监测字符串是否匹配

可以用于匹配字符串，拿到匹配结果

### RegExp方法

#### regex.test(str)

查看正则表达式与指定的字符串是否匹配。返回 `true` 或 `false`。

```js
/abc/i.test('abcd') // true
```



类似于

#### str.search(regex)

查看字符串与指定的正则表达式是否匹配。返回索引，未匹配到则返回-1。

```js
'dabcd'.search(/abc/i) // 1
```

