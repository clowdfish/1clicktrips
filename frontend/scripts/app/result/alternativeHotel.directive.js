(function() {
  angular
    .module('app.result')
    .directive('alternativeHotel', alternativeHotel);

  function alternativeHotel() {
    return {
      require: '^tripResultWrapper',
      restrict: 'EA',
      templateUrl: 'scripts/app/templates/result/alternative-hotel.html',
      scope: {
        select: '=',
        segment: '=',
        alternatives: '=',
        isShowing: '='
      },
      link: link
    };

    function link(scope, element, attrs, itineraryMapCtrl) {

      scope.closePanel = closePanel;

      function closePanel() {
        itineraryMapCtrl.closeAlternativesPanel();
      }
    }
  }
})();
