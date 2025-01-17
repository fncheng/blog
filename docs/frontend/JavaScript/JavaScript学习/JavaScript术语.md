### 什么是shim，以及shim 和polyfill

https://www.f2ecoder.net/93.html





## JavaScript的TDZ特性

先来看一段代码

```ts
const handleClick = debounce(handleRequest, 1000)

const handleRequest = async () => {
    console.log(`开始 ${taskCount.value} 个任务`)
    for (let i = 0; i < taskCount.value; i++) {
        let res = limit(() => getNumber({ id: i }))
        console.log(`任务 ${i} 完成`, res)
    }
}
```

这段代码会报错 Block-scoped variable 'handleRequest' used before its declaration

这是因为handleRequest还未初始化就被使用了

`handleRequest` 是通过 `const` 声明的，具有 **块级作用域**，并且在 **初始化之前不可用（Temporal Dead Zone, TDZ）**。

而改成下面代码就可以正常运行

```ts
const handleClick = debounce(() => handleRequest(), 1000)
```

区别在于匿名箭头函数，而不是直接引用 `handleRequest`，此时 `handleRequest` 的实际解析被延迟到了匿名函数运行时，而不是在 `debounce` 调用时解析，因此不会触发 TDZ 问题。



Temporal Dead Zone (TDZ, 暂时性死区)

> **定义**: 在块级作用域内，`let` 和 `const` 声明的变量在其声明语句之前是不可访问的，即使代码逻辑上它们“看起来”已经定义了。
>
> **TDZ 行为**: 在进入作用域后，变量已经存在于环境记录中，但在执行声明语句之前，任何尝试访问它的行为都会抛出 `ReferenceError`。