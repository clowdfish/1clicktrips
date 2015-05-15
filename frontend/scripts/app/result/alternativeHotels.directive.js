(function() {
  angular
    .module('app.result')
    .directive('alternativeHotels', alternativeHotels);

  function alternativeHotels(tripApi) {
    return {
      require: '^tripResultWrapper',
      restrict: 'E',
      templateUrl: 'scripts/app/templates/result/alternative-hotel.html',
      scope: {
        itinerary: '=',
        alternatives: '=',
        selectedSegment: '='
      },
      link: link
    };

    function link(scope, element, attrs, ctrl) {
      scope.selectedHotelId = null;

      scope.close = function() {
        ctrl.closeAlternativesPanel();
      };

      scope.selectHotel = function(hotel) {
        tripApi.setSegmentHotel(scope.itinerary, scope.selectedSegment, hotel);
        scope.selectedHotelId = hotel.id;

        ctrl.closeAlternativesPanel();
      };

      /**
       * Refresh the selected hotel id when the user selects a different segment.
       * See tripSegments.directive for implementation details.
       */
      scope.$watch('selectedSegment', function() {
        if (_.has(scope.selectedSegment, 'hotel')) {
          scope.selectedHotelId = scope.selectedSegment.hotel.id;
        }
      });
    }
  }
})();
