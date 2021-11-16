const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const Dotenv = require('dotenv-webpack');

module.exports = {
    performance: {
        maxEntrypointSize: 1500000,
        maxAssetSize: 1500000,
    },
    entry: {
        'js/app': ['./src/App.js'],
    },
    output: {
        path: path.resolve(__dirname, 'build/'),
        publicPath: '',
    },
    devServer: {
        port: 3000,
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
                test: /\.css$/i,
                use: [
                    "style-loader",
                    {
                        loader: "css-loader",
                        options: { url: false }
                    }
                ],
            }
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
            filename: 'index.html',
        }),
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
