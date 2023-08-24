# git进阶命令

## merge-base

`git merge-base --is-ancestor dev HEAD` 是一个Git命令，用于检查分支关系。

具体来说，它会检查`dev`分支是否是当前分支（`HEAD`）的祖先分支。如果是的话，返回0；如果不是的话，返回1。

## symbolic-ref

`git symbolic-ref`是一个Git命令，用于获取指定引用（reference）的符号引用（symbolic reference）。

该命令会返回引用的完整名称，例如`refs/heads/master`，表示当前所在的分支是`master`。

` git symbolic-ref --short`可以返回缩写master