// auth.js

module.exports = {
  'hostname': 'http://localhost:8000/en/',
  'secret' : 'theanswertoallquestions42!',

  'twitterAuth' : {
    'consumerKey' 		: 'tgWVUNiEvk8mHuTNjDpwXQIRg',
    'consumerSecret' 	: '0OyYVseIGEuTI469dzZ9intMSMUjumey0iEdpEYG8EpfllHj5M',
    // on pre-production environment: http://dev.1clicktrips.com/api/auth/twitter/callback
    'callbackURL' 		: 'http://localhost:8080/auth/twitter/callback'
  },

  // on pre-production environment: http://dev.1clicktrips.com/en/after-auth.html
  'loginCallbackUrl': 'http://localhost:8000/en/after-auth.html',

  'email' : {
    'reset' : {
      'subject' : '1ClickTrips Password Reset',
      'body' : [
        'You are receiving this email because you (or someone else) requested a password reset for your account.\n\nPlease click on the following link or paste it into your browser to complete the process:\n\n',
        'If you did not request this password reset, please ignore this email and your password will remain unchanged.\n'
      ]
    },
    'confirmation' : {
      'subject' : 'Your password has been changed',
      'body' : [
        'Hello,\n\nThis is a confirmation that the password for your account ',
        ' has just been changed.\n'
      ]
    }
  },

  'nodeMailer': {
    'mandrill': {
      'service': 'Mandrill',
      'auth': {
        'user': 'gros.sascha@gmail.com',
        'pass': 'n44ciO-dZOsrZjtfcwLD-Q'
      }
    }
  },
  'mailOptions': {
    'supportEmail': 'support@1clicktrips.com'
  },
  'activeCampaign': {
    "apiKey":"d7689da5bf9662f928868d2373bf627e2fd9ad5bbb10dee325d7826da45d7d9a74ca9e8b",
    "url":"https://efexcon.api-us1.com",
    "listName":"7",
    "listId":9
  }
};
