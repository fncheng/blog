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

    `slice`截取数组 [ begin,end ) 从 begin 到 end (不包括end) **不会改变原数组**，slice(0)可以浅拷贝数组。

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

插入元素

```js
array.splice(start, deleteCount, ...items)
```

- `start`: 从哪个位置开始操作（start是指插入项的下标）。
- `deleteCount`: 删除的元素数量。插入时设为 `0`。
- `...items`: 要插入的新元素。

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

map不会修改原数组，forEach不会修改基本类型数组，会修改引用类型数组，for循环和for...of则会修改原数组。

`for...in` 遍历对象的顺序是不确定的，可能不会按照添加属性的顺序进行遍历。

### 判断数组(对象)中是否有重复的值

可以使用Set

```ts
const arr = [1, 2, 3, 4, 5];
const set = new Set(arr);

const hasDuplicates = arr.length !== set.size;

console.log(hasDuplicates); // 输出: false
```

使用 `Set` 的优势是它自动去重，而且检查重复值的效率比遍历整个数组来查找重复值要高。但是，这种方法会移除重复的值

### JavaScript中的各种循环和中断循环

1. **for 循环:**

2. **while 循环:**

3. **do-while 循环:**

4. **for...of 循环:**

5. **for...in 循环:**

   ```js
   const object = { a: 1, b: 2, c: 3 };
   for (const key in object) {
       if (object[key] === 2) {
           break; // 中断循环
       }
       console.log(key, object[key]);
   }
   ```

6. **forEach() 方法:**

break可以中断for循环、while、for...of、for...in

forEach 不支持中断，可以使用throw new Error抛出异常来中断，使用return可以跳过当次循环

for...of循环可以用break中断，可以用continue跳过本次循环

### 遍历Map

1. **使用 `for...of` 循环:**

   ```js
   const myMap = new Map([
       ['key1', 'value1'],
       ['key2', 'value2'],
       ['key3', 'value3']
   ]);
   
   for (const [key, value] of myMap) {
       console.log(key, value);
   }
   ```

2. **使用 `forEach` 方法:**

   ```js
   myMap.forEach((value, key) => {
       console.log(key, value);
   });
   ```

3. **遍历键（keys）:**

   ```js
   for (const key of myMap.keys()) {
       console.log(key);
   }
   ```

4. **遍历值（values）:**

   ```js
   for (const value of myMap.values()) {
       console.log(value);
   }
   ```

5. **使用 `entries` 方法:**

   ```js
   for (const entry of myMap.entries()) {
       console.log(entry[0], entry[1]);
   }
   ```
