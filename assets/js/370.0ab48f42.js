(window.webpackJsonp=window.webpackJsonp||[]).push([[370],{658:function(s,a,t){"use strict";t.r(a);var e=t(8),r=Object(e.a)({},(function(){var s=this,a=s._self._c;return a("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[a("h1",{attrs:{id:"linux解压缩"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#linux解压缩"}},[s._v("#")]),s._v(" linux解压缩")]),s._v(" "),a("h2",{attrs:{id:"unzip"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#unzip"}},[s._v("#")]),s._v(" unzip")]),s._v(" "),a("p",[s._v("unzip解压文件")]),s._v(" "),a("div",{staticClass:"language-sh line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[s._v("$ "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("unzip")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-o")]),s._v(" test.zip "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-d")]),s._v(" tmp/\n\n-o：不必先询问用户，unzip执行后覆盖原有的文件；\n-d"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("<")]),s._v("目录"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v("：指定文件解压缩后所要存储的目录；\n-n：解压缩时不要覆盖原有的文件；\n\n\n-j：不处理压缩文件中原有的目录路径；\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# unzip -j dist.zip 会将dist.zip内部的文件铺平(flat) 出来")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br")])]),a("h2",{attrs:{id:"zip"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#zip"}},[s._v("#")]),s._v(" zip")]),s._v(" "),a("div",{staticClass:"language-sh line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# -r 递归处理，将./这个目录下所有文件和文件夹打包为当前目录下的html.zip：")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("zip")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-r")]),s._v(" ./dstbackup.zip ./dstbackup\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# -q quiet安静模式，不显示指令执行过程。")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# -j 只保存文件名称及其内容，而不存放任何目录名称。（所有文件都在压缩包首页中）")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br")])]),a("p",[a("strong",[s._v("⚠️注意：zip压缩会带上目录结构，如果要避免带上目录结构，最简单的方法就是cd进入需要压缩的目录，再执行zip命令。")])]),s._v(" "),a("p",[s._v("排除目录")]),s._v(" "),a("p",[s._v("压缩 example/basic/ 目录内容到 basic.zip 压缩包中 -x 指定排除目录，注意没有双引号将不起作用。")]),s._v(" "),a("div",{staticClass:"language-sh line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[s._v("$ "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("zip")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-r")]),s._v(" basic.zip example/basic/ "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-x")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"example/basic/node_modules/*"')]),s._v(" "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-x")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"example/basic/build/*"')]),s._v(" "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-x")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"example/basic/coverage/*"')]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br")])]),a("h3",{attrs:{id:"zip不带dist目录"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#zip不带dist目录"}},[s._v("#")]),s._v(" zip不带dist目录")]),s._v(" "),a("p",[s._v("-D：压缩文件内不建立目录名称；")]),s._v(" "),a("div",{staticClass:"language-sh line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[s._v("zip")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-Dr")]),s._v(" dist.zip dist/*\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br")])]),a("blockquote",[a("p",[s._v("需要注意的是：macOS的归档实用工具（Archive Utility）在解压ZIP文件时，通常会自动创建一个与ZIP文件同名的目录并将内容解压到该目录中。这是macOS系统的默认行为。")]),s._v(" "),a("p",[s._v("所以如果希望避免这种情况，就需要在命令后使用unzip命令解压文件。")])]),s._v(" "),a("h3",{attrs:{id:"创建一个全新的压缩文件而不是添加内容到现有的压缩文件"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#创建一个全新的压缩文件而不是添加内容到现有的压缩文件"}},[s._v("#")]),s._v(" 创建一个全新的压缩文件而不是添加内容到现有的压缩文件")]),s._v(" "),a("p",[s._v("-m：将文件压缩并加入压缩文件后，删除原始文件，即把文件移到压缩文件中；")]),s._v(" "),a("div",{staticClass:"language-sh line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[s._v("zip")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-m")]),s._v(" new_archive.zip file1.txt file2.txt directory/\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br")])])])}),[],!1,null,null,null);a.default=r.exports}}]);