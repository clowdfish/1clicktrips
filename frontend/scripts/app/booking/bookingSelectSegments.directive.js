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
        scope.nextStep();
      };
    }
  }

})();
