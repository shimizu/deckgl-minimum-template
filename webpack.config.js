const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const RemoveEmptyScriptsPlugin = require('webpack-remove-empty-scripts');



const Dotenv = require('dotenv-webpack');

module.exports = {
    performance: {
        maxEntrypointSize: 1500000,
        maxAssetSize: 1500000,
    },
    entry: {
        'js/app': ['./src/index.js'],
    },
    output: {
        path: path.resolve(__dirname, 'build/'),
        publicPath: '',
    },
    devServer: {
        port: 'auto',
        open: true
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: ['babel-loader'],
                exclude: /node_modules/,
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]

            }
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
            filename: 'index.html',
        }),
        new MiniCssExtractPlugin({
            filename: 'style.css'
        }),
        new RemoveEmptyScriptsPlugin(),
        new CopyPlugin({
            patterns: [
                {
                    from: "public",
                    globOptions: {
                        ignore: ["**/index.html"],
                    },
                    noErrorOnMissing: true
                },
            ],
        }),
        new Dotenv(),
    ],
};
