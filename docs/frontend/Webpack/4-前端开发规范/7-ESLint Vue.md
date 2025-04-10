---
title: ESlint Vue Rules
---



## eslint-plugin-vue规则

Vue2.x包含四种预设

- plugin:vue/base
- plugin:vue/essential
- plugin:vue/recommended

### vue/html-self-closing

https://eslint.vuejs.org/rules/html-self-closing.html

```js
{
  "vue/html-self-closing": ["error", {
    "html": {
      "void": "never",
      "normal": "always",
      "component": "always"
    },
    "svg": "always",
    "math": "always"
  }]
}
```

设置 `any` 关闭该规则



## Vue开发推荐

1. 文件命名尽量不要用pageName/index.vue 这种方式，原因是在查看console.log日志时不方便定位错误，全都显示index.vue，不能一眼看出是哪个文件的错误。
