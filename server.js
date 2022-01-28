const http = require('http');
const Koa = require('koa');
const Router = require('koa-router');
const koaBody = require('koa-body');
const cors = require('koa2-cors');
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


const server = http.createServer(app.callback()).listen(port);
