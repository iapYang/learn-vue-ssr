const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');
const baseConfig = require('./webpack.base.config');
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin');

module.exports = merge(baseConfig, {
    entry: path.resolve(__dirname, '../entry-client.js'),
    plugins: [
        // Important: this splits the webpack runtime into a leading chunk
        // so that async chunks can be injected right after it.
        // this also enables better caching for your app/vendor code.
        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest',
            minChunks: Infinity,
        }),
        // This plugins generates `vue-ssr-client-manifest.json` in the
        // output directory.
        new VueSSRClientPlugin(),
    ],
});
