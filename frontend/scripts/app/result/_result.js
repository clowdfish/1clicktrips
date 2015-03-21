(function() {

  'use strict';

  angular
    .module('app.result', [
      'app.core',
      'app.common'
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
      url: '/result?:originLatitude,:originLongitude,:destinationLatitude,:destinationLongitude,:startDate,:endDate,:destination,:origin',
      templateUrl: 'scripts/app/templates/result/result.html',
      controller: 'resultCtrl',
      resolve: {
        searchObject: getSearchObject
      }
    });

    $stateProvider.state('temp_result', {
      url: '/result',
      templateUrl: 'scripts/app/templates/result/result.html',
      controller: 'resultCtrl'
    });
  }

  function getSearchObject($stateParams, appConfig) {
    return {
      origin: {
        latitude: parseFloat($stateParams.originLatitude),
        longitude: parseFloat($stateParams.originLongitude)
      },
      appointments: [
        {
          location: {
            latitude: parseFloat($stateParams.destinationLatitude),
            longitude: parseFloat($stateParams.destinationLongitude)
          },
          start: $stateParams.startDate,
          end: $stateParams.endDate
        }
      ],
      locale: appConfig.activeLanguageKey,
      roundTrip: false,
      currency: appConfig.activeCurrency
    };
  }
})();
