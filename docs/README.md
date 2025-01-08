## Git Commit 风格

feat: 添加新特性、新功能(feature)

fix: 修复bug

docs: 仅仅修改了文档

style: 仅仅修改了代码格式、缩进等

refactor: 代码重构，没有添加新功能或修复bug

perf: 增加代码进行性能测试

test: 添加测试用例

chore: 改变构建流程，或者添加依赖、工具，杂项等



### Angular git commit 规范

[【Angular git commit 规范】](https://zj-git-guide.readthedocs.io/zh_CN/latest/message/Angular%E6%8F%90%E4%BA%A4%E4%BF%A1%E6%81%AF%E8%A7%84%E8%8C%83/)



[Git commit约定式提交规范](https://www.conventionalcommits.org/zh-hans/v1.0.0/#%e7%ba%a6%e5%ae%9a%e5%bc%8f%e6%8f%90%e4%ba%a4%e8%a7%84%e8%8c%83)



## React代码结构书写顺序

1. useState等hooks
2. 自定义hooks
3. effect等副作用
4. 各种methods
5. jsx

养成一个良好的书写习惯是相当有必要的

<img src="https://minimax-1256590847.cos.ap-shanghai.myqcloud.com/img/image-20240103165902119.png" alt="image-20240103165902119" style="zoom: 50%;" />

<img src="https://minimax-1256590847.cos.ap-shanghai.myqcloud.com/img/image-20241203160615176.png" alt="image-20241203160615176" style="zoom: 75%;" />

## Vue代码书写顺序推荐

1. defineProps、defineEmits
2. 跟组件相关的非响应式变量
3. ref / reactive等
4. ref引用
5. 自定义hooks
6. computed
7. watch
8. methods
9. defineExpose



## Vue代码建议

1. 代码中尽量少在watch内去修改ref或reactive声明的变量，这样做可以减少项目中的调试麻烦，否则，数据变化很难去追踪





## 关于组件设计的几点建议

1. **组件设计应尽量简单，简化使用**

   我在开发中遇到过封装的组件，光其配置就要写70多行，这种组件，使用起来极其麻烦，究其原因还是没有设计好

   <img src="https://minimax-1256590847.cos.ap-shanghai.myqcloud.com/img/image-20250106104611553.png" alt="image-20250106104611553" style="zoom:50%;" />

   我们看这个组件的代码结构，发现包含如此多的子组件，其实像这种组件，我们在设计的时候可以考虑将其分拆模块化，将其拆成一个个小组件，使用的时候就组装这些小组件，就像Form和Form.Item这种方式

   ```tsx
   <Component>
       <Component.A></Component.A>
       <Component.B></Component.B>
   </Component>
   ```

   <img src="https://minimax-1256590847.cos.ap-shanghai.myqcloud.com/img/image-20250106104707849.png" alt="image-20250106104707849" style="zoom:67%;" />

   这么做，还有个好处，就是当我这个组件有些部分不需要时，只要不使用这部分模块就可以，非常方便定制化。
