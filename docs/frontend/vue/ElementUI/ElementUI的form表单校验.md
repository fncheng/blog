### 表单校验数字范围

```vue
<el-form-item
              :prop="`tableData.${scope.$index}.number`"
              v-if="scope.row.isEdit"
              :rules="rules.number"
            >
              <el-input v-model="scope.row.number"></el-input>
            </el-form-item>
{
            type: "string",
            message: "请输入数字",
            min: 1,
            max: 2,
            trigger: "blur",
          },
```

min, max在type='string'时指的是字符串长度