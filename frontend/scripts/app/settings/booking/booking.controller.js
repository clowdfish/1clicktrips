(function() {

  'use strict';

  angular
    .module('app.settings.booking')
    .controller('bookingCtrl', bookingCtrl);

  function bookingCtrl($scope, bookingList) {
    $scope.bookingList = bookingList;
  }

})();
