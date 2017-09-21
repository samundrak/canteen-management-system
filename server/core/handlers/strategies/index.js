const passport = require('passport');
const FacebookStrategy = require('./facebook');
const GoogleStrategy = require('./google');

passport.use(FacebookStrategy);
passport.use(GoogleStrategy);
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

module.exports = {
  facebook: {
    auth: () => passport.authenticate('facebook', {
      scope: [
        'email',
        'user_about_me',
        'public_profile',
      ],
    }),
    process: (req, res, next) => {
      // do something with req.user
      Object.assign(req.body, req.user, { service: 'facebook' });
      return next();
    },
  },
  google: {
    auth() {
      return passport.authenticate('google', {
        scope: [
          'https://www.googleapis.com/auth/userinfo.profile',
          'https://www.googleapis.com/auth/userinfo.email',
        ],
      });
    },
    process(req, res, next) {
      const user = req.user;
      const payload = {
        first_name: user.name.givenName,
        last_name: user.name.familyName,
        service: 'google',
        password: req.body.password,
        email: user.emails[0].value,
      };
      req.body = Object.assign(req.body, payload);
      return next();
    },
  },
}
