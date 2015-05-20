/**
* This is the parent directive for map, segmentAlternativeList and tripSegments
*/
(function() {
  'use strict';

  angular
    .module('app.result')
    .directive('tripResultWrapper', tripResultWrapper);

  function tripResultWrapper(browser, appConfig, VEHICLE_TYPE) {
    return {
      restrict: 'E',
      scope: {
        itinerary: '=',
        closeSegmentPanelFn: '=',
        showAlternativeVehiclesPanel: '=',
        showAlternativeHotelsPanel: '=',
        alternativeVehicles: '=',
        alternativeHotels: '=',
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
        /*
        var $segmentSelector = $element.find('.trip-segments-day-item').eq(segmentIndex);
        console.log("Top Offset " + $segmentSelector.offset().top);

        if (null == $segmentSelector) {
          return;
        }
        */

        if(browser.isMobileDevice()) {
          scope.alternativeTop = 0; //$segmentSelector.offset().top + $segmentSelector.innerHeight();
        }
        else {
          scope.alternativeTop = 120;
        }

        if(browser.isMobileDevice())
          scope.alternativeLeft = 0;
        else
          scope.alternativeLeft = $tripSegmentsContainer.position().left + $tripSegmentsContainer.outerWidth();// + 27;


        lastSegmentIndex = segmentIndex;
      }
    }

    function controller($scope, tripApi) {

      $scope.hideMap = $scope.hideMap || false;

      // check for device type and configure accordingly
      $scope.isMobile = browser.isMobileDevice();

      /**
      * List of hotels, alternative segments...
      */
      $scope.activeSegmentOnAlternativePanel = null;

      /**
      * Is showing alternative panel or not
      */
      $scope.showAlternativesPanel = false;

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

      function showAlternatives(segment, $event, segmentIndex) {
        if ($event) {
          $event.preventDefault();
          $event.stopPropagation();
        }
        if (segment.type === VEHICLE_TYPE.bed) {
          showAlternativeHotels(segment);
        } else {
          showAlternativeVehicles(segment);
        }


        if (segmentIndex >= 0) {
          $scope.updateAlternativePosition(segmentIndex);
        }
      }

      function showAlternativeVehicles(segment) {
        // show panel at once with the spinner
        $scope.showAlternativeVehiclesPanel = true;
        $scope.showAlternativeHotelsPanel = false;

        tripApi
          .findAlternativeVehiclesSegment($scope.itinerary, segment.id, segment.tripId, appConfig.activeLanguageKey, appConfig.activeCurrency)
          .then(function(alternatives) {
            $scope.alternativeVehicles = alternatives;
          });
      }

      function showAlternativeHotels(segment) {
        // show panel at once with the spinner
        $scope.showAlternativeHotelsPanel = true;
        $scope.showAlternativeVehiclesPanel = false;

        tripApi
          .findAlternativeHotelsSegment(segment.id, segment.tripId, appConfig.activeLanguageKey, appConfig.activeCurrency)
          .then(function(alternatives) {
            $scope.alternativeHotels = alternatives;
          });
      }

      function closeAlternativesPanel() {
        $scope.showAlternativeHotelsPanel = false;
        $scope.showAlternativeVehiclesPanel = false;
      }
    }
  }
})();
