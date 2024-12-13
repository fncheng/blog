## Vue3注意事项

1.批量更新Reactive创建的对象时，最好使用Object.assign

❌❌不要直接给Reactive对象本身赋值❌❌

2.响应式对象不要轻易解构，因为会失去响应式，如果有需要，请使用toRefs

```ts
const { age } = toRefs(addForm)
```

