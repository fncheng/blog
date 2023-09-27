# 学习理解Vue3

## 关于Proxy和Reflect

```js
const product = { price: 10, quantity: 2 };
let proxiedProduct = new Proxy(product, {
  get(target, key, receiver) {
    console.log("正在读取的数据", key);
    return Reflect.get(target, key, receiver);
  },
  set(target, key, value, receiver) {
    console.log("正在修改的数据：", key, ",值为：", value);
    return Reflect.set(target, key, value, receiver);
  }
});
console.log(proxiedProduct["price"]);
```

使用Proxy包装后

```js
const product = { price: 10, quantity: 2 };

function reactive(target) {
  const handler = {
    get(target, key, receiver) {
      console.log("正在读取的数据", key);
      return Reflect.get(target, key, receiver);
    },
    set(target, key, value, receiver) {
      console.log("正在修改的数据：", key, ",值为：", value);
      return Reflect.set(target, key, value, receiver);
    }
  };
  return new Proxy(target, handler);
}
let proxiedProduct = reactive(product); // 将对象转换为响应式对象
proxiedProduct.price = 20;
console.log(proxiedProduct["price"]);
```

## createApp

createApp的源码

```js
const createApp = ((...args) => {
    const app = ensureRenderer().createApp(...args);
    if ((process.env.NODE_ENV !== 'production')) {
        injectNativeTagCheck(app);
        injectCompilerOptionsCheck(app);
    }
    const { mount } = app;
    app.mount = (containerOrSelector) => {
        const container = normalizeContainer(containerOrSelector);
        if (!container)
            return;
        const component = app._component;
        if (!isFunction(component) && !component.render && !component.template) {
            // __UNSAFE__
            // Reason: potential execution of JS expressions in in-DOM template.
            // The user must make sure the in-DOM template is trusted. If it's
            // rendered by the server, the template should not contain any user data.
            component.template = container.innerHTML;
        }
        // clear content before mounting
        container.innerHTML = '';
        const proxy = mount(container, false, container instanceof SVGElement);
        if (container instanceof Element) {
            container.removeAttribute('v-cloak');
            container.setAttribute('data-v-app', '');
        }
        return proxy;
    };
    return app;
});
```

createApp接收一个组件作为参数，然后调用`ensureRenderer`方法

```js
function ensureRenderer() {
    return (renderer ||
        (renderer = createRenderer(rendererOptions)));
}
```

renderer是渲染器，ensureRenderer的作用是确保渲染器存在，如不存在则创建一个渲染器。

rendererOptions是渲染器的一些配置

```js
const rendererOptions = extend({ patchProp }, nodeOps);
const nodeOps = {
    insert: (child, parent, anchor) => {
        parent.insertBefore(child, anchor || null);
    },
    remove: child => {
        const parent = child.parentNode;
        if (parent) {
            parent.removeChild(child);
        }
    },
    createElement: (tag, isSVG, is, props) => {
        const el = isSVG
            ? doc.createElementNS(svgNS, tag)
            : doc.createElement(tag, is ? { is } : undefined);
        if (tag === 'select' && props && props.multiple != null) {
            el.setAttribute('multiple', props.multiple);
        }
        return el;
    },
    createText: text => doc.createTextNode(text),
  // ...
}
```









## Composition API

### 被 ref() 包装 的变量

```js
const readersNumber = ref(100);
console.log(readersNumber); // 
```

打印结果：

<img src="https://minimax-1256590847.cos.ap-shanghai.myqcloud.com/img/image-20230221155644672.png" alt="image-20230221155644672" style="zoom:70%;" />

### 被reactive() 包装的变量

```js
const obj = reactive({
  name: 'zs',
  age: 18
})
```

打印结果：

<img src="https://minimax-1256590847.cos.ap-shanghai.myqcloud.com/img/image-20210422110445665.png" alt="image-20210422110445665" style="zoom:67%;" />

```js
setup(prop,context){
	console.log(prop)
  console.log(context)
}
```

