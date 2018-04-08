var koa = require('koa');
var route = require('koa-route');
var app = new koa();

app.use(route.get('/404', function(ctx, next){
    ctx.body = "page not found";
}));

app.use(route.get('/500', function(ctx, next){
    ctx.body = "internal server error";
}));

app.use(route.get('/', function(ctx, next){
    ctx.body = "hello koa";
}));

app.listen(process.argv[2]);