var koa = require('koa');
var route = require('koa-route');
var parser = require('koa-bodyparser');
var app = new koa();

app.use(parser());
app.use(route.post('/', (ctx, next) => {
    try {
        ctx.status = 200;
        ctx.body = ctx.request.body['name'].toUpperCase();
    } catch(e) {
        console.log(e);
    }
}))

app.listen(process.argv[2]);