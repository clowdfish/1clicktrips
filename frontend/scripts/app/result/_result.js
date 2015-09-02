(function() {

  'use strict';

  angular
    .module('app.result', [
      'app.core',
      'app.common',
      'ngDialog'
    ])
    .constant('RESULT_STATE', {
      overview: 0,
      details: 1,
      hotel: 2
    })
    .constant('VEHICLE_TYPE', {
      bed: 0,
      street_view: 1,
      car: 2,
      bus: 4,
      subway: 6,
      train: 8,
      plane: 16,
      cab: 32,
      ship: 64
    })
    .config(interpolateConfig);

  function interpolateConfig($interpolateProvider) {
    $interpolateProvider.startSymbol('{[');
    $interpolateProvider.endSymbol(']}');
  }
})();
