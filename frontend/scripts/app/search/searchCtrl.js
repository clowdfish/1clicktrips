(function() {

  'use strict';

  angular
    .module('app.search')
    .controller('searchCtrl', searchCtrl);

  function searchCtrl($scope) {
    $scope.destination = null;
    $scope.origin = null;

  }
})();