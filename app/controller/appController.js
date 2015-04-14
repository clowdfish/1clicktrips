// controller/appController.js
var dbConfig = require('../../config/database.json');
var Promise = require('es6-promise').Promise;
var mysql = require('mysql');

var connection = mysql.createConnection(dbConfig.connection);

var currencies = require('../../config/currencies.json');
var languages = require('../../config/languages.json');

module.exports = {

  getAvailableCurrencies: function() {
    return currencies;
  },

  getAvailableLanguages: function() {
    return languages;
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
