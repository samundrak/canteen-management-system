const crypto = require('crypto');
const Joi = require('joi');
const startCase = require('lodash/fp/startCase');

module.exports = {

  /*
  * Encrypt
  * */
  encrypt(plain) {
    const cipher = crypto.createCipher('aes256', process.env.ENCRYPTION_SECRET);
    let cipherText = cipher.update(plain, 'utf8', 'base64');
    cipherText += cipher.final('base64');
    return cipherText;
  },

  decrypt(encrypted) {
    const decipher = crypto.createDecipher('aes256', process.env.ENCRYPTION_SECRET);
    let res = decipher.update(encrypted, 'base64', 'utf8');
    res += decipher.final('utf8');
    return res;
  },

  joi(payload, schema, options = {}, cb = null) {
    const validation = Joi.validate(payload, schema, options, cb);
    if (!validation.error) {
      return { status: true };
    }

    return {
      status: false,
      messages: validation.error.details.map(item => startCase(item.message)),
    };
  },
  cleanString(string) {
    return string.replace(/\s\s+/g, ' ');
  },
};
