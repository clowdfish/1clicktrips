(function() {

  'use strict';

  angular
    .module('app.common')
    .service('date', date);

  function date() {

    this.stringToDate = stringToDate;

    /**
    * Convert date string with timezone to Date object
    * Eg: 2015-02-10T02:54:51+00:0
    * @params {string} date - Datetime string
    * @return {Date} date object
    */
    function stringToDate(date) {
      return moment(date, "YYYY-MM-DDTHH:mm:ssZ").toDate();
    }
  }
})();