// require the passport npm module
const passport = require('passport');

module.exports = app => {
  // route handler
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );

  // send request to google with 'code' included
  // Google sees 'code' in URL, replies with details about user
  // then user's redirected to /surveys route
  app.get(
    '/auth/google/callback',
    passport.authenticate('google'),
    (req, res) => {
      res.redirect('/surveys');
    }
  );

  app.get('/api/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });

  // auth handler
  // http://localhost:5000/api/current_user will show id & googleId of user
  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });
};
