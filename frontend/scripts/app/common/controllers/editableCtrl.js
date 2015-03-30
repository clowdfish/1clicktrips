(function() {

  'use strict';

  angular
    .module('app.common')
    .controller('editableCtrl', editableCtrl);

  function editableCtrl($scope) {
    $scope.isEditing = false;
    $scope.error = false;
    $scope.success = false;
    $scope.edit = function() {
      $scope.isEditing = true;
    }
    $scope.save = function() {
      if (!$scope.value) {
        return saveError();
      }

      $scope.success = false;
      $scope.error = false;
      $scope.saveFn($scope.key, $scope.value)
        .then(saveSuccess, saveError)
    }

    function saveSuccess() {
      $scope.isEditing = false;
      $scope.success = true;
    }

    function saveError(reason) {
      $scope.error = true;
    }
  }

})();
