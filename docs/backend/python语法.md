## 数据结构

### 列表List

列表是一个有序的、可变的集合，可以包含任意类型的元素

```py
numbers = [x for x in range(1, 11)]

numbers.append(11)  # 增加
numbers.remove(1)  # 删除
numbers.insert(1, 0)  # 插入
numbers.extend([12, 13, 14])  # 扩展
numbers.sort(reverse=True)  # 排序
```

### 集合Set

集合是一个无序的、不重复元素的集合。

```py
numbers = {1, 2, 3, 4, 5}
numbers.add(6)
numbers.remove(3)
# 清除
numbers.clear
```

### 字典Dictionary

```py
student = {"name": "Alice", "age": 21, "major": "Computer Science"}
```







## range关键字

`range` 是Python中的一个内置函数，用于生成一系列数字。它通常用于循环（如`for`循环）中。`range` 函数可以接受1到3个参数

```py
range(stop)
range(start, stop)
range(start, stop, step)
```

## 列表推导式

列表推导式（List Comprehensions）是Python中的一种简洁而强大的创建列表的方法。它允许你使用单行代码生成一个新的列表

```py
# 传统方法
squares = []
for x in range(10):
    squares.append(x**2)

# 列表推导式
squares = [x**2 for x in range(10)]
numbers = [x * 2 for x in range(1, 11) if x >= 5] # [10, 12, 14, 16, 18, 20]
multiplication_table = [i * j for i in range(1, 4) for j in range(1, 4)]
```



## f

`f` 字符串（也称为f-string或格式化字符串字面量，是一种用于格式化字符串的便捷方法，它是在Python 3.6中引入的。

类似于js的模板字符串，可以在内部使用变量
