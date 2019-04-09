/*
 * @Author: liuxu
 * @Date: 2019-01-22 2:42:21
 */

const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const OfflinePlugin = require('offline-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const CompressionWebpackPlugin = require('compression-webpack-plugin');

const base = require('./webpack.base.config');
const { resolve } = require('./webpack.utils');

const { NODE_ENV } = process.env;
const command = process.argv;
const extraPlugins = [];

let watch = false;

for (let i = 0; i < command.length; i++) {
    if (command[i] === '-a') {
        extraPlugins.push(
            new BundleAnalyzerPlugin({
                openAnalyzer: true,
            }),
        );
    }
    if (command[i] === '-c') {
        extraPlugins.push(
            new CompressionWebpackPlugin({
                test: /\.(js|css)?$/,
                algorithm: 'gzip',
                threshold: 10 * 1024,
                minRatio: 0.8,
            }),
        );
    }
    if (command[i] === '-w') {
        watch = true;
    }
}

module.exports = merge(base, {
    devtool: 'none', // https://webpack.js.org/configuration/devtool/#special-cases
    watch,
    module: {
        rules: [
            {
                test: /\.less$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader?modules&localIdentName=[name]-[hash:base64:5]', 'postcss-loader', 'less-loader'],
                include: resolve('src'),
                exclude: /node_modules/,
            },
        ],
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
                        warnings: false,
                        drop_debugger: false,
                        drop_console: false,
                        conditionals: true,
                        unused: true,
                        comparisons: true,
                        sequences: true,
                        dead_code: true,
                        evaluate: true,
                        if_return: true,
                    },
                    output: {
                        comments: false,
                    },
                },
            }),
            // 用于优化css文件
            new OptimizeCssAssetsPlugin({
                assetNameRegExp: /\.css$/g,
                cssProcessorOptions: {
                    map: false,
                    safe: true,
                    autoprefixer: { disable: true }, // 禁用掉cssnano对于浏览器前缀的处理 否则会把autoprefixer加好的前缀去掉
                    mergeLonghand: false,
                    discardComments: {
                        removeAll: true,
                    },
                },
                canPrint: true,
            }),
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'static/css/[name].[chunkhash].css',
        }),
        new OfflinePlugin({
            externals: ['/manifest.json'],
            ServiceWorker: {
                entry: resolve('src/utils/offline.js'),
                output: 'offline.js',
                events: true,
            },
        }),
    ].concat(extraPlugins),
});
