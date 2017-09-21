const bcrypt = require('bcrypt');
const jwt = require("jwt-simple");
const pick = require('lodash/fp/pick');
const UserModel = require('../../model/User');
const strings = require('../../Strings');

const cfg = global.config();
const Promise = global.Promise;
const _ = global._;

class User {

  static getToken(user) {
    return jwt.encode(user, cfg.auth.jwt.secret);
  }

  static getSalt() {
    return bcrypt.genSaltSync(10);
  }

  static generatePassword(password, salt) {
    return bcrypt.hashSync(password, salt);
  }

  static find(clause) {
    return new Promise((resolve, reject) => {
      UserModel.findOne(clause, (error, user) => {
        if (error || !user) {
          return reject('No User found');
        }

        user = _.omit(user, ['password']);
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

        return reject('No result found');
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

  static login(username, password) {
    return new Promise((resolve, reject) => {
      return User.exists({
        email: username,
      }).then((user) => {
        if (!user.status) {
          return reject(`Your account is not active, Please check your email ${user.email}`);
        }

        if (!bcrypt.compareSync(password, user.password)) {
          return reject(`Username/Password didn't matched.`);
        }


        user = global._.pick(user, ['_id', 'email']);
        return resolve({
          token: User.getToken(user),
        });
      }, () => reject(`No User found.`));
    });
  }

  static register({ email, password, first_name, last_name, service }) {
    const salt = User.getSalt();
    let newPassword;
    if (password) {
      newPassword = User.generatePassword(password, salt);
    }
    const hash = bcrypt.hashSync(email + Date.now(), salt);
    const registerInfo = {
      email,
      role: 'user',
      password: newPassword,
      first_name,
      last_name,
      hash,
    };

    return new Promise((resolve, reject) => UserModel.create(registerInfo, (error, user) => {
      if (error) {
        return reject(new Error(strings.ADD_USER_ERROR));
      }

      /* Send mail about account verification */
      global.events.emit(strings.SEND_EMAIL, {
        to: user.email,
        subject: strings.ACCOUNT_ACTIVATION,
        template: {
          name: strings.TEMPLATE_OF_EMAIL_VERIFICATION,
          data: {
            hash,
            user,
          },
        },
      });

      const newUser = pick(['_id', 'email'])(user);
      return resolve(newUser);
    }));
  }

}

module.exports = User;
