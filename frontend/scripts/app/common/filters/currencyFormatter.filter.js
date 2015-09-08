(function() {

  'use strict';

  angular
    .module('app.common')
    .filter('currencyFormatter', currencyFormatter);

  /**
  * Converts a string to a font awesome currency symbol
  */
  function currencyFormatter() {

    return function(currency) {

      if (currency && typeof(currency) == 'string' && currency.trim() != '') {

        currency = currency.toLowerCase();

        switch(currency) {
          case 'eur':
            return 'fa-eur';
          case 'usd':
            return 'fa-dollar';
          default:
            return '';
        }
      }
      return '';
    }
  }
})();
