var dbConfig = require('../../config/database.js');
var Promise = require('es6-promise').Promise;
var mysql = require('mysql');
var connection = mysql.createConnection(dbConfig.connection);
var async = require('async');
var _ = require('underscore');

function bookings(userId, callback) {
  async.waterfall([
    function(done) {
      getAllBookings(userId, done);
    },
    function(bookings, done) {
      attachAdditionBookingData(bookings, done);
    }
  ], function(err, result) {
    if (err) return callback(err);
    callback(null, result);
  })
}

function getAllBookings(userId, done) {
  connection.query('SELECT * FROM booking WHERE user_id = ? and reference is null', [userId], function(err, rows) {
    if (err) {
      return done(err);
    }
    var result = [];
    for (var i = 0; i < rows.length; i++) {
      var item = rows[i];
      item['booked'] = rows[i]['booked'] == 1 ? true : false;
      result.push(item);
    }
    return done(null, result);
  });
}

function attachAdditionBookingData(bookings, done) {
  async.each(bookings, function(booking, bookingDone) {
    async.series([
      function(participantDone) {
        attachParticipants(booking, participantDone);
      },
      function(hotelDone) {
        attachHotel(booking, hotelDone);
      }
    ], function(err) {
      if (err) return done(err);
      return done(null, bookings);
    });
  });
}

function attachParticipants(booking, done) {
  booking['participants'] = [];
  connection.query('SELECT * FROM booking WHERE reference = ?', [booking.id], function(err, references) {
    if (err) return done(err);
    async.each(references, function(reference, referenceDone) {
      getParticipantFromReference(reference.id, function(err, participant) {
        if (err) return referenceDone(err);
        booking['participants'].push(participant);
        referenceDone();
      });
    }, function(err) {
      if (err) return done(err);
      return done();
    });
  });

}

function getParticipantFromReference(bookingId, done) {
  var selectQuery = 'select * from booking b ' +
                    'join user u on u.id = b.user_id ' +
                    'join profile p on p.id = u.profile_id ' +
                    'where b.id = ?';
  connection.query(selectQuery, [bookingId], function(err, rows) {
    if (err) return done(err);
    if (rows.length == 0) {
      return done(null, null);
    }
    var row = rows[0];
    var result = {
      firstName: row['first_name'],
      lastName: row['last_name'],
      email: row['email'],
      booked: row['booked'] == 1 ? true : false,
      arrivalTime: row['booking_date'],
      image: row['image'],
      profile: "http://somewhere.com"
    };
    done(null, result);
  });
}

function attachHotel(booking, done) {
  connection.query('SELECT * FROM hotel WHERE booking_id = ?', [booking.id], function(err, rows) {
    if (err) return done(err);
    if (rows.length === null) {
      return done(null, null);
    }
    booking['hotel'] = rows[0];
    return done();
  });
}


module.exports = bookings;
