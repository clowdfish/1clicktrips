(function() {

  'use strict';

  angular
    .module('app.booking')
    .directive('bookingSelectSegments', bookingSelectSegments);

  function bookingSelectSegments(appConfig, bookingApi, session, authHelper, AUTH_EVENTS) {
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

      scope.isBookingStored = false;

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
        if (session.isLogin()) {
          storeBooking();
        } else {
          authHelper.openLoginDialog();
          scope.$on(AUTH_EVENTS.loginSuccess, storeBooking);
          scope.$on(AUTH_EVENTS.signupSuccess, storeBooking);
        }
      };

      scope.bookable = false; // set true for debugging
      scope.handleBookableChange = handleBookableChange;

      /**
      * Automatic set bookable and calculate at when trip data is loaded
      */
      scope.$watch('bookingData.trip', function() {
        handleBookableChange();
      });

      /**
      * Remove listener when this directive is destroyed
      */
      scope.$on('$destroy', function() {
        removeAuthEventListener();
      });

      /**
      * Validate bookable segment and calculate booking price
      */
      function handleBookableChange() {
        validateBookableSegments();
        calculateBookingPrice();
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

      function calculateBookingPrice() {
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

      /**
      * Send store booking request and remove auth events listeners
      */
      function storeBooking() {
        if (scope.isBookingStored) {
          return;
        }
        scope.isBookingStored = true;
        bookingApi.storeBooking(scope.bookingData)
          .then(function() {
            //alert("Booking was stored successfully.");
          })
          .catch(function(err) {
            alert("Could not store booking: " + err.message);
          });
        removeAuthEventListener();
      }

      function removeAuthEventListener() {
        scope.$on(AUTH_EVENTS.loginSuccess, null);
        scope.$on(AUTH_EVENTS.signupSuccess, null);
      }
    }
  }
})();
