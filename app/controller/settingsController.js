// controller/settingsController.js
var mysql = require('mysql');
var dbConfig = require('../../config/database.js');
var Promise = require('es6-promise').Promise;

var connection = mysql.createConnection(dbConfig.connection);

module.exports = {

  set: function(userId, setting) {
    return new Promise(function(resolve, reject) {

      connection.query("SELECT * FROM setting where `key` in (?) and user_id = ?",
                      [setting.key, userId],
                      function(err, rows) {
        if (err) {
          return reject(err);
        }
        setting['userId'] = userId;
        if (rows.length > 0) {
          updateSetting(setting, callback);
        } else {
          insertSetting(setting, callback);
        }

        resolve();

        function callback(err) {
          if (err) {
            return reject(err);
          }
          resolve(err);
        }
      });
    });
  },

  get: function(userId) {
    return new Promise(function(resolve, reject) {
      connection.query("SELECT * FROM setting where user_id = ?", [userId], function(err, rows) {
        if (err) {
          return reject(err);
        }
        var settings = [];
        for(var i = 0; i < rows.length; i++) {
          settings.push({
            key: rows[i].key,
            value: rows[i].value
          });
        }
        resolve(settings);
      });
    });
  }
};

function updateSetting(setting, callback) {
  var updateQuery = 'UPDATE setting SET ' +
                    ' `value` = ? ' +
                    ' WHERE `key` = ? and `user_id` = ?';

  var updateParams = [ setting.value,
                      setting.key,
                      setting.userId ];

  connection.query(updateQuery, updateParams, callback);
}

function insertSetting(setting, callback) {
  var insertQuery = 'INSERT INTO setting(`user_id`, `key`, `value`) ' +
                    ' VALUES(?, ?, ?)';

  var insertParams = [setting.userId,
                      setting.key,
                      setting.value];

  connection.query(insertQuery, insertParams, callback);
}
