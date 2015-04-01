(function() {

  'use strict';

  angular
    .module('app.auth')
    .controller('resetPasswordCtrl', resetPasswordCtrl);

  function resetPasswordCtrl($scope, $state, resetPasswordToken, authService) {

    $scope.submit = function() {
      authService
        .resetPassword(resetPasswordToken, $scope.password)
        .then(function() {
          $scope.success = true;
          $state.go('index');
        }, function(reason) {
          $scope.error = reason.data;
        })
    }

  }

})();
