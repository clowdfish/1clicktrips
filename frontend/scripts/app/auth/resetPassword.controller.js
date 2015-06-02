(function() {

  'use strict';

  angular
    .module('app.auth')
    .controller('resetPasswordCtrl', resetPasswordCtrl);

  function resetPasswordCtrl($scope, $state, resetPasswordToken, isValidToken, auth) {

    $scope.success = false;
    $scope.error = null;
    $scope.isValidToken = isValidToken;

    $scope.submit = function() {
      auth
        .resetPassword(resetPasswordToken, $scope.password)
        .then(function() {
          $scope.success = true;
        }, function(reason) {
          $scope.error = reason.data;
        })
    }

  }

})();
