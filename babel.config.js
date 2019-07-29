module.exports = {
    presets: [
        [
            '@babel/preset-env',
            {
                targets: {
                    browsers: ['> 1%', 'last 2 versions', 'ie >= 9', 'ios >= 8', 'android >= 4'],
                },
                useBuiltIns: 'usage',
                corejs: '2.6.3',
                modules: false,
                debug: false,
            },
        ],
        '@babel/preset-react',
    ],
    plugins: [
        '@babel/plugin-transform-runtime', // 复用辅助函数
        ['@babel/plugin-proposal-decorators', { legacy: true }], // 支持装饰器写法
        ['@babel/plugin-proposal-class-properties', { loose: true }], // 类中使用箭头函数
        '@babel/plugin-syntax-dynamic-import', // 异步import
    ],
};
