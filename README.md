## create-dva-app

## webapck/spa/react/dll

### 20190122

-   完成 webpack 基本配置
-   babel presets 字段设定转码规则(babel官方帮我们做了一些预设的插件集例，如preset-es2015，env等)
-   babel presets env 预设只包含我们使用和目标浏览器中缺少的功能的转换和polyfill
-   babel presets env 如果设置了useBuiltIns(默认false)特殊说明一下，此选项将core-js模块的直接引用添加为裸导入。因此core-js将相对于文件本身进行解析并且需要可访问，所以需要显示引入(yarn add)或者其他包依赖core-js。

### 20190123
-   将环境变量CODE_ENV作用缩小，打包区别更多的体现在config文件内
-   样式热更新，区分一下MiniCssExtractPlugin.loader和style-loader的使用
-   class普通函数使用箭头函数模式，自动绑定this。这个特性需要babel-plugin-transform-class-properties来转译，这个插件在原来是包含在stage-2里面的，现在，需要单独引入。

### 20190124
-   文件size小于limit参数，url-loader将会把文件转为DataURL；文件size大于limit，url-loader会调用file-loader进行处理，参数也会直接传给file-loader。因此我们只需要安装url-loader即可。[参考资料](https://blog.csdn.net/WEB_YH/article/details/79325182)
-   
