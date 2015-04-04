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
        closeSegmentPanelFn: '=',
        hideMap: '@',
        showMap: '=',
        showList: '='
      },
      templateUrl: 'scripts/app/templates/result/itinerary-map.html',
      controller: controller,
      transclude: true
    };


    function controller($scope) {
      var _this = this;

      $scope.hideMap = $scope.hideMap || false;

      // check for device type and configure accordingly
      $scope.isMobile = browser.isMobileDevice();

      /**
      * Show map or not
      */
      $scope.showMap = $scope.hideMap ? false : true;

      /**
      * Show segment list or not
      */
      $scope.showList = $scope.isMobile ? false : true;

      /**
      * List of hotels, alternative segments...
      */
      $scope.activeSegmentOnAlternativePanel = null;

      /**
      * Is showing alternative panel or not
      */
      $scope.isShowAlternativesPanel = false;

      /**
      * Selected segment on trip segments directive
      */
      $scope.selectedSegment = null;

      /**
      * Selected alternative segment
      */
      $scope.selectAlternativeSegment = selectAlternativeSegment;

      /**
      * Function - show alternatives panel
      */
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
