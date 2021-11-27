const http = require('http');
const Koa = require('koa');
const koaBody = require('koa-body');
const app = new Koa();
const port = process.env.PORT || 7070

app.use(koaBody({
    urlencoded: true,
}));

class Ticket {
    constructor(name, status, id, created) {
      this.name = name;
      this.status = status;
      this.created = created;
      this.id = id;
    }
};

class FullTicket {
    constructor(name, status, description, id) {
      this.name = name;
      this.status = status;
      this.description = description;
      this.id = id;
      this.created = new Date().getTime();
    }
  
    createTicket() {
      return new Ticket(this.name, this.status, this.id, this.created);
    }
};

function createTickets(name, status, description) {
    const ticket = new FullTicket(name, status, description, id);
    id += 1;
    fullTickets.push(ticket);
    tickets.push(ticket.createTicket());
}

let id = 1000;
const tickets = [];
const fullTickets = [];
createTickets('Task1', 'false', 'Task 1 description should be here');
createTickets('Task2', 'false', 'Task 2 description should be here');
console.log(tickets);
console.log(fullTickets);

app.use(async ctx => {
    const { method } = ctx.request.querystring;
    console.log(method);

    switch (method) {
        default:
            ctx.response.body = ctx.request.querystring;;
            return;
    }
});

const server = http.createServer(app.callback()).listen(port);
