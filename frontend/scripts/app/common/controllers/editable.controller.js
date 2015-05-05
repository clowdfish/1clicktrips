(function() {

  'use strict';

  angular
    .module('app.common')
    .controller('editableCtrl', editableCtrl);

  function editableCtrl($scope) {
    $scope.error = false;
    $scope.success = false;
    $scope.optionDescription = '';
    $scope.oldValue = $scope.value;

    getOptionDescription();
    $scope.$watch('value', function() {
      getOptionDescription();
    });

    function getOptionDescription() {
      var option = _.find($scope.options, function(item) {
        return item.value === $scope.value;
      });

      if (option) {
        $scope.optionDescription = option.description;
      }
    }

    $scope.blurElement = function($event) {
      $event.target.blur();
    };

    $scope.save = function(newValue) {

      if($scope.oldValue != newValue) {
        $scope.value = newValue;
        $scope.success = false;
        $scope.error = false;
        $scope.saveFn($scope.key, newValue)
          .then(saveSuccess, saveError);
      }
    };

    function saveSuccess() {
      $scope.success = true;
      $scope.error = false;
    }

    function saveError(reason) {
      $scope.success = false;
      $scope.error = true;
    }
  }

})();
