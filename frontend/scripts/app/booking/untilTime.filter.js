(function() {

  'use strict';

  angular
    .module('app.booking')
    .filter('untilTime', untilTime);

  function untilTime() {
    return function(startDateString, endDateString) {

      if(!startDateString || !endDateString)
        return "";

      var startDate = moment(startDateString);
      var endDate = moment(endDateString);

      if (false === startDate.isValid() || false === endDate.isValid()) {
        return "";
      }

      if (endDate.diff(startDate, 'days') > 0) {
        return startDate.format('DD.MM.YYYY, HH:mm') + ' - ' + endDate.format('DD.MM.YYYY, HH:mm');
      } else {
        return startDate.format('DD.MM.YYYY') + ', ' + startDate.format('HH:mm') + ' - ' + endDate.format('HH:mm');
      }
    }
  }

})();
