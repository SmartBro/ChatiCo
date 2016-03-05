import autoprefixer from 'autoprefixer';
import csswring from 'csswring';
import TextPlugin from 'extract-text-webpack-plugin';
import path from 'path';

export function WebpackGlobalConfig (_path) {
    const nodeModulesPath = path.resolve(_path, 'node_modules');
    const srcFolderPath = path.resolve(_path, 'src', 'client');
    const rootAppPath = path.join(srcFolderPath, 'app');
    
    return {
        cache: true,
        context: rootAppPath,
        output: {
            path: path.join(_path, 'public', 'bundle'),
            publicPath: '/',
            filename: 'js/[name].bundle.js',
            chunkFilename: '[name].chunk.js'
        },
        
        resolve: {
            root: [
                srcFolderPath,
                nodeModulesPath
            ],
            modulesDirectories: ['node_modules'],
            extensions: ['', '.js', '.jade', '.html', '.css', '.sass'],
            alias: {}
        },
        
        postcss: [
            autoprefixer({
                browsers: [
                    'last 2 versions',
                    'iOS >= 7',
                    'Android >= 4',
                    'Explorer >= 10',
                    'ExplorerMobile >= 11'
                ],
                cascade: false
            }),
            csswring({
                map: true,
                preserveHacks: true,
                removeAllComments: true
            })
        ],
        
        eslint: {
            formatter: require('eslint-friendly-formatter')
        },
        
        module: {
            preLoaders: [
                {
                    test: /\.js$/,
                    loader: 'eslint-loader',
                    exclude: /node_modules/
                }
            ],
            loaders: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    loader: 'babel',
                    query: {
                        presets: ['es2015', 'stage-2']
                    }
                },
                {
                    test: /\.jade$/,
                    loader: 'jade'
                },
                {
                    test: /\.css$/,
                    loader: TextPlugin.extract('style', 'css-loader!postcss-loader')
                },
                {
                    test: /\.scss$/,
                    loader: TextPlugin.extract('style', 'css-loader!postcss-loader?sourceMap!sass-loader')
                },
                {
                    test: /\.(ttf|eot|woff|woff2|png|ico|jpg|jpeg|gif|svg)(\?]?.*)?$/,
                    loaders: [`file?context=${rootAppPath}&name=static/[ext]/[name].[ext]`]
                },
                {
                    test: /\.json?$/,
                    loader: 'json'
                }
            ],
            noParse: [/.+angular2\/bundles\/.+/]
        }
    }
};
