(function() {

  'use strict';

  angular
    .module('app.common')
    .directive('editableOptions', editableOptions);

  function editableOptions() {
    return {
      restrict: 'E',
      templateUrl: 'scripts/app/templates/common/editable-options.html',
      scope: {
        saveFn: '=save',
        fieldConfig: '='
      },
      controller: 'editableCtrl'
    };
  }

})();
