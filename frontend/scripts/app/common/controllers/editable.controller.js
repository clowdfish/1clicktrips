(function() {

  'use strict';

  angular
    .module('app.common')
    .controller('editableCtrl', editableCtrl);

  function editableCtrl($scope) {
    $scope.error = false;
    $scope.success = false;
    $scope.optionDescription = '';

    getOptionDescription();

    $scope.$watch('value', function() {
      getOptionDescription();
    });

    function getOptionDescription() {
      if (_.isEmpty($scope.fieldConfig.options)) {
        return;
      }

      var option = _.find($scope.fieldConfig.options, function(item) {
        return item.value === $scope.fieldConfig.value;
      });

      if (option) {
        $scope.optionDescription = option.description;
      }
    }

    $scope.blurElement = function($event) {
      $event.target.blur();
    };

    $scope.save = function(newValue) {

      if($scope.value == newValue) {
        return;
      }

      if (_.isObject($scope.fieldConfig.validator) &&
          _.isFunction($scope.fieldConfig.validator.test) &&
          $scope.fieldConfig.validator.test(newValue) == false) {
        $scope.error = true;
        $scope.errorMessage = $scope.fieldConfig.validator.errorMessage;
        return;
      }
      $scope.value = newValue;
      $scope.success = false;
      $scope.error = false;
      $scope.saveFn($scope.fieldConfig.key, newValue)
        .then(saveSuccess, saveError);

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
