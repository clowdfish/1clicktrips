(function() {

  'use strict';

  angular
    .module('app.common')
    .filter('dateFormatter', dateFormatter);

  /**
  * Convert a string to date and format
  */
  function dateFormatter() {

    return function(date, format) {
      if (date == null) return "";

      if(!format)
        format = "DD.MM.YYYY HH:mm";

      if (typeof(date) == "string" && date.trim() != '') {
        return moment(date, 'YYYY-MM-DDTHH:mm:ss').format(format);
      }

      try {
        return date.format(format);
      }
      catch(ex) {
        return "";
      }
    }
  }
})();
