/*
 * @Author: liuxu
 * @Date: 2019-01-22 2:42:21
 */

const webpack = require('webpack');
const merge = require('webpack-merge');

const base = require('./webpack.base.config');
const { resolve } = require('./webpack.utils');

module.exports = merge(base, {
    output: {
        // 热更新(HMR)不能和[chunkhash]同时使用。
        filename: '[name].[hash].js'
    },
    module: {
        rules: [
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader?modules&localIdentName=[name]-[hash:base64:5]',
                    'postcss-loader',
                    'less-loader'
                ],
                include: resolve('src'),
                exclude: /node_modules/
            }
        ]
    },
    plugins: [new webpack.HotModuleReplacementPlugin()]
});
