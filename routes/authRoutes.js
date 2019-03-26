const passport = require('passport');

module.exports = app => {
  // initial authentication attempt
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email'],
    })
  );

  // authentication attempt with 'code' from Google
  app.get('/auth/google/callback', passport.authenticate('google'));
};
