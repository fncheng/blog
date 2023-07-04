## fetch



## qs模块的arrayFormat

在 qs 模块中，arrayFormat 选项用于控制数组的序列化方式。有三个可用的选项值：

- "indices"（默认值）：使用索引形式的数组序列化，例如 `foo[0]=bar&foo[1]=baz`。
- "brackets"：使用方括号形式的数组序列化，例如 `foo[]=bar&foo[]=baz`。
- "repeat"：使用重复键形式的数组序列化，例如 `foo=bar&foo=baz`。

```ts
const params = {
  foo: ['bar', 'baz']
};

const queryString = qs.stringify(params, { arrayFormat: 'brackets' });
```

