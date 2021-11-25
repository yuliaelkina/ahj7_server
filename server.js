const http = require('http');
const Koa = require('koa');
const koaBody = require('koa-body');
const app = new Koa();
const port = process.env.PORT || 7070

app.use(koaBody({urlencoded: true}));

const tickets = ["1", "2"];

app.use(async ctx => {
    const { method } = ctx.request.querystring;
    switch (method) {
        case 'allTickets':
            ctx.response.body = tickets;
            return;
        

        // TODO: обработка остальных методов
        default:
            ctx.response.status = 404;
            return;
    }
});

const server = http.createServer(app.callback()).listen(port);

