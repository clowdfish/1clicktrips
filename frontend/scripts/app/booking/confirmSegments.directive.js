(function() {

  'use strict';

  angular
    .module('app.booking')
    .directive('confirmSegments', confirmSegments);

  function confirmSegments() {
    return {
      restrict: 'E',
      templateUrl: 'scripts/app/templates/booking/confirm-segment.html',
      scope: {
        itinerary: '='
      },
      link: link
    };

    function link(scope, element, attrs) {

    }

  }
})();
