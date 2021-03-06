/*
 * @Author: liuxu
 * @Date: 2019-01-22 2:41:18
 */

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const { resolve, src } = require('./webpack.utils');

const { NODE_ENV } = process.env;

console.log(NODE_ENV);

module.exports = {
    mode: NODE_ENV,
    entry: {
        index: src('index.jsx'),
    },
    output: {
        filename: 'static/js/[name].[chunkhash].js', // entry命名规则
        chunkFilename: 'static/js/[name].[chunkhash].js', // 设置按需加载后的chunk名字
        path: resolve('dist'),
        publicPath: '/',
    },
    performance: {
        hints: false,
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
            minSize: 30 * 1024,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: Infinity,
            automaticNameDelimiter: '-',
            name: true,
            cacheGroups: {
                polyfill: {
                    test: /(core-js)/,
                    priority: 1,
                    reuseExistingChunk: true,
                },
                react: {
                    test: /(react)|(redux)/,
                    priority: 0,
                    reuseExistingChunk: true,
                },
                vendor: {
                    test: /node_modules/,
                    priority: -1,
                    reuseExistingChunk: true,
                },
            },
        },
        runtimeChunk: {
            name: entry => `runtime-${entry.name}`,
        },
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)?$/,
                enforce: 'pre',
                loader: 'eslint-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.(js|jsx)?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg)$/,
                loader: 'url-loader',
                options: {
                    outputPath: 'static/imgs/', // 图片输出的路径
                    limit: 10 * 1024,
                    name: function (file) {
                        return '[name].[hash:8].[ext]';
                    },
                },
                include: src('assets/imgs'),
            },
            {
                test: /\.(woff2?|eot|ttf|otf|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    outputPath: 'static/fonts/',
                    name: '[name].[hash:8].[ext]',
                    limit: 10 * 1024,
                },
                include: src('assets/fonts'),
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: resolve('public/index.html'),
            favicon: resolve('public/favicon.ico'),
            filename: 'index.html',
        }),
        new CopyWebpackPlugin([
            { from: resolve('public/favicon.ico'), to: resolve('dist') },
            { from: resolve('public/manifest.json'), to: resolve('dist') },
            { from: resolve('public/robots.txt'), to: resolve('dist') },
            { from: src('assets/imgs/icons'), to: resolve('dist/static/imgs/icons') },
        ]),
        new webpack.DefinePlugin({
            NODE_ENV: JSON.stringify(NODE_ENV),
        }),
    ],
    resolve: {
        alias: {
            assets: src('assets'),
            containers: src('containers'),
            components: src('components'),
            pages: src('pages'),
            utils: src('utils'),
        },
        extensions: ['*', '.js', '.jsx'],
    },
};
