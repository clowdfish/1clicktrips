(function() {
  angular
    .module('app.result')
    .directive('alternativeHotels', alternativeHotels);

  function alternativeHotels() {
    return {
      require: '^tripResultWrapper',
      restrict: 'E',
      templateUrl: 'scripts/app/templates/result/alternative-hotel.html',
      scope: {
        itinerary: '=',
        alternatives: '=',
        segment: '='
      },
      link: link
    };

    function link(scope, element, attrs, itineraryMapCtrl) {

      scope.closeAlternativePanel = function() {
        ctrl.closeAlternativesPanel();
      };

      scope.selectAlternative = function(alternative) {
        console.log('Select alternative hotel', alternative);
      }
    }
  }
})();
