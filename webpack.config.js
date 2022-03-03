const path = require("path");
const buildPath = path.resolve(
    "C:\/Projects\/FXServer\/server-data\/resources\/pma-inventory\/dist"
);
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ProvidePlugin } = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { ESBuildMinifyPlugin } = require("esbuild-loader");
const CopyPlugin = require("copy-webpack-plugin");

const ui = {
    entry: "./src/index.js",
    output: {
        filename: "index.js",
        path: path.resolve(buildPath),
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: "esbuild-loader",
                options: {
                    loader: "jsx", // Remove this if you're not using JSX
                    target: "es2015", // Syntax to compile to (see options below for possible values)
                },
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "postcss-loader",
                ],
            },
            {
                test: /\.(png|jpg|svg|jpeg|gif)$/i,
                type: "asset/resource",
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./public/index.html",
            inject: true,
            minify: false,
        }),
        new ProvidePlugin({
            React: "react",
        }),
        new MiniCssExtractPlugin({
            filename: "[name].css",
        }),
        new CopyPlugin({
            patterns: [{ from: "src/assets", to: `${buildPath}/assets` }],
        }),
    ],
    optimization: {
        minimizer: [
            new ESBuildMinifyPlugin({
                css: true,
            }),
        ],
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
    },
    optimization: {
        minimize: false,
    },
    devtool: "inline-source-map",
};

module.exports = [ui];
