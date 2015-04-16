/**
* This is the parent directive for map, segmentAlternativeList and tripSegments
*/
(function() {
  'use strict';

  angular
    .module('app.result')
    .directive('tripResultWrapper', tripResultWrapper);

  function tripResultWrapper(browser, $timeout) {
    return {
      restrict: 'E',
      scope: {
        itinerary: '=',
        closeSegmentPanelFn: '=',
        hideMap: '@',
        showMap: '=',
        showList: '=',
        isShowAlternativesPanel: '=',
        alternatives: '='
      },
      templateUrl: 'scripts/app/templates/result/trip-result-wrapper.html',
      controller: controller,
      transclude: true,
      link: link
    };

    function link(scope, element, attrs) {

    }

    function controller($scope, tripApi) {
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
      this.showAlternatives = showAlternatives;
      this.closAlternativesPanel = closAlternativesPanel;


      function selectAlternativeSegment(segment, alternative) {
        console.log('Selected segment ', alternative.name);
      }

      function showAlternatives(segment, $event) {
        $event.preventDefault();
        $event.stopPropagation();
        tripApi
          .findAlternativeSegment(1, 1)
          .then(function(alternatives) {
            $scope.alternatives = alternatives;
            $scope.isShowAlternativesPanel = true;
          });

      }

      function closAlternativesPanel() {
        $scope.isShowAlternativesPanel = false;
      }

      function selectAlternative(alternative) {
        //find index of the

      }

    }

  }
})();
