(function() {

  'use strict';

  //Global resolve should only do once
  var isAlreadyResolveGlobal = false;

  angular
    .module('app', [
      'app.common',
      'app.core',
      'app.booking',
      'app.index',
      'app.auth',
      'app.result',
      'app.search',
      'app.dashboard',
      'app.settings',
      'app.templates'
    ])
    .config(config)
    .config(routeConfig)
    .value('googleApiKey', 'AIzaSyC9-ZIG4bma6FIUumqPyYwWTlU-Gc5QnMY')
    .run(run);

  function config($interpolateProvider, $locationProvider) {
    $interpolateProvider.startSymbol('{[');
    $interpolateProvider.endSymbol(']}');
    //$locationProvider.html5Mode(true);
  }

  function routeConfig($stateProvider) {
    /**
    * Resolve global application-wide data at here
    */
    $stateProvider.state('root', {
      abstract: true,
      template: '<div ui-view></div>',
      resolve: {
        rootUserProfile: getUserProfile,
        rootUserSettings: getUserSettings,
        configLanguage: configLanguage
      }
    });
  }

  function run($rootScope, browser, languageApi, $localStorage, AUTH_EVENTS, appConfig) {
    if (browser.isMobileDevice()) {
      FastClick.attach(document.body);
    }

    $rootScope.$on(AUTH_EVENTS.loginSuccess, authSuccess);
    $rootScope.$on(AUTH_EVENTS.signupSuccess, authSuccess);

    function authSuccess() {

    }
  }

  function getUserProfile($q, userApi, session, appConfig) {
    if (session.isLogin() === false) {
      return null;
    }

    return $q(function(resolve, reject) {
      userApi
        .getUserProfile()
        .then(function(data) {
          appConfig.userProfile = data
          resolve(data);
        }, function() {
          resolve(null);
        });
    });
  }

  function getUserSettings($q, settings, session, appConfig) {
    if (session.isLogin() === false) {
      return null;
    }

    return $q(function(resolve, reject) {
      settings
        .getUserSettings()
        .then(function(data) {
          appConfig.userSettings = data;
          resolve();
        }, reject);
    });
  }

  function configLanguage($q, $translate, appConfig, languageApi, $localStorage, rootUserSettings, rootUserProfile) {

    var localeMapping = {
      de: ['de-de', 'de-at', 'de-li', 'de-lu', 'de-ch'],
      en: ['en-au', 'en-bz', 'en-ca', 'en-cb', 'en-gb', 'en-in', 'en-ie', 'en-jm', 'en-nz', 'en-ph', 'en-za', 'en-tt', 'en-us']
    }

    return $q(function(resolve, reject) {

      var languageKey = 'en';
      var browserLanguage = navigator.language.toLowerCase();

      if (typeof($localStorage.redirectToWebsiteToMatchBrowserLanguage) === 'undefined' && rootUserProfile === null) {
        angular.forEach(localeMapping, function(localeList, localeKey) {
          if (localeList.indexOf(browserLanguage) >= 0 || browserLanguage === localeKey) {
            languageKey = localeKey;
            languageApi
              .setActiveLanguageKey(localeKey)
              .then(function() {
                $localStorage.redirectToWebsiteToMatchBrowserLanguage = true;
                var hrefArray = location.href.split('#');
                var newHref = '/' + localeKey + '/#' + hrefArray[1];
                location.href = newHref;
              });
              return;
          }
        });
      }

      if (locale) {
        languageKey = locale;
      }

      if (rootUserProfile !== null && false === _.isEmpty(rootUserProfile.language)) {
        languageKey = rootUserProfile.language;
      }

      appConfig.activeLanguageKey = languageKey;
      $localStorage.activeLanguageKey = languageKey;
      $translate.use(languageKey);

      return resolve();
    });


  }


})();

