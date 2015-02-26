(function() {

  'use strict';

  angular
    .module('app.result', [
      'ui.router'
    ])
    .config(interpolateConfig)
    .config(uiRouterConfig)
    .constant('TRIP_TYPE', {
      lowBudget: 0,
      timeSaving: 1,
      comfortTrip: 2
    });

  function interpolateConfig($interpolateProvider) {
    $interpolateProvider.startSymbol('{[');
    $interpolateProvider.endSymbol(']}');
  }

  function uiRouterConfig($stateProvider, $urlRouterProvider) {

    $stateProvider.state('search_result', {
      url: '/result?origin=:originLatitude,:originLongitude',
      templateUrl: 'scripts/app/templates/result/result.html',
      controller: 'resultCtrl',
      resolve: {
        itineraries: findItinerary
      }
    });

    $stateProvider.state('temp_result', {
      url: '/result',
      templateUrl: 'scripts/app/templates/result/result.html',
      controller: 'resultCtrl',
      resolve: {
        itineraries: findItinerary
      }
    });

  }

  function findItinerary(tripService, $stateParams) {
      var searchObject = {
        origin: {
          latitude: $stateParams.originLatitude,
          longitude: $stateParams.originLongitude
        },
        appointments: [
          {
            location: {
              latitude: 1,
              longitude: 1
            },
            start: '2015-12-31T00:00:00',
            end: '2015-12-31T00:00:00'
          }
        ],
        locale: 1,
        roundTrip: false,
        currency: 1
      };

      return tripService.findItinerary(searchObject);
    }
})();
