// controller/settingsController.js
var mysql = require('mysql');
var dbConfig = require('../../config/database.js');
var Promise = require('es6-promise').Promise;
var connection = mysql.createConnection(dbConfig.connection);
module.exports = {
  set: function(userId, settingsObject) {

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
