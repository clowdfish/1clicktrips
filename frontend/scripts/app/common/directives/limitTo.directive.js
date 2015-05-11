(function() {

  'use strict';

  angular
    .module('app.common')
    .directive("limitTo", limitTo);

  function limitTo() {
    return {
      restrict: 'A',
      link: link
    };

    function link(scope, element, attrs) {
      var limit = parseInt(attrs.limitTo);
      angular.element(element).on("keypress", function(e) {
        if (this.value.length >= limit && e.keyCode !== 8) return false;
      });
    }
  }
})();
