(function(){
  angular
    .module('app.result')
    .directive('tripSegments', tripSegments);

  function tripSegments() {
    return {
      require: '^itineraryMap',
      restrict: 'E',
      templateUrl: 'templates/result/trip-segments.html',
      scope: {
        itinerary: '=',
        activeSegments: '=', //the segments which will display on google map
        showAlternativesPanel:'='
      },
      link: link
    }

    function link(scope, element, attrs, itineraryMapCtrl) {
      scope.activeSegment = 1;
      scope.showTab = showTab;
      if (scope.itinerary != null) {
        scope.segments = groupSegmentByDate(scope.itinerary);
        scope.segmentsHeaders = _.keys(scope.segments);
        scope.activeSegments = scope.segments[1];
        itineraryMapCtrl.changeActiveSegmentsOnMap(scope.activeSegments);
      }

      function groupSegmentByDate(itinerary) {
        var i = 0;
        var result = {};
        var day = 1;
        result[day] = [];

        if (itinerary.outbound.hasOwnProperty('segments')) {
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

        if (itinerary.inbound.hasOwnProperty('segments')) {
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
          console.log(result);
        }

        return result;
      }

      function showTab(segmentNumber) {
        scope.activeSegment = segmentNumber;
        scope.activeSegments = scope.segments[segmentNumber];
        itineraryMapCtrl.changeActiveSegmentsOnMap(scope.activeSegments);
      }
    }
  }
})();
