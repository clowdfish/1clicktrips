(function() {

  'use strict';

  angular
    .module('app.common')
    .directive('editableDropdown', editableDropdown);

  function editableDropdown() {
    return {
      restrict: 'E',
      templateUrl: 'scripts/app/templates/common/editable-dropdown.html',
      scope: {
        saveFn: '=save',
        options: '=',
        key: '=',
        value: '=',
        label: '='
      },
      controller: 'editableCtrl'
    };
  }

})();
