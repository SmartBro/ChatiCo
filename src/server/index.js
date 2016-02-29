const koa = require('koa');

const app = koa();

app.use(function* () {
    this.body = 'Hello to Oleg and Edgar from koajs';
});

app.listen(3000);