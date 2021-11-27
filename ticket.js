export default class Ticket {
  constructor(name, status) {
    this.name = name;
    this.status = status;
    this.created = new Date();
  }
}