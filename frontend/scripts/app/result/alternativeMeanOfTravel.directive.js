(function() {

  'use strict';

  angular
    .module('app.result')
    .directive('alternativeMeanOfTravel', alternativeMeanOfTravel);

  function alternativeMeanOfTravel(tripApi) {
    return {
      require: '^tripResultWrapper',
      restrict: 'E',
      scope: {
        itinerary: '=',
        alternatives: '=',
        activeSegments: '=',
        activeSegmentsNumber: '='
      },
      link: link,
      templateUrl: 'scripts/app/templates/result/alternative-mean-of-travel.html'
    };

    function link(scope, element, attrs, ctrl) {
      scope.getAlternativeVehicleType = getAlternativeVehicleType;

      scope.close = function() {
        ctrl.closeAlternativesPanel();
      };

      scope.selectAlternative = function(alternative) {
        var newItinerary = tripApi.replaceSegmentWithAlternatives(scope.itinerary, scope.activeSegmentsNumber, alternative);
        scope.itinerary = newItinerary;
        scope.activeSegments = newItinerary.groupSegment[scope.activeSegmentsNumber];

        ctrl.closeAlternativesPanel();
      };

      function getAlternativeVehicleType(alternative) {
        return "result_vehicle_" + alternative.segments[0].type;
      }
    }
  }
})();
