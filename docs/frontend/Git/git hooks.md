# git hooks

## git hooks

Git hooks 是 Git 提供的一种强大的自定义机制，它允许你在 Git 的内部操作和外部 CLI 命令执行时运行自定义脚本。使用 Git hooks 可以增强你的协作工作流程，保证代码质量和一致性，以及自动化常见的开发任务。

Git hooks 实现的是钩子（hooks）模式，即它允许你在 Git 操作的不同阶段中注入自定义代码。当 Git 执行相应操作时，它会先检查该操作是否有一个相应的 hook 脚本，如果有，则执行这个脚本中的代码，如果没有，则跳过这个操作。

Git hooks 分为两类："client-side" hooks 和 "server-side" hooks：

- "client-side" hooks 是在本地的 Git 仓库中运行的，主要用于控制开发者在本地进行的工作流程，例如 pre-commit、pre-push 等，用于钩取在执行提交操作之前或推送操作之前进行代码检查或测试。
- "server-side" hooks 是在 Git 服务器端运行的，主要用于管理团队协作，例如 pre-receive、post-receive 等，用于在代码 push 到中央仓库时触发一些额外的检查或机制。

Git hooks 给予了开发者很大的自由度，在合理使用的情况下能够大大提高团队的协同效率和代码质量。常见的 Git hooks 包括：

- pre-commit：在提交代码之前运行脚本，用于代码格式化、语法检查、文档生成等。
- post-commit：在代码提交成功之后执行脚本，用于展示提交内容、自动执行其他操作等。
- pre-push：在推送代码之前运行脚本，用于保证代码质量、运行测试等。
- post-receive：在代码 push 到中央仓库时，在服务器端执行脚本，用于更新代码、重新编译、部署应用等。

使用 Git hooks 需要注意 hook 脚本的编写和调试，并建议在脚本中添加必要的注释，以提高代码的可维护性和可读性。



### 编写一个post-commit脚本

`post-commit` 属于 Git hooks 中的一种，它会在每次提交代码后被触发执行。你可以在这个脚本中编写自定义逻辑，例如通知团队成员提交成功，更新文档，自动发布应用程序等。

下面是一个简单的 `post-commit` 脚本示例，它会在每次提交成功后，展示提交信息，并将提交记录写入一个日志文件中：

```sh
#!/bin/sh

# Get the latest commit message
last_commit=`git log -1 | grep -iE "^commit [a-z0-9]+" --color=never | awk '{print $2}'`

echo "Latest commit: ${last_commit}" 

# Write commit message to a log file
echo "${last_commit}" >> commit-log.txt
```

这个脚本 `$last_commit` 变量记录了最近一次提交的哈希值，然后使用 `echo` 打印这个哈希值到终端。此外，它还将哈希值写入 `commit-log.txt` 日志文件中，作为记录所有提交记录的一个简单示例。

注意：如果想让脚本生效，还需要将其保存到 Git 仓库的 hooks 文件夹中，并赋予执行权限。

```sh
chmod +x post-commit
```

你可以在此示例的基础上构建更复杂的 `post-commit` 脚本，例如包含通知机制、静态分析代码、自动化版本控制等逻辑。无论如何，Git hooks 始终是一种非常有用的工具，可以让你的协作工作流程更有生命力。



## pre-merge-commit

会在执行 `git merge --no-commit` 命令时触发，用于在合并代码之前执行一些自定义的操作。在这个钩子中，你可以进行一些代码检查、测试运行、变量赋值、代码格式化或者其他任何你想做的自动化操作，以确保提交的代码的质量。

下面是一个简单的 `pre-merge-commit` 钩子示例：

```sh
#!/bin/sh

echo "Running pre-merge-commit hook..."

# Run tests before merging
npm test

# Lint the code
npm run lint

# Ensure the code is formatted
npm run format

echo "Pre-merge checking complete."
```

## post-merge

会在执行 `git merge` 命令后自动触发，允许你在合并操作之后执行一些额外的操作。

```sh
#!/bin/sh

# 获取最新的提交 SHA-1 值 (HEAD 引用)
last_commit=$(git rev-parse HEAD)

# 获取最新提交的提交消息内容
commit_message=$(git log -1 --pretty=%B "${last_commit}")

# 从提交消息内容中提取被合并分支的名称
merged_branch=$(echo "${commit_message}" | sed -n 's/Merge branch '\''\(.*\)'\'' into.*/\1/p')

# 打印被合并分支的名称
echo "Merged branch: ${merged_branch}"
```



```sh
#!/bin/sh

commit_message="Merge branch 'chengdev' into dev/1.10   89f9ewda"

merged_branch=$(echo "${commit_message}" | sed -n 's/Merge branch '\''\(.*\)'\'' into.*/\1/p')

echo "${merged_branch}"
```

以上代码可以在merge的时候获取被merge的branch name



## 实现git merge时将指定的分支删除并创建新分支

开发时经常会从dev分支拉一个自己的分支出来开发，然后merge后再删除这个分支，再重新从最新dev拉一个分支出来继续开发

使用post-merge来完成这一操作

```sh
#!/bin/sh

# 获取上一次合并的提交 ID
# last_merge_commit=$(git log --oneline -n 2 | tail -n 1 | cut -d " " -f 1)
# 获取最新的提交ID
last_commit=$(git rev-parse HEAD)

# 获取最新的提交信息
commit_message=$(git log -1 --pretty=%B "${last_commit}")

# echo "${commit_message}"
# Merge branch 'chengdev' into feature/newissue

# 获取上一次合并的 commit 提交的分支名
merged_branch=$(echo "${commit_message}" | sed -n 's/Merge branch '\''\(.*\)'\'' into.*/\1/p')

echo "${merged_branch}"

# 判断分支名是否匹配
if [ "${merged_branch}" = "chengdev" ]; then
   # 在这里添加你想要执行的操作
   git branch -d chengdev && git checkout -b chengdev
fi
```

### 如果有多个post-merge怎么办

如果有多个 `post-merge` 钩子，Git 会在每个钩子的代码执行完成后才会继续执行下一个钩子。因此，可以在多个 `post-merge` 钩子中分别执行不同的操作。

### 多个post-merge文件如何命名

多个操作无法通过在文件名前面添加 `post-merge-` 前缀的方式来实现。在 Git 中，Hook 钩子的命名是固定的，也就是说，`post-merge` 钩子对应的 Hook 文件名必须为 `post-merge`，不能添加其他的前缀。

在 `post-merge` 钩子脚本中添加以下代码行，即可调用名为 `post-merge-newdev` 的自定义 Hook：

```sh
if [ -x .git/hooks/post-merge-newdev ]; then
  ./.git/hooks/post-merge-newdev
fi
```

## pre-commit保护test分支

设置test分支只能从dev分支合并代码过来，不能在test直接提交代码

```sh
#!/bin/sh

# 获取当前所在的分支，并将其存储在变量current_branch中
current_branch=$(git symbolic-ref --short HEAD)

if [ "$current_branch" = "test" ]; then
# 使用git merge-base命令来检查dev分支是否是test分支的祖先分支
  if ! git merge-base --is-ancestor dev HEAD; then
    echo "Error: You can only merge code from the 'dev' branch into the 'test' branch."
    exit 1
  fi
fi

exit 0
```



## 拿到git reflog第一条commit ID
