/// <reference path="../../../_all.ts" />

module Common {

  'use strict';

  /**
  * Formats a price with its currency.
  */
  export function priceFormatter(currency) {

    return function(price, currencyString) {

      if (currencyString && typeof(currencyString) == 'string' && currencyString.trim() != '') {
        currencyString = currencyString.toLowerCase();

        var currencyObject = currency.getCurrencyByCode(currencyString);

        var priceString = '';
        if(currencyObject.symbolOnLeft) {
          priceString += currencyObject.symbol;

          if(currencyObject.spaceBetweenAmountAndSymbol)
            priceString += " ";

          priceString += price;
        }
        else {
          priceString += price;

          if(currencyObject.spaceBetweenAmountAndSymbol)
            priceString += " ";

          priceString += currencyObject.symbol;
        }

        priceString = priceString.replace(/\.|,/, currencyObject.decimalSeparator);
        return priceString;
      }
      return '';
    }
  }
}
