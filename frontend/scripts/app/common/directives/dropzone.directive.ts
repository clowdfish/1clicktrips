/// <reference path="../../../_all.ts" />

module Common {
  
  export class Dropzone {

    public restrict = 'E';
    public templateUrl = 'scripts/app/templates/directives/dropzone.html';
    public scope = {
      schedule: '=',
      startSearch: '&'
    };
    public link: (scope, element, attrs) => void;
    
    constructor() {

      Dropzone.prototype.link = (scope, element, attrs) => {

        scope.schedule = null;
        scope.error = null;
  
        scope.processFile = (fileObj) => {
  
          if (fileObj) {
            // the file.type property is not always available
            if(!fileObj.type.length || fileObj.type.indexOf('text') != -1) {
  
              var reader = new FileReader();
  
              reader.onerror = this.errorHandler;
              reader.onload = () => {
                // the file is ready
                scope.$apply(() => {
                  scope.schedule = this.parseIcsFile(scope, reader.result);
                });
              };
  
              reader.readAsText(fileObj, 'utf-8');
            }
            else
              scope.error = new Error('File type is not supported.');
          }
          else
            console.warn('The file is null.');
        };
      }
    }
    
    errorHandler = (evt) => {
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
    };

    /**
     * The parser for the .ics file format.
     *
     * @param scope
     * @param text
     */
    parseIcsFile = (scope, text) => {

      var linesArray = text.split("\n");

      if(linesArray.length < 5) {
        scope.error = new Error('Wrong file structure or encoding.');
        return null;
      }

      var icsHierarchy = [];
      var appointmentObject = {};

      linesArray.forEach((line) => {
        var hierarchy;

        if(line.indexOf('BEGIN') == 0) {
          hierarchy = line.split(':')[1];
          icsHierarchy.push(hierarchy.substr(0, hierarchy.length - 1));
        }
        else if(line.indexOf('END') == 0) {
          hierarchy = line.split(':')[1];
          hierarchy = hierarchy.substr(0, hierarchy.length - 1);

          if (icsHierarchy[icsHierarchy.length - 1] == hierarchy)
            icsHierarchy.pop();
          else {
            scope.error = new Error('Wrong file structure.');
          }
        }
        else if(icsHierarchy[icsHierarchy.length - 1] == 'VEVENT') {

          if(line.indexOf('DTSTART') == 0)
            appointmentObject['time'] = this.formatTiming(line.split(':')[1]);

          if(line.indexOf('DTEND') == 0)
            appointmentObject['appointmentEnd'] = this.formatTiming(line.split(':')[1]);

          if(line.indexOf('LOCATION') == 0)
            appointmentObject['destinationAddress'] = this.formatAddress(line.substr(9));

          if(line.indexOf('SUMMARY') == 0)
            appointmentObject['title'] = line.substr(8);

          if(line.indexOf('COORDINATES') == 0)
            appointmentObject['destination'] = this.parseGeoCoordinates(line.split(':')[1]);
        }
      });

      if(!appointmentObject.hasOwnProperty('title'))
        appointmentObject['title'] = 'Your appointment data';

      var complete =
        appointmentObject.hasOwnProperty('destination') &&
        appointmentObject['destination'].hasOwnProperty('latitude') &&
        appointmentObject['destination'].hasOwnProperty('longitude') &&
        appointmentObject.hasOwnProperty('destinationAddress') &&
        appointmentObject.hasOwnProperty('time');

      if(!complete) {
        scope.error = new Error('Wrong file structure.');
        return null;
      }

      scope.error = null;
      return appointmentObject;
    };

    /**
     * Replace line breaks with comma.
     *
     * @param text
     * @returns {string}
     */
    formatAddress = (text) => {
      return text.replace('\\n', ', ');
    };

    /**
     * Create moment object out of datetime string
     *
     * @param text
     * @returns {*}
     */
    formatTiming = (text) => {
      return moment(text, 'YYYYMMDDTHHmmss');
    };

    /**
     * Create geo data object from string.
     *
     * @param text
     * @returns {{latitude: Number, longitude: Number}}
     */
    parseGeoCoordinates = (text) => {
      var textArray = text.split(',');

      return {
        latitude: parseFloat(textArray[0]),
        longitude: parseFloat(textArray[1])
      };
    };
    
    public static Factory() {

      var directive = () => {
        return new Dropzone();
      };

      directive['$inject'] = [];
      return directive;
    }
  }
}