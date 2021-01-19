const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const paths = require('./paths')

module.exports = {
    entry: [paths.src + '/index.js'],

    plugins: [
        new CleanWebpackPlugin(),
    ],

    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules)/,
                use: 'babel-loader'
            },
            {
                test: /\.html$/,
                use: 'html-loader'
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: ["style-loader", "css-loader", "sass-loader"],
            },
            {
                test: /\.(png|woff|woff2|eot|ttf|svg)$/,
                use: "url-loader?limit=100000",
            },
        ],
    },
};