// the file name's with capital M because it exports a class

const sendgrid = require('sendgrid');
const helper = sendgrid.mail;
const keys = require('../config/keys');

class Mailer extends helper.Mail {
    // expecting to have as first argument any object containing a subject & recipients
    // meaning it doesn't necessarily have to be the survey
    // so we can re-use this in the future with something else then survey
    constructor({ subject, recipients }, content) {
    super();

    this.from_email = new helper.Email('no-reply@emaily.com');
    this.subject = subject;
    this.body = new helper.Content('text/html', content);
    this.recipients = this.formatAddresses(recipients);
  }
}

module.exports = Mailer;