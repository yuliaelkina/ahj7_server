const http = require('http');
const Koa = require('koa');
const koaBody = require('koa-body');
const app = new Koa();
const cors = require('koa2-cors');
const port = process.env.PORT || 7070

app.use(koaBody({
    urlencoded: true,
    multipart: true,
    text: true,
    json: true,
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

function deleteTickets(id) {
  
  tickets.splise(tickets.findIndex((el) => {
    el.id = id;
  }), 1);
  fullTickets.splise(fullTickets.findIndex((el) => {
    el.id = id;
  }), 1);
}

function findTicket(string) {
  return string;
};

let id = 1000;
const tickets = [];
const fullTickets = [];
createTickets('Task1', 'false', 'Task 1 description should be here');
createTickets('Task2', 'false', 'Task 2 description should be here');

app.use(
  cors({
    origin: '*',
    credentials: true,
    'Access-Control-Allow-Origin': true,
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE','OPTIONS'],
  })
)

app.use(async ctx => {
  let method;
  if (ctx.request.method === 'GET') ({ method } = ctx.request.query);
  else if (ctx.request.method === 'POST') ({ method } = ctx.request.body);
  switch (method) {
    case 'allTickets': ctx.response.body = tickets;
      break;
    case 'ticketById': ctx.response.body = findTicket(method);
      break;
    case 'createTicket': ctx.response.body = ticketsController.createTicket(ctx.request.body);
      break;
    case 'changeStatus': ctx.response.body = ticketsController.changeStatus(ctx.request.body);
      break;
    case 'updateTicket': ctx.response.body = ticketsController.updateTicket(ctx.request.body);
      break;
    case 'deleteTicket': ctx.response.body = ticketsController.deleteTicket(ctx.request.body);
      break;
    default:
      ctx.response.status = 400;
      ctx.response.body = `Unknown method '${method}' in request parameters`;
    }
});

const server = http.createServer(app.callback()).listen(port);
