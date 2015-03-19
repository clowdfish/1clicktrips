/*
* This module contain global configuration like authentication, languages
*/
(function() {

  'use strict';

  var i18n = {};

  angular
    .module('app.index', [
      'app.core'
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

  function run($rootScope, $state, AUTH_EVENTS) {
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
      views: {
        '': {
          templateUrl: 'scripts/app/templates/index/index.html',
          controller: 'indexCtrl'
        },
        'search@index': {
          templateUrl: 'scripts/app/templates/search/search.html',
          controller: 'searchCtrl',
          resolve: {
            searchFormData: getDefaultSearchFormData
          }
        },
        'dashboard@index': {
          templateUrl: 'scripts/app/templates/dashboard/dashboard.html',
          controller: 'dashboardCtrl',
          resolve: {
            favoriteList: getFavoriteList,
            bookedTripList: getBookedTrips
          }
        }
      }
    });

    //Load search form with pre-populated data
    $stateProvider.state('refineSearch', {

      url: '/search?:originLatitude,:originLongitude,:destinationLatitude,:destinationLongitude,:startDate,:endDate,:origin,:destination',
      views: {
        '': {
          templateUrl: 'scripts/app/templates/index/index.html',
          controller: 'indexCtrl'
        },
        'search@refineSearch': {
          templateUrl: 'scripts/app/templates/search/search.html',
          controller: 'searchCtrl',
          resolve: {
            searchFormData: getSearchFormData
          }
        },
        'dashboard@refineSearch': {
          templateUrl: 'scripts/app/templates/dashboard/dashboard.html',
          controller: 'dashboardCtrl',
          resolve: {
            favoriteList: getFavoriteList,
            bookedTripList: getBookedTrips
          }
        }
      }
    });
  }

  function getFavoriteList(session, favoriteService) {
    if (!session.isLogin()) {
      return [];
    }
    return favoriteService.getFavoriteList();
  }

  function getBookedTrips(session, bookingService) {
    if (!session.isLogin()) {
      return [];
    }
    return bookingService.getBookedTrips();
  }

  function getSearchFormData($stateParams) {
    //Minutes value must be in this range
    var validTimeValues = [0, 15, 30, 45];

    var startDate = moment($stateParams.startDate);
    startDate.seconds(0);
    if (validTimeValues.indexOf(startDate.minutes()) == -1) {
      startDate.minutes(0);
    }

    var endDate = moment($stateParams.endDate);
    endDate.seconds(0);
    if (validTimeValues.indexOf(endDate.minutes()) == -1) {
      endDate.minutes(0);
    }

    return {
      destinationLocation: {
        latitude: parseFloat($stateParams.destinationLatitude),
        longitude: parseFloat($stateParams.destinationLongitude)
      },
      originLocation: {
        latitude: parseFloat($stateParams.originLatitude),
        longitude: parseFloat($stateParams.originLongitude)
      },
      startDate: startDate.toDate(),
      endDate: endDate.toDate(),
      destination: $stateParams.destination,
      origin: $stateParams.origin
    };
  }

  function getDefaultSearchFormData() {
    var startDate = new Date();
    startDate.setHours(14);
    startDate.setMinutes(0);
    startDate.setSeconds(0);
    var endDate = new Date();
    endDate.setHours(16);
    endDate.setMinutes(0);
    endDate.setSeconds(0);

    return {
      destinationLocation: null,
      originLocation: null,
      startDate: startDate,
      endDate: endDate,
      destination: null,
      origin: null
    }
  }

  function getLanguages(languageService) {
    return languageService.getAvailableLanguages();
  }

  function getCurrencies(currencyService) {
    return currencyService.getAvailableCurrencies();
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
