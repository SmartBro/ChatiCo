const koa = require('koa');
const app = koa();

app.use(function* () {
    /*eslint no-invalid-this: 0*/
    this.body = 'Hello to Oleg and Edgar from koajs';
});

app.listen(3000);
