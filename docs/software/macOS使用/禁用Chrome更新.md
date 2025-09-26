## 1️⃣ 通过系统级 `defaults` 设置

Chrome 的更新由 **Google Software Update** (也叫 Keystone) 管理，可使用命令将更新策略设为“手动”。

```bash
# 禁止自动更新
defaults write com.google.Keystone.Agent checkInterval 0
```

> `checkInterval` 单位是秒，设为 0 代表不自动检查。
>  如果以后要恢复自动更新：

```bash
defaults delete com.google.Keystone.Agent checkInterval
```

## 3️⃣ 修改 Keystone 的可执行权限

如果不想删除，可以只去掉执行权限：

```bash
sudo chmod -x ~/Library/Google/GoogleSoftwareUpdate/GoogleSoftwareUpdate.bundle/Contents/MacOS/GoogleSoftwareUpdate
```

恢复：

```bash
sudo chmod +x ~/Library/Google/GoogleSoftwareUpdate/GoogleSoftwareUpdate.bundle/Contents/MacOS/GoogleSoftwareUpdate
```