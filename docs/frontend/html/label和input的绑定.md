---
title: label元素和input元素的关系
---

## label和input checkbox的关联

**label和表单控件绑定方式有两种：**

1.将表单控件作为label的内容，这样就是隐式绑定。

```vue
<label>Date of Birth: <input type="text" name="DofB" /></label>
```

2.显式绑定

```vue
<div>
      <label for="input1"> 输入框 </label>
      <input
        type="checkbox"
        id="input1"
        :value="checkboxOptions[checkboxVal]"
        @change="(e) => (checkboxVal = e.target.checked)"
      />
    </div>
```



为什么要给label加上for属性？

给`<label>`加了for属性绑定了input控件后，可以提高鼠标用户的用户体验。

如果在label元素内点击文本，就会触发此控件。就是说，当用户渲染该标签时，浏览器就会自动将焦点转到和标签相关的表单控件上。

