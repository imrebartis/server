const _ = require('lodash');
const Path = require('path-parser');
const { URL } = require('url');
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys');

module.exports = app => {
  app.get('/api/surveys', requireLogin, async (req, res) => {
    // mongoose code (see http://mongoosejs.com/docs/api.html):
    const surveys = await Survey.find({ _user: req.user.id }).select({
      recipients: false
    });

    res.send(surveys);
  });

  app.get('/api/surveys/:surveyId/:choice', (req, res) => {
      res.send('Thanks for voting!');
  });

  app.post('/api/surveys/webhooks', (req, res) => {
    const p = new Path('/api/surveys/:surveyId/:choice');

    _chain(req.body)
      .map(({ email, url }) => {
        // extract only the route (e.g. '/api/surveys/5917/yes'):
        const match = p.test(new URL(url).pathname);      
        if (match) {
          return { email, surveyId: match.surveyId, choice: match.choice };
        }
      })
      //this will return only event objects (& not undefined elements):
      .compact()
      //insuring there'll be no duplicate emails or survey ids (e.g. if someone clicks the survey link
      // several times:
      .uniqBy('email', 'surveyId')
      .each(({ surveyId, email, choice }) => {
        // Mongo code (hence e.g. the use of _id):
        Survey.updateOne(
          {
            _id: surveyId,
            recipients: {
              $elemMatch: { email: email, responded: false }
            }
          },
          {
            // choice is not an array here,
            // it just stands for the 'yes' or 'no' from the survey
            $inc: { [choice]: 1 },
            $set: { 'recipients.$.responded': true },
            lastResponded: new Date()            
          }
        ).exec();
      })
      .value();

    res.send({});
});

  app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
    const { title, subject, body, recipients } = req.body;

    const survey = new Survey({
      title,
      subject,
      body,
      // transforming the list of strings ( = email addresses) into an array of strings with split
      // then creating a new array of objects out of the array of strings with map
      // BTW (email => ({email:email.trim() })) is the same as (email => {return {email:email.trim()}})
      recipients: recipients.split(',').map(email => ({ email: email.trim() })),
      _user: req.user.id,
      dateSent: Date.now()
    });

    // Great place to send an email!
    const mailer = new Mailer(survey, surveyTemplate(survey));
    await mailer.send();
    
    try {
      await mailer.send();
      await survey.save();
      req.user.credits -= 1;
      const user = await req.user.save();

      res.send(user);
    } catch (err) {
      // 422 = unprocessable entity, i.e. sth's wrong with the data u sent us
      res.status(422).send(err);
    }
  });
};
