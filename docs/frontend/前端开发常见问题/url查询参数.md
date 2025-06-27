## 通过url获取查询参数

```ts
function parseQuery(search: string): Record<string, string> {
  const query: Record<string, string> = {};
  if (search.startsWith('?')) {
    search = search.slice(1);
  }
  const pairs = search.split('&');
  for (const pair of pairs) {
    const [key, value] = pair.split('=');
    if (key) {
      query[decodeURIComponent(key)] = decodeURIComponent(value || '');
    }
  }
  return query;
}

const query = parseQuery(window.location.search);
console.log(query.name); // "Tom"
console.log(query.age);  // "25"
```

js版：

```js
function parseQuery(search) {
  const query = {};
  if (search.startsWith('?')) {
    search = search.slice(1);
  }
  const pairs = search.split('&');
  for (const pair of pairs) {
    const [key, value] = pair.split('=');
    if (key) {
      query[decodeURIComponent(key)] = decodeURIComponent(value || '');
    }
  }
  return query;
}
parseQuery(location.search)
```

