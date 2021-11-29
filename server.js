const http = require('http');
const Koa = require('koa');
const koaBody = require('koa-body');
const app = new Koa();
const cors = require('koa2-cors');
const port = process.env.PORT || 7070;

app.use(koaBody({
    urlencoded: true,
    multipart: true,
    text: true,
    json: true,
}));

app.use(
  cors({
    origin: '*',
    credentials: true,
    'Access-Control-Allow-Origin': '*',
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE','OPTIONS'],
  })
);

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

class TicketsController {
  constructor() {
    this.index = 1000;
    this.tickets = [];
    this.fullTickets = [];
  }

  createTickets(name, status, description) {
    if (name && status && description) {
        const ticket = new FullTicket(name, status, description, this.index);
        this.index += 1;
        this.fullTickets.push(ticket);
        this.tickets.push(ticket.createTicket());
        return "ticket created";
    } else {
        return "uncorrect data";
    }
  }

  deleteTickets(id) {
    if (tickets[id]) {
      this.tickets.splise(this.tickets.findIndex((el) => {
        el.id === id;
      }), 1);
      this.fullTickets.splise(this.fullTickets.findIndex((el) => {
        el.id === id;
      }), 1);
      return "deleted";
    } else {
      return "Ticket with this Id doesn't exist";
    }
  }

  findTicket(id) {
    if (this.fullTickets.find((el) => {
        el.id === parseInt(id);
    })) {
        return this.fullTickets.find((el) => {
            el.id == parseInt(id);
        });
    } else {
        return id;
    }
  }; 

}
const ticketsController = new TicketsController();
ticketsController.createTickets('Task1', 'false', 'Task 1 description should be here');
ticketsController.createTickets('Task2', 'false', 'Task 2 description should be here');


app.use(async ctx => {
  let method;
  if (ctx.request.method === 'GET') ({ method } = ctx.request.query);
  else if (ctx.request.method === 'POST') ({ method } = ctx.request.body);
  switch (method) {
    case 'allTickets': ctx.response.body = ticketsController.tickets;
      break;
    case 'ticketById': ctx.response.body = ticketsController.findTicket(ctx.request.query.id);
      break;
    case 'createTicket': ctx.response.body = ticketsController.createTickets(ctx.request.body);
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
