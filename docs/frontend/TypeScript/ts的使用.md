---
title: ts的使用
---

## TypeScript类型





## 学习TypeScript

error: Cannot redeclare block-scoped variable 'isDone'.

https://stackoverflow.com/questions/35758584/cannot-redeclare-block-scoped-variable-typescript



*类的访问修饰符：public private protected*

*当构造函数修饰为 protected 时，该类只允许被继承：*

*抽象类不允许被实例化*

其次，抽象类中的抽象方法必须被子类实现：



### [深入理解TypeScript](https://jkchao.github.io/typescript-book-chinese/typings/migrating.html#%E7%AC%AC%E4%B8%89%E6%96%B9%E7%9A%84-npm-%E6%A8%A1%E5%9D%97)

[export default是有害的](https://jkchao.github.io/typescript-book-chinese/tips/avoidExportDefault.html#%E5%8F%AF%E5%8F%91%E7%8E%B0%E6%80%A7%E5%B7%AE)



type和interface

相同点：都可以描述一个对象或者函数

### interface

```ts
interface User {
  name: string
  age: number
}

interface SetUser {
  (name: string, age: number): void;
}
```

interface的继承

```ts
interface Main {
  username?: string,
  password?: string
}

interface Book extends Main {
  name: string
  age: number
}
```



### type

```ts
type User = {
  name: string
  age: number
};

type SetUser = (name: string, age: number) => void;
```

联合类型

Type1 | Type2，结果是这两个类型中的一个。

```ts
const variable: number | string = '123'
```

交叉类型

Type1 & Type2，结果是取这两个类型的并集。



### 类型断言

ts文件中使用`<>`尖括号作为类型断言，而由于JSX的语法，TypeScript在`.tsx`文件里禁用了使用尖括号的类型断言。

为了弥补`.tsx`里的这个功能，新加入了一个类型断言符号：`as`。



### Readonly 与const

`const`

- 用于变量；
- 变量不能重新赋值给其他任何事物。

`readonly`

- 用于属性；
- 用于别名，可以修改属性；
