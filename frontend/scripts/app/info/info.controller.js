(function() {

  'use strict';

  angular
    .module('app.info')
    .controller('infoCtrl', infoCtrl);

  function infoCtrl($scope) {

    $scope.infoMail = "info@1clicktrips.com";
  }
})();
