(function() {
  'use strict';

  angular
    .module('app.result')
    .directive('tripSummary', tripSummary);

  function tripSummary() {
    return {
      restrict: 'E',
      templateUrl: 'scripts/app/templates/result/trip-summary.html',
      scope: {
        itinerary: '='
      },
      link: link
    }

    function link(scope, element, attrs) {

    }
  }


})();
