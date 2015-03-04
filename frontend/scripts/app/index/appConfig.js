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
    this.activeLanguage = 'en';
    this.currencyDecimalDigits = 2;
    return this;
  }

})();
