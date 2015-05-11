(function() {

  'use strict';

  angular
    .module('app.booking')
    .directive('bookingSelectSegments', bookingSelectSegments);

  function bookingSelectSegments() {
    return {
      restrict: 'E',
      scope: {
        trip: '=',
        previousStep: '=',
        nextStep: '='
      },
      templateUrl: 'scripts/app/templates/booking/booking-select-segments.html',
      link: link
    };

    function link(scope, element, attrs) {

      scope.back = function() {
        scope.previousStep();
      };

      scope.continue = function() {
        if (false === validateBookableSegments()) {
          return false;
        }
        scope.nextStep();
      };

      function validateBookableSegments() {
        var hasBookableSegment = false;
        var hasAtLeastOneBookedSegment = false;
        _.each(scope.trip.groupSegment, function(groupSegment) {
          _.each(groupSegment, function(segment) {
            if (segment.bookable) {
              hasBookableSegment = true;
            }

            if (segment.isBooked) {
              hasAtLeastOneBookedSegment = true;
            }
          });
        });

        /**
        * No bookable segment ? No need to validate
        */
        if (false == hasBookableSegment) {
          return true;
        }

        scope.bookingError = hasAtLeastOneBookedSegment === false;
        return hasAtLeastOneBookedSegment;
      }
    }
  }

})();
