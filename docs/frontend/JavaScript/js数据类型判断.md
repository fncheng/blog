## 数据类型判断

### 1. typeof

**`typeof`** 操作符返回一个字符串，表示未经计算的操作数的类型。

```js
typeof undefined 			// undefined
typeof null						// object					null 的数据类型被 typeof 解释为 object
typeof {}							// object
typeof []							// object					[]数组的数据类型在 typeof 中被解释为 object
typeof true						// boolean
typeof 123						// number
typeof '123'					// string
typeof function () {}	// function
typeof Symbol()				// symbol
typeof BigInt('1')		// bigint
```

**由此可见，typeof 无法判断 对象、数组、null**

### 2. Array.isArray

**Array.isArray()** 用于确定传递的值是否是一个 [`Array`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array)。

```js
Array.isArray([]) // true
Array.isArray({}) // false
Array.isArray('') // false
```





### 3. instanceof

**`instanceof`** **运算符**用于检测构造函数的 `prototype` 属性是否出现在某个实例对象的原型链上。

```js
console.log(333 instanceof Number);                  // false
console.log(true instanceof Boolean);                // false 
console.log('aaa' instanceof String);                // false  
console.log([] instanceof Array);                    // true
console.log(function(){} instanceof Function);       // true
console.log({} instanceof Object);                   // true
```

instanceof可以用来判断数组、对象、函数

### 4. Object.prototype.toString.call()

**`toString()`** 方法返回一个表示该对象的字符串。

>每个对象都有一个 `toString()` 方法，当该对象被表示为一个文本值时，或者一个对象以预期的字符串方式引用时自动调用。默认情况下，`toString()` 方法被每个 `Object` 对象继承。如果此方法在自定义对象中未被覆盖，`toString()` 返回 "[object *type*]"，其中 `type` 是对象的类型。以下代码说明了这一点：
>
>```js
>var o = new Object();
>o.toString(); // returns [object Object]
>```

```js
var toString = Object.prototype.toString;
toString.call(333);          // [object Number]
toString.call("aaa");        // [object String]
toString.call(true);         // [object Boolean]
toString.call([]);           // [object Array]
toString.call(function(){}); // [object Function]
toString.call({});           // [object Object]
toString.call(undefined);    // [object Undefined]
toString.call(null);         // [object Null]

// 甚至于js的内置对象也能被精确判断
toString.call(new Date);     // [object Date]
toString.call(new String);   // [object String]
toString.call(Math);         // [object Math]

//
Object.prototype.toString.call(new ArrayBuffer) // [object ArrayBuffer]
Object.prototype.toString.call(new Blob) // [object Blob]
```

**Object.prototype.toString.call() 可以用来判断所有类型**

