## BEM命名法

https://bemcss.com/

```css
.el-button--primary
```

命名规则：

block-name__element-name--modifier-name，也就是模块名 + 元素名 + 修饰器名。

### BEM 命名规范回顾

BEM 的核心理念是通过以下三种类型的命名分隔符来定义块、元素和修饰符：

- **块（Block）**：独立的模块，代表页面中的一个功能单元。
- **元素（Element）**：属于某个块的组成部分，表示块的子元素。用双下划线 `__` 连接块名和元素名。
- **修饰符（Modifier）**：描述块或元素的外观、状态或行为，用双连字符 `--` 连接。

#### BEM 的标准写法

```css
.block {}                 /* 块 */
.block__element {}        /* 元素 */
.block--modifier {}       /* 修饰符 */
.block__element--modifier {} /* 元素修饰符 */
```
