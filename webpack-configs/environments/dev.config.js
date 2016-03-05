import path from 'path';
import jade from 'jade';
import webpack from 'webpack';
import HtmlPlugin from 'html-webpack-plugin';
import TextPlugin from 'extract-text-webpack-plugin';

export function WebpackDevConfig (_path, _env) {
    const srcFolderPath = path.resolve(_path, 'src', 'client');
    const rootAppPath = path.join(srcFolderPath, 'app');

    return {
        entry: {
            node_modules: Object.keys(require(`${_path}/package`).dependencies),
            well_speak_app: [
                'webpack-dev-server/client?http://localhost:3000',
                'webpack/hot/only-dev-server',
                path.join(rootAppPath, 'core', 'bootstrap.js'),
                path.join(srcFolderPath, 'assets', 'styles', 'app.sass')
            ]
        },
        debug: true,
        devtool: 'cheap-module-inline-source-map',
        plugins: [
            new webpack.NoErrorsPlugin(),
            new webpack.HotModuleReplacementPlugin({quiet: true}),
            new webpack.optimize.CommonsChunkPlugin(['node_modules'], 'js/[name].bundle.js'),
            new HtmlPlugin({
                title: 'ChatiCo',
                filename: 'index.html',
                template: '../index.jade',
                inject: true
            }),
            new TextPlugin('css/[name].bundle.css'),
            new webpack.ProvidePlugin({}),
            new webpack.DefinePlugin({
                NODE_ENV: JSON.stringify(_env)
            })
        ]
    };
};
