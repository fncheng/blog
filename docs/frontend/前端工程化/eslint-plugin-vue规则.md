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

