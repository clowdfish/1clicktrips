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
      if (dateString == null) return "";

      if(!format)
        format = "DD.MM.YYYY HH:mm";

      if (typeof(dateString) == "string" && dateString.trim() != '') {
        return moment(dateString, 'YYYY-MM-DDTHH:mm:ss').format(format);
      }

      return "";
    }
  }
})();
