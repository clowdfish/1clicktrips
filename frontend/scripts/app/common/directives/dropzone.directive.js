angular
  .module('app.common')
  .directive('dropzone', dropzone);

function dropzone() {

  return {
    restrict: 'E',
    templateUrl: 'scripts/app/templates/directives/dropzone.html',
    scope: {
      schedule: '=',
      startSearch: '&'
    },
    link: link
  };

  function link(scope, element, attrs) {
    scope.schedule = null;
    scope.error = null;

    scope.processFile = function() {
      if (scope.file != null && scope.file.type.match('text/calendar')) {
        var reader = new FileReader();

        reader.onerror = errorHandler;

        reader.onload = function() {
          // the file is ready
          scope.$apply(function () {
            scope.schedule = parseIcsFile(scope, reader.result);
          });
        };

        reader.readAsText(scope.file, 'utf-8');
      }
    };
  }

  /**
   * Error handler for reading the .ics file.
   *
   * @param evt
   */
  function errorHandler(evt) {

    switch(evt.target.error.code) {
      case evt.target.error.NOT_FOUND_ERR:
        alert('File Not Found!');
        break;
      case evt.target.error.NOT_READABLE_ERR:
        alert('File is not readable!');
        break;
      case evt.target.error.ABORT_ERR:
        break;
      default:
        alert('An error occurred reading this file.');
    }
  }

  /**
   * The parser for the .ics file format.
   *
   * @param scope
   * @param text
   */
  function parseIcsFile(scope, text) {

    var linesArray = text.split("\n");

    if(linesArray.length < 5) {
      scope.error = new Error('Wrong file structure or encoding.');
      return null;
    }

    var icsHierarchy = [];
    var appointmentObject = {};

    linesArray.forEach(function(line) {
      var hierarchy;

      if(line.startsWith('BEGIN')) {
        hierarchy = line.split(':')[1];
        icsHierarchy.push(hierarchy.substr(0, hierarchy.length - 1));
      }
      else if(line.startsWith('END')) {
        hierarchy = line.split(':')[1];
        hierarchy = hierarchy.substr(0, hierarchy.length - 1);

        if (icsHierarchy[icsHierarchy.length - 1] == hierarchy)
          icsHierarchy.pop();
        else {
          scope.error = new Error('Wrong file structure.');
        }
      }
      else if(icsHierarchy[icsHierarchy.length - 1] == 'VEVENT') {

        if(line.startsWith('DTSTART'))
          appointmentObject.time = formatTiming(line.split(':')[1]);

        if(line.startsWith('DTEND'))
          appointmentObject.appointmentEnd = formatTiming(line.split(':')[1]);

        if(line.startsWith('LOCATION'))
          appointmentObject.destinationAddress = formatAddress(line.substr(9));

        if(line.startsWith('SUMMARY'))
          appointmentObject.title = line.substr(8);

        if(line.startsWith('COORDINATES'))
          appointmentObject.destination = parseGeoCoordinates(line.split(':')[1]);
      }
    });

    if(!appointmentObject.hasOwnProperty('title'))
      appointmentObject.title = 'Your appointment data';

    var complete =
      appointmentObject.hasOwnProperty('destination') &&
      appointmentObject.destination.hasOwnProperty('latitude') &&
      appointmentObject.destination.hasOwnProperty('longitude') &&
      appointmentObject.hasOwnProperty('destinationAddress') &&
      appointmentObject.hasOwnProperty('time');

    if(!complete) {
      scope.error = new Error('Wrong file structure.');
      return null;
    }

    scope.error = null;
    return appointmentObject;
  }

  /**
   * Replace line breaks with comma.
   *
   * @param text
   * @returns {string}
   */
  function formatAddress(text) {
    return text.replace('\\n', ', ');
  }

  /**
   * Create moment object out of datetime string
   *
   * @param text
   * @returns {*}
   */
  function formatTiming(text) {
    return moment(text, 'YYYYMMDDTHHmmss');
  }

  /**
   * Create geo data object from string.
   *
   * @param text
   * @returns {{latitude: Number, longitude: Number}}
   */
  function parseGeoCoordinates(text) {
    var textArray = text.split(',');

    return {
      latitude: parseFloat(textArray[0]),
      longitude: parseFloat(textArray[1])
    };
  }
}