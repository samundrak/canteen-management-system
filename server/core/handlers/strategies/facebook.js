const FacebookStrategy = require('passport-facebook').Strategy;
const { facebook: { clientID, clientSecret, callbackURL } } = global.config().auth.strategy;

module.exports = new FacebookStrategy(
  {
    clientID,
    clientSecret,
    callbackURL,
    profileFields: ['id', 'emails', 'name', 'displayName', 'photos'],
  },
  (accessToken, refreshToken, profile, done) => {
    if (!profile) {
      return done(null);
    }

    return done(null, profile._json);
  });
