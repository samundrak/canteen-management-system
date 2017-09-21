const User = require('../services/User');
const strings = require('../Strings');

const _ = global._;
module.exports = {

  login: (req) => {
    req.checkBody('username', 'Username is required.')
      .notEmpty();

    req.checkBody('password', 'Password is required.')
      .notEmpty();
    const errors = req.validationErrors();

    if (errors) {
      return req.error({ message: global.helper.formattedValMessage(errors) }, 422);
    }

    const { username, password } = req.body;

    return User.login(username, password)
      .then(
        user => req.success(user),
        error => req.error({
          message: error,
        }, 401),
      );
  },

  register: (req, res) => User.exists({ email: req.body.email })
    .then(() => res.boom.badData('Email already in used.'))
    .catch(() => User.register(req.body)
      .then(
        user => req.success(user),
        error => res.boom.badImplementation(error),
      )),
  /**
   * @TODO hash must be unique
   * @param req
   * @param res
   */
  verifyHash(req, res) {
    User.exists({
      hash: req.params.hash,
    }).then((user) => {
      if (user.status) {
        return res.render(strings.ACCOUNT_ALREADY_ACTIVATED);
      }
      return User.update({ hash: req.params.hash }, { status: 1 },
      ).then(() => res.render(strings.ACCOUNT_ACTIVE),
        () => res.send('Unable to activate.').status(500));
    }, () => res.send('Incorrect verification code.').status(401));
  },

  generateToken(req, res) {
    const username = req.body.username;
    const password = req.body.password;

    if (username && password) {
      return User.login(username, password)
        .then(
          user => res.json({ token: User.getToken(user) }),
          error => res.status(401).send(error),
        );
    } else {
      return res.status(401).send('Unauthorized');
    }
  },

  update: (req) => {
    const user = _.pick(req.body, ['first_name', 'last_name']);
    User.update({ _id: req.user._id }, user)
      .then(
        () => req.success({ message: 'Profile has been updated.' }),
        error => req.error(error),
      );
  },

};

