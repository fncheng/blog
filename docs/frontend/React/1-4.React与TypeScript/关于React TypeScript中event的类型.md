---
title: 关于React TypeScript中event的类型
---

## 给MouseEvent添加类型声明

React+TypeScript的项目中定义onClick时，给event声明类型Event，ts会报错

> Type '(e: Event) => void' is not assignable to type 'MouseEventHandler\<HTMLSpanElement>'.
>
>   Types of parameters 'e' and 'event' are incompatible.
>
> ​    Type 'MouseEvent<HTMLSpanElement, MouseEvent>' is missing the following properties from type 'Event': cancelBubble, composed, returnValue, srcElement, and 7 more.ts(2322)

大致意思是我们声明的Event类型有cancelBubble, composed, returnValue, srcElement等属性，而从语义推测出的MouseEvent<HTMLSpanElement, MouseEvent>属性则却少这些属性。

解决：声明类型 React.MouseEvent即可

```ts
    interface MouseEvent<T = Element, E = NativeMouseEvent> extends UIEvent<T, E> {
        altKey: boolean;
        button: number;
        buttons: number;
        clientX: number;
        clientY: nu3mber;
        ctrlKey: boolean;
        /**
         * See [DOM Level 3 Events spec](https://www.w3.org/TR/uievents-key/#keys-modifier). for a list of valid (case-sensitive) arguments to this method.
         */
        getModifierState(key: string): boolean;
        metaKey: boolean;
        movementX: number;
        movementY: number;
        pageX: number;
        pageY: number;
        relatedTarget: EventTarget | null;
        screenX: number;
        screenY: number;
        shiftKey: boolean;
    }
```



## 如何给函数添加像useState\<T>这样的类型声明

```ts
function useState<T>(initialValue: T): [T, (newValue: T) => void] {
  let state = initialValue;

  const setState = (newValue: T) => {
    state = newValue;
  };

  return [state, setState];
}

// 箭头函数
const useState = <T>(initialValue: T): [T, (newValue: T) => void] => {
  let state = initialValue;

  const setState = (newValue: T) => {
    state = newValue;
  };

  return [state, setState];
};
```



## 设置属性排斥

在 TypeScript 中，您可以使用联合类型（Union Types）来表示两个属性相互排斥的情况。通过定义一个类型，该类型包含两个属性，但这两个属性的值不能同时存在，从而实现相互排斥的效果。

```ts
type ExclusiveProperties = {
  optionA?: string;
  optionB?: string;
} & {
  optionA?: string;
} & {
  optionB?: string;
};

// 错误示例，不能同时存在 optionA 和 optionB
const obj: ExclusiveProperties = {
  optionA: 'valueA',
  optionB: 'valueB', // Error: Property 'optionB' is incompatible with index signature.
};
```

## 类型命名风格

interface以I开头，入参以Params结尾；出参以Result结尾，如果是表格查询，返回的内部对象应该以Record结尾
