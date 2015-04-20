(function() {

  'use strict';

  angular
    .module('app.common')
    .directive('requestSpinner', requestSpinner);

  function requestSpinner(requestSpinnerEvents) {
    return {
      restrict: 'E',
      templateUrl: 'scripts/app/templates/common/request-spinner.html',
      link: link,
      scope: {}
    };

    function link(scope, element, attrs) {
      var $element = $(element);
      scope.isShowing = false;
      scope.$on(requestSpinnerEvents.show, function(e, data) {
        scope.title = data.title;
        scope.isShowing = true;
      });

      scope.$on(requestSpinnerEvents.hide, function(e, data) {
        scope.isShowing = false;
      });
    }
  }

})();
