(function() {

  'use strict';

  angular
    .module('app.booking')
    .directive('bookingConfirmation', bookingConfirmation);

  function bookingConfirmation(bookingApi) {
    return {
      restrict: 'E',
      scope: {
        bookingData: '=',
        previousStep: '=',
        nextStep: '='
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

      scope.book = function() {
        bookingApi
          .saveBooking(scope.bookingData)
          .then(function() {
            scope.nextStep();
          }, function(reason) {
            scope.bookingError = true;
          });

      }

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
