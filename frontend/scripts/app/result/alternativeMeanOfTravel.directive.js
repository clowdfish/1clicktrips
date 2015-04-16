(function() {

  'use strict';

  angular
    .module('app.result')
    .directive('alternativeMeanOfTravel', alternativeMeanOfTravel);

  function alternativeMeanOfTravel($translate) {
    return {
      require: '^tripResultWrapper',
      restrict: 'E',
      scope: {
        alternatives: '=',
        activeSegments: '='
      },
      link: link,
      templateUrl: 'scripts/app/templates/result/alternative-mean-of-travel.html'
    };

    function link(scope, element, attrs, ctrl) {

      scope.getAlternativeVehicleType = getAlternativeVehicleType;

      scope.closeAlternativePanel = function() {
        ctrl.closeAlternativesPanel();
      }

      scope.selectAlternative = function(alternative) {
        var lastIndex = _.findIndex(scope.activeSegments, function(item) {
          return item.id == alternative.replace[0];
        });

        if (lastIndex === -1) {
          return;
        }

        var activeSegments = _.reject(scope.activeSegments, function(item) {
          return alternative.replace.indexOf(item.id) !== -1;
        });
        activeSegments = insertAt(activeSegments, alternative.segments, lastIndex);
        scope.activeSegments = activeSegments;
      }

      function insertAt(array1, array2, index) {
        var origin = _.clone(array1);
        var end = origin.splice(index);
        return origin.concat(array2, end);
      }

      function getAlternativeVehicleType(alternative) {
        var text = "result_vehicle_" + alternative.segments[0].type;
        return text;
      }
    }
  }

})();
