/*
 * @Author: liuxu
 * @Date: 2019-01-22 2:42:21
 */

const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
    .BundleAnalyzerPlugin;

const base = require('./webpack.base.config');
const { resolve } = require('./webpack.utils');

module.exports = merge(base, {
    module: {
        rules: [
            {
                test: /\.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader?modules&localIdentName=[name]-[hash:base64:5]',
                    'postcss-loader',
                    'less-loader'
                ],
                include: resolve('src'),
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].[chunkhash].css'
        })
    ].concat(
        process.env.CODE_ENV === 'development'
            ? [
                  new BundleAnalyzerPlugin({
                      openAnalyzer: true
                  })
              ]
            : []
    )
});
