(function() {
  'use strict';

  angular
    .module('app.result')
    .directive('itinerarySummary', itinerarySummary);

  function itinerarySummary() {
    return {
      restrict: 'E',
      templateUrl: 'js/templates/result/itinerary-summary.html',
      scope: {
        itinerary: '='
      },
      link: link
    }

    function link(scope, element, attrs) {

    }
  }


})();