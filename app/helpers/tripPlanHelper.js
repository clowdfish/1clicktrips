var async = require('async');
var Promise = require('es6-promise').Promise;
var tzwhere = require('tzwhere');
var moment = require('moment-timezone');
var ItineraryHelper = require('./itineraryHelper');
var ICS_VERSION = 2;
var PRODID = '-//1ClickTrips//EN';
var CALSCALE = 'GREGORIAN';
var LINE_BREAK = '\n';
function TripPlanHelper() {
  this.itineraryHelper = new ItineraryHelper();
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
  var summary = this.getTripSubject(searchObject, itinerary);
  var description = this.getTripDescription(searchObject, itinerary);
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
        'SUMMARY:' + calendarData.summary,
        'DESCRIPTION:' + calendarData.description,
        'CLASS:' + calendarData.className,
        'CREATED:' + calendarData.created,
        'GEO:' + calendarData.geo,
        'LOCATION:' + calendarData.location,
        'UID:' + calendarData.uid,
        'COORDINATES:' + calendarData.geo,
      'END:VEVENT',
    'END:VCALENDAR'
  ];
  return contentArray;
}

TripPlanHelper.prototype.getTripSubject = function(searchObject, itinerary) {
  return searchObject.originDescription + ' to ' + searchObject.destinationDescription;
}

TripPlanHelper.prototype.getTripDescription = function(searchObject, itinerary) {
  var segments = this.itineraryHelper.getActiveSegmentFromItinerary(itinerary, {});
  var description = '';
  for (var i = 0; i < segments.length; i++) {
    var segment = segments[i];
    description += this.getVerbBySegmentType(segment.type) + ' to ' + segment.end.description + '\\n'
                       + 'Depart at ' + this.formatSegmentTime(segment.departureTime) + ' from ' + segment.start.description + '\\n'
                       + 'Arrive at ' + this.formatSegmentTime(segment.arrivalTime) + ' from ' + segment.end.description + '\\n';
    if (i < segments.length - 1 ) {
      description += '\\n';
    }
  }
  return description;
}

TripPlanHelper.prototype.formatSegmentTime = function(segmentTime) {
  return moment(segmentTime).format('HH:mm');
}

TripPlanHelper.prototype.getVerbBySegmentType = function(segmentType) {
  switch (segmentType) {
    case 0:
      return 'Sleep';
    case 1:
      return 'Walk';
    case 2:
      return 'Drive';
    case 4:
      return 'Bus';
    case 6:
      return 'Drive';
    case 8:
      return 'Train';
    case 16:
      return 'Fly';
    case 32:
      return 'Cab';
    case 64:
      return 'Ship';
  }
}

TripPlanHelper.prototype.mergeContentArray = function(contentArray) {
  var content = [];
  for (var contentIndex = 0; contentIndex < contentArray.length; contentIndex++) {
    content.push(foldLine(contentArray[contentIndex]));
  }
  return content.join(LINE_BREAK);
}

TripPlanHelper.prototype.escapeSpecialCharacter = function(text) {
  return text;
  return text.replace(/[\\;,]/g, function(character) {
    return '\\' + character;
  });
}

/**
* Any line longer than 75 octet SHOULD be folded
*/
function foldLine(line) {
  var originLineLength = byteLength(line);
  if (originLineLength <= 75) {
    return line;
  }
  var foldedLength = 0;
  var lines = [];
  var cutIndex = 0;
  var cutLength = 75; //equal 75 after include a line break
  var spaceCount = 0;
  while (foldedLength < originLineLength) {
    var newline = line.substr(cutIndex, cutLength);
    if (byteLength(newline) <= 75) {
      lines.push(repeat(' ', spaceCount) + newline);
      cutIndex += cutLength;
      cutLength = 75;
      spaceCount = 1;
      foldedLength += byteLength(newline);
    } else {
      cutLength--;
    }
  }
  return lines.join(LINE_BREAK);
}

function repeat(character, count) {
  var result = '';
  for (var i = 0; i < count; i++) {
    result += character;
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