(function() {

  'use strict';

  angular
    .module('app.common')
    .directive('editableTextField', editableTextField);

  function editableTextField() {
    return {
      restrict: 'E',
      templateUrl: 'scripts/app/templates/common/editable-text-field.html',
      scope: {
        saveFn: '=save',
        key: '=',
        label: '=',
        value: '='
      },
      controller: 'editableCtrl'
    };
  }

})();
