const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      // the route users will be sent to after they grant permission to the authentication
      callbackURL: '/auth/google/callback'
    },
    (accessToken, refreshToken, profile, done) => {
      // console.log('access token', accessToken);
      // console.log('refresh token', refreshToken);
      // console.log('profile:', profile);

      // this returns a promise
      User.findOne({ googleId: profile.id }).then(existingUser => {
        if (existingUser) {
          // we already have a record with the given profile ID

          // first arg is for err message (in this case null)
          done(null, existingUser);
        } else {
          // we don't have a user record with this ID, make a new record!

          // saving a record to db is an asynchronous operation
          new User({ googleId: profile.id })
            .save()
            .then(user => done(null, user));
        }
      });
    }
  )
);
