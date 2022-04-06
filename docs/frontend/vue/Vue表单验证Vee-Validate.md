---
title: Vue表单验证Vee-Validate的使用
---

## ValidationProvider

使用`ValidationProvider`组件包裹输入组件并提供一个提示组件(比如span标签)，向`ValidationProvider`组件传递一个slot，打印该slot 是一个json对象

```json
{
  "untouched": true,
  "touched": false,
  "dirty": false,
  "pristine": true,
  "valid": true,
  "invalid": false,
  "validated": false,
  "pending": false,
  "required": false,
  "changed": false,
  "passed": false,
  "failed": false,
  "errors": [],
  "classes": {
    "untouched": true,
    "touched": false,
    "dirty": false,
    "pristine": true,
    "validated": false,
    "pending": false,
    "required": false,
    "changed": false,
    "passed": false,
    "failed": false
  },
  "failedRules": {},
  "ariaInput": {
    "aria-invalid": "false",
    "aria-required": "false",
    "aria-errormessage": "vee__vee_3"
  },
  "ariaMsg": {
    "id": "vee__vee_3",
    "aria-live": "off"
  }
}
```

```vue
<ValidationProvider rules="secret" v-slot="{ errors }">
  <input v-model="email" type="text" />
  <span>{{ errors[0] }}</span>
</ValidationProvider>
```



## VeeValidate API

### extend

`extend`允许您添加更多的规则，以供vee-validate函数和组件全局使用。