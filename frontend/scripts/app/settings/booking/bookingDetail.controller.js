(function() {

  'use strict';

  angular
    .module('app.settings.booking')
    .controller('bookingDetailCtrl', bookingDetailCtrl);

  function bookingDetailCtrl($scope, booking, bookingApi) {
    $scope.booking = booking;

    $scope.downloadBooking = function(booking) {
      bookingApi
        .createCalendarFile(booking)
        .then(function() {
          $("body").append("<iframe src='/api/booking/" + booking.id + "/calendar' style='display: none;' ></iframe>");
        }, function() {
          alert('Error whilte downloading booking file');
        });
    }
  }

})();
