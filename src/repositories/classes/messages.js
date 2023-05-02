export default class Messages {
  constructor(message) {
    this.id = message._id;
    this.author = message.author;
    this.text = message.text;
    this.date =
      message.date.toLocaleDateString() +
      " " +
      message.date.toLocaleTimeString();
  }
}
