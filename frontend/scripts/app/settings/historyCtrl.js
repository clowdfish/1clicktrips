(function() {

  'use strict';

  angular
    .module('app.settings')
    .controller('historyCtrl', historyCtrl);

  function historyCtrl($scope, favorites, bookingList) {

    $scope.favorites = favorites;

    $scope.bookingList = bookingList;
  }

})();
