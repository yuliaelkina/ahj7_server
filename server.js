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

class Chat {
  constructor() {
    this.users = [];
    this.messages = [];
  }
  addUser(nickname) {
    if (this.users.includes(nickname)) {
      return 'nickname has already exist';
    }
    this.users.push(nickname);
    return 'ok';
  }
  deleteUser(Nickname) {
    const index = this.users.indexOf(el => {
      el == Nickname;
    });
    this.users.splice(index, 1);
  }

  addMessage(nickname, messageText) {
    const message = new Message(nickname, messageText);
    this.messages.push(message);
  }
  
  returnMessageList() {
    const list = [];
    this.messages.forEach((el) => {
      list.push(el.returnMessage());
    });
    return list;
  }
  
};
class Message {
  constructor (nickname, messageText) {
    this.nickName = nickname;
    this.text = messageText;
    this.date = this.addDate();
  }

  addDate() {
    const now = new Date();
    return `${now.getHours}:${now.getMinutes} ${now.getDate}.${now.getMonth}.${now.getFullYear}`
  }

  returnMessage() {
    return {nickname: `${this.nickName}`, time: `${this.text}`, date: `${this.date}`}
  }
}

const chat = new Chat();
const testMessage = new Message('admin', ' Добро пожаловать в чат');



app.use(async ctx => {
  let method;
  if (ctx.request.method === 'GET') ({ method } = ctx.request.query);
  else if (ctx.request.method === 'POST') ({ method } = ctx.request.body);
  switch (method) {
    case 'allTickets': ctx.response.body = ticketsController.tickets;
      break;
    case 'ticketById': ctx.response.body = ticketsController.findTicket(ctx.request.query.id);
      break;
    case 'createTicket': ctx.response.body = ticketsController.createTickets(ctx.request.body.name, 'false', ctx.request.body.description);
      break;
    case 'changeStatus': ctx.response.body = ticketsController.changeStatus(ctx.request.body.id, ctx.request.body.status);
      break;
    case 'updateTicket': ctx.response.body = ticketsController.updateTicket(ctx.request.body.id, ctx.request.body.name, ctx.request.body.description);
      break;
    case 'deleteTicket': ctx.response.body = ticketsController.deleteTickets(ctx.request.body.id);
      break;
    default:
      ctx.response.status = 400;
      ctx.response.body = `Unknown method '${method}' in request parameters`;
    }
});

const server = http.createServer(app.callback()).listen(port);
