(function() {

  'use strict';

  angular
    .module('app.index')
    .controller('indexCtrl', indexCtrl);

  function indexCtrl($scope, currencyService, appConfig) {
    $scope.activeCurrency = 'usd';

    appConfig.activeCurrency = currencyService.getActiveCurrency();
    if (appConfig.activeCurrency == null) {
      appConfig.activeCurrency = 'usd';
    }
    appConfig.currencySymbol = currencyService.getCurrencySymbol(appConfig.activeCurrency);

    $scope.appConfig = appConfig;
  }
})();
