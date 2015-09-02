(function() {

  'use strict';

  angular
    .module('app.common')
    .service('currency', currency);

  function currency() {

    return {
      get: function() {
        return {
          "code": "EUR",
          "symbol": "€",
          "thousandsSeparator": ".",
          "decimalSeparator": ",",
          "symbolOnLeft": false,
          "spaceBetweenAmountAndSymbol": true,
          "roundingCoefficient": 0,
          "decimalDigits": 2
        }
      }
    }
  }
})();