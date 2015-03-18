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

    return new Promise(function(resolve, reject) {
      resolve();
    });
  },

  getFavorites: function(userId) {

    return new Promise(function(resolve, reject) {

      connection.query("SELECT * FROM favorite WHERE user_id=?;", [userId], function (err, rows) {
        if (err)
          reject(err);

        if(rows.length) {
          var favoritesArray = [];

          rows.forEach(function(row) {

            favoritesArray.push({
                "id" : row['id'],
                "origin" : {
                "description" : row['start'],
                "location" : parseLocation(row['start_location'])
              },
                "destination" : {
                "description" : row['end'],
                "location" : parseLocation(row['end_location'])
              }
            });
          });

          resolve(favoritesArray);
        }
        else {
          resolve([]);
        }
      });
    });
  },

  setFavorite: function(userId, favoriteObject) {

    return new Promise(function(resolve, reject) {

      if(favoriteObject.hasOwnProperty('id')) {
        // update favorite
        console.error("You cannot update existing favorites.");
      }
      else {
        // create new favorite
        var queryString =
          "INSERT INTO favorite " +
          "(user_id, start, start_location, end, end_location, transport) " +
          "VALUES (?, ?, ?, ?, ?, ?);";

        var queryParams = [];

        queryParams.push(
          userId,
          favoriteObject.origin.description,
          createLocationString(favoriteObject.origin.location),
          favoriteObject.destination.description,
          createLocationString(favoriteObject.destination.location)
        );

        var transport = "";
        if(favoriteObject.hasOwnProperty('transport') && favoriteObject['transport'] != null)
          transport = favoriteObject['transport'].join();

        queryParams.push(transport);

        connection.query(queryString, queryParams, function (err, result) {
            if (err)
              reject(err);

            resolve();
          }
        );
      }
    });
  },

  deleteFavorite: function(userId, favoriteId) {

    return new Promise(function(resolve, reject) {

      var queryString =
        "DELETE FROM favorite " +
        "WHERE user_id=? AND id=?;";

      connection.query(queryString, [userId, favoriteId], function (err, result) {
        if (err)
          reject(err);

        if(result.affectedRows)
          resolve();
        else
          reject(new Error('Could not delete the favorite.'));
      });
    });
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
          var messagesArray = [];

          rows.forEach(function(row) {

            messagesArray.push({
              "id" : row['id'],
              "content" : row['content'],
              "type" : row['type'],
              "date" : row['date'],
              "url" : row['url'],
              "action" : row['action']
            });
          });

          resolve(messagesArray);
        }
        else {
          resolve([]);
        }
      });
    });
  }
};

/**
 * Parses the location given as a string and transforms it into an
 * location object.
 *
 * @param location
 * @returns {object}
 */
function parseLocation(location) {
  var locationData = location.split(',');

  return {
    latitude: parseFloat(locationData[0]),
    longitude: parseFloat(locationData[1])
  }
}

/**
 * Creates a string out of the given location object.
 *
 * @param location
 * @returns {string}
 */
function createLocationString(location) {
  return location.latitude + "," + location.longitude;
}