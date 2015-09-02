(function() {

  'use strict';

  angular
    .module('app.index')
    .controller('indexCtrl', indexCtrl);

  function indexCtrl($scope,
                     $state,
                     INDEX_STATE) {

    $scope.indexState = INDEX_STATE.file;
  }
})();
