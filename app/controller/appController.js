// controller/appController.js
var dbConfig = require('../../config/database.json');
var Promise = require('es6-promise').Promise;
var mysql = require('mysql');
var ActiveCampaign = require('../helpers/activeCampaign');
var connection = mysql.createConnection(dbConfig.connection);

var currencies = require('../../config/currencies.json');
var languages = require('../../config/languages.json');
var translate = require('../i18n/i18n').translate;
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
  },

  subscribe: function(email, req) {
    return new Promise(function(resolve, reject) {
      var activeCampaign = new ActiveCampaign();
      activeCampaign
        .subscribeUser(email)
        .then(function(status) {
          resolve(translate(status, req.languageKey));
        }, function(status) {
          reject(new Error(translate(status, req.languageKey)));
        });
    });
  }
};
