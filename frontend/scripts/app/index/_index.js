/*
* This module contain global configuration like authentication, languages
*/
(function() {

  'use strict';

  var i18n = {};

  angular
    .module('app.index', [
      'pascalprecht.translate',
      'ui.router',
      'ui.bootstrap',
      'ui.bootstrap.tpls',      
      'app.search.timepicker'
    ])
    .config(interpolateConfig)
    .config(languageConfig)
    .config(routerConfig)
    .run(run);

  function languageConfig($translateProvider) {
    var en = formatLanguageObject(Locales.en.en);
    var de = formatLanguageObject(Locales.de.de);

    var languageKeys = _.keys(en);
    i18n = {};
    for (var i = 0; i < languageKeys.length; i++) {
      i18n[languageKeys[i]] = languageKeys[i];
    }

    $translateProvider.translations('en', en);
    $translateProvider.translations('de', de);

    $translateProvider.preferredLanguage('en');
  }

  function run($rootScope) {
    $rootScope.i18n = i18n;
  }

  function interpolateConfig($interpolateProvider) {
    $interpolateProvider.startSymbol('{[');
    $interpolateProvider.endSymbol(']}');
  }

  function routerConfig($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
    $stateProvider.state('index', {
      url: '/',
      templateUrl: 'scripts/app/templates/index/index.html'
    });
  }

  function getFavoriteList(favoriteService) {
    return favoriteService.getFarvoriteList();
  }

  function getBookedTripList(bookingService) {
    return bookingService.getBookedTrips();
  }

  function formatLanguageObject(object, prefix) {
    prefix = prefix || "";
    var result = {};
    var keys = _.keys(object);
    if (keys.length > 0) {
      for (var i = 0; i < keys.length; i++ ) {
        var key = keys[i];
        var stringKey = prefix != "" ? prefix + '_' + key : key;
        if (_.isObject(object[key])) {
          result = _.extend(result, formatLanguageObject(object[key], stringKey));
        } else {
          result[stringKey] = object[key];
        }
      }
    }
    return result;
  }

})();