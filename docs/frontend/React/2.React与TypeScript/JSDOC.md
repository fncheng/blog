## JSDoc说明

### @returns

```js
/**
 * Returns the sum of a and b
 * @param {Number} a
 * @param {Number} b
 * @returns {Number}
 */
 function sum(a, b) {
     return a + b;
}
```



## JSDoc给函数设置提示的例子

```ts
// 定义函数并添加 JSDoc 注释
/**
 * 计算表格的垂直滚动高度
 *
 * @example
 * const ref = useRef(null);
 * const tableData = [{ name: 'John Doe', age: 26 }, { name: 'Jane Doe', age: 24 }];
 * <Table ref={ref} dataSource={tableData} />
 * const scrollY = getTableScrollY({ ref });
 *
 * @param {number} [options.extraHeight=70] - 额外的高度（默认为 70）
 * @param {React.MutableRefObject} options.ref - 表格的 ref 对象
 * @returns {number} 返回表格的垂直滚动高度
 *
 * @throws {Error} 如果无法计算出垂直滚动高度，则返回错误信息
 */
export const getTableScrollY = ({ extraHeight = 70, ref } = {}) => {
  // ...
};

// 在函数调用时，启用参数提示
const ref = useRef(null);
const tableData = [{ name: 'John Doe', age: 26 }, { name: 'Jane Doe', age: 24 }];
<Table ref={ref} dataSource={tableData} />;
const scrollY = getTableScrollY({ ref }); // VS Code 可以显示参数提示
```

