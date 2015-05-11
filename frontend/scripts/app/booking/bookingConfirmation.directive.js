(function() {

  'use strict';

  angular
    .module('app.booking')
    .directive('bookingConfirmation', bookingConfirmation);

  function bookingConfirmation() {
    return {
      restrict: 'E',
      scope: {
        bookingData: '=',
        previousStep: '='
      },
      templateUrl: 'scripts/app/templates/booking/booking-confirmation.html',
      link: link
    };

    function link(scope, element, attrs) {
      scope.selectedSegments = [];

      /**
      * Watch for selected segment
      */
      scope.$watch('bookingData.trip.groupSegment', function() {
        filterSelectedSegments();
      }, true);

      scope.back = function () {
        scope.previousStep();
      };

      function filterSelectedSegments() {
        scope.selectedSegments = [];
        _.each(scope.bookingData.trip.groupSegment, function(groupSegment) {
          _.each(groupSegment, function(segment) {
            if (segment.isBooked) {
              scope.selectedSegments.push(segment);
            }
          });
        });
      }
    }
  }
})();
