(function() {

  'use strict';

  angular
    .module('app.common')
    .filter('currencySymbol', currencySymbol);

  function currencySymbol() {
    return function(currencyName) {
      var name = currencyName.trim().toLowerCase();
      switch (name) {
        case 'eur':
          return '€';
        case 'usd':
        default:
          return '$';
      }
    }
  }
})();
