export default class MessagesDto {
  constructor(message) {
    this.id = message._id;
    this.author = message.author;
    this.text = message.text;
    this.date = message.date;
  }
}