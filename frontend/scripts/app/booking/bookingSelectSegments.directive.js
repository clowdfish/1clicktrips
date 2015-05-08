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
        nextStep: '=',
        goBack: '='
      },
      templateUrl: 'scripts/app/templates/booking/booking-select-segments.html',
      link: link
    };

    function link(scope, element, attrs) {

      scope.continue = function() {
        scope.nextStep();
      };

    }
  }

})();
