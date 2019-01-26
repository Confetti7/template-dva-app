/*
 * @Author: liuxu
 * @Date: 2019-01-22 2:42:21
 */

const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
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
        }),
        new CompressionWebpackPlugin({
            test: /\.(js|css)?$/,
            algorithm: 'gzip',
            threshold: 10 * 1024,
            minRatio: 0.8
        })
    ].concat(
        process.env.NODE_ENV === 'development'
            ? [
                  new BundleAnalyzerPlugin({
                      openAnalyzer: true
                  })
              ]
            : []
    )
});
