(function() {

  'use strict';

  angular
    .module('app.settings.booking')
    .controller('bookingListCtrl', bookingListCtrl);

  function bookingListCtrl($scope, bookingList, bookingApi) {
    $scope.bookingList = bookingList;

    $scope.deleteBooking = function(booking) {
      bookingApi
        .deleteBooking(booking)
        .then(function() {
          removeBookingFromList(booking);
        }, function() {
          alert('Can not delete real booking');
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
