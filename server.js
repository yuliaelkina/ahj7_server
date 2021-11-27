import FullTicket from './fullTicket';

const http = require('http');
const Koa = require('koa');
const koaBody = require('koa-body');
const app = new Koa();
const port = process.env.PORT || 7070

app.use(koaBody({
    urlencoded: true,
}));

let id = 1000;
const tickets = [];
const fullTickets = [];
createTickets('Task1', 'false', 'Task 1 description should be here');
createTickets('Task2', 'false', 'Task 2 description should be here');

function createTickets(name, status, description) {
    const ticket = new FullTicket(name, status, description, id);
    id += 1;
    fullTickets.push(ticket);
    tickets.push(ticket.createTicket());
}




app.use(async ctx => {
    const { method } = ctx.request.querystring;
    console.log(method);

    switch (method) {
        default:
            ctx.response.status = ctx.request.querystring;;
            return;
    }
});

const server = http.createServer(app.callback()).listen(port);
