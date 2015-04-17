/**
* This is the parent directive for map, segmentAlternativeList and tripSegments
*/
(function() {
  'use strict';

  angular
    .module('app.result')
    .directive('tripResultWrapper', tripResultWrapper);

  function tripResultWrapper(browser, $timeout, appConfig) {
    return {
      restrict: 'E',
      scope: {
        itinerary: '=',
        closeSegmentPanelFn: '=',
        hideMap: '@',
        showMap: '=',
        showList: '=',
        isShowAlternativesPanel: '=',
        alternatives: '=',
        alternativeTop: '=',
        alternativeLeft: '='
      },
      templateUrl: 'scripts/app/templates/result/trip-result-wrapper.html',
      controller: controller,
      transclude: true,
      link: link
    };

    function link(scope, element, attrs) {
      var $element = $(element);
      var $tripSegmentsContainer = $element.find('.trip-segments-container:eq(0)');
      var lastSegmentIndex = null;
      scope.updateAlternativePosition = updateAlternativePosition;

      /**
      * Update position of alternative panel to match selected segment
      */
      function updateAlternativePosition(segmentIndex) {
        var $segmentSelector = $element.find('.trip-segments-day-item').eq(segmentIndex);

        if (null == $segmentSelector) {
          return;
        }

        scope.alternativeTop = $segmentSelector.position().top;
        scope.alternativeLeft = $tripSegmentsContainer.position().left + $tripSegmentsContainer.outerWidth() + 27;
        lastSegmentIndex = segmentIndex;
      }
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
      * Function - show alternatives panel
      */
      this.showAlternatives = showAlternatives;
      this.updateAlternativePosition = $scope.updateAlternativePosition;
      this.closeAlternativesPanel = closeAlternativesPanel;

      var lastSegmentIndex = null;
      function showAlternatives(segment, $event, segmentIndex) {
        if ($event) {
          $event.preventDefault();
          $event.stopPropagation();
        }

        tripApi
          .findAlternativeSegment(segment.id, segment.tripId, appConfig.activeLanguageKey, appConfig.activeCurrency)
          .then(function(alternatives) {
            $scope.alternatives = alternatives;
            $scope.isShowAlternativesPanel = true;
          });

        if (segmentIndex >= 0) {
          $scope.updateAlternativePosition(segmentIndex);
        }
      }

      function closeAlternativesPanel() {
        $scope.isShowAlternativesPanel = false;
      }

    }

  }
})();
