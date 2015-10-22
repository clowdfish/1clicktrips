/// <reference path="../../../_all.ts" />

module Common {

  'use strict';

  export function currencyDropdown(currency: Common.Currency) {
    return {
      restrict: 'E',
      replace: true,
      scope: {},
      templateUrl: 'scripts/app/templates/directives/currency-dropdown.html',
      link: link
    };

    function link(scope, element, attrs) {

      scope.showCurrencyList = false;

      scope.currencies = currency.getAvailableCurrencies();
      scope.selectedCurrency = currency.getSelectedCurrency();
      scope.selectCurrency = selectCurrency;

      /**
       * Set selected currency.
       *
       * @param currencyItem
       */
      function selectCurrency(currencyItem: Common.CurrencyItem) {
        scope.selectedCurrency = currencyItem;

        currency.setSelectedCurrency(currencyItem.code);
      }
    }
  }
}