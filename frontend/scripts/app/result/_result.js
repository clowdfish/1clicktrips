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
      $stateProvider.state('result', {
        url: '/result',
        templateUrl: 'scripts/app/templates/result/result.html'
      })
  }
})();
