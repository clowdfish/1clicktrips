/**
 * Work around for default date in date picker
 */
(function() {

  'use strict';

  angular
    .module('app.common')
    .directive('datepickerPopup', datepickerPopup);

  function datepickerPopup(dateFilter, datepickerPopupConfig) {
    return {
      restrict: 'A',
      priority: 1,
      require: 'ngModel',
      link: function(scope, element, attr, ngModel) {
        var dateFormat = attr.datepickerPopup || datepickerPopupConfig.datepickerPopup;
        ngModel.$formatters.push(function (value) {
          return dateFilter(value, dateFormat);
        });
      }
    };
  }
})();
