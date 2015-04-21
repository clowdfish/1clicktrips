(function() {

  'use strict';

  angular
    .module('app.result')
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
})();