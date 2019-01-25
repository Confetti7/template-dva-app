## create-dva-app

## webapck/spa/react/dll

### 20190122

-   完成 webpack 基本配置
-   babel presets 字段设定转码规则(babel 官方帮我们做了一些预设的插件集例，如 preset-es2015，env 等)
-   babel presets env 预设只包含我们使用和目标浏览器中缺少的功能的转换和 polyfill
-   babel presets env 如果设置了 useBuiltIns(默认 false)特殊说明一下，此选项将 core-js 模块的直接引用添加为裸导入。因此 core-js 将相对于文件本身进行解析并且需要可访问，所以需要显示引入(yarn add)或者其他包依赖 core-js

### 20190123

-   将环境变量 CODE_ENV 作用缩小，打包区别更多的体现在 config 文件内
-   样式热更新，区分一下 MiniCssExtractPlugin.loader 和 style-loader 的使用
-   class 普通函数使用箭头函数模式，自动绑定 this。这个特性需要 babel-plugin-transform-class-properties 来转译，这个插件在原来是包含在 stage-2 里面的，现在，需要单独引入

### 20190124

-   文件 size 小于 limit 参数，url-loader 将会把文件转为 DataURL；文件 size 大于 limit，url-loader 会调用 file-loader 进行处理，参数也会直接传给 file-loader。因此我们只需要安装 url-loader 即可 [参考资料](https://blog.csdn.net/WEB_YH/article/details/79325182)
-   webpack4 之后，production 模式下，SplitChunksPlugin 插件是默认被启用的，默认配置 chunks 为 async，仅仅针对异步加载的 chunk 做切割

### 20190125

-   配置 splitChunks，切割 core-js，react 以便作缓存文件
-   配置 runtimeChunk，创建一个运行时文件，以便为所有生成的块共享(默认 false，每个条目块都会嵌入运行文件)
-   mode 设置成 development，会将 process.env.NODE_ENV 的值设为 development。启用 NamedChunksPlugin 和 NamedModulesPlugin。
-   mode 设置成 production，会将 process.env.NODE_ENV 的值设为 production。启用 FlagDependencyUsagePlugin, FlagIncludedChunksPlugin, ModuleConcatenationPlugin, NoEmitOnErrorsPlugin, OccurrenceOrderPlugin, SideEffectsFlagPlugin 和 UglifyJsPlugin.
