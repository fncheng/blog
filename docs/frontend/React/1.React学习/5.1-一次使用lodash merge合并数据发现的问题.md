# 一次使用lodash merge合并数据引起的问题

代码如下，有两个对象通过loadsh merge合并后再 setState，发现更新后的state并没有包含合并数据

```tsx
const formState = {
  name: '215-ms',
  appType: 'bav_agm_mssql',
  bavType: 'AGM',
  bav: {
    environmentType: 0,
    load: 10,
    agmIp: '10.0.0.213',
    agmAppId: '9445490',
    agmHostId: '9445442',
    appIp: '10.0.0.215',
    skyId: '142094319961',
    skyIp: '10.0.0.212',
    mountPoint: 'C:',
    instanceName: null,
    host: null
  },
  startType: '0,1',
  unit: 'minutes',
  dbType: 4,
  applicationUuid: '9445490',
  startTime: '03:03',
  endTime: '07:04',
  waitTime: 27
};

const values = {
  bav: {
    load: 10,
    environmentType: 0,
    mountPoint: 'C:',
    host: '10.0.0.201',
    instanceName: 'xiaozhang'
  }
};
```

官网有句话，该方法类似[`_.assign`](https://www.lodashjs.com/docs/lodash.merge#assign)

意思是lodash的merge对深层嵌套对象进行合并时是修改源对象的引用。

而在React中数据是不可变的，意味着您不能直接修改状态对象，而是应该创建一个新的对象。

如果需要确保不修改源对象，您可以通过传递一个空对象作为目标来创建一个新的对象，然后将合并的结果存储在新对象中

```tsx
const result = _.merge({}, target, source);
```

