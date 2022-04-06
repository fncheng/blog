https://github.com/daliansky/XiaoXinPro-13-hackintosh

## 准备工作

小新pro13拆机，外壳选用T5螺丝

电源线用撬棒，翘起再拔掉

硬盘使用3.0十字螺丝

准备工作:

https://blog.daliansky.net/Lenovo-Xiaoxin-PRO-13-2019-and-macOS-Catalina-Installation-Tutorial.html

[OpenCore引导](https://blog.daliansky.net/OpenCore-BootLoader.html)

小新pro13 BIOS设置 https://zhuanlan.zhihu.com/p/92981005

#### 刷BIOS

https://blog.csdn.net/iCanCode/article/details/108185783

### 安装过程

#### 1. 抹盘

选择`磁盘工具`，名称：`Macintosh HD`；格式：`APFS`；方案：`GUID分区图`。

#### 2. 安装MacOS

安装过程中会重启，总是选择MacOS installer

##### 安装后的系统设置

```bash
sudo spctl --master-disable
sudo kextcache -i /		# 小新PRO请务必执行重建缓存的动作
```



##### 挂载磁盘EFI分区

```
sudo diskutil mount disk0s1
```

##### 挂载U盘EFI分区

```
sudo diskutil mount disk1s1
```



### 驱动

kext补丁文件列表

|                      驱动及项目地址                       | 备注               |
| :-------------------------------------------------------: | ------------------ |
| [AppleALC.kext](https://github.com/acidanthera/AppleALC)  | 定制万能声卡驱动   |
|                        itlwmx.kext                        | AX201 Wi-Fi驱动    |
| [VoodooI2C.kext](https://github.com/alexandred/VoodooI2C) | I2C 触摸板/屏 驱动 |
|               Lilu,WhateverGree,VirtualSMC                | 内核依赖性驱动     |
|                                                           |                    |
|                                                           |                    |
|                                                           |                    |



安装时操作: 

|           |                                                            |      |      |      |      |
| --------- | ---------------------------------------------------------- | ---- | ---- | ---- | ---- |
| `FixHPET` | 修复 HPET ，添加 IRQ(0,8,11) 加载原生电源管理，10.9 不需要 |      |      |      |      |
| `AddDTGP` | 修改 DSDT 添加方法所必须依赖的函数。必不可缺               |      |      |      |      |

#### 如何更换EFI

https://hackintosh.kirainmoe.com/an-zhuang-zhong/efi-ti-huan-jiao-cheng

#### 网卡驱动

- AX201

  https://github.com/daliansky/XiaoXinPro-13-hackintosh/wiki/AX201-and-AX200

  

#### 开启Hidpi

https://github.com/xzhih/one-key-hidpi

> 报错: hidpi.sh: bad interpreter /bin/bash^M: no such file or directory
>
> 解决办法: https://www.jianshu.com/p/99f36c8765b0



HiDPi需要根据你的显示器实际分辨率比例来选：

16：9 分辨率：3840×2160、2560×1440、1920×1080、1600×900、1366×768、1280×720、1024×576、960×540、854×480、720×405、640×360、480×270、320×180

16：10分辨率：2560×1600、1920×1200、1440×900、1280×800、1024×600、800×480



Hidpi分辨率切换软件RDM: https://github.com/usr-sse2/RDM/releases

> 分辨率问题:
>
> Win 下pro13 缩放比175%时 显示分辨率为 1463*915  (screen.width,screen.height)

- 修复睡眠唤醒后屏幕缩小

- 修复字体发虚

https://github.com/daliansky/XiaoXinPro-13-hackintosh/issues/19

> 开启LCD平滑字体    -----   修复字体发虚
>
> 相关链接: [https://heipg.cn/tutorial/hackintosh-fonts-blurry-fix.html#%E5%BC%80%E5%90%AFLCD%E5%B9%B3%E6%BB%91%E5%AD%97%E4%BD%93](https://heipg.cn/tutorial/hackintosh-fonts-blurry-fix.html#开启LCD平滑字体)

##### 抖屏现象

1440✖️900分辨率下会出现抖屏现象,1280✖️800则不会出现.

##### 可能的解决方案

<img src="/Users/cheng/Library/Application Support/typora-user-images/image-20200920104833500.png" alt="image-20200920104833500" style="zoom:80%;" />

![](https://minimax-1256590847.cos.ap-shanghai.myqcloud.com/img/G)GT_Y$T7BNXX7ASFPZVZM5.jpg)

---

### 注入三码

#### 序列号查询

因为序列号会影响到 iMessage（短信）的使用，所以要想更接近白苹果的体验的话，得选择一个有效的序列号。苹果官方的序列号查询地址为：

https://checkcoverage.apple.com/cn/zh/

序列号有 3 种级别

**1.无效序列号**

![](https://image.3001.net/images/20210715/16263155838212.png)

**2.有效但是别用过的序列号**

![](https://image.3001.net/images/20210714/162625914362.png)

**3.有效且没有被用过的序列号**

![](https://image.3001.net/images/20210714/1626259524646.png)

遇到这种序列号赶紧冲！

注入白苹果三码: https://www.jianshu.com/p/81adba521a64

##### 网卡WiFi en0 解决App Store 登录不上的问题

https://blog.csdn.net/jianglibo1024/article/details/62418204

---

### 迁移到OpenCore

https://blog.daliansky.net/OpenCore-BootLoader.html

#### OC引导驱动列表

| 驱动名称    |               |
| ----------- | ------------- |
| itlwmx.kext | AX201蓝牙驱动 |
|             |               |
|             |               |



### 附录[3] – 常用内核引导标识符合集

https://blog.daliansky.net/OpenCore-BootLoader.html

|  引导标识符  | 作用                                               |
| :----------: | :------------------------------------------------- |
| `keepsyms=1` | 发生 KP 时保留 Debug Symbols, 用于给开发者反馈问题 |
|     `-v`     | verbose 跑码模式                                   |
|     `-x`     | 安全模式                                           |



### 常见问题

#### 1. 安装镜像损坏

https://blog.daliansky.net/Common-problems-and-solutions-in-macOS-Catalina-10.15-installation.html

解决方案：可以将时间设置为当前时间，格式：`date 月月日日时时分分年年年年.秒秒`，比如我现在编辑这段文字的时间为：`2020年5月28日04:50:45`，那么就输入命令：`date 052804502020.45`，回车后关闭`终端`即可继续安装进程；【`黑果小兵亲测有效`】

```bash
date  mmddhhmmyyyy.ss
```

#### 2. 关于 键盘 `Command` 与 `Option` 对调

https://github.com/daliansky/XiaoXinPro-13-hackintosh/wiki/%E9%94%AE%E7%9B%98

#### 3. 我的设备无法显示图片

[issues](https://github.com/daliansky/XiaoXinPro-13-hackintosh/issues/109)

### 常用软件

- [ ] RDM 分辨率切换
- [ ] Scroll Reverser 鼠标反转
- [ ] Snipaste
- [ ] iTerm2
- [ ] Path Finder

## 附录

三码

```properties
序列号: C02D95YGML7H
主板序列号: C02035270GUP8PGCB
smUUID: 7855858C-572D-4D7F-9C52-5E0E2B547DBC
```

<img src="/Users/cheng/Library/Application Support/typora-user-images/image-20220120112803098.png" alt="image-20220120112803098" style="zoom:67%;" />

## EFI更新

- [x] 目前已更新到0.6.4 v2.3.1

- [x] 已更新到0.6.5 v2.3.3

  遇到的问题：

  > VoodooPS2 v2.1.9 版本开始禁用了option和cmd的对调
  >
  > https://github.com/daliansky/XiaoXinPro-13-hackintosh/issues/92

Chinch

