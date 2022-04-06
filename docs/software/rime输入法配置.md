---
title: rime输入法配置问题
tags:
- 电脑好软
---

首先在 「用户文件夹」（%appdata%）目录下新建2个文件`default.custom.yaml`和`weasel.custom.yaml`

其中 `default.custom.yaml`是设置一些默认设置的配置文件,而`weasel.custom.yaml`是我们自定义设置的配置文件

[官方定制指南](https://github.com/rime/home/wiki/CustomizationGuide)

#### 定制字体

```yaml
# weasel.custom.yaml

patch:
  "style/font_face": "明兰"  # 字體名稱，從記事本等處的系統字體對話框裏能看到
  "style/font_point": 14     # 字號，只認數字的，不認「五號」、「小五」這樣的
```

rime折腾之手机篇

android上的rime叫同文输入法

[用户手册](https://github.com/osfans/trime/wiki/UserGuide)

 配置输入法（键盘及各种界面功能），可参考[`trime.yaml`详解](https://github.com/osfans/trime/wiki/trime.yaml詳解)。 

#### 修改配置

在`/rime`目录下创建`trime.custom.yaml`文件,这是修改默认主题的配置文件

如果要修改其他主题的配置文件，需另外新建配置文件。如同文风主题，新建名为`tongwenfeng.trime.custom.yaml`的配置文件。

