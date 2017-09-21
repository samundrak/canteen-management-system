const email = require('emailjs');

const { email: { user, password, host, port } } = global.config();
class Email {

  constructor() {
    this.to = undefined;
    this.from = undefined;
    this.subject = undefined;
    this.message = undefined;
    this.content = undefined;
    this.init();
  }

  getTo() {
    return this.to;
  }

  getFrom() {
    return this.from;
  }

  getSubject() {
    return this.subject;
  }

  getMessage() {
    return this.message;
  }


  setTo(to) {
    this.to = to;
    return this;
  }

  setFrom(from) {
    this.from = from;
    return this;
  }

  setSubject(subject) {
    this.subject = subject;
    return this;
  }

  setMessage(message) {
    this.message = message
    return this;
  }


  init() {
    this.server = email.server.connect({
      user,
      password,
      host,
      port,
      tls: true,
    });
  }

  setContent(content) {
    this.content = content;
    return this;
  }

  send() {
// send the message and get a callback with an error or details of the message that was sent
    const self = this;
    const payload = {
      text: self.getMessage(),
      from: self.getFrom(),
      to: self.getTo(),
      // cc:      "else <else@your-email.com>",
      subject: self.getSubject(),
    };

    if (this.content) {
      payload.attachment = [
        { data: self.content, alternative: true },
      ];
    }
    this.server.send(payload, (err, message) => {
      console.log(err || message);
      if (err) {
        return global.logger.error(err);
      }

      return true;
    });
  }
}


module.exports = Email;
