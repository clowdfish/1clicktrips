(function() {

  'use strict';

  angular
    .module('app.index')
    .controller('indexCtrl', indexCtrl);

  function indexCtrl($scope, $translate, currencyService, appConfig, localStorageService, languageService) {

    $scope.appConfig = appConfig;
    $scope.changeLanguage = changeLanguage;
    $scope.changeCurrency = changeCurrency;

    $scope.$watch('appConfig.activeCurrency', function() {
      $scope.activeCurrency = appConfig.activeCurrency;
    });

    $scope.$watch('appConfig.activeLanguageKey', function() {
      $scope.activeLanguageKey = appConfig.activeLanguageKey;
    });

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
      appConfig.activeCurrency = currencyService.getActiveCurrency();
      if (appConfig.activeCurrency == null) {
        appConfig.activeCurrency = 'usd';
      }
      appConfig.currencySymbol = currencyService.getCurrencySymbol(appConfig.activeCurrency);
      appConfig.currencyDecimalDigits = $scope.currencies[appConfig.activeCurrency].decimalDigits;
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

    function changeLanguage(key) {
      languageService.setActiveLanguageKey(key);
      $scope.activeLanguageKey = key;
      $translate.use($scope.activeLanguageKey);
    }

    function changeCurrency(key) {
      currencyService.setActiveCurrency(key);
      appConfig.currencySymbol = currencyService.getCurrencySymbol(key);
      appConfig.activeCurrency = key;
    }
  }
})();
