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
        showList: '=',
        showMap: '=',
        closeSegmentPanelFn: '='
      },
      templateUrl: 'scripts/app/templates/result/itinerary-map.html',
      link: link,
      controller: controller
    };

    function link(scope, element, attrs) {
      var $element = $(element);
      var $tripSegments = $element.find('.trip-segments-alternatives');
      var $map = $element.find('#itinerary-map');
      scope.$watch('activeSegmentsOnMap', function() {
        $timeout(function() {
          var height = $tripSegments.height();
          console.log('Trip segment height', height);
          $map.height(height);
        }, 50);

      });
    }

    function controller($scope, shareMapData) {
      $scope.shareMapData = shareMapData;
      $scope.activeSegmentsOnMap = [];
      $scope.activeSegmentOnAlternativePanel = null;
      $scope.isShowAlternativesPanel = false;
      $scope.selectedSegment = null;
      $scope.selectAlternativeSegment = selectAlternativeSegment;
      $scope.showAlternativesPanel = showAlternativesPanel;
      $scope.selectSegment = selectSegment;
      this.changeActiveSegmentsOnMap = changeActiveSegmentsOnMap;

      $scope.$watch('shareMapData.selectedSegment', function() {
        $scope.selectedSegment = shareMapData.selectedSegment;
      });

      function changeActiveSegmentsOnMap(segments)
      {
        $scope.activeSegmentsOnMap = segments;
      }

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

      function selectSegment(segment) {
        if ($scope.selectedSegment == segment) {
          $scope.selectedSegment = null;
        } else {
          $scope.selectedSegment = segment;
          shareMapData.selectedSegment = segment;
          if (browser.isMobileDevice() && $scope.closeSegmentPanelFn != null) {
            $scope.closeSegmentPanelFn();
          }
        }
      }
    }

  }
})();
