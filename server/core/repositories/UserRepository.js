const UserModel = require('../model/User');

class UserRepository {

  static find(clause) {
    return new Promise((resolve, reject) => {
      UserModel.findOne(clause, (error, user) => {
        if (error || !user) {
          return reject(new Error('No User found'));
        }

        return resolve(user);
      });
    });
  }

  static exists(filter) {
    return new Promise((resolve, reject) => {
      UserModel.findOne(filter, (error, user) => {
        if (user) {
          return resolve(user);
        }

        return reject(new Error('No result found'));
      });
    });
  }

  static update(condition, update) {
    return new Promise((resolve, reject) => {
      UserModel.update(condition, update, (error, user) => {
        if (error) {
          return reject(error);
        }

        return resolve(user);
      });
    });
  }
}

module.exports = UserRepository;
