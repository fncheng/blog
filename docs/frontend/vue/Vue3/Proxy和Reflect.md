## Proxy和Reflect

```js
const target = {
  name: 'zs',
  count: 0
};

let proxy = new Proxy(target, {
  get(target, property) {
    console.log(`get ${property}`);
    return Reflect.get(target, property);
  },
  set(target, property, value) {
    console.log('正在修改', property);
    // // 表示成功
    Reflect.set(target, property, value);
    return true
  }
});

console.log(proxy.name);
proxy.name = 'ls';
console.log(proxy.name);

```

