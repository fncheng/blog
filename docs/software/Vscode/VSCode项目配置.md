---
title: 项目单个项目配置
---



## VSCode单项目配置

VSCode有项目配置和全局配置

项目配置会覆盖全局配置，可用于对单个项目精确控制。

比如关于eslint修复的单独控制

```json
{
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true,
    "source.fixAll.stylelint": true
  }
}
```

