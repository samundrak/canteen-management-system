const bcrypt = require('bcrypt');
const jwt = require("jwt-simple");
const pick = require('lodash/fp/pick');
const omit = require('lodash/fp/omit');
const UserModel = require('../../model/User');
const strings = require('../../Strings');
const UserRepo = require('../../repositories/UserRepository');

const cfg = global.config();
const Promise = global.Promise;

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
    return UserRepo.find(clause);
  }

  static exists(filter) {
    return UserRepo.exists(filter);
  }

  static update(condition, update) {
    UserRepo.update(condition, update);
  }

  static login(username, password) {
    return new Promise((resolve, reject) => {
      return User.exists({
        email: username,
      }).then((user) => {
        if (!user.status) {
          return reject(
            new Error(`Your account is not active, Please check your email ${user.email}`),
          );
        }

        if (!bcrypt.compareSync(password, user.password)) {
          return reject(new Error('Username/Password didn\'t matched.'));
        }


        const userInformation = pick(['_id', 'email'])(user);
        return resolve({
          token: User.getToken(userInformation),
        });
      }, () => reject(new Error('No User found.')));
    });
  }

  static register({ email, password, first_name, last_name }) {
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
      status: 1,
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
