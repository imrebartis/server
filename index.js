const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
// User model has to be required before passport.js
require('./models/User');
require('./models/Survey');
require('./services/passport');

mongoose.connect(keys.mongoURI);

const app = express();

// middlewares
app.use(bodyParser.json());
app.use(
  cookieSession({
    // cookie will last 30 days before it expires
    maxAge: 30 * 24 * 60 * 60 * 1000,
    // we can provide an array of cookieKeys & cookieSession will randomly pick one
    keys: [keys.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());

// the required files return a function that we immediately call with the express app object
require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);

if (process.env.NODE_ENV === 'production') {
  // Express will serve up production assets
  // like our main.js file, or main.css file!
  app.use(express.static('client/build'));

  // Express will serve up the index.html file
  // if it doesn't recognize the route
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);
