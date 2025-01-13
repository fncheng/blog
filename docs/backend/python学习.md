## 编写一个接口

```python
from flask import Flask, request, jsonify, make_response

@app.route("/test/getName", methods=["GET"])
def get_name():
    response = make_response(jsonify({"name": "John Doe"}), 200)
    return response

```



### make_response(response, status_code)

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



## Blueprint

在 Flask 中，`Blueprint` 是一个组织和结构化应用程序的方式，允许您将应用程序的路由、处理函数和其他功能分组到不同的模块中。

main.py

```py
from app import app
import os

if __name__ == "__main__":
    if not os.path.exists("./upload"):
        os.makedirs("./upload")
    app.run(port=3000, debug=True)
```

\__init__.py

```py
from flask import Flask, request, jsonify, make_response
from flask_cors import CORS
import os
import time

app = Flask(__name__)
CORS(app)

from .name import name_bp
from .number import number_bp

app.register_blueprint(name_bp)
app.register_blueprint(number_bp)
```

number.py

```py
from flask import Blueprint, make_response, jsonify
import time

number_bp = Blueprint("number", __name__)


@number_bp.route("/test/getNumber", methods=["GET"])
def get_number():
    time.sleep(3)
    response = make_response(jsonify({"number": 999}), 200)
    response.headers.set("X-Custom-Header", "Test")
    return response
```

- **创建 Blueprint**: `name_bp = Blueprint("name", __name__)` 创建了一个名为 "name" 的蓝图

- **定义路由**: 使用 `@name_bp.route('/hello')` 定义一个新的路由 `/hello`，并将其绑定到 `hello` 函数。
- **注册 Blueprint**: 使用 `app.register_blueprint(name_bp, url_prefix='/name')` 将蓝图注册到应用程序，并为所有路由添加一个前缀 `/name`。这意味着访问 `http://localhost:5000/name/hello` 会触发 `hello` 函数。

文件结构

```code
project/
│
├── app/
│   ├── __init__.py
│   ├── name.py
│   └── number.py
└── main.py
```



## os模块

### os.listdir

列出指定目录中的所有条目（即ls -l）





## 开启虚拟环境

```py
python -m venv venv_name

# 激活虚拟环境（Linux/Macos）
source .venv/bin/activate
```





## Flask动态路由

```py
# 使用 <int:id>
@app.route('/status/<int:id>', methods=['GET'])
def get_status_by_id(id):
    return jsonify({"id": id, "status": "active"})

# 使用 <float:version>
@app.route('/version/<float:version>', methods=['GET'])
def get_version(version):
    return jsonify({"version": version})

# 使用 <path:subpath>
@app.route('/path/<path:subpath>', methods=['GET'])
def get_subpath(subpath):
    return jsonify({"subpath": subpath})

# 使用 <uuid:identifier>
@app.route('/uuid/<uuid:identifier>', methods=['GET'])
def get_uuid(identifier):
    return jsonify({"uuid": str(identifier)})

if __name__ == '__main__':
    app.run(debug=True)
```

