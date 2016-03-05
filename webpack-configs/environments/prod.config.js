const resolve = require('path').resolve;
const webpack = require('webpack');

const sourceDir = resolve(__dirname, 'src/app');
const distDir = resolve(__dirname, 'dist/');
const nodeModules = resolve(__dirname, './node_modules');
const pathToAngular = resolve(nodeModules, 'angular/angular.min.js');

module.exports = {
    context: sourceDir,
    entry: './app.js',
    output: {
        path: distDir,
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            { test: /\.js$/, loader: 'babel-loader'}
        ],
        noParse: [ pathToAngular ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            'angular': 'angular'
        })
    ],
    resolve: {
        root: sourceDir,
        alias: {
            'angular': pathToAngular
        }
    }
};