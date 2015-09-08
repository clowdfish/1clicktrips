(function() {

  'use strict';

  angular
    .module('app.common')
    .filter('durationFormatter', durationFormatter);

  /**
  * Convert a string to a duration format
  */
  function durationFormatter() {

    return function(duration, format) {

      if (duration && (typeof(duration) == 'string' && duration.trim() != '') || typeof(duration) == 'number') {

        if (!format)
          format = 'hours';

        var durationObj = moment.duration(duration, 'minutes');

        switch(format) {
          case 'hours':
            var durationString = durationObj.hours() + ':';
            if(durationObj.minutes() < 10) durationString += '0';
            return durationString + durationObj.minutes();
          default:
            return '';
        }
      }
      return '';
    }
  }
})();
