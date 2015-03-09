// controller/userController.js

var dbConfig = require('../../config/database.js');
var Promise = require('es6-promise').Promise;

module.exports = {

  getUser: function(userId) {
    // TODO implement
  },

  getProfile: function(userId) {
    // TODO implement
  },

  setProfile: function(userId, profileObject) {
    // TODO implement
  },

  getFavorites: function(userId) {
    // TODO implement
  },

  setFavorite: function(userId, favoriteObject) {
    // TODO implement
  },

  getMessages: function(userId) {
    // TODO implement
  },

 /**
   * Retrieves the user licence for a user with the given id from the database.
   *
   * @param database
   * @param userId
   * @returns a Promise resolving to the user licence
   */
  getUserLicence: function(database, userId) {

    return new Promise(function(resolve, reject) {

      var pattern =
        /^[a-zA-Z0-9._-]+[\+[a-zA-Z0-9._-]+]?@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

      if(pattern.test(userId)) {
				// TODO implement database access
      }
      else
        resolve(0);
    });
  }
};
