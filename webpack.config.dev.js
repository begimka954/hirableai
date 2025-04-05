const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

const merge = require('webpack-merge')

const baseConfigurationFile = require('./webpack.config')

module.exports = merge(baseConfigurationFile, {
    mode: 'development',
    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'begim.bundle.js',
    },
    devServer: {
        port: 3000,
        static: {
            directory: path.join(__dirname, 'dist'),
            watch: true,
        },
        hot: true,
        historyApiFallback: true,
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                ]
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
        }),
        new webpack.ProvidePlugin({
            _: 'lodash',
        })
    ],
   
});