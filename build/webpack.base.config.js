/*
 * @Author: liuxu
 * @Date: 2019-01-22 2:41:18
 */

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const { resolve, src } = require('./webpack.utils');

console.log(process.env.NODE_ENV);

module.exports = {
    target: 'web',
    mode: process.env.NODE_ENV,
    entry: {
        index: src('index.jsx')
    },
    output: {
        filename: '[name].[chunkhash].js',
        path: resolve('dist'),
        publicPath: './'
    },
    optimization: {
        splitChunks: {
            chunks: 'all', // 默认async
            minSize: 30 * 1024,
            minChunks: 1, // 共享该module的最小chunk数
            maxAsyncRequests: 5,
            maxInitialRequests: 3, // 初始化的时候最多有3个请求该module,太多就没必要抽离了
            automaticNameDelimiter: '~',
            name: true,
            cacheGroups: {
                polyfill: {
                    test: (module, chunks) => {
                        return /(core-js)/.test(module.context);
                    },
                    priority: 1,
                    reuseExistingChunk: true
                },
                react: {
                    test: /(react)/,
                    priority: 0,
                    reuseExistingChunk: true
                }
            }
        },
        runtimeChunk: {
            name: entry => `runtime~${entry.name}`
        }
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
                    outputPath: 'static/fonts/',
                    name: '[name].[hash:8].[ext]',
                    limit: 10 * 1024
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
            },
            favicon: src('favicon.ico')
        }),
        new CopyWebpackPlugin([
            { from: src('favicon.ico'), to: resolve('dist') }
        ])
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
