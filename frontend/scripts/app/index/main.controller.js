(function() {

  'use strict';

  angular
    .module('app.index')
    .controller('mainCtrl', mainCtrl);

  function mainCtrl($scope,
                    $modal,
                    $translate,
                    $state,
                    currencyApi,
                    appConfig,
                    browser,
                    languageApi,
                    authApi,
                    session,
                    userApi,
                    AUTH_EVENTS,
                    authHelper) {

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
     * Show slider?
     * @type {Boolean}
     */
    $scope.showSlider = false;

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
     * Active Language Name
     */
    $scope.activeLanguageName = null;

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

    $scope.$watch('appConfig.userProfile', function() {
      $scope.userProfile = appConfig.userProfile;
    });

    $scope.$watch('appConfig.activeCurrency', function() {
      $scope.activeCurrency = appConfig.activeCurrency;
    });

    $scope.createLoginModal = function(size) {
      authHelper.openLoginDialog();
    };

    $scope.createSignupModal = function(size) {

      $modal.open({
        templateUrl: 'scripts/app/templates/auth/signup-modal.html',
        controller: 'signupCtrl',
        size: size ? size : 'lg'
      });
    };

    $scope.logout = function() {
      authApi.logout();
      $scope.userProfile = null;
    };

    $scope.openProfile = function() {
      $state.go('settings.profile');
    };

    /* MENU FUNCTIONS */

    $scope.toggleSlider = function() {
      $scope.showSlider = !$scope.showSlider;
    };

    $scope.toggleMenu = function() {
      $scope.showMenu = !$scope.showMenu;
    };

    $scope.toggleLanguages = function() {
      $scope.showLanguages = !$scope.showLanguages;
    };

    $scope.toggleCurrencies = function() {
      $scope.showCurrencies = !$scope.showCurrencies;
    };

    /* END OF MENU FUNCTIONS */

    function getUserProfile() {
      $scope.userProfile = session.getUserProfile();
      if ($scope.userProfile != null) {
        return false;
      }
      userApi
        .getUserProfile()
        .then(function(userProfile) {
          appConfig.userProfile = userProfile;
          $scope.userProfile = userProfile;
        }, function() {
          appConfig.userProfile = null;
          $scope.userProfile = null;
        });
    }

    /**
     * Get currencies data
     */
    function initCurrencies() {
      appConfig.activeCurrency = currencyApi.getActiveCurrency();
      if (appConfig.activeCurrency == null) {
        appConfig.activeCurrency = 'usd';
      }
      $scope.currencies = currencyApi.getAvailableCurrencies();
    }

    function changeCurrency(code) {
      $scope.isShowingCurrencies = false;
      code = code.toLowerCase();

      if (!currencyApi.getCurrencyDataByCode(code)) {
        return;
      }

      currencyApi.setActiveCurrency(code);
      appConfig.activeCurrency = code;
    }

    /**
     * Fetch language data and set active language
     */
    function initLanguages() {
      $scope.isShowingLanguages = false;
      $scope.languages = languageApi.getAvailableLanguages();
    }

    $scope.$watch('appConfig.activeLanguageKey', function() {
      $scope.activeLanguageKey = appConfig.activeLanguageKey;
      console.log(appConfig);
      var languageData = languageApi.getLanguageDataByCode($scope.activeLanguageKey);
      $scope.activeLanguageName = languageData.name;
    });

    function changeLanguage(key) {

      if (!languageApi.getLanguageDataByCode(key)) {
        return;
      }

      languageApi
        .setActiveLanguageKey(key)
        .then(function() {

          var hrefArray = location.href.split('#');
          var newHref = '/' + key + '/#' + hrefArray[1];
          console.log(newHref, location.href);

          if (location.href === newHref) {
            location.reload();
          } else {
            location.href = newHref;
          }

        });
    }
  }
})();
