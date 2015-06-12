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
        configLanguage: configLanguage
      }
    });
  }

  function run(browser, languageApi, $localStorage) {
    if (browser.isMobileDevice()) {
      FastClick.attach(document.body);
    }
  }

  function configLanguage($q, $translate, appConfig, languageApi, $localStorage) {
    console.log('Resolve language');
    if (isAlreadyResolveGlobal) return true;
    isAlreadyResolveGlobal = true;
    return $q(function(resolve, reject) {

      if (locale) {
        languageApi.setActiveLanguageKey(locale);
        appConfig.activeLanguageKey = locale;
      }

      if (_.isEmpty($localStorage.redirectToWebsiteToMatchBrowserLanguage)) {
        var browserLanguage = navigator.language.toLowerCase();
        if ((browserLanguage == 'de' || browserLanguage == 'de-de')
           && languageApi.getActiveLanguageKey() !== 'de') {
          languageApi
            .setActiveLanguageKey('de')
            .then(function() {
              $localStorage.redirectToWebsiteToMatchBrowserLanguage = true;
              var hrefArray = location.href.split('#');
              var newHref = '/de/#' + hrefArray[1];
              location.href = newHref;
            });
        } else {
          $localStorage.redirectToWebsiteToMatchBrowserLanguage = true;
          languageApi.setActiveLanguageKey('en');
        }
      }

      $translate.use(appConfig.activeLanguageKey);

      return resolve();
    });


  }


})();

