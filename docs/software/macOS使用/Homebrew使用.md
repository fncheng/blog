## Brew

官网: https://brew.sh/index_zh-cn

Homebrew 和 Homebrew Cask

https://juejin.im/post/6844903840202899464

### brew link

```sh
To relink, run:
  brew unlink git && brew link git
```









### Homebrew Cask

HomeBrew是通过源码的方式来安装软件，但是有时候我们安装的软件是GUI程序应用宝(.dmg/.pkg)，这个时候我们就不能使用HomeBrew了

所以有了HomeBrew Cask的出现

brew cask 是在brew 的基础上一个增强的工具，用来安装Mac上的Gui程序应用包（.dmg/.pkg）, 比如qq、chrome等。它先下载解压到统一的目录中（/opt/homebrew-cask/Caskroom），省掉了自己去下载、解压、拖拽（安装）等步骤，同样，卸载相当容易与干净。然后再软链到~/Applications/目录下, 非常方便，而且还包含很多在 AppStore 里没有的常用软件。


