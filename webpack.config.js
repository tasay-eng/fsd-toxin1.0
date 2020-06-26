const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    resolve: {
        extensions: ['.js']
    },
    entry: {
        'landing-page': './src/pages/landing-page/landing-page.js',
        'search-page': './src/pages/search-page/search-page.js',
        'sign-up-page': './src/pages/sign-up-page/sign-up-page.js',
        'description-page': './src/pages/description-page/description-page.js'

    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, './dist'),
    },
    devtool: 'cheap-module-eval-source-map',
    module: {
        rules: [
            {
                test: /\.less$/,
                exclude: /node_modules/,
                use:  [
                    {loader: 'style-loader',
                    },
                    MiniCssExtractPlugin.loader,
                    {loader: 'css-loader',
                    },
                    {loader: 'postcss-loader',
                    options: { config: { path: 'postcss.config.js' } }
                    },
                    {loader: 'less-loader',
                    options: {
                        useRelativePaths: true,
                        javascriptEnabled: true
                        }
                    }
                    ]
            },
            {
                test: /\.pug$/,
                exclude: /node_modules/,
                loaders: ['html-loader', 'pug-html-loader']
            },
            {
                test: /\.(jpg|png|svg|jpeg)$/,
                exclude: /node_modules/,
                use:[{
                    loader: 'file-loader',
                    options: {
                        useRelativePaths: true,
                        name: 'img/[name].[ext]',
                        publicPath: './',
                        esModule: false
                    }
                }]
            }
        ]
    },
    plugins: [
        new webpack.SourceMapDevToolPlugin({}),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunks: ['sign-up-page', 'search-page', 'landing-page', 'description-page']
        }),
        new HtmlWebpackPlugin({
            template: './src/pages/landing-page/landing-page.pug',
            chunks: ['landing-page'],
            filename: './landing-page.html',

        }), 
        new HtmlWebpackPlugin({
            template: './src/pages/description-page/description-page.pug',
            chunks: ['description-page'],
            filename: './description-page.html',

        }), 
        new HtmlWebpackPlugin({
            template: './src/pages/search-page/search-page.pug',
            chunks: ['search-page'],
            filename: './search-page.html',

        }), 
        new HtmlWebpackPlugin({
            template: './src/pages/sign-up-page/sign-up-page.pug',
            filename: './sign-up-page.html',
            chunks: ['sign-up-page'],

        }), 
    ],
    devServer: {
        stats: 'errors-only'
    }
}; 