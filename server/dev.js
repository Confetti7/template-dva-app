/*
 * @Author: liuxu
 * @Date: 2019-01-23 4:51:33
 */

const webpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');

const config = require('../build/webpack.dev.config.js'); 

const port = 7777;
const options = {
    inline: true, //打包后加入一个websocket客户端
    hot: true, //热加载
    contentBase: './dist', //开发服务运行时的文件根目录
    host: 'localhost', //主机地址
    disableHostCheck: true,
    port: port, //端口号
    compress: true, //开发服务器是否启动gzip等压缩
    noInfo: false // 启用 noInfo 后，诸如「启动时和每次保存之后，那些显示的 webpack 包(bundle)信息」的消息将被隐藏。错误和警告仍然会显示。
};

webpackDevServer.addDevServerEntrypoints(config, options);
const compiler = webpack(config);
const server = new webpackDevServer(compiler, options);

server.listen(port, 'localhost', () => {
    console.log(`dev server listening on port ${port}!`);
});
