// the file name's with capital M because it exports a class

const sendgrid = require('sendgrid');
const helper = sendgrid.mail;
const keys = require('../config/keys');

class Mailer extends helper.Mail {}

module.exports = Mailer;