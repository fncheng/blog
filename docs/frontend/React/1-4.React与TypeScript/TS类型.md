# TS类型

## Omit

在 TypeScript 中，`Omit` 是一个专门用于构造新类型的工具类型，可以用来创建一个新类型，它去掉了给定类型中的某个属性。其语法格式如下：

```typescript
type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
```

其中 `T` 表示需要被处理的类型，`K` 表示需要从 `T` 类型中去掉的属性名。可以看到，`Omit` 类型的定义使用了 `Pick` 工具类型和 `Exclude` 工具类型。

简单解释一下 `Pick` 和 `Exclude` 工具类型：

- `Pick<T, K>`：从类型 `T` 中挑选出属性名为 `K` 的属性，构造一个新的类型。
- `Exclude<T, U>`：从类型 `T` 中剔除属性名为 `U` 的属性，构造一个新的类型。

所以，`Omit` 类型的作用就是从类型 `T` 中排除掉属性名为 `K` 的属性，得到一个新的类型。例如：

```typescript
interface Person {
  name: string;
  age: number;
  address: string;
}

type WithoutAddress = Omit<Person, 'address'>;

// 等同于：
// type WithoutAddress = Pick<Person, 'name' | 'age'>
```

在上面的例子中，`WithoutAddress` 类型表示去掉 `Person` 类型中的 `address` 属性，得到的新类型。实际上，这个新类型就是拥有 `Person` 类型的 `name` 和 `age` 两个属性的新类型。

使用 `Omit` 工具类型可以方便地创建一个新类型，而无需重新定义接口或类型别名，提高代码的可读性和可维护性。

### extends keyof

extends keyof 是一个组合使用的语法，它表示某个泛型类型参数必须是某个类型中的键名。



## Record

**Record可以用来定义对象的类型**

在 TypeScript 中，Record 是一个工具类型，用来创建一个由指定属性类型的对象组成的类型

```ts
type Record<K extends keyof any, T> = {
  [P in K]: T;
};
```

其中，K 表示属性名的类型，T 表示属性值的类型。使用 Record 可以方便地定义一个对象类型，如下所示：
```ts
type User = {
  id: number;
  name: string;
};

type UserRecord = Record<number, User>;

const userMap: UserRecord = {
  1: { id: 1, name: 'Alice' },
  2: { id: 2, name: 'Bob' },
  3: { id: 3, name: 'Charlie' },
};
```
在上面的例子中，我们使用 Record 定义了一个 UserRecord 类型，表示一组以数字为键、以 User 类型的值的对象。然后通过定义一个 userMap 对象，表示一个包含了若干个用户数据的对象。

## Partial\<T>

在 TypeScript 中，`Partial<T>` 是一个内置的工具类型，用于将对象类型 `T` 的所有属性变为可选。换句话说，`Partial<T>` 可以创建一个新的类型，该类型与 `T` 具有相同的属性，但这些属性都是可选的。

```ts
interface Person {
  name: string;
  age: number;
  address: string;
}

type PartialPerson = Partial<Person>;

const partialPerson: PartialPerson = {
  name: 'John',
};
// 实现Partial\<T>
type MyPartial<T> = {
    [K in keyof T]?: T[K];
};
```





## 对象的属性名可能是undefined

开发的时候遇到一个问题，枚举取值的时候可能是undefined
 ```ts
enum Gender {
  '女' = 0,
  '男' = 1,
}
interface User {
  name: string;
  age: number;
  gender: Gender;
}
const [userState, setUserState] = useState<User>();
Gender[userState?.gender] // 会报错
 ```

上述代码使用Gender去获取属性时，ts会报错`Type 'undefined' cannot be used as an index type.ts(2538)`
解决办法：使用非空断言`!`来告诉 TypeScript，`gender` 变量不为 `null` 或 `undefined`。

 ```ts
Gender[userState?.gender!] // 不报错
 ```




## 理解TS中的枚举

TypeScript 中的枚举类型实际上是在编译时被转换成 JavaScript 代码的一个对象。枚举成员在该对象中被实现为属性，属性的键和值分别对应枚举成员的名称和值。因此，你可以在 TypeScript 代码中使用枚举来进行类型约束和值限制，同时在编译后的 JavaScript 代码中，枚举成员相当于普通属性，可以被引用并操作。

下面是一个简单的 TypeScript 枚举示例：

```typescript
enum Color {
  Red,
  Green,
  Blue
}

let c: Color = Color.Red;
console.log(c); // 输出: 0
console.log(Color.Green); // 输出: 1
```

在上面的示例中，我们定义了一个 `Color` 枚举，其中包含了三个枚举成员 `Red`、`Green`、`Blue`。在代码中，我们将枚举成员 `Red` 赋值给变量 `c`，并输出了该变量的值。由于 `Red` 在枚举中的值是 0，因此输出结果为 0。

在编译后的 JavaScript 代码中，`Color` 枚举被转换成了一个对象：

```javascript
var Color;
(function (Color) {
    Color[Color["Red"] = 0] = "Red";
    Color[Color["Green"] = 1] = "Green";
    Color[Color["Blue"] = 2] = "Blue";
})(Color || (Color = {}));
// {0: 'Red', 1: 'Green', 2: 'Blue', Red: 0, Green: 1, Blue: 2}
```

在该对象中，`Color` 的属性包含了所有枚举成员，属性的键和值分别对应枚举成员的名称和值：

```javascript
console.log(Color.Red); // 输出: 0
console.log(Color.Green); // 输出: 1
console.log(Color.Blue); // 输出: 2
```

因此，可以看出 TypeScript 的枚举类型实际上是被转换成了一个包含属性的对象，这个对象在编译后的 JavaScript 代码中可以被引用和操作。

**数字枚举**在 TypeScript 中是**双向映射**的，而**字符串枚举**则**不支持双向映射**

因此我们可以通过Color.Red访问到0，Color[0]访问到 Red

在代码中尽量少用魔法数字，取而代之的是使用枚举，并且避免使用中文作为枚举成员的名称，比如以下代码：

```tsx
enum TAB_NAME {
    MY_TEMPLATE = 0,
    PRESET_TEMPLATE = 1
}
const TabNameMap = {
    [TAB_NAME.MY_TEMPLATE]: '我的模板',
    [TAB_NAME.PRESET_TEMPLATE]: '预置模板'
}
```







## T泛型设置默认值

```ts
interface RequestResponse<T = any> {
    body: T;
    code: number;
}
```

给泛型设置默认值后，使用的时候可以省略T



## ReturnType



## Parameters

`Parameters<typeof FConfirm>[0]` 是一个 TypeScript 工具类型，它的作用是提取函数 `FConfirm` 的第一个参数的类型。

`Parameters<T>` 是一个 TypeScript 的内置泛型工具类型，用来获取函数类型 `T` 的参数类型组成的元组。

`<typeof FConfirm>` 表示获取 `FConfirm` 函数的类型。

`[0]` 表示获取第一个参数类型。



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

