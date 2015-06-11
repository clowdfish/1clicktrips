(function() {

  'use strict';

  angular
    .module('app.settings.booking')
    .controller('bookingListCtrl', bookingListCtrl);

  function bookingListCtrl($scope, $translate, bookingList, bookingApi, $http) {
    $scope.bookingList = bookingList;

    $scope.deleteBooking = function(booking) {
      var shouldDelete = confirm($translate.instant('settings_bookings_delete'));
      if (!shouldDelete) {
        return;
      }

      bookingApi
        .deleteBooking(booking)
        .then(function() {
          removeBookingFromList(booking);
        }, function() {
          alert('Can not delete real booking.');
        });
    };

    $scope.downloadBooking = function(booking) {
      bookingApi
        .createCalendarFile(booking)
        .then(function() {
          $("body").append("<iframe src='/api/booking/" + booking.id + "/calendar' style='display: none;' ></iframe>");
        }, function() {
          alert('Error whilte downloading booking file');
        });
    }

    function removeBookingFromList(booking) {
      var index = _.findIndex($scope.bookingList, function(item) {
        return item.id === booking.id
      });
      $scope.bookingList.splice(index, 1);
    }


  }

})();
