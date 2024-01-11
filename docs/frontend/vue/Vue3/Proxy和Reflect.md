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

使用Proxy包装后

```js
const product = { price: 10, quantity: 2 };

function reactive(target) {
  const handler = {
    get(target, key, receiver) {
      console.log("正在读取的数据", key);
      return Reflect.get(target, key, receiver);
    },
    set(target, key, value, receiver) {
      console.log("正在修改的数据：", key, ",值为：", value);
      return Reflect.set(target, key, value, receiver);
    }
  };
  return new Proxy(target, handler);
}
let proxiedProduct = reactive(product); // 将对象转换为响应式对象
proxiedProduct.price = 20;
console.log(proxiedProduct["price"]);
```



Reflect.getPrototypeOf用于获取一个对象的原型（prototype）