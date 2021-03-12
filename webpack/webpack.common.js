const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");

module.exports = {
    entry: path.resolve(__dirname, "..", "./src/index.js"),
    output: {
        path: path.resolve(__dirname, "..", "..", "./gta/dist"),
        filename: "bundle.js",
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            inject: true,
            template: path.resolve(__dirname, "..", "./public/index.html"),
        }),
        new webpack.ProvidePlugin({
            process: "process/browser",
        }),
    ],

    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules)/,
                use: "babel-loader",
            },
            {
                test: /\.html$/,
                use: "html-loader",
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: ["style-loader", "css-loader", "sass-loader"],
            },
            {
                test: /\.(svg|woff|woff2|eot|ttf|png)$/,
                use: ["@svgr/webpack", "url-loader"],
            },
        ],
    },
};
