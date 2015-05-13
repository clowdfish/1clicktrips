// controller/bookingController.js

var dbConfig = require('../../config/database.js');
var Promise = require('es6-promise').Promise;
var mysql = require('mysql');
var connection = mysql.createConnection(dbConfig.connection);
var async = require('async');
var _ = require('underscore');
var nodeMailer = require('nodemailer');
var authConfig = require('../../config/auth');
var translate = require('../i18n/i18n').translate;
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

  setBooking: function(userId, bookingObject, req) {
    return new Promise(function(resolve, reject) {
      async.waterfall([
        function(done) {
          insertBooking(userId, bookingObject, done);
        },
        function(bookingId, done) {
          insertUserData(bookingId, bookingObject, done);
        },
        function(bookingId, bookingObject, done) {
          insertBookingSegment(bookingId, bookingObject, done);
        },
        function(done) {
          sendBookingSuccessEmail(bookingObject, req, done);
        }
      ], function(err, bookingId) {
        if (err) {
          if (bookingId) {
            removeBooking(bookingId, function() {
              reject(err);
            });
          } else {
            return reject(err);
          }
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
  var insertData = {
    user_id: userId,
    subject: subject
  };
  connection.query('INSERT INTO booking SET ?', insertData, function(err, data) {
    if (err) {
      done(err);
    } else {
      done(null, data.insertId);
    }
  });
}

function insertUserData(bookingId, bookingObject, done) {
  var userFields = ['first_name',
                      'last_name',
                      'email',
                      'phone',
                      'address_street',
                      'address_city',
                      'address_postal',
                      'address_country',
                      'company_name',
                      'company_tax_no'];

  var insertData = {
    'booking_id': bookingId
  };
  for (var i = 0; i < userFields.length; i++) {
    var field = userFields[i];
    if (bookingObject.user[field]) {
      insertData[field] = bookingObject.user[field];
    }
  }
  connection.query('INSERT INTO booking_user SET ?', insertData, function(err) {
    if (err) {
      return done(err, bookingId);
    } else {
      return done(null, bookingId, bookingObject);
    }
  });
}

function insertBookingSegment(bookingId, bookingObject, done) {
  var segments = [];
  _.each(bookingObject.trip.groupSegment, function(groupSegment) {
    _.each(groupSegment, function(segment) {
      segments.push(segment);
    });
  });

  var order = 0;
  async.each(segments, function(item, callback) {
    order++;
    var insertObject = {
      booking_id: bookingId,
      segment_id: item.id,
      segment_selected: item.isBooked,
      provider_id: null,
      provider_booking_id: null,
      segment_price: item.price.amount,
      segment_currency: item.price.currency,
      segment_tax: 0,
      segment_start_time: item.departureTime,
      segment_start_location_longitude: item.start.location.longitude,
      segment_start_location_latitude: item.start.location.latitude,
      segment_start_location_name: item.start.description,
      segment_end_time: item.arrivalTime,
      segment_end_location_longitude: item.end.location.longitude,
      segment_end_location_latitude: item.end.location.latitude,
      segment_end_location_name: item.end.description,
      segment_type: item.type,
      segment_order: order,
      segment_checkin_url: null
    };
    connection.query('INSERT INTO booking_segment SET ?', insertObject, callback);
  }, function(err) {
    if (err) {
      return done(err, bookingId);
    } else {
      return done(null);
    }
  });
}

function sendBookingSuccessEmail(bookingObject, req, done) {
  var transporter = nodeMailer.createTransport(authConfig.nodeMailer.mandrill);
  var mailOptions = {
    to: bookingObject.user.email,
    from: authConfig.mailOptions.supportEmail,
    subject: translate('email.booking_success.subject', req.languageKey),
    text: translate('email.booking_success.body', req.languageKey)
  };

  transporter.sendMail(mailOptions, function(err) {
    done(err);
  });
}

function removeBooking(bookingId, done) {
  var deleteQueries = [
    'DELETE FROM booking_segment WHERE booking_id = ?',
    'DELETE FROM booking_user WHERE booking_id = ?',
    'DELETE FROM booking where booking_id = ?'
  ];
  async.each(deleteQueries, function(query, callback) {
    connection.query(query, callback);
  }, done);
}