打印结果：

<img src="https://minimax-1256590847.cos.ap-shanghai.myqcloud.com/img/image-20210420114211526.png" alt="image-20210420114211526" style="zoom:70%;" />



context：

<img src="https://minimax-1256590847.cos.ap-shanghai.myqcloud.com/img/image-20210420114335981.png" alt="image-20210420114335981" style="zoom:67%;" />



### readonly

```ts
function readonly<T extends object>(
  target: T
): DeepReadonly<UnwrapNestedRefs<T>>
```

对象内部的所有嵌套属性都将是只读的，有递归效应

如果不想要递归，请使用shallowReadonly

```js
/**
 * Creates a readonly copy of the original object. Note the returned copy is not
 * made reactive, but `readonly` can be called on an already reactive object.
 */
function readonly(target) {
    return createReactiveObject(target, true, readonlyHandlers, readonlyCollectionHandlers, readonlyMap);
}
```



再来看一下readonly的处理

```js
const readonlyHandlers = {
    get: readonlyGet,
    set(target, key) {
        if ((process.env.NODE_ENV !== 'production')) {
            console.warn(`Set operation on key "${String(key)}" failed: target is readonly.`, target);
        }
        return true;
    },
    deleteProperty(target, key) {
        if ((process.env.NODE_ENV !== 'production')) {
            console.warn(`Delete operation on key "${String(key)}" failed: target is readonly.`, target);
        }
        return true;
    }
};
```

而readonlyGet

```js
const readonlyGet = /*#__PURE__*/ createGetter(true);
```

题外话，`/*#__PURE__*/`是什么意思，有什么用呢？

