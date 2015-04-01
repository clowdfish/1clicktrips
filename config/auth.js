// auth.js

module.exports = {
  'hostname': 'http://localhost:8000/en/',
  'secret' : 'theanswertoallquestions42!',

  'twitterAuth' : {
    'consumerKey' 		: 'tgWVUNiEvk8mHuTNjDpwXQIRg',
    'consumerSecret' 	: '0OyYVseIGEuTI469dzZ9intMSMUjumey0iEdpEYG8EpfllHj5M',
    // on pre-production environment: http://dev.1clicktrips.com/auth/twitter/callback
    'callbackURL' 		: 'http://localhost:8080/auth/twitter/callback'
  },

  // on pre-production environment: http://dev.1clicktrips.com/en/after-auth.html
  'loginCallbackUrl': 'http://localhost:8000/en/after-auth.html',
  'nodeMailer': {
    'sendGrid': {
      'auth': {
        'api_user': 'davidtranwd',
        'api_key': '1clicktrips'
      }
    },
    'gmail': {
      'service': 'gmail',
      'auth': {
        'user': 'nam.trankhanh.vn@gmail.com',
        'pass': 'make@600million'
      }
    },
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
  }
};
