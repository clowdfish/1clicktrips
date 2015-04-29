(function() {

  'use strict';

  angular
    .module('app.booking')
    .directive('bookingConfirmation', bookingConfirmation);

  function bookingConfirmation() {
    return {
      restrict: 'E',
      scope: {},
      templateUrl: 'scripts/app/templates/booking/booking-confirmation.html'
    }
  }
})();
