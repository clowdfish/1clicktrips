(function() {

  'use strict';

  angular
    .module('app.index')
    .controller('mainCtrl', mainCtrl);

  function mainCtrl($scope,
                    $modal,
                    $translate,
                    currencyService,
                    appConfig,
                    localStorageService,
                    languageService,
                    AUTH_EVENTS,
                    authService,
                    session,
                    userService) {

    $scope.appConfig = appConfig;
    $scope.changeLanguage = changeLanguage;
    $scope.changeCurrency = changeCurrency;

    initLanguages();

    initCurrencies();

    getUserProfile();

    $scope.$on(AUTH_EVENTS.loginSuccess, function() {
      getUserProfile();
    });

    $scope.$on(AUTH_EVENTS.signupSuccess, function() {
      getUserProfile();
    });

    $scope.$watch('appConfig.activeCurrency', function() {
      $scope.activeCurrency = appConfig.activeCurrency;
    });

    $scope.$watch('appConfig.activeLanguageKey', function() {
      $scope.activeLanguageKey = appConfig.activeLanguageKey;
    });

    $scope.createLoginModal = function() {
      var modalInstance = $modal.open({
        templateUrl: 'scripts/app/templates/auth/login-modal.html',
        controller: 'loginCtrl',
        size: 'lg'
      });
    }

    $scope.createSignupModal = function() {
      var modalInstance = $modal.open({
        templateUrl: 'scripts/app/templates/auth/signup-modal.html',
        controller: 'signupCtrl',
        size: 'lg'
      });
    }

    $scope.logout = function() {
      authService.logout();
      $scope.userProfile = null;
      alert('Logout successful');
    }

    function initCurrencies() {
      $scope.currencies = {};
      currencyService
        .getAvailableCurrencies()
        .then(function(data) {
          $scope.currencies = data;
          initActiveCurrency();
        });
    }

    function getUserProfile() {
      $scope.userProfile = session.getUserProfile();
      if ($scope.userProfile != null) {
        return false;
      }
      userService
        .getUserProfile()
        .then(function(userProfile) {
          $scope.userProfile = userProfile;
          session.setUserProfile(userProfile);
        }, function() {
          $scope.userProfile = null;
          session.removeUserProfile();
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
