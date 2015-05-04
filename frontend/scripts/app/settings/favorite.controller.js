(function() {

  'use strict';

  angular
    .module('app.settings')
    .controller('favoriteCtrl', favoriteCtrl);

  function favoriteCtrl($scope, favorites) {
    $scope.favorites = favorites;
  }

})();
