import { createServer } from 'http';
import Koa from 'koa';
import Router from 'koa-router';
import koaBody from 'koa-body';
import cors from 'koa2-cors';
const app = new Koa();
const router = new Router();
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

router.post('', async(ctx, next) => {
  if(chat.users.addUser(ctx.request.body) === 'ok') {
  ctx.response.status = 204;
  } else 
  ctx.response.status = 400;
});

router.post('/message', async(ctx, next) => {
  chat.addMessage(ctx.request.body);
  ctx.response.status = 204;
});

router.delete('/:nickname', async(ctx, next) => {
  const index = chat.deleteUser(ctx.params.nickName);
  ctx.response.status = 204;
});


const server = createServer(app.callback()).listen(port);
