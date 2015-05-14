(function() {

  'use strict';

  angular
    .module('app.index')
    .config(routerConfig);

  function routerConfig($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    /**
    * Resolve global application-wide data at here
    */
    $stateProvider.state('root', {
      abstract: true,
      template: '<div ui-view></div>',
      resolve: {
        globalConfig: function() {
          return {};
        }
      }
    });

    $stateProvider.state('index', {
      url: '/',
      parent: 'root',
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

      url: '/search?' +
          ':originLatitude,' +
          ':originLongitude,' +
          ':destinationLatitude,' +
          ':destinationLongitude,' +
          ':startDate,' +
          ':endDate,' +
          ':origin,' +
          ':destination',
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

  function getFavoriteList(session, favoriteApi) {
    if (!session.isLogin()) {
      return [];
    }
    return favoriteApi.getFavoriteList();
  }

  function getBookedTrips(session, bookingApi) {
    if (!session.isLogin()) {
      return [];
    }
    return bookingApi.getBookedTrips();
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

    var searchFormData = {
      destinationLocation: null,
      originLocation: null,
      startDate: startDate,
      endDate: endDate,
      destination: null,
      origin: null
    }

    return searchFormData;
  }

  function getLanguages(languageApi) {
    return languageApi.getAvailableLanguages();
  }

  function getCurrencies(currencyApi) {
    return currencyApi.getAvailableCurrencies();
  }
})();
