(function() {

  'use strict';

  angular
    .module('app.index')
    .controller('indexCtrl', indexCtrl);

  function indexCtrl($scope, $translate, currencyService, appConfig, localStorageService, languageService) {
    $scope.appConfig = appConfig;

    initLanguages();

    initCurrencies();

    function initCurrencies() {
      $scope.currencies = {};
      currencyService
        .getAvailableCurrencies()
        .then(function(data) {
          $scope.currencies = data;
          initActiveCurrency();
        });
    }

    function initActiveCurrency() {
      $scope.activeCurrency = 'usd';
      appConfig.activeCurrency = currencyService.getActiveCurrency();
      if (appConfig.activeCurrency == null) {
        appConfig.activeCurrency = 'usd';
      }
      appConfig.currencySymbol = currencyService.getCurrencySymbol(appConfig.activeCurrency);
    }

    function initLanguages() {
      $scope.languages = {};
      languageService
        .getAvailableLanguages()
        .then(function(data) {
          $scope.languages = data;
          initActiveLanguage();
        });
    }

    function initActiveLanguage() {
      var storageLanguageKey = languageService.getActiveLanguageKey();
      if (storageLanguageKey == null) {
        if (locale && $scope.languages[locale]) {
          $scope.activeLanguageKey = locale;
        } else {
          $scope.activeLanguageKey = 'en';
        }
      } else {
        $scope.activeLanguageKey = storageLanguageKey;
      }
      $translate.use($scope.activeLanguageKey);
    }
  }
})();
