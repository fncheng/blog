---
title: JS操作数据方法
---



- 7 种原始类型
  - [Boolean](https://developer.mozilla.org/zh-CN/docs/Glossary/Boolean)
  - [Null](https://developer.mozilla.org/zh-CN/docs/Glossary/Null)
  - [Undefined](https://developer.mozilla.org/zh-CN/docs/Glossary/undefined)
  - [Number](https://developer.mozilla.org/zh-CN/docs/Glossary/Number)
  - [BigInt](https://developer.mozilla.org/zh-CN/docs/Glossary/BigInt)
  - [String](https://developer.mozilla.org/zh-CN/docs/Glossary/字符串)
  - [Symbol](https://developer.mozilla.org/zh-CN/docs/Glossary/Symbol) 
- 和 [Object](https://developer.mozilla.org/zh-CN/docs/Glossary/Object)

## Array

操作数组

- 增

  `unshift`在数组开头添加元素，并返回新数组的长度

  `push`在数组末尾添加元素，并返回新数组的长度

- 删

  `shift`删除第一个元素,并返回该元素的值

  `pop`删除最后一个元素,并返回该元素的值

- 改

  - 变短

    `slice`截取数组 [ begin,end ) 从 begin 到 end (不包括end) **不会改变原数组**

    `splice`通过删除或替换现有元素或者原地添加新的元素来修改数组,并以数组形式返回被修改的内容。此方法会改变原数组

    splice(start,deleteCount,item)

    清空数组 splice(0)

  - 变长

    `concat()` 方法用于合并两个或多个数组。此方法不会更改现有数组，而是返回一个新数组

  - 修改元素


- 查

  - 查下标: 
    - `indexOf()` 找到指定元素在数组中的第一个索引
    - `lastIndex()`找到指定元素在数组中的最后一个索引
  -  `findIndex()`
    
  - 查值: 
    - `find()`
    - `includes()` 判断一个数组是否包含一个指定的值，返回Boolean

- 数组转字符串

  `toString()`
  
  `join`将一个数组（或一个[类数组对象](https://developer.mozilla.org/zh-CN//docs/Web/JavaScript/Guide/Indexed_collections#Working_with_array-like_objects)）的所有元素连接成一个字符串并返回这个字符串。
### Array.splice

删除元素

```js
array.splice(start, delCount)
// 从start开始删，删除delCount个元素，返回值为被删除的元素合集
// 如果不写delCount，则表示删除start后面的所有元素，包括start
```

### slice

截取数组 [ begin,end ) 从 begin 到 end (不包括end) **不会改变原数组**。

利用这个特性，slice(0)可以浅拷贝数组

### Array.from

https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/from

```ts
Array.from(arrayLike: Array, mapFn: function, thisArg: object)
```



#### 遍历

  - `forEach` forEach 不会改变原数组
  
  - `map`
  
    map 不会改变原数组
  
    因为`map`生成一个新数组，当你不打算使用返回的新数组却使用`map`是违背设计初衷的，请用`forEach`或者`for-of`替代。
  
    [for VS forEach() VS for/in VS for/of 4种方法对比](https://blog.fundebug.com/2019/03/11/4-ways-to-loop-array-inj-javascript/)

  ```js
  for (const [index, value] of arr.entries())
  ```

  - **`values()`** 方法返回一个新的 **`Array Iterator`** 对象，该对象包含数组每个索引的值


## String

- 增

  

- 删

  slice()

  

- 改

  - 变短

    **`slice()`** 方法提取某个字符串的一部分，从 beginIndex 到 endIndex ，**[begin,end)**。并返回一个新的字符串，且不会改动原字符串。

    **`substring() `**方法返回一个字符串在开始索引到结束索引之间的一个子集, 或从开始索引直到字符串的末尾的一个子集。**[begin,end)**

  - 变长

    `concat`合并字符串，生成一个新的字符串返回

- 查

  includes 返回 true 或 false

- 转数组

  `split`使用指定的字符分隔字符串，转成数组

## object

- 增

   ```js
   Object.defineProperty(obj, prop, descriptor)
   ```

   obj: 要定义属性的对象。

   prop: 要定义或修改的属性的名称或 Symbol。

   descriptor: 要定义或修改的属性描述符。

- 删

   **`delete` 操作符**用于删除对象的某个属性；如果没有指向这个属性的引用，那它最终会被释放。

- 改

- 查

### 遍历

for...in 

**`Object.keys()`** 遍历对象的键

#### [Object.values()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/values)

Object.values(obj)

**`Object.values()`** 遍历对象的值






## 遍历数组[for VS forEach() VS for/in VS for/of 4种方法对比](https://blog.fundebug.com/2019/03/11/4-ways-to-loop-array-inj-javascript/)

1. forEach

   返回`undefined`

   `forEach()` 被调用时，不会改变原数组 (基本类型的不会变，如果是引用类型的数据可能会被改变)

map(String)和map(Number)



Object.keys遍历 返回可枚举对象的属性值

