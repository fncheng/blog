---
title: getter与setter存取器
---

## getter

```js
const obj = {
  name: 'zs',
  get sayHi() {
    return this.name
  },
  set username(val) {
    console.log('setter change the name')
    this.name = val
  },
}

console.log(obj.sayHi)
obj.username = 'wu'
console.log(obj.sayHi)
```

