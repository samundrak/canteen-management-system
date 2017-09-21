const UserModel = require('../../model/User');
const crypto = require('crypto');

class Guest {

  find(document) {
    return UserModel.findOne(document).exec();
  }

  update(condition, document) {
    return UserModel.update(condition, document);
  }

  static generateUniqueHash(key = '') {
    return crypto.createHash('md5').update(key + Date.now()).digest('hex');
  }


}

module.exports = Guest;
