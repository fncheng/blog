(window.webpackJsonp=window.webpackJsonp||[]).push([[207],{494:function(e,t,n){"use strict";n.r(t);var r=n(8),s=Object(r.a)({},(function(){var e=this,t=e._self._c;return t("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[t("h1",{attrs:{id:"记一次从webpack3迁移到webpack4遇到的问题"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#记一次从webpack3迁移到webpack4遇到的问题"}},[e._v("#")]),e._v(" 记一次从webpack3迁移到webpack4遇到的问题")]),e._v(" "),t("p",[e._v("首先是"),t("a",{attrs:{href:"https://github.com/webpack/webpack-dev-server/blob/master/migration-v4.md",target:"_blank",rel:"noopener noreferrer"}},[e._v("Webpack-dev-server@4.0.0 迁移指南"),t("OutboundLink")],1)]),e._v(" "),t("p",[e._v("第一个问题")]),e._v(" "),t("p",[t("strong",[e._v("1. [webpack-cli] Error: webpack.optimize.CommonsChunkPlugin has been removed, please use config.optimization.splitChunks instead.")])]),e._v(" "),t("p",[e._v("解决办法：https://segmentfault.com/a/1190000020258045")]),e._v(" "),t("blockquote",[t("p",[t("a",{attrs:{href:"https://www.webpackjs.com/plugins/commons-chunk-plugin/",target:"_blank",rel:"noopener noreferrer"}},[e._v("webpack.optimize.CommonsChunkPlugin"),t("OutboundLink")],1),e._v("迁移到"),t("a",{attrs:{href:"https://webpack.docschina.org/plugins/split-chunks-plugin/",target:"_blank",rel:"noopener noreferrer"}},[e._v("optimization.splitChunks"),t("OutboundLink")],1)])]),e._v(" "),t("hr"),e._v(" "),t("p",[e._v("第二个问题")]),e._v(" "),t("p",[t("strong",[e._v("2. Chunk.entrypoints: Use Chunks.groupsIterable and filter by instanceof Entrypoint instead")])]),e._v(" "),t("blockquote",[t("p",[t("a",{attrs:{href:"https://www.webpackjs.com/plugins/extract-text-webpack-plugin/",target:"_blank",rel:"noopener noreferrer"}},[t("em",[e._v("ExtractTextPlugin")]),t("OutboundLink")],1),e._v("迁移到"),t("a",{attrs:{href:"https://v4.webpack.docschina.org/plugins/mini-css-extract-plugin#getting-started",target:"_blank",rel:"noopener noreferrer"}},[t("em",[e._v("MiniCssExtractPlugin")]),t("OutboundLink")],1)])]),e._v(" "),t("hr"),e._v(" "),t("p",[e._v("第三个问题")]),e._v(" "),t("p",[t("strong",[e._v("3. Posts-loader this.getOptions is not a function")])]),e._v(" "),t("p",[e._v("webpack4请使用postcss-loader v4.")]),e._v(" "),t("p",[t("a",{attrs:{href:"https://www.npmjs.com/package/postcss-loader",target:"_blank",rel:"noopener noreferrer"}},[e._v("postcssloader"),t("OutboundLink")],1)]),e._v(" "),t("hr"),e._v(" "),t("p",[e._v("第四个问题")]),e._v(" "),t("p",[e._v("执行webpack server后报错")]),e._v(" "),t("p",[t("strong",[e._v("Module not found: Error: Can't resolve './src' in '/Users/cheng/Github/webpack-learn'")])]),e._v(" "),t("p",[e._v("这是因为webpack默认的入口文件是src/index.js")]),e._v(" "),t("div",{staticClass:"language-js line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-js"}},[t("code",[t("span",{pre:!0,attrs:{class:"token literal-property property"}},[e._v("entry")]),t("span",{pre:!0,attrs:{class:"token operator"}},[e._v(":")]),e._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[e._v("'./src/index.js'")]),e._v("\n")])]),e._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[e._v("1")]),t("br")])]),t("hr"),e._v(" "),t("p",[e._v("第五个问题")]),e._v(" "),t("p",[t("strong",[e._v("打包生成LICENSE.txt文件")])]),e._v(" "),t("p",[e._v("这是"),t("a",{attrs:{href:"https://link.segmentfault.com/?enc=sAJBlPiDZoO5DEMbZLwXmA%3D%3D.sE5NkW8jmyBSmU331YadCjZc%2FVkFBJpPJ1saJ%2F59I%2FEYKQJrqCL928MR3wMUhgf2A18XtOP8DJ4hKcKXyBDTBw%3D%3D",target:"_blank",rel:"noopener noreferrer"}},[e._v("TerserWebpackPlugin"),t("OutboundLink")],1),e._v("默认生成的")]),e._v(" "),t("p",[e._v("[webpack-cli] Invalid configuration object. Webpack has been initialized using a configuration object that does not match the API schema.")]),e._v(" "),t("p",[e._v('configuration.output.filename: A relative path is expected. However, the provided value "/js/[name].[contenthash].bundle.js" is an absolute path!\nPlease use output.path to specify absolute path and output.filename for the file name.')]),e._v(" "),t("p",[e._v('configuration.output.filename：需要相对路径。然而，提供的值 "/js/[name].[contenthash].bundle.js" 是一个绝对路径！\n请使用 output.path 指定绝对路径和 output.filename 作为文件名。')]),e._v(" "),t("hr"),e._v(" "),t("p",[e._v("第六个问题")]),e._v(" "),t("p",[e._v("Vue-Router History mode dev下刷新页面会报错无法找到页面")]),e._v(" "),t("p",[e._v("设置devServer.historyApiFallback，然后就可以刷新了。")]),e._v(" "),t("hr"),e._v(" "),t("p",[e._v("第七个问题")]),e._v(" "),t("p",[t("strong",[e._v("Cannot find module 'webpack/bin/config-yargs")])]),e._v(" "),t("p",[e._v("https://stackoverflow.com/questions/40379139/cannot-find-module-webpack-bin-config-yargs")]),e._v(" "),t("p",[e._v("如果您使用"),t("strong",[e._v("webpack-cli")]),e._v(" 4 或"),t("strong",[e._v("webpack 5")]),e._v("，请更改"),t("code",[e._v("webpack-dev-server")]),e._v("为"),t("code",[e._v("webpack serve")]),e._v(".")]),e._v(" "),t("div",{staticClass:"language-json line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-json"}},[t("code",[t("span",{pre:!0,attrs:{class:"token property"}},[e._v('"serve"')]),t("span",{pre:!0,attrs:{class:"token operator"}},[e._v(":")]),e._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[e._v('"webpack serve --config config/webpack.dev.js --progress"')]),e._v("\n")])]),e._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[e._v("1")]),t("br")])]),t("hr"),e._v(" "),t("p",[e._v("第八个问题")]),e._v(" "),t("p",[t("strong",[e._v("yarn build时css-loader报错minimize？")])]),e._v(" "),t("p",[e._v("css-loader unknown property 'minimize'")]),e._v(" "),t("p",[e._v("原因是"),t("em",[e._v("webpack")]),e._v(" 3.0 之后以及css-loader 1.0 以上已经将"),t("em",[e._v("minimize")]),e._v(" 这个属性去掉了导致"),t("em",[e._v("报错")]),e._v(".")]),e._v(" "),t("p",[e._v("https://dailc.github.io/2017/03/13/webpackfreshmanualAndBug.html")]),e._v(" "),t("p",[e._v("解决办法：")]),e._v(" "),t("p",[e._v("升级vue-loader")])])}),[],!1,null,null,null);t.default=s.exports}}]);