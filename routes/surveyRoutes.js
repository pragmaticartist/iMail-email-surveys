const _ = require('lodash');
const Path = require('path-parser').default;
const { URL } = require('url');
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys'); // if we require the Survey model multiple places in our application we could run into an error/bug

module.exports = app => {
  app.get('/api/surveys', requireLogin, async (req, res) => {
    const surveys = await Survey.find({ _user: req.user.id }).select({
      recipients: false,
    });

    res.send(surveys);
  });

  app.get('/api/surveys/:surveyId/:choice', (req, res) => {
    res.send('Thanks for voting!');
  });

  app.post('/api/surveys/webhooks', (req, res) => {
    const p = new Path('/api/surveys/:surveyId/:choice');
    console.log('Posting to /surveys/webhooks');

    const events = _.chain(req.body)
      .map(({ email, url }) => {
        const match = p.test(new URL(url).pathname);
        if (match) {
          return {
            email: email,
            surveyId: match.surveyId,
            choice: match.choice,
          };
        }
      })
      .compact()
      .uniqBy('email', 'surveyId')
      .each(({ surveyId, email, choice }) => {
        Survey.updateOne(
          {
            _id: surveyId,
            recipients: {
              $elemMatch: { email: email, responded: false },
            },
          },
          {
            $inc: { [choice]: 1 },
            $set: { 'recipients.$.responded': true },
            lastResponded: new Date(),
          }
        ).exec();
      })
      .value();

    console.log(events);

    res.send({});
  });

  app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
    const { title, subject, body, recipients } = req.body;
    console.log('Posting to /surveys');

    // call function that removes duplicate emails

    const survey = new Survey({
      title,
      subject,
      body,
      recipients: recipients.split(',').map(email => ({
        email: email.trim(),
      })),
      _user: req.user.id,
      dateSent: Date.now(),
    });

    console.log('Before Mailer');
    const mailer = new Mailer(survey, surveyTemplate(survey));

    try {
      await mailer.send();
      console.log('I made it past send()');
      await survey.save();
      req.user.credits -= 1;
      const user = await req.user.save();

      res.send(user);
      console.log('Yo, Im HERE AT THE END!');
    } catch (err) {
      res.status(422).send(err);
    }
  });
};
