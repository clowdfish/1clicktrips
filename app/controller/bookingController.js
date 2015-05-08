// controller/bookingController.js

var dbConfig = require('../../config/database.js');
var Promise = require('es6-promise').Promise;
var mysql = require('mysql');
var connection = mysql.createConnection(dbConfig.connection);
var async = require('async');
module.exports = {

  getBookings: function(userId, limit) {
    return new Promise(function(resolve, reject) {
      connection.query('SELECT * FROM booking WHERE user_id = ?', [userId], function(err, rows) {
        if (err) {
          return reject(err);
        }
        resolve(rows);
      });
    });
  },

  setBooking: function(userId, bookingObject) {
    return new Promise(function(resolve, reject) {
      async.waterfall([
        function(done) {
          insertBooking(userId, bookingObject, done);
        },
        function(bookingId, done) {
          insertUserData(bookingId, bookingObject, done);
        }
      ], function(err) {
        if (err) {
          return reject(err);
        }
        return resolve();
      });
    });
  },

  getById: function(bookingId) {
    return new Promise(function(resolve, reject) {
      connection.query('SELECT * FROM booking WHERE id = ?', [bookingId], function(err, rows) {
        if (err) {
          return reject(err);
        }
        if (rows.length == 0) {
          return resolve(null);
        }
        return resolve(rows[0]);
      });
    });
  }
};

function insertBooking(userId, bookingObject, done) {
  var subject = bookingObject.trip.origin + ' ' + bookingObject.trip.destination;
  connection.query('INSERT INTO booking(user_id, subject) VALUES(?, ?)', [userId, subject], function(err, data) {
    if (err) {
      done(err);
    } else {
      done(null, data.insertId);
    }
  });
}

function insertUserData(bookingId, bookingObject, done) {
  var userFields = [first_name,
                      last_name,
                      email,
                      phone,
                      address_street,
                      address_city,
                      address_postal,
                      address_country,
                      company_name,
                      company_tax_no];
  var insertData = [];
  insertData.push(bookingId);
  for (var i = 0; i < userFields.length; i++) {
    if (bookingObject.user[userFields[i]]) {
      insertData.push(bookingObject.user[userFields[i]]);
    }
  }
  connection.query('INSERT INTO booking_user ' +
                  '(booking_id, first_name, last_name, email, phone, address_street,' +
                  'address_city, address_postal, address_country, company_name, company_tax_no) ' +
                  'value(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [insertData], function(err) {
    done(err);
  });
}
