var async = require('async');
var Promise = require('es6-promise').Promise;
var dbConfig = require('../../config/database.json');
var tzwhere = require('tzwhere');
var mysql = require('mysql');
var connection = mysql.createConnection(dbConfig.connection);

var ICS_VERSION = 2;
var PRODID = '-//1ClickTrips//EN';
var CALSCALE = 'GREGORIAN';

var moment = require('moment-timezone');
var async = require('async');

/**
* This class generate an ics file from booking data.
*/
function BookingFile(bookingId) {
  this.bookingId = bookingId;
  tzwhere.init();
}

BookingFile.prototype.generate = function() {
  var _this = this;
  return new Promise(function(resolve, reject) {
    async
      .waterfall([
        function(done) {
          _this.queryBookingData(_this.bookingId, done);
        },
        function(booking, bookingSegments, done) {
          var calendarData = _this.generateCalendarData(booking, bookingSegments);
          var contentArray = _this.generateContentArray(calendarData);
          done(null, _this.mergeContentArray(contentArray));
        }
      ], function(err, data) {
        console.log(data);
        if (err) return reject(err);
        return resolve(data);
      });
  });
}

BookingFile.prototype.verifyBookingData = function(bookingData, done) {
  if (bookingData.origin_location_latitude == 0 || bookingData.origin_location_longitude == 0
    || bookingData.destination_location_latitude == 0 || bookingData.destination_location_latitude == 0) {
    return done(new Error("Missing booking location"));
  }
  return done();
}

BookingFile.prototype.queryBookingData = function(bookingId, done) {
  async
    .waterfall([
      function(done) {
        connection.query('SELECT * FROM booking WHERE id = ?', [bookingId], function(err, rows) {
          if (err) {
            return done(err);
          }

          if (rows.length === 0) {
            return done(new Error('Booking record is not exist'));
          }

          return done(null, rows[0]);
        });
      },
      function(bookingData, done) {
        connection.query('SELECT * FROM booking_segment WHERE booking_id = ?', [bookingId], function(err, rows) {
          if (err) {
            return done(err);
          }

          return done(null, bookingData, rows);
        });
      }
    ], function(err, booking, segments) {
      if (err) return done(err);
      return done(null, booking, segments);
    });
}

BookingFile.prototype.generateCalendarData = function(booking, bookingSegments, done) {
  var calendarData = {
    version: ICS_VERSION,
    prodid: PRODID,
    calscale: CALSCALE,
    method: 'PUBLISH'
  };

  originTzName = tzwhere.tzNameAt(booking.origin_location_latitude, booking.origin_location_longitude);
  originTzOffset = Math.round(tzwhere.tzOffsetAt(booking.origin_location_latitude, booking.origin_location_longitude) / 3600);

  destinationTzName = tzwhere.tzNameAt(booking.destination_location_latitude, booking.destination_location_longitude);
  destinationTzOffset = Math.round(tzwhere.tzOffsetAt(booking.destination_location_latitude, booking.destination_location_longitude) / 3600);

  var utcStartDate = moment.tz(booking.start_date, originTzName).utc().format('YYYYMMDDTHHmmss') + 'Z';
  var startDate = moment(booking.start_date).format('YYYYMMDDTHHmmss');
  var endDate = moment(booking.end_date).format('YYYYMMDDTHHmmss');
  var status = booking.booked ? "CONFIRMED" : "TENTATIVE";
  var summary = booking.subject;
  var description = booking.subject;
  var created = moment(booking.booking_date).format('YYYYMMDDTHHmmss') + 'Z';
  var location = booking.destination;
  var geo = booking.destination_location_latitude + ';' + booking.destination_location_longitude;
  var uid = booking.id;

  var calendarData = {
    version: ICS_VERSION,
    prodid: PRODID,
    calscale: CALSCALE,
    method: 'PUBLISH',
    originTzName: originTzName,
    originTzOffset: originTzOffset,
    destinationTzName: destinationTzName,
    destinationTzOffset: destinationTzOffset,
    utcStartDate: utcStartDate,
    startDate: startDate,
    endDate: endDate,
    status: status,
    summary: summary,
    description: description,
    created: created,
    location: location,
    geo: geo,
    uid: uid,
    className: 'PUBLIC'
  };

  return calendarData;
}

