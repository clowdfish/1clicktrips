(function() {

  'use strict';

  angular
    .module('app.auth')
    .controller('forgotPasswordCtrl', forgotPasswordCtrl);

  function forgotPasswordCtrl($scope, $state, $modalInstance, authService, session) {
    $scope.sent = false;
    $scope.submit = function() {
      $scope.sent = false;
      $scope.error = false;
      authService
        .forgotPassword($scope.email)
        .then(function() {
          $scope.sent = true;
        }, function(reason) {
          $scope.error = reason.data;
        });
    }

    $scope.cancel = function() {
      $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
      };
    }
  }

})();
