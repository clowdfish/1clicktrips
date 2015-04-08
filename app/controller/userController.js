// controller/userController.js

var Promise = require('es6-promise').Promise;
var mysql = require('mysql');
var fs = require('fs');
var async = require('async');

var dbConfig = require('../../config/database.js');
var connection = mysql.createConnection(dbConfig.connection);

module.exports = {

  getUser: function(userId) {

    return new Promise(function(resolve, reject) {

      connection.query("SELECT * FROM user WHERE id=?;", [userId], function (err, rows) {
        if (err)
          reject(err);

        if(rows.length) {
          resolve({
            'id': rows[0].id,
            'email': rows[0].email,
            'licence': rows[0].licence
          });
        }
        else {
          console.log("User with ID=" + userId + " does not exist in database.");

          resolve({
            'id': -1,
            'email': undefined,
            'licence': 0
          });
        }
      });
    });
  },

  getProfile: function(userId) {

    return new Promise(function(resolve, reject) {

      connection.query("SELECT * FROM user WHERE id=?;", [userId], function (err, rows) {
        if (err)
          reject(err);

        if(rows.length) {
          //
          var userData = {};
          userData.email = rows[0]['email'];
          userData.twitter = rows[0]['twitter_username'];

          connection.query("SELECT * FROM profile WHERE id=?;", [rows[0]['profile_id']], function (err, rows) {
            if (err)
              reject(err);

            if(rows.length) {

              var profile = rows[0];

              // copy all profile attributes to user data object
              Object.keys(profile).forEach(function(key) {
                userData[key] = this[key];
              }, profile);

              resolve(userData);
            }
            else {
              reject(new Error("Profile for user with ID=" + userId + " could not be retrieved from database."));
            }
          });
        }
        else
          reject(new Error("User with ID=" + userId + " does not exist in database."));
      });
    });
  },

  setProfile: function(userId, profileObject) {
    return new Promise(function(resolve, reject) {
      connection.query("SELECT * FROM user WHERE id=?;", [userId], function (err, rows) {
        if (err) {
          return reject(err);
        }

        if (rows.length === 0) {
          return reject(new Error("User with ID=" + userId + " does not exist in database."));
        }

        var profileId = rows[0]['profile_id'];
        var updateFields = [
          'company_name',
          'first_name',
          'last_name',
          'street',
          'address_other',
          'zip_code',
          'city',
          'country'
        ];

        if (updateFields.indexOf(profileObject.key) === -1) {
          reject(new Error('Invalid parameters'));
        }
        var updateQuery = 'UPDATE profile SET ?? = ? where id = ?';
        var updateParams = [
          profileObject['key'],
          profileObject['value'],
          profileId
        ];

        connection.query(updateQuery, updateParams, function(err) {
          if (err) {
            return reject(err);
          }
          resolve();
        });
      });

    });
  },

  getFavorites: function(userId) {

    return new Promise(function(resolve, reject) {

      connection.query("SELECT * FROM favorite WHERE user_id=? ORDER BY position, id;", [userId], function (err, rows) {
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
              },
              position: row['position']
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
  },

  uploadProfilePicture: function(req, userId) {

    return new Promise(function(resolve, reject) {

      saveUploadImage(req, userId)
        .then(function(path){
          return updateUserImage(userId, path);
        }, function(err) {
          reject(err);
        })
        .then(function(profilePicture){
          resolve(profilePicture);
        }, function(err) {
          reject(err);
        });
    });
  },

  updateFavoritePosition: function(userId, positionData) {

    return new Promise(function(resolve, reject) {

      async.each(positionData, function(item, callback) {
        item['userId'] = userId;

        setFavoritePosition(item, function(err) {
          if (err) {
            callback(err);
          } else {
            callback();
          }
        })
      }, function(err) {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }
};

function updateUserImage(userId, path) {

  return new Promise(function(resolve, reject) {

    connection.query('SELECT * FROM user WHERE id = ?', [userId], function(err, rows) {
      if (err) {
        return reject(err);
      }

      if (rows.length == 0) {
        return reject(new Error('User does not exist'));
      }
      var profileId = rows[0].profile_id;
      removeOldProfileImage(profileId).then(function() {
        var updateQuery = 'UPDATE profile SET image = ? WHERE id = ?';
        var updateParams = [path, profileId];
        connection.query(updateQuery, updateParams, function(err, data) {
          if (err) {
            return reject(err);
          }
          resolve(path);
        });
      }, function(err) {
        reject(err);
      });
    });

  });
}

function removeOldProfileImage(profileId) {
  return new Promise(function(resolve, reject) {
    connection.query('SELECT * FROM profile where id = ?', [profileId], function(err, profiles) {
      if (err) {
        return reject(err);
      }
      //Remove old profile image
      if (profiles.length > 0) {
        var image = profiles[0].image;
        if (image) {
          var systemPath = __dirname
                        + '/../../frontend/build'
                        + image;
          fs.exists(systemPath, function(exists) {
            if (exists) {
              fs.unlinkSync(systemPath);
            }
            resolve();
          });
        } else {
          resolve();
        }
      } else {
        resolve();
      }

    });
  });
}

function saveUploadImage(req, userId) {
  var file = req.files.file;

  return new Promise(function(resolve, reject) {
    if (!file || file == undefined) {
      return reject(new Error('File is not available'));
    }

    var shortPath = '/images/uploaded/'
                  + new Date().getTime()
                + file.originalFilename;

    var systemPath = __dirname
                + '/../../frontend/build'
                + shortPath;
    fs.readFile(file.path, function(err, data) {
      if (err) {
        fs.unlinkSync(file.path);
        return reject(err);
      }
      fs.writeFile(systemPath, data, function(err) {
        fs.unlinkSync(file.path);
        if (err) {
          reject(err);
        } else {
          resolve(shortPath);
        }
      })
    });
  });
}

function setFavoritePosition(params, callback) {
  connection.query('UPDATE favorite SET position = ? WHERE id = ? and user_id = ?', [params.position, params.id, params.userId], function(err) {
    if (err) {
      callback(err);
    }
    callback();
  });
}

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
