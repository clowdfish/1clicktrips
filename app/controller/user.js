// user.js
var dbConfig = require('../../config/database.js');
var Promise = require('es6-promise').Promise;

module.exports = {

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

  set: function(userId, key, value) {

    return new Promise(function(resolve, reject) {

      var connection = mysql.createConnection(dbConfig.connection);

      var query =
        'UPDATE user ' +
        'SET ' + mysql.escape(key) + '="' + mysql.escape(value) + '"' +
        'WHERE user_id=' + userId + ';';

      connection.query(query, function(err, result) {
        if (err) reject(err);

        if(result.affectedRows > 0)
          resolve();
        else
          reject(new Error('Nothing could be updated.'));
      });

      connection.end();
    });
  },

  getById: function(userId) {

    return new Promise(function(resolve, reject) {
      var connection = mysql.createConnection(dbConfig.connection);

      var query =
        'SELECT * ' +
        'FROM user ' +
        'WHERE user_id="' + userId + '";';

      connection.query(query, function(err, result) {
        if (err) reject(err);

        if(result.length > 0)
          resolve(result[0]);
        else
          resolve(null);
      });

      connection.end();
    });
  }
};