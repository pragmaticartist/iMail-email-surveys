const localtunnel = require('localtunnel');
localtunnel(5000, { subdomain: 'ttdev-imail-040519' }, function(err, tunnel) {
  console.log('LT running');
});

//    "webhook": "forever utils/sendgrid_webhook.js"
//    "webhook": "lt -p 5000 -s ttdev-imail-040519"
