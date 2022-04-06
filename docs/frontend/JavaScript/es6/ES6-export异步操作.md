ES6模块如何export异步操作结果

#### 1. 利用Promise对象

a.js

```jsx
import {AsyncStorage} from 'react-native';
export async function getVariable() {
    let variable = await AsyncStorage.getItem("variable");
    return variable;
}
```

b.js

```jsx
import {getVariable} from 'a.js';
getVariable().then(v=>{
    //在这里获得模块a真正想导出的值
}).catch(e=>{})
```

