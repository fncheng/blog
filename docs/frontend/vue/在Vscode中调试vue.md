### 在 VS Code 和 Chrome 中调试Vue

https://vue.docschina.org/v2/cookbook/debugging-in-vscode.html

在launch.json中添加一段代码

```json
{
      "type": "chrome",
      "request": "launch",
      "name": "vuejs: chrome",
      "url": "http://localhost:1688",
      "webRoot": "${workspaceFolder}/src",
      "breakOnLoad": true,
      "sourceMapPathOverrides": {
        "webpack:///src/*": "${webRoot}/*"
      }
    }
```

