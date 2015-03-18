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
                    browser,
                    localStorageService,
                    languageService,
                    AUTH_EVENTS,
                    authService,
                    session,
                    userService) {

    $scope.appConfig = appConfig;
    $scope.changeLanguage = changeLanguage;
    $scope.changeCurrency = changeCurrency;
    $scope.isMobile = browser.isMobileDevice();
    $scope.showMenu = false;
    $scope.showLanguages = false;
    $scope.showCurrencies = false;

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

    $scope.createLoginModal = function(size) {
      var modalInstance = $modal.open({
        templateUrl: 'scripts/app/templates/auth/login-modal.html',
        controller: 'loginCtrl',
        size: size ? size : 'lg'
      });
    };

    $scope.createSignupModal = function(size) {
      var modalInstance = $modal.open({
        templateUrl: 'scripts/app/templates/auth/signup-modal.html',
        controller: 'signupCtrl',
        size: size ? size : 'lg'
      });
    };

    $scope.logout = function() {
      authService.logout();
      $scope.userProfile = null;
      //alert('Logout successful');
    };

    /* MOBILE MENU FUNCTIONS */

    $scope.toggleMenu = function() {
      $scope.showMenu = !$scope.showMenu;
    };

    $scope.toggleLanguages = function() {
      $scope.showLanguages = !$scope.showLanguages;
    };

    $scope.toggleCurrencies = function() {
      $scope.showCurrencies = !$scope.showCurrencies;
    };

    /* END OF MOBILE MENU FUNCTIONS */

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
      if (locale && $scope.languages[locale]) {
        appConfig.activeLanguageKey = locale;
      } else {
        appConfig.activeLanguageKey = languageService.getActiveLanguageKey();
      }

      if (appConfig.activeLanguageKey === null) {
        appConfig.activeLanguageKey = 'en';
      }

      $scope.activeLanguageKey = appConfig.activeLanguageKey;
      $translate.use($scope.activeLanguageKey);
    }

    function changeLanguage(key) {
      if (!$scope.languages[key]) {
        return;
      }
      var hrefArray = location.href.split('#');
      var newHref = '/' + key + '/#' + hrefArray[1];
      location.href = newHref;
    }

    function changeCurrency(key) {
      currencyService.setActiveCurrency(key);
      appConfig.currencySymbol = currencyService.getCurrencySymbol(key);
      appConfig.activeCurrency = key;
    }
  }
})();
