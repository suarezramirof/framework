export default class Messages {
  constructor(message) {
    this.id = message._id;
    this.author = message.author;
    this.text = message.text;
    const date = new Date(message.date);
    this.date = date.toLocaleDateString() + " " + date.toLocaleTimeString();
  }
}