实际上是polyfill转换之后自动加上的。具体可以看[这篇文章](https://blog.csdn.net/yehuozhili/article/details/118081252)

继续往下看

```js
function createGetter(isReadonly = false, shallow = false) {
    return function get(target, key, receiver) {
        if (key === "__v_isReactive" /* IS_REACTIVE */) {
            return !isReadonly;
        }
        else if (key === "__v_isReadonly" /* IS_READONLY */) {
            return isReadonly;
        }
        else if (key === "__v_raw" /* RAW */ &&
            receiver ===
                (isReadonly
                    ? shallow
                        ? shallowReadonlyMap
                        : readonlyMap
                    : shallow
                        ? shallowReactiveMap
                        : reactiveMap).get(target)) {
            return target;
        }
        const targetIsArray = isArray(target);
        if (!isReadonly && targetIsArray && hasOwn(arrayInstrumentations, key)) {
            return Reflect.get(arrayInstrumentations, key, receiver);
        }
        const res = Reflect.get(target, key, receiver);
        if (isSymbol(key) ? builtInSymbols.has(key) : isNonTrackableKeys(key)) {
            return res;
        }
        if (!isReadonly) {
            track(target, "get" /* GET */, key);
        }
        if (shallow) {
            return res;
        }
        if (isRef(res)) {
            // ref unwrapping - does not apply for Array + integer key.
            const shouldUnwrap = !targetIsArray || !isIntegerKey(key);
            return shouldUnwrap ? res.value : res;
        }
        if (isObject(res)) {
            // Convert returned value into a proxy as well. we do the isObject check
            // here to avoid invalid value warning. Also need to lazy access readonly
            // and reactive here to avoid circular dependency.
            return isReadonly ? readonly(res) : reactive(res);
        }
        return res;
    };
}
```

这里createGetter返回了一个get函数，结合上面，createGetter就是重写了Proxy的get方法



### toRaw()返回原始数据

```js
const obj = toRaw({
  name: 'zs',
  age: 18,
});
console.log(obj); // {name: "zs", age: 18}
```

### toReadonly()包装的变量

toReadonly也会将变量包装成一个Proxy对象



### [watchEffect](https://vue3js.cn/docs/zh/api/computed-watch-api.html#watcheffect)

#### watchEffect与watch❓

- `watchEffect` 不需要指定监听的属性，他会自动的收集依赖， 只要我们回调中引用到了 响应式的属性， 那么当这些属性变更的时候，这个回调都会执行，而 `watch` 只能监听指定的属性而做出变更(v3开始可以同时指定多个)。

- 第二点就是 watch 可以获取到新值与旧值（更新前的值），而 `watchEffect` 是拿不到的。

  ```js
  watch:{
    someValue(newValue,oldValue){
      // ...
    }
  }
  ```

- 第三点是 watchEffect 如果存在的话，在组件初始化的时候就会执行一次用以收集依赖（与`computed`同理），而后收集到的依赖发生变化，这个回调才会再次执行，而 watch 不需要，因为他一开始就指定了依赖。



### watch

```ts
function watch<T>(
  source: WatchSource<T>,
  callback: WatchCallback<T>,
  options?: WatchOptions
): StopHandle

type WatchSource<T> =
  | Ref<T> // ref
  | (() => T) // getter
  | T extends object
  ? T
  : never // 响应式对象
```

### toRef和toRefs

如果想让响应式数据和以前的数据关联起来，并且更新响应式数据之后还不想更新 UI，那么就可以使用 toRef



## 组件通信

### 1. provide/inject注入

https://vue3js.cn/docs/zh/guide/composition-api-provide-inject.html



### script setup内如何获取props

可以使用`defineProps`函数来获取`props`

```vue
<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  message: String
})

console.log(props.message) // 获取父组件传递的message属性值
</script>
```



## 常见问题

### setup内操作dom

https://juejin.cn/post/6913730913142734861



### async setup

[解决](https://stackoverflow.com/questions/64117116/how-can-i-use-async-await-in-the-vue-3-0-setup-function-using-typescript)

```js
setup() {
  const users = ref([]);
  onMounted(async () => {
    const res = await axios.get("https://jsonplaceholder.typicode.com/users");
    users.value = res.data;
    console.log(res);
  });
  return {
    users,
  };
},
```







## @vue/composition-api

### How to use?

```js
// main.js
import Vue from 'vue'
import VueCompositionAPI from '@vue/composition-api'

Vue.use(VueCompositionAPI)
```



reactive包裹空对象新增属性没有响应性 [issues](https://github.com/vuejs/composition-api/issues/580)

["reactive" doesn't work well with Array #219](https://github.com/vuejs/composition-api/issues/219)

[Vue.observable on an array does not really work #9499](https://github.com/vuejs/vue/issues/9499)

```js
// 点击按钮后lis不会增加，而tabs会正常增加
setup() {
  let lis = reactive([]);
  let tabs = ref([]);
  function handleClick() {
    lis = [1, 2, 3];
    tabs.value = [1, 22, 3];
    // lis.push(1, 2, 3);
  }
  return { lis, tabs, handleClick };
},
```



为了解决数组响应式的问题，

修改数组全部使用

```js
let arr = reactive([])
arr.push()
arr.splice(0) // 清空数组
```







## [Ts支持](https://v3.cn.vuejs.org/guide/typescript-support.html#typescript-%E6%94%AF%E6%8C%81)



### 了解script setup

[Understanding the new script setup with defineProps & defineEmits in Vue 3.2](https://www.netlify.com/blog/understanding-defineprops-and-defineemits-in-vue-3.2)



## 在Vue3中使用CSS module

可以通过两种方式：

1.一种是在setup或render中定义

```js
const $style = useCssModule()
```

2.另一种是在style中使用module声明

```vue
<template>
  <div :class="mystyle.red">{{ count }}</div>
</template>

<style module="mystyle">
.red {
  color: red;
}
</style>
```

添加module属性，自动注入



### 在jsx中使用css module

使用vite

```tsx
import styles from './MyButton1.module.css'

render() {
  <span class={styles.blue}>{this.count}</span>
}
```

添加类名自动提示

typescript-plugin-css-modules
