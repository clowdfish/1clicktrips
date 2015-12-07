/// <reference path="../../_all.ts" />

module Common {

  'use strict';

  /**
  * Convert a string to a duration format
  */
  export function durationFormatter($translate) {

    return function(duration, format) {

      if (duration && (typeof(duration) == 'string' && duration.trim() != '') || typeof(duration) == 'number') {

        if (!format)
          format = 'hours';

        var durationObj = moment.duration(duration, 'minutes');

        var fullHours = Math.floor(durationObj.as('hours'));
        var fullMinutes = Math.floor((durationObj.as('hours') % 1) * 60);

        switch(format) {
          case 'hours':
            var durationString = fullHours + ':';
            if(fullMinutes < 10) durationString += '0';
            return durationString + fullMinutes + '';
          case 'full':
            var durationString = fullHours + " ";

            if(fullHours != 1)
              durationString += $translate.instant('general.time.hour.plural');
            else
              durationString += $translate.instant('general.time.hour.singular');

            durationString += " " + fullMinutes + ' ';

            if(fullMinutes != 1)
              durationString += $translate.instant('general.time.minute.plural');
            else
              durationString += $translate.instant('general.time.minute.singular');

            return durationString;
          default:
            return '';
        }
      }
      return '';
    }
  }
}
