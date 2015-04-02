(function() {

  'use strict';

  angular
    .module('app.auth')
    .controller('resetPasswordCtrl', resetPasswordCtrl);

  function resetPasswordCtrl($scope, $state, resetPasswordToken, isValidToken, authService) {
    $scope.success = false;
    $scope.error = null;
    $scope.isValidToken = isValidToken;
    $scope.submit = function() {
      authService
        .resetPassword(resetPasswordToken, $scope.password)
        .then(function() {
          $scope.success = true;
        }, function(reason) {
          $scope.error = reason.data;
        })
    }

  }

})();
