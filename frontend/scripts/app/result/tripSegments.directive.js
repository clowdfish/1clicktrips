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
        showAlternativesPanel:'=',
        activeSegments: '=',
        selectedSegment: '=',
        isShowingMap: '=',
        isShowingList: '=',
        showMapFn: '&'
      },
      link: link
    }

    function link(scope, element, attrs, itineraryMapCtrl) {
      var $element = $(element);
      var $tripSegments = $element.find('.trip-segments');
      scope.activeSegmentNumber = 1;
      scope.showTab = showTab;

      scope.selectSegment = function(segment) {
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
        scope.segments = groupSegmentByDate(scope.itinerary);
        scope.segmentsHeaders = _.keys(scope.segments);
        scope.activeSegments = scope.segments[1];

        scope.segmentsHeight = $tripSegments.height();


      });



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
