(function() {

  'use strict';

  angular
    .module('app.result', [
      'app.core',
      'app.common'
    ])
    .config(interpolateConfig)
    .constant('TRIP_TYPE', {
      lowBudget: 0,
      timeSaving: 1,
      comfortTrip: 2
    });

  function interpolateConfig($interpolateProvider) {
    $interpolateProvider.startSymbol('{[');
    $interpolateProvider.endSymbol(']}');
  }

})();
