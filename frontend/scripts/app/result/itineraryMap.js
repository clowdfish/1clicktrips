/**
* This is the parent directive for map, segmentAlternativeList and tripSegments
*/
(function() {
  'use strict';

  angular
    .module('app.result')
    .directive('itineraryMap', itineraryMap);

  function itineraryMap() {
    return {
      restrict: 'E',
      scope: {
        itinerary: '=',
        refreshItinerary: '='
      },
      templateUrl: 'templates/result/itinerary-map.html',
      controller: controller
    };

    function controller($scope) {
      $scope.activeSegmentsOnMap = [];
      $scope.activeSegmentOnAlternativePanel = null;
      $scope.isShowAlternativesPanel = false;
      $scope.selectAlternativeSegment = selectAlternativeSegment;
      $scope.showAlternativesPanel = showAlternativesPanel;

      //use "this" so we can reuse this method on tripSegments directive
      this.changeActiveSegmentsOnMap = changeActiveSegmentsOnMap;

      function changeActiveSegmentsOnMap(segments)
      {
        console.log(segments);
        $scope.activeSegmentsOnMap = segments;
        $scope.$broadcast('drawRoutesOnMap', {
          segments: segments
        });
      }


      function showAlternativesPanel(segment) {
        console.log(segment);
        if (typeof(segment['alternatives']) != 'undefined' && segment.alternatives.length > 0) {
          $scope.activeSegmentOnAlternativePanel = segment;
          $scope.alternatives = segment.alternatives;
          $scope.isShowAlternativesPanel = true;
        } else {
          $scope.alternatives = [];
          $scope.isShowAlternativesPanel = false;
        }
      }

      function selectAlternativeSegment(segment, alternative) {
        console.log('Selected segment ', alternative.name);
      }

    }

  }
})();
