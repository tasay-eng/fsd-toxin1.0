const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        main: './src/main.js',
        'landing-page': './src/pages/landing-page/landing-page.js',
        'search-page': './src/pages/search-page/search-page.js',
        'sign-up-page': './src/pages/sign-up-page/sign-up-page.js'

    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    },
    devtool: false,
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.less$/,
                exclude: /node_modules/,
                use:  [
                     MiniCssExtractPlugin.loader,
                    {loader: 'css-loader',
                     options: {
                            sourceMap: true
                        }
                    },
                    {loader: 'postcss-loader',
                    options: { sourceMap: true, config: { path: 'postcss.config.js' } }
                    },
                    {loader: 'less-loader',
                    options: {
                        sourceMap: true,
                        javascriptEnabled: true
                        }
                    }
                    ]
            },
            {
                test: /\.pug$/,
                exclude: /node_modules/,
                use:  ['pug-loader']
            },
            {
                test: /\.(jpg|png|svg|jpeg)$/,
                loader: 'file-loader',
                options: {
                    name: 'img /[name].[ext]'
                }
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: './style.css',
            chunks: [ 'main' ]
        }),
        new HtmlWebpackPlugin({
            template: './src/pages/sign-up-page/sign-up-page.pug',
            chunks: ['main', 'sign-up-page'],
            filename: './sign-up-page.html'
        }),
        new HtmlWebpackPlugin({
            template: './src/pages/search-page/search-page.pug',
            chunks: ['main', 'search-page'],
            filename: './search-page.html'
        }),
        new HtmlWebpackPlugin({
            template: './src/pages/landing-page/landing-page.pug',
            chunks: ['main', 'landing-page'],
            filename: './landing-page.html'
        }),
        new CopyWebpackPlugin([
            {from: './src/img', to: "./img"},
            { from: './node_modules/jquery', to: `./node_modules/jquery`},
            { from: './node_modules/jquery-ui', to: `./node_modules/jquery-ui`}
            ]
        ),
        new webpack.SourceMapDevToolPlugin({
            filename: "[file].map"
        }),
    ]
};