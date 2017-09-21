const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { google: { clientID, clientSecret, callbackURL } } = global.config().auth.strategy;

module.exports = new GoogleStrategy(
  {
    clientID,
    clientSecret,
    callbackURL,
  },
  (accessToken, refreshToken, profile, cb) => {
    if (!profile) {
      return cb(null);
    }

    return cb(null, profile._json);
  },
);
