/**
* This service store share config data for the whole app
*/
(function() {

  'use strict';

  angular
    .module('app.index')
    .service('appConfig', appConfig);

  function appConfig() {
    this.activeCurrency = 'usd';
    this.currencySymbol = '$';
    this.activeLanguageKey = 'en';
    this.currencyDecimalDigits = 2;
    this.userProfile = null;

    /**
    * Booking Rate Percent
    */
    this.bookingRate = 0;
    return this;
  }

})();
