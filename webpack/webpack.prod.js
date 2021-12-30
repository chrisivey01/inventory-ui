const { merge } = require("webpack-merge");
const common = require("./webpack.common");
const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = merge(common, {
    mode: "production",
    plugins: [
        new CopyPlugin({
            patterns: [
                { from: "src/assets", to: "assets" },
            ],
        }),
    ],
    devtool: "eval-source-map",
    // devtool: "nosources-source-map",

});
