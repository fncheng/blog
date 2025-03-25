---
title: 类型
---



## 类型

### 数组泛型

第一种，可以在元素类型后面接上`[]`，表示由此类型元素组成的一个数组：

```typescript
let list: number[] = [1, 2, 3];
```

第二种方式是使用数组泛型，`Array<元素类型>`：

```typescript
let list: Array<number> = [1, 2, 3];
```

**混合型数组**

用any表示数组中允许出现任意类型

```ts
let arr: any[] = [1,2,3,'4']
```

```ts
let arr:Array<any>= [1,2,3,'4']
```





## 报错

1. "Cannot use import statement outside a module"

2.执行ts-node时报错"TypeError [ERR_UNKNOWN_FILE_EXTENSION]: Unknown file extension ".ts""

Answer：Remove `"type": "module"` from package.json

Cannot redeclare block-scoped variable 'x'.  [ts] 无法重新声明块范围变量“name”。

https://www.jianshu.com/p/78268bd9af0a

在默认状态下，`typescript` 将 `DOM typings` 作为全局的运行环境，所以当我们声明 `name`时， 与 `DOM` 中的全局 `window` 对象下的 `name` 属性出现了重名。因此，报了 `error TS2451: Cannot redeclare block-scoped variable 'name'.` 错误。



### 关于TypeScript中e.target.value点不出value

Property 'value' does not exist on type 'EventTarget'.

原因：event.target是一个HTMLElement，它是所有HTML元素的父级，但不能保证具有属性value。

解决：`(e.target as HTMLInputElement).value`



## 声明扩展（Module Augmentation）

假设 Some 来自某个库或其他模块

```ts
export interface Some {
    key: string
    label: string
}
```

然后在扩展声明文件中添加新的属性：

```ts
declare module '@/router/utils.ts' {
    interface Some {
        value: string
    }
}
```

这个时候Some就拥有了value属性

⚠️需要注意的是：

**`interface` 可以被 `declare module` 扩展**（接口合并）

**`type` 不能被 `declare module` 扩展**（类型别名无法合并）



## 类型声明文件中的export { }

在 TypeScript 中，顶层的代码默认处于全局作用域中。如果没有显式地将文件声明为模块，任何在文件顶层定义的类型、变量或接口都可能污染全局作用域，导致命名冲突或其他不可预期的行为。

通过在文件中添加 `export {};` 或 `import` 声明，即可将该文件标记为 **模块**。模块作用域中的内容不会自动添加到全局作用域，从而避免污染全局命名空间。

当 TypeScript 编译器看到 `export {};` 时，会认为该文件是一个模块，即使它没有导出任何内容。模块不会与其他模块或全局作用域冲突：

```ts
export {} // 确保这是一个模块，避免全局污染

declare global {
    interface Window {
        __POWERED_BY_QIANKUN__: boolean
        __INJECTED_PUBLIC_PATH_BY_QIANKUN__: string
    }
}
```

### 具体场景中的用途

1. **在声明文件中**：
   为了扩展全局类型（例如 `window`），声明必须出现在模块文件中。否则 TypeScript 不允许你使用 `declare global`。
2. **避免与库的类型冲突**：
   如果你在一个全局作用域中修改类型声明，而没有标记为模块，当另一个库对同一类型进行扩展时，可能导致冲突。



## 双重类型断言

在 TypeScript 中，**双重类型断言**指的是对一个值应用两次 `as` 类型断言，通常是为了绕过 TypeScript 的类型检查。

```ts
interface RouteQuery {
  docLibId: string
  docLibName: string
  docLibversion: string
  docId: string
  docStatus: string
}

const route = useRoute()
const query = route.query as unknown as RouteQuery
```



## 你应该停止使用Enum

为什么应该避免使用Enum

1. 编译后代码膨胀

   TypeScript 的 `enum` 默认会被编译成 JavaScript 对象，这会导致额外的运行时开销。

2. 不兼容 Tree Shaking

3. 反向映射可能带来的安全问题

**解决方案：**
 如果必须使用 `enum`，可以使用 `const enum`，它会在编译时直接内联，而不会生成 JavaScript 对象：

```ts
const enum Direction {
  Up,
  Down,
  Left,
  Right,
}
```

