import Ticket from "./ticket";

export default class FullTicket {
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
}