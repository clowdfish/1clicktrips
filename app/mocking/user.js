// mocking/user.js

var Promise = require('es6-promise').Promise;

module.exports = {

  getUser: function(userId) {

    return new Promise(function(resolve, reject) {

      if(userId > 0) {
        resolve({
          'id': 42,
          'email': 'john.doe@test.com',
          'licence' : 1
        });
      }
      else {
        reject(new Error('Could not retrieve user.'));
      }
    });
  },

  getProfile: function(userId) {

    return new Promise(function(resolve, reject) {

      if(userId > 0) {
        resolve(createProfileMock());
      }
      else {
        reject(new Error('Could not retrieve user profile.'));
      }
    });
  },

  setProfile: function(userId, profileObject) {

    console.log('User Profile to be stored: '); // DEBUG
    console.log(profileObject); // DEBUG

    return new Promise(function(resolve, reject) {

      if(userId > 0)
        resolve();
      else
        reject(new Error('Could not set user profile.'));
    });
  },

  getFavorites: function(userId) {

    return new Promise(function(resolve, reject) {

      if(userId > 0) {
        resolve([
          createFavoriteMock(),
          createFavoriteMock(),
          createFavoriteMock()
        ]);
      }
      else {
        reject(new Error('Could not retrieve favorites.'));
      }
    });
  },

  setFavorite: function(userId, favoriteObject) {

    console.log('Favorite to be stored: '); // DEBUG
    console.log(favoriteObject); // DEBUG

    return new Promise(function(resolve, reject) {

      if(userId > 0)
        resolve();
      else
        reject(new Error('Could not set favorite.'));
    });
  },

  getMessages: function(userId) {

    return new Promise(function(resolve, reject) {

      if(userId > 0)
        resolve([
          createMessageMock(),
          createMessageMock(),
          createMessageMock()
        ]);
      else
        reject(new Error('Could not retrieve messages.'));
    });
  }
};

// ==========================================================================
// MOCKING OBJECT CREATORS ==================================================
// ==========================================================================

function createProfileMock() {
  return {
    "email": "john.doe@test.com",
    "first-name": "John",
    "last-name": "Doe",
    "address": {
      "city": "Test City",
      "country": "Far Far Away",
      "street": "Test Street 1",
      "zip": "123456"
    },
    "image": "http://imaginative.url",
    "licence": "1"
  }
}

function createFavoriteMock() {
  return {
    "id" : 1,
    "origin" : {
      "description" : "9579 Quaking Hill, Panther Valley, Indiana",
      "location" : {
        "longitude" : 123456,
        "latitude" : 123456
      }
    },
    "destination" : {
      "description" : "Double Tree by Hilton Metropolitan, New York, USA",
      "location" : {
        "longitude" : 123456,
        "latitude" : 123456
      }
    }
  }
}

function createMessageMock() {
  return {
    "id" : 1,
    "content" : "Your next trip will be on Tuesday, 20 Jan 2015.",
    "date" : "2015-02-10T02:54:51+00:0",
    "url" : "http://imaginative.url",
    "type" : "info"
  }
}