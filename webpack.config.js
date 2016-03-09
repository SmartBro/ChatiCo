const resolve = require('path').resolve;
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin')

const sourceDir = resolve(__dirname, 'src/app');
const distDir = resolve(__dirname, 'dist/');
const nodeModules = resolve(__dirname, 'node_modules');
const pathToAngular = resolve(nodeModules, 'angular2/bundles/angular2.js');

module.exports = {
    context: sourceDir,
    entry: './app.js',
    output: {
        path: distDir,
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            { test: /\.js$/, loader: 'babel-loader'},
            { test: /\.jade$/, loader: 'jade'}
        ],
        noParse: [ pathToAngular ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: resolve(sourceDir, 'index.jade')
        })
    ],
    resolve: {
        root: sourceDir,
        alias: {
            'ng': pathToAngular
        }
    }
};