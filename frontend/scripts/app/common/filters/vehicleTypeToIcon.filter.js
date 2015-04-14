(function() {
  'use strict';

  angular
    .module('app.common')
    .filter('vehicleTypeToIcon', vehicleTypeToIcon);

  function vehicleTypeToIcon() {
    var images = {
      0: "fa-bed",
      1: "fa-street-view",
      2: "fa-car",
      4: "fa-bus",
      6: "fa-subway",
      8: "fa-train",
      16: "fa-plane",
      32: "fa-cab",
      64: "fa-ship"
    };

    return function(type) {
      if (images[type] != null) {
        return '' + images[type];
      }
      return null;
    }
  }
})();