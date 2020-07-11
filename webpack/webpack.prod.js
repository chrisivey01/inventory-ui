const merge = require("webpack-merge");
const common = require("./webpack.common");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = merge(common, {
    mode:"production",
    entry:"./src/index.js",
    output: {
        // path: "dist",
        filename:"index.js"
    },
    plugins:[
        new HtmlWebpackPlugin({
            inject: true,
            template:"src/index.html",
        })
    ],
    devtool: "source-map"

})