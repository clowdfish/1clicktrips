(function() {

  'use strict';

  angular
    .module('app.settings')
    .controller('bookingCtrl', bookingCtrl);

  function bookingCtrl($scope, bookingList) {
    $scope.bookingList = bookingList;
  }

})();
