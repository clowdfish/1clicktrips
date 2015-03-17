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
      controller: 'resultCtrl'
    });

    $stateProvider.state('temp_result', {
      url: '/result',
      templateUrl: 'scripts/app/templates/result/result.html',
      controller: 'resultCtrl'
    });
  }
})();
