// expose our config directly to our application using module.exports
module.exports = {

    'twitterAuth' : {
        'consumerKey' 		: 'tgWVUNiEvk8mHuTNjDpwXQIRg',
        'consumerSecret' 	: '0OyYVseIGEuTI469dzZ9intMSMUjumey0iEdpEYG8EpfllHj5M',
        'callbackURL' 		: 'http://localhost:8080/auth/twitter/callback'
    },

    'googleAuth' : {
        'clientID' 		: 'your-secret-clientID-here',
        'clientSecret' 	: 'your-client-secret-here',
        'callbackURL' 	: 'http://localhost:8080/auth/google/callback'
    }

};
