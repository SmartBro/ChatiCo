import Webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import WebpackConfig from '../../webpack.config';
import httpProxy from 'http-proxy';

import path from 'path';

export default function (app) {
    let bundleStartTime = null;

    let compiler = Webpack(WebpackConfig);
    compiler.plugin('compile', () => {
        console.log('Bundling the project...'); // eslint-disable-line
        bundleStartTime = Date.now();
    });
    
    compiler.plugin('done', () => {
        console.log('Bundling finished in ' + (Date.now() - bundleStartTime) + 'ms!'); // eslint-disable-line
    });

    let WebpackBundler = new WebpackDevServer(compiler, {
        contentBase: 'src',
        hot: true,
        historyApiFallback: false,
        inline: true,
        noInfo: true,
        publicPath: WebpackConfig.output.publicPath,
        quiet: false,
        stats: {
            colors: true,
            displayErrorDetails: true,
            displayCached: true,
            hash: false,
            timings: true,
            chunks: false,
            chunkModules: false,
            modules: false
        }
    });

    WebpackBundler.listen(3000, 'localhost', function () {
        console.log('Bundling up the project, sit tight!'); // eslint-disable-line
    });

    const proxy = httpProxy.createProxyServer();

    app.all(['/bundle/*', '*.hot-update.json'], function (req, res) {
        proxy.web(req, res, {
            target: 'http://localhost:3000'
        });
    });

    proxy.on('error', function () {
        console.log('Could not connect to proxy, stop/restart the server.'); // eslint-disable-line
    });
}