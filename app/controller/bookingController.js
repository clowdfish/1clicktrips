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

var bookingSelectHelper = require('../helpers/bookingSelectHelper');
var BookingFile = require('../helpers/bookingFile');
var fs = require('fs');
module.exports = {

  getBookings: function(userId, limit) {
    return new Promise(function(resolve, reject) {
      return bookingSelectHelper(userId, function(err, result) {
        if (err) return reject(err);
        return resolve(result);
      });
    });
  },

  requestRealBooking: function(userId, bookingObject, req) {
    return new Promise(function(resolve, reject) {
      async.waterfall([
        function(done) {
          var isBooked = true;
          insertBooking(userId, bookingObject, isBooked, done);
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
              return reject(err);
            });
          } else {
            return reject(err);
          }
        }
        return resolve();
      });
    });
  },

  getById: function(bookingId, userId) {
    return new Promise(function(resolve, reject) {
      connection.query('SELECT * FROM booking WHERE id = ? And user_id = ?', [bookingId, userId], function(err, rows) {
        if (err) {
          return reject(err);
        }
        if (rows.length == 0) {
          return resolve(null);
        }
        return resolve(rows[0]);
      });
    });
  },

  storeBooking: function(userId, req) {
    return new Promise(function(resolve, reject) {
      var bookingObject = req.body;
      var bookingId = null;

      if (userId === -1) {
        return reject(new Error('status.user.error.authorization.failure'));
      }

      async.waterfall([
        function(done) {
          var isBooked = false;
          insertBooking(userId, bookingObject, isBooked, done);
        },
        function(newBookingId, done) {
          bookingId = newBookingId;
          console.log(newBookingId);
          insertBookingSegment(bookingId, bookingObject, done);
        },
        function(done) {
          copyUserProfileToBookingUser(userId, bookingId, done);
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

  deleteById: function(userId, bookingId) {
    return new Promise(function(resolve, reject) {
      async.waterfall([
        function(done) {
          connection.query('SELECT * FROM booking WHERE user_id = ? AND id = ? AND booked = 0', [userId, bookingId], function(err, rows) {
            if (err) {
              return done(err);
            }
            if (rows.length == 0) {
              return done(new Error('status.error.cant.delete.booking'));
            }
            return done(null, rows[0]);
          });
        },
        function(booking, done) {
          removeBooking(booking.id, done);
        }
      ], function(err) {
        if (err) {
          return reject(err);
        }
        return resolve();
      });
    });
  },

  getCalendarFile: function(userId, bookingId) {
    return new Promise(function(resolve, reject) {
      var file = new BookingFile(userId, bookingId);
      file
        .generate()
        .then(function(file) {
          return resolve(file);
        })
        .catch(function(err) {
          return reject(err);
        });
    });
  }
};


function insertBooking(userId, bookingObject, isBooked, done) {
  var subject = bookingObject.trip.origin + ' ' + bookingObject.trip.destination;

  var insertData = {
    user_id: userId,
    subject: subject,
    booked: isBooked,
    origin: bookingObject.trip.origin,
    destination: bookingObject.trip.destination,
    start_date: bookingObject.trip.appointmentStart,
    end_date: bookingObject.trip.appointmentEnd,
    origin_location_latitude: 0,
    origin_location_longitude: 0,
    destination_location_latitude: 0,
    destination_location_longitude: 0
  };

  var originSegment = _.first(_.first(bookingObject.trip.groupSegment));
  var destinationSegment = _.last(_.first(bookingObject.trip.groupSegment));

  if (originSegment != null) {
    insertData['origin_location_latitude'] = originSegment.start.location.latitude;
    insertData['origin_location_longitude'] = originSegment.start.location.longitude;
  }

  if (destinationSegment != null) {
    insertData['destination_location_latitude'] = destinationSegment.end.location.latitude;
    insertData['destination_location_longitude'] = destinationSegment.end.location.longitude;
  }

  connection.query('INSERT INTO booking SET ?', insertData, function(err, data) {
    if (err) {
      return done(err);
    } else {
      return done(null, data.insertId);
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

function copyUserProfileToBookingUser(userId, bookingId, finish) {
  async.waterfall([
    function(done) {
      connection.query('SELECT * FROM user WHERE id = ?', [userId], function(err, rows) {
        if (err) return done(err);
        if (rows.length > 0) {
          return done(null, rows[0]);
        } else {
          return done(new Error('error.invalid.user.id'));
        }
      });
    },

    function(user, done) {
      connection.query('SELECT * FROM profile WHERE id = ?', [user.profile_id], function(err, rows) {
        if (err) return done(err);
        if (rows.length > 0) {
          var userProfile = rows[0];
          userProfile['email'] = user['email'];
          return done(null, rows[0]);
        } else {
          return done(new Error('error.invalid.profile.id'));
        }
      });
    },

    function(userProfile, done) {
      var insertData = {
        booking_id: bookingId,
        email: userProfile['email'],
        first_name: userProfile['first_name'],
        last_name: userProfile['last_name'],
        phone: null,
        address_street: userProfile['street'],
        address_city: userProfile['city'],
        address_postal: userProfile['zip_code'],
        address_country: userProfile['country'],
        company_name: null,
        company_tax_no: null
      };
      connection.query('INSERT INTO booking_user SET ?', insertData, function(err) {
        if (err) {
          return done(err);
        } else {
          return done();
        }
      });
    }
  ], function(err) {
    if (err) {
      return finish(err);
    } else {
      return finish();
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
      return done(err);
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
    return done(err);
  });
}

function removeBooking(bookingId, done) {
  async.waterfall([
    function(callback) {
      var deleteQueries = [
        'DELETE FROM booking_segment WHERE booking_id = ?',
        'DELETE FROM booking_user WHERE booking_id = ?',
        'DELETE FROM booking where id = ?'
      ];
      async.each(deleteQueries, function(query, deleteDone) {
        connection.query(query, [bookingId], function(err) {
          if (err) {
            return deleteDone(err);
          } else {
            return deleteDone();
          }
        });
      }, callback);
    },
    function(callback) {
      connection.query('UPDATE booking SET reference = null WHERE reference = ?', [bookingId], function(err) {
        if (err) return callback(err);
        return callback();
      });
    }
  ], function(err) {
    if (err) return done(err);
    return done();
  });

}
