const path = require('path');
const glob = require('glob');
const fs = require('fs');
const webpack = require('webpack');
const postcssConfig = require('./postcss.config.js');

// the folder put font
const fontRegex = /(font+\/)/;

module.exports = {
    output: {
        path: path.join(process.cwd(), 'dist'),
        filename: 'index.js',
    },
    module: {
        rules: [
            {
                test: /\.js(x)?$/,
                use: [
                    'babel-loader',
                ],
                exclude: /node_module/,
            },
            {
                test: /\.vue$/,
                use: [
                    'vue-loader',
                ],
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                ],
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'postcss-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 1024,
                        name: 'font/[name].[ext]',
                    },
                }],
                include: fontRegex,
            },
            {
                test: /\.(jpg|jpeg|png|gif|svg)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 5120,
                        name: 'image/[name].[ext]',
                    },
                }],
                exclude: fontRegex,
            },
        ],
    },
    resolve: {
        alias: {
            vue$: 'vue/dist/vue.js',
        },
        extensions: ['.js', '.jsx'],
        modules: [
            'node_modules',
        ],
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({
            options: {
                postcss: postcssConfig.plugins,
                vue: {
                    postcss: postcssConfig.plugins,
                    loaders: {
                        sass: 'style-loader!css-loader!postcss-loader!sass-loader?indentedSyntax',
                        scss: 'style-loader!css-loader!postcss-loader!sass-loader',
                    },
                    cssModules: {
                        localIdentName: '[path][name]---[local]---[hash:base64:5]',
                        camelCase: true,
                    },
                },
            },
        }),
    ],
};
