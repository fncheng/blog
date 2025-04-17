(window.webpackJsonp=window.webpackJsonp||[]).push([[187],{473:function(t,s,a){"use strict";a.r(s);var n=a(8),e=Object(n.a)({},(function(){var t=this,s=t._self._c;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h2",{attrs:{id:"浏览器资源加载的优先级"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#浏览器资源加载的优先级"}},[t._v("#")]),t._v(" 浏览器资源加载的优先级")]),t._v(" "),s("h3",{attrs:{id:"默认加载顺序"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#默认加载顺序"}},[t._v("#")]),t._v(" 默认加载顺序")]),t._v(" "),s("p",[t._v("浏览器首先会按照资源默认的优先级确定加载顺序：")]),t._v(" "),s("ol",[s("li",[t._v("html 、 css 、 font 这三种类型的资源优先级最高；")]),t._v(" "),s("li",[t._v('然后是 preload 资源（通过 <link rel=“preload"> 标签预加载）、 script 、 xhr 请求；')]),t._v(" "),s("li",[t._v("接着是图片、语音、视频；")]),t._v(" "),s("li",[t._v("最低的是prefetch预读取的资源。")])]),t._v(" "),s("h2",{attrs:{id:"prefetch和preload"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#prefetch和preload"}},[t._v("#")]),t._v(" Prefetch和Preload")]),t._v(" "),s("p",[t._v("https://zhuanlan.zhihu.com/p/33759023")]),t._v(" "),s("ul",[s("li",[t._v("preload 是表示用户十分有可能需要在当前浏览中加载目标资源，所以浏览器"),s("strong",[t._v("必须")]),t._v("预先获取和缓存对应资源。")]),t._v(" "),s("li",[t._v("prefetch 是告诉用户未来的浏览"),s("strong",[t._v("有可能")]),t._v("需要加载目标资源，所以浏览器有可能通过事先获取和缓存对应资源，优化用户体验")])]),t._v(" "),s("p",[t._v("对组件使用预加载，需要配合webpack分包来实现。即打包的时候单独生成对应文件")]),t._v(" "),s("div",{staticClass:"language-js line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function-variable function"}},[t._v("HelloWorld")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v('/* webpackChunkName: "helloworld" */')]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'../components/HelloWorld.vue'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])]),t._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[t._v("1")]),s("br"),s("span",{staticClass:"line-number"},[t._v("2")]),s("br")])]),s("p",[t._v("组件/路由动态导入后，HTTP请求资源时，就会自动预加载，这一点可以在Network中查看")]),t._v(" "),s("h3",{attrs:{id:"首屏加载时间怎么看"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#首屏加载时间怎么看"}},[t._v("#")]),t._v(" 首屏加载时间怎么看？")]),t._v(" "),s("p",[t._v("Load值")]),t._v(" "),s("img",{staticStyle:{zoom:"50%"},attrs:{src:"/Users/cheng/Library/Application Support/typora-user-images/image-20230517222609691.png",alt:"image-20230517222609691"}}),t._v(" "),s("h2",{attrs:{id:"页面生命周期"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#页面生命周期"}},[t._v("#")]),t._v(" 页面生命周期")]),t._v(" "),s("p",[t._v("https://zh.javascript.info/onload-ondomcontentloaded")]),t._v(" "),s("p",[t._v("DOMContentLoaded是什么")]),t._v(" "),s("p",[t._v("浏览器已完全加载 HTML，并构建了 DOM 树，但像 "),s("code",[t._v("<img>")]),t._v(" 和样式表之类的外部资源可能尚未加载完成。")]),t._v(" "),s("h2",{attrs:{id:"减少请求数"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#减少请求数"}},[t._v("#")]),t._v(" 减少请求数")]),t._v(" "),s("p",[t._v("如何减少？")]),t._v(" "),s("p",[t._v("可以通过减少不必要的prefetch请求，prefetch请求会消耗时间")]),t._v(" "),s("p",[t._v("经测试，VueCLI删除prefetch插件后，首屏加载时间确实缩短了")]),t._v(" "),s("div",{staticClass:"language-js line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[t._v("module"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("exports "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token function-variable function"}},[t._v("chainWebpack")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("config")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    config"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("plugins"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("delete")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'prefetch'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])]),t._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[t._v("1")]),s("br"),s("span",{staticClass:"line-number"},[t._v("2")]),s("br"),s("span",{staticClass:"line-number"},[t._v("3")]),s("br"),s("span",{staticClass:"line-number"},[t._v("4")]),s("br"),s("span",{staticClass:"line-number"},[t._v("5")]),s("br")])]),s("h2",{attrs:{id:"webpack外部扩展externals"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#webpack外部扩展externals"}},[t._v("#")]),t._v(" webpack外部扩展externals")]),t._v(" "),s("p",[t._v("该选项可以「从输出的 bundle 中排除指定的依赖」")]),t._v(" "),s("p",[t._v("比如将vue库从项目构建中排除，改为从CDN引入，不过这种需要引入umd格式的文件")]),t._v(" "),s("p",[s("a",{attrs:{href:"https://www.webpackjs.com/configuration/externals/",target:"_blank",rel:"noopener noreferrer"}},[t._v("webpack externals字段"),s("OutboundLink")],1)]),t._v(" "),s("div",{staticClass:"language-ts line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-ts"}},[s("code",[t._v("externals"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("?")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v("\n\t\t"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("|")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("string")]),t._v("\n\t\t"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("|")]),t._v(" RegExp\n\t\t"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("|")]),t._v(" ExternalItem"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n\t\t"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("|")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("ExternalItemObjectKnown "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("&")]),t._v(" ExternalItemObjectUnknown"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\t\t"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("|")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("\n\t\t\t\tdata"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" ExternalItemFunctionData"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n\t\t\t\t"),s("span",{pre:!0,attrs:{class:"token function-variable function"}},[t._v("callback")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("\n\t\t\t\t\terr"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("?")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" Error"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n\t\t\t\t\tresult"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("?")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("string")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("|")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("boolean")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("|")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("string")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("|")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("index"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("string")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("any")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\t\t\t\t"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("void")]),t._v("\n\t\t  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("void")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\t\t"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("|")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("data"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" ExternalItemFunctionData"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("Promise")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("ExternalItemValue"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])]),t._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[t._v("1")]),s("br"),s("span",{staticClass:"line-number"},[t._v("2")]),s("br"),s("span",{staticClass:"line-number"},[t._v("3")]),s("br"),s("span",{staticClass:"line-number"},[t._v("4")]),s("br"),s("span",{staticClass:"line-number"},[t._v("5")]),s("br"),s("span",{staticClass:"line-number"},[t._v("6")]),s("br"),s("span",{staticClass:"line-number"},[t._v("7")]),s("br"),s("span",{staticClass:"line-number"},[t._v("8")]),s("br"),s("span",{staticClass:"line-number"},[t._v("9")]),s("br"),s("span",{staticClass:"line-number"},[t._v("10")]),s("br"),s("span",{staticClass:"line-number"},[t._v("11")]),s("br"),s("span",{staticClass:"line-number"},[t._v("12")]),s("br"),s("span",{staticClass:"line-number"},[t._v("13")]),s("br")])]),s("p",[t._v("于是在我们的webpack.config.js中添加")]),t._v(" "),s("div",{staticClass:"language-js line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[t._v("module"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("export "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("externals")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("vue")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'Vue'")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])]),t._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[t._v("1")]),s("br"),s("span",{staticClass:"line-number"},[t._v("2")]),s("br"),s("span",{staticClass:"line-number"},[t._v("3")]),s("br"),s("span",{staticClass:"line-number"},[t._v("4")]),s("br"),s("span",{staticClass:"line-number"},[t._v("5")]),s("br")])]),s("p",[t._v("其次要在在public/index.html 模板文件引入对应的 script")]),t._v(" "),s("p",[t._v("使用externals前")]),t._v(" "),s("p",[t._v("dev时 bundle大小为313kb，")]),t._v(" "),s("p",[t._v("打包的vue.js bundle 大小146kb")]),t._v(" "),s("p",[s("img",{attrs:{src:"https://minimax-1256590847.cos.ap-shanghai.myqcloud.com/img/image-20230526233634449.png",alt:"image-20230526233634449"}})]),t._v(" "),s("img",{staticStyle:{zoom:"50%"},attrs:{src:"https://minimax-1256590847.cos.ap-shanghai.myqcloud.com/img/image-20230527001410156.png",alt:"image-20230527001410156"}}),t._v(" "),s("p",[t._v("不同构建版本通过script引入的结果")]),t._v(" "),s("table",[s("thead",[s("tr",[s("th",[t._v("构建版本")]),t._v(" "),s("th",[t._v("dev运行结果")]),t._v(" "),s("th",[t._v("prod运行结果")]),t._v(" "),s("th",[t._v("文件大小")])])]),t._v(" "),s("tbody",[s("tr",[s("td",[t._v("vue.common.prod.js")]),t._v(" "),s("td",[t._v("没问题")]),t._v(" "),s("td",[t._v("没问题")]),t._v(" "),s("td",[t._v("92k")])]),t._v(" "),s("tr",[s("td",[t._v("vue.esm.js")]),t._v(" "),s("td",[t._v("报错"),s("code",[t._v("Vue is not defined")])]),t._v(" "),s("td",[t._v("报错"),s("code",[t._v("Vue is not defined")])]),t._v(" "),s("td",[t._v("321k")])]),t._v(" "),s("tr",[s("td",[t._v("vue.min.js")]),t._v(" "),s("td",[t._v("没问题")]),t._v(" "),s("td",[t._v("没问题")]),t._v(" "),s("td",[t._v("92k")])]),t._v(" "),s("tr",[s("td",[t._v("vue.runtime.common.prod.js")]),t._v(" "),s("td",[t._v("没问题")]),t._v(" "),s("td",[t._v("报错"),s("code",[t._v("Vue is not defined")])]),t._v(" "),s("td",[t._v("64k")])]),t._v(" "),s("tr",[s("td",[t._v("vue.runtime.min.js")]),t._v(" "),s("td",[t._v("没问题")]),t._v(" "),s("td",[t._v("没问题")]),t._v(" "),s("td",[t._v("64k")])])])]),t._v(" "),s("p",[t._v("配合Gzip 获取的vue.min.js只有35.7k 大小")]),t._v(" "),s("h3",{attrs:{id:"配合htmlwebpackplugin注入script"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#配合htmlwebpackplugin注入script"}},[t._v("#")]),t._v(" 配合HtmlWebpackPlugin注入script")]),t._v(" "),s("p",[t._v("可以在public文件夹下设置两份index.html，一份叫index.prod.html，在其中加入CDN引入的vue")]),t._v(" "),s("div",{staticClass:"language-html line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-html"}},[s("code",[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("script")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("src")]),s("span",{pre:!0,attrs:{class:"token attr-value"}},[s("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("https://cdn.jsdelivr.net/npm/vue@2.6.14/dist/vue.min.js"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),s("span",{pre:!0,attrs:{class:"token script"}}),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("script")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n")])]),t._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[t._v("1")]),s("br")])]),s("p",[t._v("将HtmlWebpackPlugin 的配置分别写到dev和prod的配置文件中，这样dev和prod引用的就是不同的index.html了")]),t._v(" "),s("p",[t._v("配合"),s("code",[t._v("<%= EJS %>")]),t._v(" EJS语法")]),t._v(" "),s("p",[t._v("在index.html中加入如下语法")]),t._v(" "),s("div",{staticClass:"language-html line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-html"}},[s("code",[t._v("<% if(process.env.NODE_ENV==='production') { %>\n  "),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("script")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("src")]),s("span",{pre:!0,attrs:{class:"token attr-value"}},[s("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("https://cdn.jsdelivr.net/npm/vue@2.6.14/dist/vue.min.js"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),s("span",{pre:!0,attrs:{class:"token script"}}),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("script")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n<% } %>\n")])]),t._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[t._v("1")]),s("br"),s("span",{staticClass:"line-number"},[t._v("2")]),s("br"),s("span",{staticClass:"line-number"},[t._v("3")]),s("br")])]),s("p",[t._v("script只有在生产环境时才会插入body部分，这样我们只需要维护一份html文件就可以了")])])}),[],!1,null,null,null);s.default=e.exports}}]);