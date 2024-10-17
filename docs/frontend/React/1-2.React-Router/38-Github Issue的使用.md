## Github Issue的使用

### 创建一个新的issue

```sh
gh issue create
```



### 更新现有的issue

使用gh issue edit命令更新github issue

```sh
gh issue edit 35 --body-file ~/blog/docs/frontend/React/1-2.React-Router/\#35.md
```

这里的 35 是`<issue-number>`

这条命令更新的是issue的body即主体描述部分（只有第一条才是主体），所有如果一个issue有多个评论，没有影响。