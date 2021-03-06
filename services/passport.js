const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  // use the id property provided in the db instead of googleId
  // in case there'll be other auth providers (fb, twitter, etc.) in the app, too
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      // the route users will be sent to after they grant permission to the authentication
      callbackURL: '/auth/google/callback',
      // if app runs into any proxy (e.g. Heroku's), that's fine
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ googleId: profile.id });

      if (existingUser) {
        // we already have a record with the given profile ID
        // first arg is for err message (in this case null)
        return done(null, existingUser);
      }
      // we don't have a user record with this ID, make a new record!
      // saving a record to db is an asynchronous operation
      const user = await new User({ googleId: profile.id }).save();
      done(null, user);
    }
  )
);
