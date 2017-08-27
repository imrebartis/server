const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const keys = require('./config/keys');

const app = express();

// console.developers.google.com

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      // the route users will be sent to after they grant permission to the authentication
      callbackURL: '/auth/google/callback'
    },
    accessToken => {
      console.log(accessToken);
    }
  )
);

// route handler
app.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: ['profile', 'email']
  })
);

// send request to google with 'code' included
// Google sees 'code' in URL, replies with details about user
app.get('/auth/google/callback', passport.authenticate('google'));

const PORT = process.env.PORT || 5000;
app.listen(PORT);
