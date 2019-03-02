const path = require('path');
const webpack = require('webpack');

const Dotenv = require('dotenv-webpack');

const { VueLoaderPlugin } = require('vue-loader');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    devtool: "none",
    context: path.resolve(__dirname, "."),
    mode: "development",
    entry: {
        app: ['./resources/js/app.js'],
        main: ['./resources/js/main/index.js','./resources/js/main/contact_me.js','./resources/js/main/jqBootstrapValidation.js'],
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname,'./public_html/js'),
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        },
        extensions: ['*', '.js', '.vue', '.json']
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader']
                })
            },
            {
                test: /\.(gif|png|jpe?g|svg)$/,
                loaders: [
                    'file-loader?name=../images/[name].[ext]',
                    'image-webpack-loader',
                ],
            },
        ]
    },
    plugins: [
        new Dotenv({
            path: './.env', // load this now instead of the ones in '.env'
            silent: true // hide any errors
        }),
        new VueLoaderPlugin(),
        new ExtractTextPlugin({
            filename: '../css/[name].css',
        })
    ]
};
