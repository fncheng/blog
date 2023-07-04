# async-validator

## pattern源码实现

```ts
import { Rule, ValidateError } from "async-validator";

export function pattern(rule: Rule, value: any, callback: (error?: ValidateError) => void) {
  if (rule.pattern instanceof RegExp) {
    if (!rule.pattern.test(String(value))) {
      callback({ message: rule.message || "字段格式不正确" });
    } else {
      callback();
    }
  } else if (typeof rule.pattern === "string") {
    const pattern = new RegExp(rule.pattern);
    if (!pattern.test(String(value))) {
      callback({ message: rule.message || "字段格式不正确" });
    } else {
      callback();
    }
  } else {
    callback();
  }
}
```

