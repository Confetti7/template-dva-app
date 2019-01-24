/*
 * @Author: liuxu
 * @Date: 2019-01-22 2:41:18
 */

// node内置模块
const path = require('path');

// 第三方插件
const HtmlWebpackPlugin = require('html-webpack-plugin');

const { src } = require('./webpack.utils');

console.log(process.env.CODE_ENV);

module.exports = {
    mode: process.env.CODE_ENV,
    entry: {
        app: path.join(__dirname, '../src/index.jsx')
    },
    output: {
        filename: '[name].[hash].js',
        path: path.join(__dirname, '../dist'),
        publicPath: './' // 静态资源文件引用时的路径（加在引用静态资源前面的）
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)?$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg)$/,
                loader: 'url-loader',
                options: {
                    outputPath: 'static/imgs/', // 图片输出的路径
                    name: '[name].[hash:8].[ext]',
                    limit: 10 * 1024
                },
                include: src('assets/imgs')
            },
            {
                test: /\.(woff2?|eot|ttf|otf|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10 * 1024,
                    name: '[name].[hash:8].[ext]',
                    outputPath: 'static/fonts/'
                },
                include: src('assets/fonts')
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: src('index.html'),
            filename: 'index.html',
            minify: {
                minifyCSS: true,
                minifyJS: true
            }
            // chunks: ['manifest', 'vendor', 'main'],
            // favicon: src('favicon.ico'),
            // chunksSortMode: 'dependency',
        })
    ],
    resolve: {
        alias: {
            containers: src('containers'),
            components: src('components'),
            pages: src('pages')
        },
        extensions: ['*', '.js', '.jsx']
    }
};
