(function(){
  angular
    .module('app.result')
    .directive('tripSegments', tripSegments);

  function tripSegments(tripApi) {
    return {
      require: '^tripResultWrapper',
      restrict: 'E',
      templateUrl: 'scripts/app/templates/result/trip-segments.html',
      scope: {
        itinerary: '=',
        activeSegments: '=',
        selectedSegment: '=',
        isShowingMap: '=',
        isShowingList: '=',
        showMapFn: '&',
        alternatives: '=',
        alternativeTop: '=',
        alternativeLeft: '=',
        activeSegmentsNumber: '='
      },
      link: link
    };

    function link(scope, element, attrs, ctrl) {
      var $element = $(element);
      var $tripSegments = $element.find('.trip-segments');

      scope.showTab = showTab;
      scope.showAlternativesFn = ctrl.showAlternatives;
      scope.groupSegment = null;
      scope.$watch('activeSegments', function() {
        console.log('change in activeSegments');
      });

      scope.selectSegment = function(segment, segmentIndex) {
        ctrl.closeAlternativesPanel();
        if (scope.selectedSegment == segment) {
          scope.selectedSegment = null;
        } else {
          scope.selectedSegment = segment;
          if (scope.showMapFn) {
            scope.showMapFn();
          }
        }
      };

      /**
      * Get groupSegment and
      */
      scope.$watch('itinerary', function() {
        if (scope.itinerary == null) {
          return;
        }
        console.log('detect change in itinerary');
        scope.activeSegmentsNumber = 1;

        scope.segmentsHeaders = _.keys(scope.itinerary.groupSegment);
        scope.groupSegment = scope.itinerary.groupSegment;

        scope.activeSegments = scope.groupSegment[scope.activeSegmentsNumber];
        console.log(scope.activeSegments, scope.activeSegmentsNumber);
        scope.segmentsHeight = $tripSegments.height();
      });

      scope.$watch('activeSegments', function(activeSegments) {
        if (scope.itinerary == null || activeSegments == null) {
          return;
        }
        //scope.groupSegment[scope.activeSegmentsNumber] = activeSegments;
        //scope.itinerary = tripApi.updateItineraryByGroupSegment(scope.itinerary, scope.groupSegment);
      });

      function showTab(segmentNumber) {
        scope.activeSegmentsNumber = segmentNumber;
        scope.activeSegments = scope.segments[segmentNumber];
      }
    }
  }
})();
