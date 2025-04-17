(window.webpackJsonp=window.webpackJsonp||[]).push([[42],{330:function(t,v,s){"use strict";s.r(v);var e=s(8),a=Object(e.a)({},(function(){var t=this,v=t._self._c;return v("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[v("h1",{attrs:{id:"利用视口单位实现适配布局"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#利用视口单位实现适配布局"}},[t._v("#")]),t._v(" 利用视口单位实现适配布局")]),t._v(" "),v("p",[t._v("https://aotu.io/notes/2017/04/28/2017-4-28-CSS-viewport-units/index.html")]),t._v(" "),v("p",[t._v("视口，在桌面端，毫无疑问指的就是浏览器的可视区域；但是在移动端，它指的则是三个 Viewport 中的 Layout Viewport 。")]),t._v(" "),v("p",[t._v("Layout Viewport（布局视口）、 Visual Viewport（视觉视口）、Ideal Viewport。")]),t._v(" "),v("p",[t._v("根据"),v("a",{attrs:{href:"https://drafts.csswg.org/css-values-3/#viewport-relative-lengths",target:"_blank",rel:"noopener noreferrer"}},[t._v("CSS3规范"),v("OutboundLink")],1),t._v("，视口单位主要包括以下4个：")]),t._v(" "),v("ul",[v("li",[v("strong",[t._v("vw")]),t._v(" : 1vw 等于视口宽度的1%")]),t._v(" "),v("li",[v("strong",[t._v("vh")]),t._v(" : 1vh 等于视口高度的1%")]),t._v(" "),v("li",[v("strong",[t._v("vmin")]),t._v(" : 选取 vw 和 vh 中最小的那个")]),t._v(" "),v("li",[v("strong",[t._v("vmax")]),t._v(" : 选取 vw 和 vh 中最大的那个")])]),t._v(" "),v("p",[t._v("视口单位区别于"),v("code",[t._v("%")]),t._v("单位，视口单位是依赖于视口的尺寸，根据视口尺寸的百分比来定义的；而"),v("code",[t._v("%")]),t._v("单位则是依赖于元素的祖先元素。")]),t._v(" "),v("p",[t._v("例如，在桌面端浏览器视口尺寸为650px，那么 1vw = 650 * 1% = 6.5px（这是理论推算的出，如果浏览器不支持0.5px，那么实际渲染结果可能是7px）。")]),t._v(" "),v("h2",{attrs:{id:"视口-viewport"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#视口-viewport"}},[t._v("#")]),t._v(" 视口（Viewport）")]),t._v(" "),v("p",[t._v("https://developer.mozilla.org/zh-CN/docs/Web/CSS/Viewport_concepts")]),t._v(" "),v("p",[t._v("⚠️："),v("code",[t._v("innerHeight")]),t._v(" 和 "),v("code",[t._v("innerWidth")]),t._v(" 所组成的区域通常被认为是"),v("strong",[t._v("布局视口(layout viewport)")]),t._v(" 。浏览器的框架不被认为是 viewport 的一部分.")]),t._v(" "),v("p",[t._v("Web 浏览器包含两个 viewport，"),v("strong",[t._v("布局视口(layout viewport)"),v("strong",[t._v("和")]),t._v("视觉视口(visual viewport)")]),t._v("。")]),t._v(" "),v("h4",{attrs:{id:"iframe"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#iframe"}},[t._v("#")]),t._v(" <iframe>")]),t._v(" "),v("p",[t._v("需要注意的是，当你在 CSS 中使用 "),v("code",[t._v("vw")]),t._v(" 和 "),v("code",[t._v("vh")]),t._v(" 设置 "),v("code",[t._v("iframe")]),t._v(" 的样式时，"),v("code",[t._v("1vh")]),t._v(" 表示的是 "),v("code",[t._v("iframe")]),t._v(" 高度的1%，但 "),v("code",[t._v("1vw")]),t._v(" 表示的则是 document 宽度的 1%。")]),t._v(" "),v("p",[t._v("使用vw作为css的单位，在浏览器内缩放时，元素不会跟着放大和缩小。")]),t._v(" "),v("div",{staticClass:"language-css line-numbers-mode"},[v("pre",{pre:!0,attrs:{class:"language-css"}},[v("code",[v("span",{pre:!0,attrs:{class:"token selector"}},[t._v("// 100px 大小的div baseWidth=750px 1vw= 7.5px\ndiv")]),v("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),v("span",{pre:!0,attrs:{class:"token property"}},[t._v("width")]),v("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" 13.3333vw"),v("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),v("span",{pre:!0,attrs:{class:"token property"}},[t._v("height")]),v("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" 13.3333vw"),v("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),v("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])]),t._v(" "),v("div",{staticClass:"line-numbers-wrapper"},[v("span",{staticClass:"line-number"},[t._v("1")]),v("br"),v("span",{staticClass:"line-number"},[t._v("2")]),v("br"),v("span",{staticClass:"line-number"},[t._v("3")]),v("br"),v("span",{staticClass:"line-number"},[t._v("4")]),v("br"),v("span",{staticClass:"line-number"},[t._v("5")]),v("br")])])])}),[],!1,null,null,null);v.default=a.exports}}]);