BookingFile.prototype.generateContentArray = function(calendarData) {
  var contentArray = [
    'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:' + calendarData.prodid,
      'CALSCALE:' + calendarData.calscale,
      'METHOD:' + calendarData.method,
      'BEGIN:VTIMEZONE',
        'TZID:' + calendarData.originTzName,
        'BEGIN:STANDARD',
          'TZOFFSETFROM:' + calendarData.originTzOffset,
          'TZOFFSETTO:' + calendarData.originTzOffset,
          'DTSTART:19700101T000000',
        'END:STANDARD',
      'END:VTIMEZONE',
      'BEGIN:VTIMEZONE',
        'TZID:' + calendarData.destinationTzName,
        'BEGIN:STANDARD',
          'TZOFFSETFROM:' + calendarData.destinationTzOffset,
          'TZOFFSETTO:' + calendarData.destinationTzOffset,
          'DTSTART:19700101T000000',
        'END:STANDARD',
      'END:VTIMEZONE',
      'BEGIN:VEVENT',
        'DTSTAMP:' + calendarData.utcStartDate,
        'DTSTART;' + 'TZID=' + calendarData.originTzName + ':' + calendarData.startDate,
        'DTEND;' + 'TZID=' + calendarData.destinationTzName + ':' + calendarData.endDate,
        'STATUS:' + calendarData.status,
        'SUMMARY:' + this.escapeSpecialCharacter(calendarData.summary),
        'DESCRIPTION:' + this.escapeSpecialCharacter(calendarData.description),
        'CLASS:' + calendarData.className,
        'CREATED:' + calendarData.created,
        'GEO:' + calendarData.geo,
        'LOCATION:' + this.escapeSpecialCharacter(calendarData.location),
        'UID:' + calendarData.uid,
      'END:VEVENT',
    'END:VCALENDAR'
  ];

  return contentArray;
}

BookingFile.prototype.mergeContentArray = function(contentArray) {
  var _this = this;
  var content = '';
  for (var contentIndex = 0; contentIndex < contentArray.length; contentIndex++) {
    content += foldLine(contentArray[contentIndex]) + '\n';
  }
  return content;
}

BookingFile.prototype.escapeSpecialCharacter = function(text) {
  return text.replace(/[\\;,]/g, function(character) {
    return '\\' + character;
  });
}

/**
* Any line longer than 75 octet SHOULD be folded
*/
function foldLine(line) {
  var originLineLength = byteLength(line);
  if (originLineLength <= 74) {
    return line;
  }
  var foldedLength = 0;
  var lines = [];
  var cutIndex = 0;
  var cutLength = 74; //equal 75 after include a line break
  var spaceCount = 1;
  var space = " ";
  while (foldedLength < originLineLength) {
    var newline = line.substr(cutIndex, cutLength);
    if (byteLength(newline) <= 74) {
      lines.push(repeat(' ', spaceCount) + newline);
      cutIndex += cutLength;
      cutLength = 74;
      spaceCount++;
      foldedLength += byteLength(newline);
    } else {
      cutLength--;
    }
  }
  return lines.join('\n');
}

function repeat(character, count) {
  var result = '';
  for (var i = 0; i < count; i++) {
    result+=character;
  }
  return result;
}

//Returns the byte length of an utf8 string
//See http://stackoverflow.com/questions/5515869/string-length-in-bytes-in-javascript
function byteLength(str) {
  var s = str.length;
  for (var i=str.length-1; i>=0; i--) {
    var code = str.charCodeAt(i);
    if (code > 0x7f && code <= 0x7ff) s++;
    else if (code > 0x7ff && code <= 0xffff) s+=2;
    if (code >= 0xDC00 && code <= 0xDFFF) i--;
  }
  return s;
}

module.exports = BookingFile;
