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
      controller: 'editableCtrl',
      link: link
    };

    function link(scope, element, attrs) {
      var $element = $(element);
      var $select = $element.find('select');
      $select.change(function() {
        $select.blur();
      });
    }
  }

})();
