(function() {
  'use strict';

  angular
    .module('app.result')
    .filter('vehicleTypeToIcon', vehicleTypeToIcon);

  function vehicleTypeToIcon() {
    var images = {
      0: "fa-bed",
      1: "fa-street-view",
      2: "fa-cab",
      4: "fa-car",
      8: "fa-bus",
      14: "fa-subway",
      16: "fa-train",
      32: "fa-plane",
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