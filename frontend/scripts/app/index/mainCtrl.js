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
    /**
     * Global service for app config data
     * @type {[type]}
     */
    $scope.appConfig = appConfig;

    /**
     * Change language function
     * @type {Function}
     */
    $scope.changeLanguage = changeLanguage;

    /**
     * CHange currency function
     * @type {Function}
     */
    $scope.changeCurrency = changeCurrency;

    /**
     * Is Mobile or not
     * @type {Boolean}
     */
    $scope.isMobile = browser.isMobileDevice();

    /**
     * Should show menu ?
     * @type {Boolean}
     */
    $scope.showMenu = false;

    /**
     * Show language dropdown
     * @type {Boolean}
     */
    $scope.showLanguages = false;

    /**
     * Show currencies dropdown
     * @type {Boolean}
     */
    $scope.showCurrencies = false;

    /**
     * Key/Value object contains currency data
     * @type {Object}
     */
    $scope.currencies = {};

    /**
     * Key/Value object contains languages data
     * @type {Object}
     */
    $scope.languages = {};

    /**
     * Active Language Key
     * @type {String}
     */
    $scope.activeLanguageKey = null;

    /**
     * Active Currency key
     * @type {String}
     */
    $scope.activeCurrency = null;

    /**
     * User profile data
     */
    $scope.userProfile = null;

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

    /**
     * Get currencies data
     */
    function initCurrencies() {
      appConfig.activeCurrency = currencyService.getActiveCurrency();
      if (appConfig.activeCurrency == null) {
        appConfig.activeCurrency = 'usd'
      }
      $scope.currencies = currencyService.getAvailableCurrencies();
    }

    function changeCurrency(key) {
      if (!$scope.currencies[key]) {
        return;
      }
      currencyService.setActiveCurrency(key);
      appConfig.activeCurrency = key;
    }

    /**
     * Fetch language data and set active language
     */
    function initLanguages() {
      appConfig.activeLanguageKey = locale;
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

  }
})();
