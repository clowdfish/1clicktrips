(function() {

  'use strict';

  angular
    .module('app.index')
    .config(routerConfig);

  function routerConfig($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

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
            settingData: getUserSettings,
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
      parent: 'root',
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
    var endDate = moment($stateParams.endDate);

    var startTimeString = startDate.format('HH:mm');
    var endTimeString = endDate.format('HH:mm');

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
      roundTrip: $stateParams.roundTrip === "true",
      startTimeString: startTimeString,
      endTimeString: endTimeString
    };
  }

  /**
   * Creates the default search form data without any pre-populated entries.
   *
   * @returns {*}
   */
  function getDefaultSearchFormData(settingData, settings) {
    var startDate = new Date();
    startDate.setDate(startDate.getDate() + 1);

    var endDate = new Date();
    endDate.setDate(endDate.getDate() + 1);

    var startTimeString = "09:00";
    var endTimeString = "17:00";

    if (settingData) {
      startTimeString = settings.findValueFromSettings(settingData, 'start_time');
      endTimeString = settings.findValueFromSettings(settingData, 'end_time');
    }

    return {
      destinationLocation: null,
      originLocation: null,
      startDate: startDate,
      endDate: endDate,
      destination: null,
      origin: null,
      roundTrip: false,
      startTimeString: startTimeString,
      endTimeString: endTimeString
    };
  }

  function getUserSettings(session, settings) {
    if (session.isLogin() === false) {
      return null;
    }
    return settings.getUserSettings();
  }

})();
