// auth.js

module.exports = {
  'secret' : 'theanswertoallquestions42!',

  'twitterAuth' : {
    'consumerKey' 		: 'tgWVUNiEvk8mHuTNjDpwXQIRg',
    'consumerSecret' 	: '0OyYVseIGEuTI469dzZ9intMSMUjumey0iEdpEYG8EpfllHj5M',
    // on pre-production environment: http://dev.1clicktrips.com/auth/twitter/callback
    'callbackURL' 		: 'http://localhost:8080/auth/twitter/callback'
  },

  // on pre-production environment: http://dev.1clicktrips.com/en/after-auth.html
  'loginCallbackUrl': 'http://localhost:8000/en/after-auth.html'
};
