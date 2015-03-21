/**
 * Currency formatting filter
 */
(function() {

  'use strict';

  angular
    .module('app.common')
    .filter('price', price);

  function price(currencyService, currencyFilter) {
    return function(price, currencyCode) {

      if (!price || !currencyCode) {
        return;
      }

      var currencyData = currencyService.getCurrencyDataByKey(currencyCode);

      if (!currencyData) {
        //Use Angular currency filter if don't have currency data
        return currencyFilter(price);
      }

      return formatMoney(price,
                        currencyData.symbol,
                        currencyData.thousandsSeparator,
                        currencyData.decimalSeparator,
                        currencyData.symbolOnLeft,
                        currencyData.spaceBetweenAmountAndSymbol,
                        currencyData.decimalDigits);

    }

    function formatMoney(number,
                        symbol,
                        thousandsSeparator,
                        decimalSeparator,
                        symbolOnLeft,
                        spaceBetweenAmountAndSymbol,
                        decimalDigits) {
      var numberArray = number.toFixed(decimalDigits).split(".");

      //Add separator
      var formattedNumber = numberArray[0]
                              .split("")
                              .reverse()
                              .reduce(function(acc, num, i) {
                                  return  num +
                                          (i && !(i % 3) ? thousandsSeparator : "") +
                                          acc;
                              }, "");
      formattedNumber += decimalSeparator + numberArray[1];

      //Add space between amount and symbol
      var space = spaceBetweenAmountAndSymbol ? ' ' : '';

      //Add currency symbol
      formattedNumber = symbolOnLeft ? symbol + space + formattedNumber :
                                      formattedNumber + space + symbol;

      return formattedNumber;
    }
  }


})();
