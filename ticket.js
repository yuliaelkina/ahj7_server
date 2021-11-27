export default class Ticket {
  constructor(name, status, id, created) {
    this.name = name;
    this.status = status;
    this.created = created;
    this.id = id;
  }
}