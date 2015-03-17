// controller/userController.js

var Promise = require('es6-promise').Promise;
var mysql = require('mysql');

var dbConfig = require('../../config/database.js');
var connection = mysql.createConnection(dbConfig.connection);

module.exports = {

  getUser: function(userId) {

    return new Promise(function(resolve, reject) {

      connection.query("SELECT * FROM user WHERE id=?;", [userId], function (err, rows) {
        if (err)
          reject(err);

        if(rows.length)
          resolve({
            'id': rows[0].id,
            'email': rows[0].email,
            'licence' : rows[0].licence
          });
        else
          reject(new Error("User with ID=" + userId + " does not exist in database."));
      });
    });
  },

  getProfile: function(userId) {

    return new Promise(function(resolve, reject) {

      connection.query("SELECT * FROM user WHERE id=?;", [userId], function (err, rows) {
        if (err)
          reject(err);

        if(rows.length)
          connection.query("SELECT * FROM profile WHERE id=?;", [rows[0]['profile_id']], function (err, rows) {
            if (err)
              reject(err);

            resolve(rows[0]);
          });
        else
          reject(new Error("User with ID=" + userId + " does not exist in database."));
      });
    });
  },

  setProfile: function(userId, profileObject) {
    // TODO implement
  },

  getFavorites: function(userId) {

    return new Promise(function(resolve, reject) {

      connection.query("SELECT * FROM favorite WHERE user_id=?;", [userId], function (err, rows) {
        if (err)
          reject(err);

        if(rows.length) {
          // create specific favorite format?
          resolve(rows);
        }
        else {
          reject(new Error('Could not retrieve favorites.'));
        }
      });
    });
  },

  setFavorite: function(userId, favoriteObject) {
    // TODO implement
  },

  getMessages: function(userId) {

    return new Promise(function(resolve, reject) {

      var queryString = "SELECT * FROM message AS a " +
      "WHERE EXISTS (" +
        "SELECT 1 " +
        "FROM user_has_message AS b " +
        "WHERE b.user_id=? AND a.id=b.message_id " +
        "GROUP BY b.message_id " +
        "HAVING count(*) > 0);";

      connection.query(queryString, [userId], function (err, rows) {
        if (err)
          reject(err);

        if(rows.length) {
          // create specific message format?
          resolve(rows)
        }
        else {
          reject(new Error('Could not retrieve favorites.'));
        }
      });
    });
  }
};