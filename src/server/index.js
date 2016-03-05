import path from 'path';
import koa from 'koa';

import WebpackBundler from './webpack-bundler';

const app = koa();
const PORT = 8080;
const ENV = 'dev';

app.use(function* () {
    /*eslint no-invalid-this: 0*/
    this.body = 'Hello to Oleg and Edgar from koajs';
});

if (ENV === 'development') {
    WebpackBundler(app);
}

app.listen(PORT, function () {
    console.log(`Listening on http://localhost:${PORT} with the ${ENV} config loaded!`); // eslint-disable-line
});