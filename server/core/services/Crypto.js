const crypto = require('crypto');

class Crypto {

  constructor(text) {
    this.algorithm = 'aes-256-ctr';
    this.password = 'd6F3Efeq';
    this.text = text;
  }

  encrypt() {
    const cipher = crypto.createCipher(this.algorithm, this.password);
    let crypted = cipher.update(this.text, 'utf8', 'hex');
    crypted += cipher.final('hex');
    return crypted;
  }

  decrypt() {
    const decipher = crypto.createDecipher(this.algorithm, this.password);
    let dec = decipher.update(this.text, 'hex', 'utf8');
    dec += decipher.final('utf8');
    return dec;
  }
}

module.exports = Crypto;
