## Select值闪烁

Antd Select在options没有加载完毕时，如果已有值，则会闪烁显示

相关：https://github.com/ant-design/ant-design/discussions/36540

https://github.com/ant-design/ant-design/issues/27678

解决办法目前还是通过Select 的loading去控制value的显示

```tsx
<Select value={loading ? undefined : selectedValue} 
  loading={loading}
	onChange={handleChange}
>
```

如果Select是被包裹在Form内部的，那么value就没有用了，这个时候可以控制Form.Item的name属性

```tsx
<ProFormSelect
  label="组织"
  mode="multiple"
  name={orgLoading ? undefined : "orgIds"}
  initialValue={[]}
  options={orgOptions}
  fieldProps={{ loading: orgLoading }}
/>
```

