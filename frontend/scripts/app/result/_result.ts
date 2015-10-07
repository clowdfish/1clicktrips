/// <reference path="../../_all.ts" />

module Result {

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
    .constant('SEGMENT_ZOOM_THRESHOLD', 25) // up to which value to zoom the segment
    .constant('SEGMENT_ZOOM_WIDTH', 40) // size to zoom the segment to
    .constant('TRANSFER_TIME', 5) // how much time is added between trip segments
    .controller('resultCtrl', ResultCtrl)
    .service('tripApi', TripApi)
    .service('tripCache', TripCache)
    .service('itineraryHelper', ItineraryHelper)
    .directive('tripSegment', TripSegment.Factory())
    .directive('tripSegmentContainer', TripSegmentContainer.Factory())
    .directive('tripMap', TripMap.Factory())
    .config(routerConfig);
}
