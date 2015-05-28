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
          ':destination' +
          ':roundTrip',
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

  /**
   * Retrieves the user's favorites from the back end (if authenticated).
   *
   * @param session
   * @param favoriteApi
   * @returns {*}
   */
  function getFavoriteList(session, favoriteApi) {
    if (!session.isLogin()) {
      return [];
    }
    return favoriteApi.getFavoriteList();
  }

  /**
   * Retrieves all booked trips from the back end (if authenticated).
   *
   * @param session
   * @param bookingApi
   * @returns {*}
   */
  function getBookedTrips(session, bookingApi) {
    if (!session.isLogin()) {
      return [];
    }
    return bookingApi.getBookedTrips();
  }

  /**
   * Retrieves the search form data from the state object.
   *
   * @param $stateParams contains the data from the previous search request
   * @returns {*}
   */
  function getSearchFormData($stateParams) {

    var startDate = moment($stateParams.startDate);
    startDate.seconds(0);

    var endDate = moment($stateParams.endDate);
    endDate.seconds(0);

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
      origin: $stateParams.origin,
      roundTrip: $stateParams.roundTrip === "true"
    };
  }

  /**
   * Creates the default search form data without any pre-populated entries.
   *
   * @returns {*}
   */
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
      origin: null,
      roundTrip: false
    };
  }
})();
