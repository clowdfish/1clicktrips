(function() {

  'use strict';

  angular
    .module('app.settings.booking')
    .controller('bookingListCtrl', bookingListCtrl);

  function bookingListCtrl($scope, bookingList) {
    $scope.bookingList = bookingList;
  }
})();
