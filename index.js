const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const app = express();

// console.developers.google.com
// clientID: 518885123900-7jiqfjeqmbhuf3024688cepbbpmpdltc.apps.googleusercontent.com
// clientSecret: AylUVLZZb4p9ov_daUtF5q3l

passport.use(new GoogleStrategy());

const PORT = process.env.PORT || 5000;
app.listen(PORT);
