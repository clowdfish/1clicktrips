(function(){
  angular
    .module('app.result')
    .directive('tripSegments', tripSegments);

  function tripSegments() {
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
        alternatives: '='
      },
      link: link
    }

    function link(scope, element, attrs, ctrl) {
      var $element = $(element);
      var $tripSegments = $element.find('.trip-segments');
      scope.activeSegmentNumber = 1;
      scope.showTab = showTab;

      scope.selectSegment = function(segment) {
        ctrl.closAlternativesPanel();
        if (scope.selectedSegment == segment) {
          scope.selectedSegment = null;
        } else {
          scope.selectedSegment = segment;
          if (scope.showMapFn) {
            scope.showMapFn();
          }
        }
      }

      scope.$watch('itinerary', function() {
        if (scope.itinerary == null) {
          return;
        }
        console.log('itinerary', scope.itinerary);
        scope.segments = groupSegmentByDate(scope.itinerary);
        scope.segmentsHeaders = _.keys(scope.segments);
        scope.activeSegments = scope.segments[1];
        scope.segmentsHeight = $tripSegments.height();
      });

      scope.showAlternativesFn = ctrl.showAlternatives;

      function groupSegmentByDate(itinerary) {
        var i = 0;
        var result = {};
        var day = 1;
        result[day] = [];

        if (itinerary.outbound && itinerary.outbound.hasOwnProperty('segments')) {
          for (i = 0; i < itinerary.outbound.segments.length; i++) {
            var segment = itinerary.outbound.segments[i];
            if (result[day] == null) {
              result[day] = [];
            }
            result[day].push(segment);
            if (segment.type == 0) {
              day++
            }
          }
        }

        if (itinerary.inbound && itinerary.inbound.hasOwnProperty('segments')) {
          for (i = 0; i < itinerary.inbound.segments.length; i++) {
            var segment = itinerary.inbound.segments[i];
            if (result[day] == null) {
              result[day] = [];
            }
            result[day].push(segment);
            if (segment.type == 0) {
              day++
            }
          }
        }

        return result;
      }

      function showTab(segmentNumber) {
        scope.activeSegmentNumber = segmentNumber;
        scope.activeSegments = scope.segments[segmentNumber];
      }
    }
  }
})();
