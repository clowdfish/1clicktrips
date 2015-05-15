(function() {

  'use strict';

  angular
    .module('app.booking')
    .directive('bookingSelectSegments', bookingSelectSegments);

  function bookingSelectSegments(appConfig, bookingApi) {
    return {
      restrict: 'E',
      scope: {
        bookingData: '=',
        previousStep: '=',
        nextStep: '=',
        totalBookingPrice: '=',
        bookingPrice: '=',
        bookingFee: '='
      },
      templateUrl: 'scripts/app/templates/booking/booking-select-segments.html',
      link: link
    };

    function link(scope, element, attrs) {
      scope.showSaveBookingNotification = false;
      scope.back = function() {
        scope.previousStep();
      };

      scope.continue = function() {
        if (!scope.bookable) {
          return false;
        }
        scope.nextStep();
      };

      scope.save = function() {
        scope.showSaveBookingNotification = true;
        bookingApi.saveSegmentSelect(scope.bookingData);
      }

      scope.bookable = false; // set true for debugging
      scope.handleBookableChange = handleBookableChange;

      /**
      * Automatic set bookable and calculate at when trip data is loaded
      */
      scope.$watch('bookingData.trip', function() {
        handleBookableChange();
      });

      /**
      * Validate bookable segment and calculate booking price
      */
      function handleBookableChange() {
        validateBookableSegments();
        caculateBookingPrice();
      }

      function validateBookableSegments() {
        var hasBookableSegment = false;
        var hasAtLeastOneBookedSegment = false;
        _.each(scope.bookingData.trip.groupSegment, function(groupSegment) {
          _.each(groupSegment, function(segment) {
            if (segment.bookable) hasBookableSegment = true;
            if (segment.isBooked) hasAtLeastOneBookedSegment = true;
          });
        });

        if (!hasBookableSegment) return false;

        scope.bookable = hasAtLeastOneBookedSegment;
        return hasAtLeastOneBookedSegment;
      }

      function caculateBookingPrice() {
        scope.bookingPrice = 0;
        _.each(scope.bookingData.trip.groupSegment, function(groupSegment) {
          _.each(groupSegment, function(segment) {
            if (segment.bookable && segment.isBooked) {
              scope.bookingPrice += segment.price.amount;
            }
          });
        });

        scope.bookingFee = scope.bookingPrice * appConfig.bookingRate / 100;
        scope.totalBookingPrice = scope.bookingPrice + scope.bookingFee;
      }
    }
  }
})();
