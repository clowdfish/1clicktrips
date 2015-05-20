(function(){
  angular
    .module('app.result')
    .directive('tripSegments', tripSegments);

  function tripSegments(browser) {
    return {
      require: '^tripResultWrapper',
      restrict: 'E',
      templateUrl: 'scripts/app/templates/result/trip-segments.html',
      scope: {
        itinerary: '=',
        activeSegments: '=',
        selectedSegment: '=',
        isShowingMap: '=',
        isShowingList: '=',
        showMapFn: '&',
        alternatives: '=',
        alternativeTop: '=',
        alternativeLeft: '=',
        activeSegmentsNumber: '='
      },
      link: link
    };

    function link(scope, element, attrs, ctrl) {
      scope.showTab = showTab;
      scope.showAlternativesFn = showAlternatives;
      scope.groupSegment = null;

      function showAlternatives(segment, $event, $index) {
        scope.selectedSegment = segment;
        ctrl.showAlternatives(segment, $event, $index);
      }

      scope.selectSegment = function(segment, segmentIndex) {
        if (browser.isMobileDevice()) {
          scope.selectedSegment = segment;
          if (scope.showMapFn) {
            scope.showMapFn();
          }
        } else {
          if (scope.selectedSegment == segment) {
            scope.selectedSegment = null;
          } else {
            scope.selectedSegment = segment;
          }
        }
        ctrl.closeAlternativesPanel();
      };

      /**
       * Watch the itinerary object and initialize the segments list data.
      */
      scope.$watch('itinerary', function() {
        if (scope.itinerary == null) {
          return;
        }

        scope.activeSegmentsNumber = 0;
        scope.segmentsHeaders = _.keys(scope.itinerary.groupSegment);
        scope.groupSegment = scope.itinerary.groupSegment;
        scope.activeSegments = scope.groupSegment[scope.activeSegmentsNumber];
      });

      /**
       * Switch between the tabs in the segments list.
       *
       * @param segmentNumber
       */
      function showTab(segmentNumber) {
        scope.activeSegmentsNumber = segmentNumber;
        scope.activeSegments = scope.groupSegment[segmentNumber];
      }
    }
  }
})();
