/**
* This is the parent directive for map, segmentAlternativeList and tripSegments
*/
(function() {
  'use strict';

  angular
    .module('app.result')
    .directive('itineraryMap', itineraryMap);

  function itineraryMap(browser, $timeout) {
    return {
      restrict: 'E',
      scope: {
        itinerary: '=',
        closeSegmentPanelFn: '='
      },
      templateUrl: 'scripts/app/templates/result/itinerary-map.html',
      controller: controller,
      transclude: true
    };


    function controller($scope) {
      var _this = this;
      $scope.activeSegmentOnAlternativePanel = null;
      $scope.isShowAlternativesPanel = false;
      $scope.selectedSegment = null;
      $scope.selectAlternativeSegment = selectAlternativeSegment;
      $scope.showAlternativesPanel = showAlternativesPanel;

      function showAlternativesPanel(segment) {
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
