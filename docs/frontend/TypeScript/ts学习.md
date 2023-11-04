## TypeScript

[ts中文手册](https://typescript.bootcss.com/functions.html)

[ts入门教程](https://ts.xcatliu.com/basics/primitive-data-types.html)

[深入理解TypeScript](https://jkchao.github.io/typescript-book-chinese/typings/migrating.html#%E7%AC%AC%E4%B8%89%E6%96%B9%E7%9A%84-npm-%E6%A8%A1%E5%9D%97)

### 类型断言

[什么是类型断言](https://jkchao.github.io/typescript-book-chinese/typings/typeAssertion.html#%E7%B1%BB%E5%9E%8B%E6%96%AD%E8%A8%80)



## InstanceType的使用

InstanceType用于获取构造函数或类的实例类型。

```ts
class MyClass {
  constructor(name: string) {
    this.name = name;
  }
  name: string;
  sayHello() {
    console.log(`Hello, my name is ${this.name}.`);
  }
}

// 使用 InstanceType 获取 MyClass 的实例类型
type MyClassInstance = InstanceType<typeof MyClass>;
```

又或者ElemenUI中获取组件Ref时的定义

```ts
const treeRef = ref<InstanceType<typeof ElTree>>()
```

