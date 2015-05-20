(function() {

  'use strict';

  angular
    .module('app.settings.booking')
    .controller('bookingListCtrl', bookingListCtrl);

  function bookingListCtrl($scope, $translate, bookingList, bookingApi) {
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

    function removeBookingFromList(booking) {
      var index = _.findIndex($scope.bookingList, function(item) {
        return item.id === booking.id
      });
      $scope.bookingList.splice(index, 1);
    }
  }

})();
