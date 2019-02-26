/*
 * @Author: liuxu
 * @Date: 2019-01-22 2:42:21
 */

const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CompressionWebpackPlugin = require('compression-webpack-plugin');

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
    .BundleAnalyzerPlugin;

const base = require('./webpack.base.config');
const { resolve } = require('./webpack.utils');

const Analyzer = process.argv
    ? process.argv[process.argv.length - 1] === '-a'
    : false;

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
    optimization: {
        minimizer: [
            // 自定义js优化配置，将会覆盖默认配置
            new UglifyJsPlugin({
                exclude: /\.min\.js$/, // 过滤掉以".min.js"结尾的文件，默认这个后缀本身就是已经压缩好的代码，没必要进行二次压缩
                cache: true,
                parallel: true, // 开启并行压缩，充分利用cpu
                sourceMap: false,
                extractComments: false,
                uglifyOptions: {
                    compress: {
                        unused: true,
                        warnings: false,
                        drop_debugger: true
                    },
                    output: {
                        comments: false
                    }
                }
            }),
            // 用于优化css文件
            new OptimizeCssAssetsPlugin({
                assetNameRegExp: /\.css$/g,
                cssProcessorOptions: {
                    safe: true,
                    autoprefixer: { disable: true }, // 禁用掉cssnano对于浏览器前缀的处理 否则会把autoprefixer加好的前缀去掉
                    mergeLonghand: false,
                    discardComments: {
                        removeAll: true
                    }
                },
                canPrint: true
            })
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
        Analyzer
            ? [
                  new BundleAnalyzerPlugin({
                      openAnalyzer: true
                  })
              ]
            : []
    )
});
