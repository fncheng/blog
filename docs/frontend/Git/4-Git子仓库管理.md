---
title: git子仓库管理
tags:
- git
---

[参考链接](https://upupming.site/2018/05/31/git-submodules/#%E4%BB%93%E5%BA%93%E5%86%85%E5%85%8B%E9%9A%86%E5%85%B6%E4%BB%96%E4%BB%93%E5%BA%93%E9%81%87%E5%88%B0%E7%9A%84%E9%97%AE%E9%A2%98)

> 问题: 在git仓库内还有别的仓库

在内部仓库git add 后会提示:

```bash
warning: adding embedded git repository: plugins/zsh-autosuggestions
hint: You've added another git repository inside your current repository.
hint: Clones of the outer repository will not contain the contents of
hint: the embedded repository and will not know how to obtain it.
hint: If you meant to add a submodule, use:
hint: 
hint: 	git submodule add <url> plugins/zsh-autosuggestions
hint: 
hint: If you added this path by mistake, you can remove it from the
hint: index with:
hint: 
hint: 	git rm --cached plugins/zsh-autosuggestions
hint: 
hint: See "git help submodule" for more information.
warning: adding embedded git repository: plugins/zsh-syntax-highlighting
```

### [git submodule的用法](https://juejin.im/post/5ca47a84e51d4565372e46e0)

[git文档](https://git-scm.com/book/zh/v2/Git-%E5%B7%A5%E5%85%B7-%E5%AD%90%E6%A8%A1%E5%9D%97)