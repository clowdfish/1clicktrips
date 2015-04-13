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
        options: '=',
        key: '=',
        value: '=',
        label: '='
      },
      controller: 'editableCtrl',
      link: function(scope) {
        console.log(scope.value);
        console.log(scope.options);
      }
    };
  }

})();
