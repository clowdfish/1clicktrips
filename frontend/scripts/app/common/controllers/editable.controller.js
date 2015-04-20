(function() {

  'use strict';

  angular
    .module('app.common')
    .controller('editableCtrl', editableCtrl);

  function editableCtrl($scope) {
    $scope.isEditing = false;
    $scope.error = false;
    $scope.success = false;
    $scope.optionDescription = '';

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

    $scope.edit = function() {
      $scope.isEditing = true;
    };

    $scope.save = function(newValue) {
      $scope.value = newValue;
      $scope.success = false;
      $scope.error = false;
      $scope.saveFn($scope.key, newValue)
        .then(saveSuccess, saveError);
    };

    function saveSuccess() {
      $scope.isEditing = false;
      $scope.success = true;
      $scope.error = false;
    }

    function saveError(reason) {
      $scope.success = false;
      $scope.error = true;
    }


  }

})();
