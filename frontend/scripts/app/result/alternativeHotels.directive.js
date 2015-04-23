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

    function link(scope, element, attrs, itineraryMapCtrl) {
      scope.selectedHotelId = null;

      scope.closeAlternativePanel = function() {
        ctrl.closeAlternativesPanel();
      };

      scope.selectHotel = function(hotel) {
        tripApi.setSegmentHotel(scope.itinerary, scope.selectedSegment, hotel);
        scope.selectedHotelId = hotel.id;
      }

      scope.unselectHotel = function(hotel) {
        tripApi.unsetSegmentHotel(scope.itinerary, scope.selectedSegment);
        scope.selectedHotelId = null;
      }

      scope.$watch('selectedSegment', function() {
        if (_.has(scope.selectedSegment, 'hotel')) {
          scope.selectedHotelId = scope.selectedSegment.hotel.id;
        }
      });
    }
  }
})();
