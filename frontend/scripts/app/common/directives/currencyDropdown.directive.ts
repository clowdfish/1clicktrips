/// <reference path="../../../_all.ts" />

module Common {

  'use strict';

  export function currencyDropdown(currency: Common.Currency) {
    return {
      restrict: 'E',
      scope: {},
      templateUrl: 'scripts/app/templates/directives/currency-dropdown.html',
      link: link
    };

    function link(scope, element, attrs) {
      scope.currencies = currency.getAvailableCurrencies();
      scope.selectedCurrency = currency.getSelectedCurrency();
      scope.isShowCurrencyList = false;
      scope.selectCurrency = selectCurrency;

      scope.$watch(currency.selectedCurrency, () => {
        scope.selectedCurrency = currency.selectedCurrency;
      });

      function selectCurrency(currencyItem: Common.CurrencyItem) {
        scope.selectedCurrency = currencyItem;
        currency.setSelectedCurrency(currencyItem.code);
      }
    }
  }
}