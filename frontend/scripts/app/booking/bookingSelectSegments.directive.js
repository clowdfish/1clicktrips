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
        if (!scope.bookable) {
          return false;
        }
        scope.nextStep();
      };

      scope.bookable = false;
      scope.validateBookableSegments = validateBookableSegments;

      function validateBookableSegments() {
        var hasBookableSegment = false;
        var hasAtLeastOneBookedSegment = false;
        _.each(scope.trip.groupSegment, function(groupSegment) {
          _.each(groupSegment, function(segment) {

            if (segment.bookable) hasBookableSegment = true;
            if (segment.isBooked) hasAtLeastOneBookedSegment = true;
          });
        });

        if (!hasBookableSegment) return false;

        scope.bookable = hasAtLeastOneBookedSegment;
        return hasAtLeastOneBookedSegment;
      }
    }
  }

})();
