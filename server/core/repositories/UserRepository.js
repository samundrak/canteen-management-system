const UserModel = require('../model/User');
const omit = require('lodash/fp/omit');

class UserRepository {

  static all(clause = {}, select = 'email first_name last_name created_at status') {
    return UserModel.find(clause)
      .select(select);
  }

  static find(clause) {
    return new Promise((resolve, reject) => {
      UserModel.findOne(clause, (error, user) => {
        if (error || !user) {
          return reject(new Error('No User found'));
        }

        const data = omit(['password', 'hash'])(user.toObject());
        return resolve(data);
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
