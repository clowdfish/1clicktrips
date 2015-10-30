var async = require('async');
var Promise = require('es6-promise').Promise;
var tzwhere = require('tzwhere');
var moment = require('moment-timezone');

var ICS_VERSION = 2;
var PRODID = '-//1ClickTrips//EN';
var CALSCALE = 'GREGORIAN';

function TripPlanHelper() {

}

TripPlanHelper.prototype.generateTripPlan = function(searchObject, itinerary) {
  console.log(searchObject);
  console.log(itinerary);
  var data = this.prepareData(searchObject, itinerary);
  console.log(data);
  var iscArray = this.prepareIscContent(data);
  var content = this.mergeContentArray(iscArray);
  return content;
}


TripPlanHelper.prototype.prepareData = function(searchObject, itinerary) {
  var originTzName = tzwhere.tzNameAt(itinerary.origin.location.latitude, itinerary.origin.location.longitude);
  var originTzOffset = Math.round(tzwhere.tzOffsetAt(itinerary.origin.location.latitude, itinerary.origin.location.longitude) / 3600);
  var destinationTzName = tzwhere.tzNameAt(itinerary.destination.location.latitude, itinerary.destination.location.longitude);
  var destinationTzOffset = Math.round(tzwhere.tzOffsetAt(itinerary.destination.location.latitude, itinerary.destination.location.longitude) / 3600);
  var utcStartDate = moment.tz(itinerary.departureTime, originTzName).utc().format('YYYYMMDDTHHmmss') + 'Z';
  var startDate = moment(itinerary.departureTime).format('YYYYMMDDTHHmmss');
  var endDate = moment(itinerary.arrivalTime).format('YYYYMMDDTHHmmss');
  var status = "CONFIRMED";
  var summary = this.getTripSubject(itinerary);
  var description = this.getTripDescription(itinerary);
  var created = moment().format('YYYYMMDDTHHmmss') + 'Z';
  var location = searchObject.destinationDescription;
  var geo = itinerary.destination.location.latitude + ';' + itinerary.destination.location.longitude;
  var uid = itinerary.tripKey;

  return {
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

}

TripPlanHelper.prototype.prepareIscContent = function(calendarData) {
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
        'COORDINATES:' + calendarData.geo,
      'END:VEVENT',
    'END:VCALENDAR'
  ];
  return contentArray;
}

TripPlanHelper.prototype.getTripSubject = function(itinerary) {
  return 'Sample subject';
}

TripPlanHelper.prototype.getTripDescription = function(itinerary) {
  return 'Sample description';
}

TripPlanHelper.prototype.mergeContentArray = function(contentArray) {
  var content = '';
  for (var contentIndex = 0; contentIndex < contentArray.length; contentIndex++) {
    content += foldLine(contentArray[contentIndex]) + '\r\n';
  }
  return content;
}

TripPlanHelper.prototype.escapeSpecialCharacter = function(text) {
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

module.exports = TripPlanHelper;