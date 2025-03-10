## i18n引入

```ts
const zh_CN = {
  app: {
    name: '姓名',
    age: '年龄'
  },
  table: {
    name: 'XINGMING',
    age: 'NIANLING'
  }
}

const en = {
  app: {
    name: 'name',
    age: 'age'
  },
  table: {
    name: 'name',
    age: 'age'
  }
}

const i18n = createI18n({
  globalInjection: true,
  legacy: false,
  locale: localStorage.getItem('language') || 'en',
  messages: {
    zh_CN,
    en
  }
})

const app = createApp(App)
app.use(ElementPlus)
app.use(i18n)
app.mount('#app')
```

### 在页面中引用
```html
<div>{{ $t("app.name") }}</div>
```
app.name对应的是你的翻译文本文件中json字段，这里我直接用的是js对象即zh_CN和en

## 在qiankun微前端架构中使用

主应用中通过 setGlobalState 修改状态

```ts
const initialState = { language: 'zh_CN' };
const actions = initGlobalState(initialState);

actions.setGlobalState({
  language: 'en'
});
```



### 子应用中使用

首先在全局状态store中定义一个属性language用于控制语言的切换

```ts
const store = defineStore(
  state: () => {
    language: localStorage.getItem('language') || 'zh_CN'
  },
  actions: {
      setLanguage(value: string) {
        this.language = value;
        localStorage.setItem('language', value)
      }
    }
)
```

然后当主应用修改语言时，在子应用的的**mount**生命周期中修改store
```ts
renderWithQiankun({
  mount(props: any) {
    render(props);

    // 获取主应用传递的 actions
    const { onGlobalStateChange, setGlobalState } = props;

    // 监听主应用状态变化
    onGlobalStateChange((state, prev) => {
      console.log('state: ', state);
      if (state.language) {
        i18n.global.locale.value = state.language;
        useCommonStore().setLanguage(state.language);
      }
    });

    // 子应用可以主动触发状态更新
    setGlobalState({ from: "子应用" });
  },
//...
}
```


### 关于遍历的El-Table-Column如何进行国际化

```html
<el-table-column
        :width="item.width"
        v-for="item in columns"
        :label="item.label"
        :type="item.type"
      >
```
像这种格式，首先需要对:label修改成:label="t(item.label)"

然后针对columns数组
```ts
const columns = ref([
  {
    prop: "fileName",
    label: 'DocTable.fileName',
    overflow: true,
  },
  {
    prop: "createdDate",
    label: 'DocTable.createdDate',
    width: "144",
  },
]);
```

### 带变量的字符串如何国际化

比如这种
```ts
const label = row.type === 'doc' ? "文档" : "文件夹"
const message = `删除该${label}后将无法恢复，请确认是否要删除`
```
就可以修改为
```ts
const label = row.type === 'doc' ? t('del_dialog.title_doc') : "文件夹"
message = t('del_dialog.message', [label]),
```



> defineProps() in \<script setup> cannot reference locally declared variables because it will be hoisted outside of the setup() function. If your component options require initialization in the module scope, use a separate normal \<script> to export the options instead.

在defineProps中使用了usei18n返回的t就出现了这个问题

`defineProps` 是一个编译器宏，会被提升到模块的顶层，而 `useI18n` 返回的内容是运行时才初始化的，导致无法直接引用。



### Invalid linked format

El-Form 校验提示出现Invalid linked format，原因是vue-i18n的9以上的版本中@被用作特殊字符处理，直接用会报错

**解决方法**：把`@`改为`{'@'}`。例如：`"validation.regExp.name": "仅允许输入字母、数字与_.{'@'}字符"`