(window.webpackJsonp=window.webpackJsonp||[]).push([[73],{361:function(s,a,t){"use strict";t.r(a);var n=t(8),e=Object(n.a)({},(function(){var s=this,a=s._self._c;return a("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[a("h3",{attrs:{id:"创建-gitignore文件"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#创建-gitignore文件"}},[s._v("#")]),s._v(" 创建.gitignore文件")]),s._v(" "),a("h4",{attrs:{id:"使用git-bash"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#使用git-bash"}},[s._v("#")]),s._v(" 使用git bash")]),s._v(" "),a("ul",[a("li",[s._v("根目录下右键选择“Git Bash Here”进入bash命令窗口；")]),s._v(" "),a("li",[s._v("输入"),a("code",[s._v("vim .gitignore")]),s._v("命令，打开文件（没有文件会自动创建）；")]),s._v(" "),a("li",[s._v("按i键切换到编辑状态，输入规则，例如node_modules/，然后按Esc键退出编辑，输入:wq保存退出。")])]),s._v(" "),a("h3",{attrs:{id:"常用规则"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#常用规则"}},[s._v("#")]),s._v(" 常用规则")]),s._v(" "),a("div",{staticClass:"language-bash line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[s._v("/mtk/ 过滤整个文件夹\n*.zip 过滤所有.zip文件\n/mtk/do.c 过滤某个具体文件\n\n"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("!")]),s._v("src/   不过滤该文件夹\n"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("!")]),s._v("*.zip   不过滤所有.zip文件\n"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("!")]),s._v("/mtk/do.c 不过滤该文件\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br")])]),a("p",[s._v("以上规则意思是：被过滤掉的文件就不会出现在你的GitHub库中了，当然本地库中还有，只是push的时候不会上传。")]),s._v(" "),a("h3",{attrs:{id:"git忽略已经提交的文件"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#git忽略已经提交的文件"}},[s._v("#")]),s._v(" git忽略已经提交的文件")]),s._v(" "),a("p",[s._v("https://github.com/wujunchuan/wujunchuan.github.io/issues/18#issue-213430690")]),s._v(" "),a("p",[s._v("已经提交的文件在.gitignore中添加是无效的")]),s._v(" "),a("p",[s._v("此时可以这样做:")]),s._v(" "),a("blockquote",[a("p",[a("code",[s._v("git rm --cached {fileName}")]),s._v(" //删除本地缓存\n更新本地"),a("code",[s._v("gitignore")]),s._v("文件,忽略目标文件(fileName)\n最后"),a("code",[s._v("git commit -m 'We don't need that fileName")])])]),s._v(" "),a("p",[a("strong",[s._v("注意，这种方法下somefiles只会在提交者的磁盘中保留，如果其他开发者拉取你的commit后，他们磁盘内的这些文件也会消失")])]),s._v(" "),a("h3",{attrs:{id:"白名单模式"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#白名单模式"}},[s._v("#")]),s._v(" 白名单模式")]),s._v(" "),a("div",{staticClass:"language-sh line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 忽略一切")]),s._v("\n*\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 把所有的文件夹重新包含进来")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 这是怎么做到的呢？ 看第6条规则")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("!")]),s._v("*/\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 把想要的文件或文件夹重新包含进来")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 这里为啥不能用： !src/* 呢，因为有斜杠时星号不能匹配斜杠，")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 导致src/里的子目录被忽略了，只包含进src/下的文件了")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 这里为啥不能用： !src/ 呢，因为以斜杠(/)结尾只能匹配目录")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("!")]),s._v("src/**\n"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("!")]),s._v("AndroidManifest.xml\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 如果不把所有文件夹包含进来，则需要先把res/目录包含进来才行")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("!")]),s._v("res/drawable/**\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br"),a("span",{staticClass:"line-number"},[s._v("11")]),a("br"),a("span",{staticClass:"line-number"},[s._v("12")]),a("br"),a("span",{staticClass:"line-number"},[s._v("13")]),a("br")])])])}),[],!1,null,null,null);a.default=e.exports}}]);