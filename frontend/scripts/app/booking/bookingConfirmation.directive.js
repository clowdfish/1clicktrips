(function() {

  'use strict';

  angular
    .module('app.booking')
    .directive('bookingConfirmation', bookingConfirmation);

  function bookingConfirmation() {
    return {
      restrict: 'E',
      scope: {
        previousStep: '='
      },
      templateUrl: 'scripts/app/templates/booking/booking-confirmation.html',
      link: link
    };

    function link(scope, element, attrs) {

      scope.back = function () {
        scope.previousStep();
      };
    }
  }
})();
