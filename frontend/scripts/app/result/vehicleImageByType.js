(function() {
  'use strict';

  angular
    .module('app.result')
    .filter('vehicleImageUrlByType', vehicleImageUrlByType);

  function vehicleImageUrlByType() {
    var images = {

    }
    return function(type) {
      if (images[type] != null) {
        return '/images/' + images[type];
      }
      return null;
    }
  }
})();