(function(){
  angular
    .module('app.result')
    .directive('segmentList', segmentList);

  function segmentList() {
    return {
      restrict: 'E',
      templateUrl: 'js/templates/result/segment-list.html',
      scope: {
        itinerary: '=itinerary',
        changeSegments: '=changeSegments'
      },
      link: link
    }

    function link() {
      scope.activeSegment = 1;
      scope.segments = groupSegmentByDate(scope.itinerary);
      scope.segmentsHeaders = _.keys(scope.segments);
      scope.showTab = showTab;

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
        //notify parent to re-draw route on map
        scope.changeSegments(scope.segments[segmentNumber]);
      }

      function showTab(segmentNumber) {
        scope.activeSegment = segmentNumber;
        directionsDisplay.setMap(null);
        directionsDisplay = null;
        createMapBySegments(scope.itinerary, scope.segments[segmentNumber]);
      }
    }
  }
})();