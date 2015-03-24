// controller/settingsController.js
var mysql = require('mysql');
var dbConfig = require('../../config/database.js');
var Promise = require('es6-promise').Promise;
var connection = mysql.createConnection(dbConfig.connection);
var _ = require('underscore');
module.exports = {
  set: function(userId, settingsObject) {
    return new Promise(function(resolve, reject) {
      var settingKeys = [];
      for (var settingIndex = 0; settingIndex < settingsObject.length; settingIndex++) {
        settingKeys.push(settingsObject[settingIndex].key);
      }

      connection.query("SELECT * FROM setting where `key` in (?) and user_id = ?",
                      [settingKeys, userId],
                      function(err, updateRows) {
        if (err) {
          return reject(err);
        }

        var updateKeys = updateRows.map(function(item) {
          return item.key;
        });

        for (var settingIndex = 0; settingIndex < settingsObject.length; settingIndex++) {
          var setting = settingsObject[settingIndex];
          if (updateKeys.indexOf(setting.key) != -1) {
            updateSetting(setting);
          } else {
            insertSetting(setting);
          }
        }
        resolve();
      });

      function updateSetting(setting) {
        var updateQuery = 'UPDATE setting SET ' +
                          ' `value` = ? ' +
                          ', `category` = ? ' +
                          ' WHERE `key` = ? and `user_id` = ?';
        var updateParams = [ setting.value,
                            setting.category,
                            setting.key,
                            userId ];
        connection.query(updateQuery, updateParams);
      }

      function insertSetting(setting) {
        var insertQuery = 'INSERT INTO setting(`user_id`, `key`, `value`, `category`) ' +
                          ' VALUES(?, ?, ?, ?)';
        var insertParams = [userId,
                            setting.key,
                            setting.value,
                            setting.category];
        connection.query(insertQuery, insertParams);
      }

    });
  },

  get: function(userId, category) {
    return new Promise(function(resolve, reject) {
      connection.query("SELECT * FROM setting where user_id = ? AND category = ?", [userId, category], function(err, rows) {
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
