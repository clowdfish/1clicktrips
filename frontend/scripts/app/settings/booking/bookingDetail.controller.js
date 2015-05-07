(function() {

  'use strict';

  angular
    .module('app.settings.booking')
    .controller('bookingDetailCtrl', bookingDetailCtrl);

  function bookingDetailCtrl($scope, booking) {
    $scope.booking = booking;
  }

})();
