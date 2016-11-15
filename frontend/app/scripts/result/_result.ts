/// <reference path="../_all.ts" />

module Result {

  'use strict';

  angular
    .module('app.result', [
      'app.core',
      'app.common',
      'ngDialog'
    ])
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
    .constant('TIMEOUT', 1000 * 60 * 120) // 120 minutes
    .constant('SEGMENT_ZOOM_THRESHOLD', 25) // up to which value to zoom the segment
    .constant('SEGMENT_ZOOM_WIDTH', 40) // size to zoom the segment to
    .constant('TRANSFER_TIME', 5) // how much time is added between trip segments
    .controller('resultCtrl', ResultCtrl)
    .controller('resultDetailsCtrl', ResultDetailsCtrl)
    .service('tripApi', TripApi)
    .service('tripCache', TripCache)
    .service('itineraryHelper', ItineraryHelper)
    .directive('tripContainer', TripContainer.Factory())
    .directive('resultMap', resultMap)
    .config(routerConfig);
}
