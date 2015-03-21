(function() {
  'use strict';

  angular
    .module('app.common')
    .filter('capitalize', capitalize);

  function capitalize() {

    return function(text) {
      return text.charAt(0).toUpperCase() + text.slice(1);
    }
  }
})();