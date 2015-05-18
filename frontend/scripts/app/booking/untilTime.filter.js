(function() {

  'use strict';

  angular
    .module('app.booking')
    .filter('untilTime', untilTime);

  function untilTime() {
    return function(startDateString, endDateString) {
      var startDate = moment(startDateString);
      var endDate = moment(endDateString);
      if (endDate.date() > startDate.date()) {
        return startDate.format('DD.MM.YYYY, hh:mm') + ' - ' + endDate.format('DD.MM.YYYY, hh:mm');
      } else {
        return startDate.format('DD.MM.YYYY') + ', ' + startDate.format('hh:mm') + ' - ' + endDate.format('hh:mm');
      }
    }
  }

})();
