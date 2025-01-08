## 编写一个接口

```python
from flask import Flask, request, jsonify, make_response

@app.route("/test/getName", methods=["GET"])
def get_name():
    response = make_response(jsonify({"name": "John Doe"}), 200)
    return response

```



make_response(response, status_code)

- `response`：可以是字符串、字典（通过 `jsonify` 转换为 JSON 响应）、或其他响应对象。
- `status_code`：HTTP 状态码，默认为 200。



Response和make_response

**Response** 是Flask的一个类，用于构建HTTP响应对象。你可以直接使用它来创建一个响应

**make_response** 是一个辅助函数，用于创建响应对象。它的输入可以是字符串、字典（用`jsonify`转换为JSON响应）、元组（包含响应体、状态码和头信息）或其他响应对象。它提供了一种更灵活和简洁的方式来创建响应对象。



## if条件判断

```python
score = 85

if score >= 90:
    grade = 'A'
elif score >= 80:
    grade = 'B'
elif score >= 70:
    grade = 'C'
elif score >= 60:
    grade = 'D'
else:
    grade = 'F'
```

在Python中，`if not`语句用于检查一个条件是否为假。如果条件为假，则执行相应的代码块

类似于JS中的 if (!boolean)