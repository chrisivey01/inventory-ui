const path = require("path");
const { merge } = require("webpack-merge");
const common = require("./webpack.common");
const webpack = require("webpack");

module.exports = merge(common, {
    mode: "development",
    devtool: "inline-source-map",
    plugins: [new webpack.HotModuleReplacementPlugin()],
    target: "web",
    devServer: {
        contentBase: path.resolve(__dirname, "..", "./dist"),
        historyApiFallback: true,
        open: true,
        compress: true,
        hot: true,
        port: 8080,
    },
});
