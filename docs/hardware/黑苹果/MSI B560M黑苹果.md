### BIOS设置

MSI B560M主板进入BIOS => del键

BIOS详细设置：https://www.bilibili.com/read/cv7670096

**禁用**

- Fast Boot  (Settings/启动/FastBoot) 	从允许改成禁用
- Secure Boot ------- 默认是禁用
- Serial/COM Port --------- 有则先关掉，无则略过
- Parallel Port
- VT-d (如果设置了 `DisableIoMapper` 为 YES，则可以打开这个选项) ------- 默认禁用
- CSM  ------ 默认UEFI无需修改
- Thunderbolt (建议关闭雷电，第一次安装可能出现玄学问题)  ----- 默认是禁用
- Intel SGX
- Intel Platform Trust
- CFG Lock  ------- 允许改成禁用

**开启**

- VT-x
- Above 4G decoding
- Hyper-Threading
- Execute Disable Bit
- EHCI/XHCI Hand-off ----- (Settings/高级/USB设置)默认开启
- OS type: Windows 8.1/10 UEFI Mode
- DVMT Pre-Allocated(iGPU Memory): 64MB
- SATA Mode: AHCI
- USB Standby Power ----- 默认禁用，改成允许
- ErP Ready ----- 默认禁用，改成允许





### 定制USB口

https://post.smzdm.com/p/ad223e0z/

https://heipg.cn/tutorial/customize-usb-port-windows.html#macOS-%E5%AE%9A%E5%88%B6%E8%BF%87%E7%A8%8B

[视频教程](https://www.youtube.com/watch?v=4o5qz2AmaBU)

工具：[usbmap](https://github.com/corpnewt/USBMap)

USBToolBox

<img src="https://img14.360buyimg.com/n0/jfs/t1/160291/37/14847/76029/60595eafEc3fb8220/b2757819f9bfa94d.jpg" style="zoom: 50%;" />

从左往右，第一列 从下到上分别是HS07,HS08,HS09,HS10





### 已知问题

1. 安装时读条到一半黑屏

   https://github.com/sqlsec/MSI-MAG-B560M-MORTAR-i7-10700/issues/7

   需要独立显卡

2. 睡眠问题

   https://github.com/maemual/MSI-B460M-10700-5500XT/issues/22

   解决：关闭电能小憩



### 三码

```properties
序列号: C02CV0F3PN5T
主板序列号: C02024102GUPHCDJA
smUUID: ED854E1B-033B-4359-873D-A5EC6E1E2AD2
```

<img src="https://minimax-1256590847.cos.ap-shanghai.myqcloud.com/img/image-20220118110407042.png" alt="image-20220118110407042" style="zoom:67%;" />

