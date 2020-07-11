const merge = require("webpack-merge");
const common = require("./webpack.common.js");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");

module.exports = merge(common, {
    mode:"development",
    entry:"./src/index.js",
    plugins: [
        new webpack.HotModuleReplacementPlugin(), 
        new HtmlWebpackPlugin({
            inject:true,
            template: "public/index.html"
        })
    ],
    devtool: "source-map"

})