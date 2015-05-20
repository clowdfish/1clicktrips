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
      if (dateString === null) return null;
      if (typeof(dateString) === "string" && dateString.trim() !== '') {
        var date = moment(dateString).toDate();
        return dateFilter(date, format);
      }
    }
  }
})();
