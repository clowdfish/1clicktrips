// controller/appController.js
var dbConfig = require('../../config/database.json');
var mysql = require('mysql');
var connection = mysql.createConnection(dbConfig.connection);
var Promise = require('es6-promise').Promise;

module.exports = {

  getAvailableCurrencies: function() {
    // TODO retrieve currencies from database and deliver to client
  },

  getAvailableLanguages: function() {
    // TODO retrieve languages from database and deliver to client
  },

  getTranslations: function(languageCode) {
    // TODO retrieve and parse language file and deliver to client
  },

  getCountries: function() {

    return new Promise(function(resolve, reject) {
      connection.query('SELECT * FROM country', function(err, rows) {
        if (err) {
          return reject(err);
        }
        var result = [];
        for (var i = 0; i < rows.length; i++) {
          var item = rows[i];
          result.push({
            description: item.name,
            value: item.code
          });
        }
        resolve(result);
      });
    });
  }
};
