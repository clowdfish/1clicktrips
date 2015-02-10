// settings.js
var dbConfig = require('../../config/database.js');
var Promise = require('es6-promise').Promise;

module.exports = {
  set: function(userId, settingsObject) {

    // TODO implement storage of complex settings object
    /*
     Setting {
       category: string
       description:	string
       key:	string
       value:	string
     }
     */

    var key = settingsObject['key'];
    var value = settingsObject['value'];

    return new Promise(function(resolve, reject) {
      var connection = mysql.createConnection(dbConfig.connection);

      var query =
        'UPDATE settings ' +
        'SET ' + mysql.escape(key) + '="' + mysql.escape(value) + '"' +
        'WHERE user_id=' + userId;

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

  get: function(userId) {

    return new Promise(function(resolve, reject) {
      var connection = mysql.createConnection(dbConfig.connection);

      var query =
        'SELECT * ' +
        'FROM settings ' +
        'WHERE user_id=' + userId;

      connection.query(query, function(err, result) {
        if (err) reject(err);

        if(result.length === 1)
          resolve(result[0]);
        else
          reject(new Error('Setting could not be retrieved.'));
      });

      connection.end();
    });
  },

  print: function(userId) {

    var connection = mysql.createConnection(dbConfig.connection);

    var query =
      'SELECT * ' +
      'FROM settings ' +
      'WHERE user_id=' + userId;

    connection.query(query, function(err, result) {
      if (err) throw err;

      console.log('The settings are as follows:');
      if(result.length === 1)
        console.log(result[0]);
    });

    connection.end();
  }
};