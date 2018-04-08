var koa = require('koa');
var bodyParser = require('koa-bodyparser');
var route = require('koa-route');
var fs = require('fs');
var app = new koa();

app.use(bodyParser());
app.use(route.get('/stream', (ctx, next) => {
    ctx.body = fs.createReadStream(process.argv[3]);
}))

app.use(route.get('/json', (ctx, next) => {
    ctx.body = { foo: 'bar' };
}))

app.listen(process.argv[2]);