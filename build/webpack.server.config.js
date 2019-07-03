/*
 * @Author: liuxu
 * @Date: 2019-03-11 3:41:16
 */

const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const { resolve } = require('./webpack.utils');

const { NODE_ENV, CODE_ENV } = process.env;

module.exports = {
    mode: NODE_ENV,
    target: 'node',
    node: {
        __filename: false,
        __dirname: false,
    },
    entry: {
        main: resolve('server/index.js'),
    },
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, '../dist/server'),
        publicPath: '/',
    },
    externals: [nodeExternals()],
    module: {
        rules: [
            {
                test: /\.(js|jsx)?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        caller: { target: 'node' },
                    },
                },
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin({
            verbose: true,
            cleanStaleWebpackAssets: false,
            protectWebpackAssets: false,
            cleanOnceBeforeBuildPatterns: ['**/*'],
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(NODE_ENV),
                CODE_ENV: JSON.stringify(CODE_ENV),
            },
        }),
    ],
};
