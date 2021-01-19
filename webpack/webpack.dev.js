const { merge } = require("webpack-merge");
const common = require("./webpack.common");
const webpack = require("webpack");
const paths = require('./paths')
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = merge(common, {
    mode: "development",
    devtool: "inline-source-map",
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            inject: true,
            template: "public/index.html",
        }),
    ],
    devServer: {
        contentBase: paths.src,
        historyApiFallback: true,
        open: true,
        compress: true,
        hot: true,
        port: 8080,
    },
});