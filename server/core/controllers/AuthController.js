const path = require('path');
const Guest = require('../services/Guest');
const strings = require('../Strings');
const Validator = require('validatorjs');
const UserService = require('../services/User');

module.exports = {

  forgotPassword(req, res) {
    const email = req.body.email;
    const validate = new Validator(req.body, {
      email: 'required|email',
    });
    if (validate.fails()) {
      return res.boom.badRequest("Validation didn't suceed", validate.errors);
    }

    const guest = new Guest();
    return guest.find({ email })
      .then((user) => {
        if (!user) {
          return res.boom.notFound('Email not found');
        }

        const fpHash = Guest.generateUniqueHash(email);
        return guest
          .update({ email }, {
            fp_hash: fpHash,
          })
          .then((update) => {
            if (!update) {
              return res.boom.serverUnavialble();
            }
            global.events.emit(strings.SEND_EMAIL, {
              to: email,
              subject: strings.FORGOT_PASSWORD,
              template: {
                name: strings.TEMPLATE_OF_FORGOT_PASSWORD,
                data: {
                  email,
                  fpHash,
                  user,
                },
              },
            });
            return res.json({
              message: 'Password reset link has been sent to user.',
            });
          });
      });
  },
  verifyResetLink(req, res) {
    new Guest()
      .find({ fp_hash: req.params.hash })
      .then((docs) => {
        if (!docs) {
          return res.render('errors/422', { message: 'You provided incorrect data.' });
        }
        return res.redirect(`/#/new-password?token=${req.params.hash}`);
      });
  },
  createNewPassword(req, res) {
    const password = req.body.password;
    const validate = new Validator(req.body, {
      password: 'required|min:6',
    });

    if (validate.fails()) {
      return res.boom.badRequest("Validation didn't succeed", validate.errors);
    }

    const guest = new Guest();
    return guest
      .find({ fp_hash: req.params.hash })
      .then((docs) => {
        if (!docs) {
          return res.boom.badRequest('This link has expired.');
        }

        guest
          .update(
            { fp_hash: req.params.hash },
            {
              password: UserService.generatePassword(password, UserService.getSalt()),
              fp_hash: null,
            },
          )
          .then((user) => {
            if (!user) {
              return res.boom.serverUnavailable();
            }

            return res.json({
              email: docs.email,
            });
          });
      });
  },
  home(req, res) {
    if (process.env.NODE_ENV === 'production') {
      return res.sendFile(
        path.join(__dirname, '../../views/guest/index.html',
        ),
      );
    }

    return res.render('guest', { development: true });
  },
  app(req, res) {
    if (process.env.NODE_ENV === 'production') {
      return res.sendFile(
        path.join(__dirname, '../../views/app/index.html',
        ),
      );
    }

    return res.render('app', { development: true });
  },
};
