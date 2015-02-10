// user.js
var Promise = require('es6-promise').Promise;

module.exports = {

  getProfile: function(userId) {

    return new Promise(function(resolve, reject) {

      if(userId > 0) {
        resolve({
          'address': {
            'city': 'Test City',
            'country': 'Far Far Away',
            'street': 'Test Street 1',
            'zip': '123456'
          },
          'email': 'john.doe@test.com',
          'first-name': 'John',
          'last-name': 'Doe',
          'picture': 'http://imaginative.url',
          'promo-code': '1234556'
        });
      }
      else {
        reject(new Error('Could not retrieve user profile.'));
      }
    });
  },

  setProfile: function(userId, profileObject) {

    //console.log('User Profile: ');
    //console.log(profileObject);

    return new Promise(function(resolve, reject) {

      if(userId > 0)
        resolve();
      else
        reject(new Error('There was an error.'));
    });
  },

  set: function(userId, key, value) {

    return new Promise(function(resolve, reject) {

      if(userId > 0)
        resolve();
      else
        reject(new Error('There was an error.'));
    });
  },

  getById: function(userId) {

    return new Promise(function(resolve, reject) {

      if(userId > 0)
        resolve({
          id: userId,
          email: "mocking@user.com",
          licence: 1
        });
      else
        resolve(null);
    });
  }
};