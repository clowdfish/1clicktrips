(function() {

  'use strict';

  angular
    .module('app.common')
    .filter('dateFormatter', dateFormatter);

  /**
  * Convert a string to date and format
  */
  function dateFormatter(dateFilter) {
    return function(dateString, format) {
      if (typeof(dateString) === "string") {
        var date = moment(dateString).toDate();
        return dateFilter(date, format);
      }
    }
  }
})();
