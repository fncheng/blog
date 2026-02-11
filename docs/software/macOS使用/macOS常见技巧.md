### 如何更改文件默认打开方式

https://sspai.com/post/28394

#### macOS多窗口切换

https://zhuanlan.zhihu.com/p/25746402

#### 创建桌面快捷方式

在Finder中按住Option+Command键将文件夹拖到桌面

#### 设置右键在VSCode中打开

https://liam.page/2020/04/22/Open-in-VSCode-on-macOS/

macOS chrome插件安装位置

#### 创建替身

https://support.apple.com/zh-cn/guide/mac-help/mchlp1046/mac

按下 Option-Command 键时将原始项目拖到其他文件夹或桌面上以创建替身并一步移动。

#### 打开emoji键盘

Press the keyboard shortcut Command-Control-Space to bring up the emoji picker. 

Command-Control-Space键

#### mac安装非官方来源软件后打开已损坏

```sh
sudo xattr -rd com.apple.quarantine /Applications/应用.app
```

### macOS使用locate、mlocate等命令

尽管locate等命令适用于macOS，但还是优先推荐使用`mdfind`命令（Spotlight的终端命令）。

相比于locate，它的一大优势是不仅可以搜索文件名，还可以搜索文件内容和元数据。

[Installing mlocate on the macOS](https://unix.stackexchange.com/questions/81537/installing-mlocate-on-mac-os-10-7)

[Difference between locate and mlocate](https://unix.stackexchange.com/questions/273182/difference-between-locate-and-mlocate)



### 系统自带截图功能

Command Shift 3 全屏截图

4 区域，5 录制，还留了 1 和 2 给自己的截图软件用



### macos自带录屏功能

Command + Shift + 5



### macOS聚焦搜索高级搜索

https://support.apple.com/zh-cn/guide/mac-help/mh15155/11.0/mac/11.0



### 使用switch hosts修改hosts文件后未生效

如果开了类似clash的代理，并且勾选系统代理后，会导致系统hosts文件失效，因为clash有自定义dns，有自己的hosts （[issues](https://github.com/Dreamacro/clash/issues/423)）



### pkg安装的软件如何卸载

https://www.jianshu.com/p/072efb02f1c1

```sh
$ pkgutil --pkgs | grep -i xxx
$ pkgutil --files PKGID
```



### 软件设置目录

`~/Library`下



#### macOS更新文件下载目录

`/Library/Updates/`



### 外接显示器设置缩放

按住Option点击缩放

<img src="https://i.imgur.com/pxrd4gj.png" style="zoom:42%;" />

### 系统设置小红点隐藏

1. 关系统偏好里的自动更新
2. 删除~/Library/Preferences/com.apple.preferences.softwareupdate.plist 文件
3. defaults write com.apple.systempreferences AttentionPrefBundleIDs 0 && killall Dock



## workflow工作流程

workflow文件保存在/Users/cheng/Library/Services/目录下



### macos下VSCode插件安装目录

~/.vscode/extensions/



## 如何打开钥匙链访问.app

```sh
open /System/Library/CoreServices/Applications
```

