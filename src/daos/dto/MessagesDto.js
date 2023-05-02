export default class MessagesDto {
  constructor(id, message, msgTime) {
    this._id = id;
    this.author = message.author;
    this.text = message.text;
    this.date = msgTime;
  }
}