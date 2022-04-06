Cannot redeclare block-scoped variable 'x'.  [ts] 无法重新声明块范围变量“name”。

https://www.jianshu.com/p/78268bd9af0a

在默认状态下，`typescript` 将 `DOM typings` 作为全局的运行环境，所以当我们声明 `name`时， 与 `DOM` 中的全局 `window` 对象下的 `name` 属性出现了重名。因此，报了 `error TS2451: Cannot redeclare block-scoped variable 'name'.` 错误。



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







1. "Cannot use import statement outside a module"

2.执行ts-node时报错"TypeError [ERR_UNKNOWN_FILE_EXTENSION]: Unknown file extension ".ts""

Answer：Remove `"type": "module"` from package.json

