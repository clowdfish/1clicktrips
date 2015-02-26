(function() {

  'use strict';

  angular
    .module('app.result', [
      'ui.router',
      'ngAnimate'
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
      controller: 'resultCtrl'
    });

    $stateProvider.state('temp_result', {
      url: '/result',
      templateUrl: 'scripts/app/templates/result/result.html',
      controller: 'resultCtrl'
    });
  }
})();
