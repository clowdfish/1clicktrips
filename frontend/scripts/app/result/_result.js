(function() {
  'use strict';
  angular
    .module('app.result', [
      'app.mockdata'
    ])
    .config(config)
    .constant('TRIP_TYPE', {
      lowBudget: 0,
      timeSaving: 1,
      comfortTrip: 2
    });

  function config($interpolateProvider) {
    $interpolateProvider.startSymbol('{[');
    $interpolateProvider.endSymbol(']}');
  }
})();
